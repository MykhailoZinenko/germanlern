import { createServerFn } from '@tanstack/react-start'

import { createClient } from '#/lib/supabase/server'
import type { Database } from '#/types/database'

type BufferRow = Database['public']['Tables']['word_buffer']['Row']

export const fetchBufferWords = createServerFn({ method: 'GET' }).handler(
  async (): Promise<BufferRow[]> => {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const { data, error } = await supabase
      .from('word_buffer')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) throw new Error(error.message)
    return data
  },
)

export const addBufferWord = createServerFn({ method: 'POST' })
  .inputValidator(
    (input: unknown) =>
      input as {
        germanWord: string
        translation?: string
        notes?: string
        customSentence?: string
        rawUserTags?: string[]
      },
  )
  .handler(async (ctx) => {
    const data = ctx.data
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const { error } = await supabase.from('word_buffer').insert({
      user_id: user.id,
      german_word: data.germanWord.trim(),
      translation: data.translation?.trim() || null,
      notes: data.notes?.trim() || null,
      custom_sentence: data.customSentence?.trim() || null,
      raw_user_tags: data.rawUserTags ?? null,
    })

    if (error) throw new Error(error.message)
  })

export const addBufferWordsBatch = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => input as { words: string[] })
  .handler(async (ctx) => {
    const data = ctx.data
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const rows = data.words
      .map((w) => w.trim())
      .filter(Boolean)
      .map((german_word) => ({
        user_id: user.id,
        german_word,
      }))

    if (rows.length === 0) return

    const { error } = await supabase.from('word_buffer').insert(rows)
    if (error) throw new Error(error.message)
  })

export const deleteBufferWord = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => input as { id: string })
  .handler(async (ctx) => {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const { error } = await supabase
      .from('word_buffer')
      .delete()
      .eq('id', ctx.data.id)

    if (error) throw new Error(error.message)
  })

export const clearBuffer = createServerFn({ method: 'POST' }).handler(
  async () => {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const { error } = await supabase
      .from('word_buffer')
      .delete()
      .eq('user_id', user.id)

    if (error) throw new Error(error.message)
  },
)
