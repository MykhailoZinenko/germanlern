import { createServerFn } from '@tanstack/react-start'

import { createClient } from '#/lib/supabase/server'
import type { Database } from '#/types/database'

export type WordRow = Database['public']['Tables']['words']['Row']

export type WordFilters = {
  search?: string
  stage?: string
  wordType?: string
  tags?: string[]
  sort?: 'alpha' | 'date_added' | 'stage' | 'last_reviewed' | 'next_review'
  sortDir?: 'asc' | 'desc'
}

export const checkDuplicateWord = createServerFn({ method: 'POST' })
  .inputValidator(
    (input: unknown) => input as { germanWord: string; translation?: string },
  )
  .handler(async (ctx) => {
    const data = ctx.data
    const word = data.germanWord.trim()
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const [libraryResult, bufferResult] = await Promise.all([
      supabase
        .from('words')
        .select('id, german_word, translation')
        .eq('user_id', user.id)
        .ilike('german_word', word)
        .limit(1)
        .maybeSingle(),
      supabase
        .from('word_buffer')
        .select('id, german_word')
        .eq('user_id', user.id)
        .ilike('german_word', word)
        .limit(1)
        .maybeSingle(),
    ])

    if (libraryResult.error) throw new Error(libraryResult.error.message)
    if (bufferResult.error) throw new Error(bufferResult.error.message)

    if (bufferResult.data) {
      return { exists: true as const, inBuffer: true as const }
    }

    if (!libraryResult.data) {
      return { exists: false as const }
    }

    const existing = libraryResult.data
    const sameTranslation =
      !data.translation ||
      !existing.translation ||
      existing.translation.toLowerCase() === data.translation.trim().toLowerCase()

    return {
      exists: true as const,
      existingWord: existing,
      sameTranslation,
    }
  })

export const fetchWords = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => input as WordFilters)
  .handler(async (ctx) => {
    const data = ctx.data
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    let query = supabase
      .from('words')
      .select('*')
      .eq('user_id', user.id)

    if (data.search) {
      const term = `%${data.search}%`
      query = query.or(`german_word.ilike.${term},translation.ilike.${term}`)
    }

    if (data.wordType) {
      query = query.eq('word_type', data.wordType)
    }

    if (data.tags && data.tags.length > 0) {
      query = query.overlaps('ai_tags', data.tags)
    }

    if (data.stage) {
      switch (data.stage) {
        case 'planted':
          query = query.eq('review_count', 0)
          break
        case 'growing':
          query = query.gt('review_count', 0).lt('easiness_factor', 2.0)
          break
        case 'almost':
          query = query
            .gt('review_count', 0)
            .gte('easiness_factor', 2.0)
            .or('easiness_factor.lt.2.5,review_count.lt.5')
          break
        case 'mastered':
          query = query.gte('easiness_factor', 2.5).gte('review_count', 5)
          break
      }
    }

    const sortCol =
      data.sort === 'alpha'
        ? 'german_word'
        : data.sort === 'date_added'
          ? 'date_added'
          : data.sort === 'last_reviewed'
            ? 'last_reviewed'
            : data.sort === 'next_review'
              ? 'next_review_date'
              : 'date_added'

    const ascending = data.sortDir === 'asc'
    query = query.order(sortCol, { ascending, nullsFirst: false })

    const { data: words, error } = await query

    if (error) throw new Error(error.message)
    return words as WordRow[]
  })

export const fetchWordById = createServerFn({ method: 'GET' })
  .inputValidator((input: unknown) => input as { id: string })
  .handler(async (ctx) => {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const { data: word, error } = await supabase
      .from('words')
      .select('*')
      .eq('id', ctx.data.id)
      .eq('user_id', user.id)
      .single()

    if (error) throw new Error(error.message)
    return word as WordRow
  })

export const deleteWord = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => input as { id: string })
  .handler(async (ctx) => {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const { error } = await supabase
      .from('words')
      .delete()
      .eq('id', ctx.data.id)
      .eq('user_id', user.id)

    if (error) throw new Error(error.message)
  })
