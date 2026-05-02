import { createServerFn } from '@tanstack/react-start'

import { createClient } from '#/lib/supabase/server'

import { lookupWord, type DictionaryResult } from './dictionary-server-fns'
import { enrichWords, type AiEnrichment } from './gemini-server-fns'

export type VerifiedWord = {
  bufferId: string
  germanWord: string
  userTranslation?: string
  userNotes?: string
  userCustomSentence?: string
  userRawTags?: string[]
  dictionaryResult: DictionaryResult
  aiEnrichment: AiEnrichment
  verificationSource: 'dwds' | 'wiktionary' | 'ai_only' | 'unverified'
}

export const verifyBufferWords = createServerFn({ method: 'POST' }).handler(
  async (): Promise<VerifiedWord[]> => {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const { data: bufferWords, error } = await supabase
      .from('word_buffer')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) throw new Error(error.message)
    if (!bufferWords || bufferWords.length === 0) {
      throw new Error('No words to verify')
    }

    const dictionaryResults = await Promise.all(
      bufferWords.map((bw) =>
        lookupWord({ data: { word: bw.german_word } }).catch(
          (): DictionaryResult => ({
            found: false,
            source: 'api_error',
          }),
        ),
      ),
    )

    let aiResults: AiEnrichment[]
    try {
      aiResults = await enrichWords({
        data: {
          words: bufferWords.map((bw, i) => ({
            germanWord: bw.german_word,
            translation: bw.translation ?? undefined,
            dictionaryResult: dictionaryResults[i],
          })),
        },
      })
    } catch {
      aiResults = bufferWords.map(() => ({}))
    }

    return bufferWords.map((bw, i) => {
      const dict = dictionaryResults[i]
      const ai = aiResults[i] ?? {}

      if (!ai.suggestedTranslation && dict.englishTranslation) {
        ai.suggestedTranslation = dict.englishTranslation
      }

      if (!dict.gender && ai.gender) {
        dict.gender = ai.gender
      }
      if (!dict.wordType && ai.wordType) {
        dict.wordType = ai.wordType
      }
      if (!dict.pluralForm && ai.pluralForm) {
        dict.pluralForm = ai.pluralForm
      }

      if (ai.correctedWord && !ai.spellingCorrection) {
        ai.spellingCorrection = ai.correctedWord
      }

      let verificationSource: VerifiedWord['verificationSource']
      if (dict.found && dict.source === 'dwds') verificationSource = 'dwds'
      else if (dict.found && dict.source === 'wiktionary')
        verificationSource = 'wiktionary'
      else if (Object.keys(ai).length > 0) verificationSource = 'ai_only'
      else verificationSource = 'unverified'

      return {
        bufferId: bw.id,
        germanWord: bw.german_word,
        userTranslation: bw.translation ?? undefined,
        userNotes: bw.notes ?? undefined,
        userCustomSentence: bw.custom_sentence ?? undefined,
        userRawTags: bw.raw_user_tags ?? undefined,
        dictionaryResult: dict,
        aiEnrichment: ai,
        verificationSource,
      }
    })
  },
)
