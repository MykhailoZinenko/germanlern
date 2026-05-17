import { createServerFn } from '@tanstack/react-start'

import { createClient } from '#/lib/supabase/server'
import type { Database } from '#/types/database'

type WordRow = Database['public']['Tables']['words']['Row']

export type StudyQueueWord = Pick<
  WordRow,
  | 'id'
  | 'german_word'
  | 'translation'
  | 'gender'
  | 'word_type'
  | 'easiness_factor'
  | 'interval_days'
  | 'review_count'
  | 'next_review_date'
  | 'last_reviewed'
  | 'ai_tags'
  | 'plural_form'
  | 'example_sentences'
>

export const fetchStudyQueue = createServerFn({ method: 'POST' })
  .inputValidator(
    (input: unknown) => input as { mode: 'auto' | 'by_tag'; tagFilter?: string[] }
  )
  .handler(async (ctx): Promise<StudyQueueWord[]> => {
    const { mode, tagFilter } = ctx.data
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    let query = supabase
      .from('words')
      .select(
        'id, german_word, translation, gender, word_type, easiness_factor, interval_days, review_count, next_review_date, last_reviewed, ai_tags, plural_form, example_sentences'
      )
      .eq('user_id', user.id)

    if (mode === 'by_tag' && tagFilter && tagFilter.length > 0) {
      query = query.overlaps('ai_tags', tagFilter)
    }

    const { data, error } = await query
    if (error) throw new Error(error.message)

    return data ?? []
  })

export const fetchDueCount = createServerFn({ method: 'GET' }).handler(
  async (): Promise<{ dueCount: number; totalWords: number }> => {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const today = new Date().toISOString().split('T')[0]

    const [dueResult, totalResult] = await Promise.all([
      supabase
        .from('words')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .or(`next_review_date.is.null,next_review_date.lte.${today}`),
      supabase
        .from('words')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.id),
    ])

    return {
      dueCount: dueResult.count ?? 0,
      totalWords: totalResult.count ?? 0,
    }
  }
)
