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

    let savedCount = 0
    const skippedDuplicates: string[] = []

    for (const word of data.words) {
      const { data: existing } = await supabase
        .from('words')
        .select('id')
        .eq('user_id', user.id)
        .ilike('german_word', word.finalGermanWord)
        .limit(1)
        .maybeSingle()

      if (existing) {
        skippedDuplicates.push(word.finalGermanWord)
        await supabase.from('word_buffer').delete().eq('id', word.bufferId)
        continue
      }

      const dict = word.dictionaryResult
      const ai = word.aiEnrichment

      const { error: insertError } = await supabase.from('words').insert({
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
        verified_at: new Date().toISOString(),
        source: 'manual',
        next_review_date: new Date().toISOString().split('T')[0],
      })

      if (insertError) {
        throw new Error(`Failed to save "${word.finalGermanWord}": ${insertError.message}`)
      }

      if (word.finalAiTags.length > 0) {
        for (const tagName of word.finalAiTags) {
          const { data: existingTag } = await supabase
            .from('user_tags')
            .select('id')
            .eq('user_id', user.id)
            .eq('name', tagName)
            .maybeSingle()

          if (!existingTag) {
            await supabase
              .from('user_tags')
              .insert({ user_id: user.id, name: tagName })
          }
        }
      }

      await supabase.from('word_buffer').delete().eq('id', word.bufferId)
      savedCount++
    }

    return { saved: savedCount, skippedDuplicates }
  })
