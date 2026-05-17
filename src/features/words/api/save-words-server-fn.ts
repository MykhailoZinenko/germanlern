import { createServerFn } from '@tanstack/react-start'

import { createClient } from '#/lib/supabase/server'
import type { VerifiedWord } from './verify-server-fn'

type SaveWordInput = VerifiedWord & {
  finalGermanWord: string
  finalTranslation: string
  finalAiTags: string[]
}

export const saveVerifiedWords = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => input as { words: SaveWordInput[] })
  .handler(async (ctx): Promise<{ saved: number; skippedDuplicates: string[] }> => {
    const data = ctx.data
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const t0 = Date.now()
    console.log(`[save] Saving ${data.words.length} words`)

    // 1. Batch duplicate check — single query
    const { data: existingWords } = await supabase
      .from('words')
      .select('german_word')
      .eq('user_id', user.id)
    const existingSet = new Set(
      (existingWords ?? []).map((w) => w.german_word.toLowerCase()),
    )

    const skippedDuplicates: string[] = []
    const toInsert: typeof data.words = []
    const skipBufferIds: string[] = []

    for (const word of data.words) {
      if (existingSet.has(word.finalGermanWord.toLowerCase())) {
        skippedDuplicates.push(word.finalGermanWord)
        skipBufferIds.push(word.bufferId)
      } else {
        toInsert.push(word)
      }
    }

    // 2. Batch insert all words at once
    if (toInsert.length > 0) {
      const now = new Date().toISOString()
      const today = now.split('T')[0]

      const rows = toInsert.map((word) => {
        const dict = word.dictionaryResult
        const ai = word.aiEnrichment
        return {
          user_id: user.id,
          german_word: word.finalGermanWord,
          word_type: dict.wordType ?? ai.wordType ?? null,
          translation: word.finalTranslation || null,
          alt_translations: null,
          example_sentences: ai.exampleSentences ?? null,
          gender: dict.gender ?? ai.gender ?? null,
          plural_form: dict.pluralForm ?? ai.pluralForm ?? null,
          conjugations: ai.conjugations ?? null,
          conjugation_type: ai.conjugationType ?? null,
          is_separable: ai.isSeparable ?? null,
          takes_case: ai.takesCase ?? null,
          comparative: ai.comparative ?? null,
          superlative: ai.superlative ?? null,
          ai_tags: word.finalAiTags.length > 0 ? word.finalAiTags : null,
          notes: word.userNotes ?? null,
          custom_sentence: word.userCustomSentence ?? null,
          verification_source: word.verificationSource,
          verified_at: now,
          source: 'manual',
          next_review_date: today,
        }
      })

      const { error: insertError } = await supabase.from('words').insert(rows)
      if (insertError) {
        throw new Error(`Failed to save words: ${insertError.message}`)
      }
    }

    // 3. Batch upsert all unique tags at once
    const allTags = new Set<string>()
    for (const word of toInsert) {
      for (const tag of word.finalAiTags) {
        allTags.add(tag)
      }
    }

    if (allTags.size > 0) {
      const tagRows = [...allTags].map((name) => ({ user_id: user.id, name }))
      await supabase
        .from('user_tags')
        .upsert(tagRows, { onConflict: 'user_id,name', ignoreDuplicates: true })
    }

    // 4. Batch delete all buffer entries at once
    const allBufferIds = [
      ...skipBufferIds,
      ...toInsert.map((w) => w.bufferId),
    ]
    if (allBufferIds.length > 0) {
      await supabase.from('word_buffer').delete().in('id', allBufferIds)
    }

    console.log(`[save] Done in ${Date.now() - t0}ms — saved ${toInsert.length}, skipped ${skippedDuplicates.length} dupes`)

    return { saved: toInsert.length, skippedDuplicates }
  })
