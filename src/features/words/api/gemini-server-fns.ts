import { GoogleGenAI } from '@google/genai'
import { createServerFn } from '@tanstack/react-start'

import type { DictionaryResult } from './dictionary-server-fns'

export type AiEnrichment = {
  correctedWord?: string
  spellingCorrection?: string
  wordType?: string
  gender?: string
  suggestedTranslation?: string
  exampleSentences?: Array<{ de: string; translation: string }>
  aiTags?: string[]
  conjugations?: Record<string, string>
  conjugationType?: string
  isSeparable?: boolean
  takesCase?: string
  comparative?: string
  superlative?: string
  pluralForm?: string
}

type EnrichInput = {
  germanWord: string
  translation?: string
  dictionaryResult?: DictionaryResult
}

export const enrichWords = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => input as { words: EnrichInput[] })
  .handler(async (ctx): Promise<AiEnrichment[]> => {
    const data = ctx.data
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) throw new Error('GEMINI_API_KEY not configured')

    const ai = new GoogleGenAI({ apiKey })

    const wordList = data.words.map((w, i) => {
      const dict = w.dictionaryResult
      return `${i + 1}. "${w.germanWord}"${w.translation ? ` (user says: "${w.translation}")` : ''}${dict?.wordType ? ` [${dict.wordType}${dict.gender ? `, ${dict.gender}` : ''}]` : ''}`
    })

    const prompt = `You are a German language expert helping an Indonesian learner.

For each German word below, provide enrichment data. Respond ONLY with a JSON array (no markdown, no code fences).

CRITICAL RULES:
1. ALWAYS convert the word to its singular/base form (Grundform). If the user typed a plural noun, convert to singular. If a conjugated verb, convert to infinitive. The "corrected_word" field must contain this base form. If the word is already in base form, set corrected_word to null.
2. ALWAYS provide word_type (noun/verb/adjective/adverb/other) and gender (der/die/das for nouns, null for others). This is required for every word.
3. Translations must be in Indonesian (Bahasa Indonesia)
4. If the word appears misspelled, provide spelling_correction with the correct German spelling (in base form)
5. Provide 1-2 example sentences with Indonesian translations
6. Suggest appropriate tags from: animals, food, travel, daily life, academic, nature, body, clothing, emotions, family, health, home, numbers, sports, technology, time, weather, work
7. For verbs: provide conjugations (ich, du, er, wir, ihr, sie present tense), conjugation_type (weak/strong/irregular), is_separable (boolean), takes_case (akkusativ/dativ if applicable)
8. For adjectives: provide comparative and superlative forms
9. For nouns: ALWAYS provide plural_form and gender

Words:
${wordList.join('\n')}

Response format — a JSON array with one object per word, in order:
[
  {
    "corrected_word": "base/singular form or null if already correct",
    "spelling_correction": "corrected spelling or null",
    "word_type": "noun" | "verb" | "adjective" | "adverb" | "other",
    "gender": "der" | "die" | "das" | null,
    "suggested_translation": "Indonesian translation",
    "example_sentences": [{"de": "German sentence", "translation": "Indonesian translation"}],
    "ai_tags": ["tag1", "tag2"],
    "conjugations": {"ich": "...", "du": "...", "er": "...", "wir": "...", "ihr": "...", "sie": "..."} or null,
    "conjugation_type": "weak" | "strong" | "irregular" or null,
    "is_separable": true/false or null,
    "takes_case": "akkusativ" | "dativ" or null,
    "comparative": "..." or null,
    "superlative": "..." or null,
    "plural_form": "..." or null
  }
]`

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      })

      const text = response.text ?? ''

      const cleaned = text
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim()

      const parsed = JSON.parse(cleaned) as Array<Record<string, unknown>>

      return parsed.map((item) => ({
        correctedWord: (item.corrected_word as string) ?? undefined,
        spellingCorrection: (item.spelling_correction as string) ?? undefined,
        wordType: (item.word_type as string) ?? undefined,
        gender: (item.gender as string) ?? undefined,
        suggestedTranslation: (item.suggested_translation as string) ?? undefined,
        exampleSentences: (
          item.example_sentences as Array<{ de: string; translation: string }>
        ) ?? undefined,
        aiTags: (item.ai_tags as string[]) ?? undefined,
        conjugations: (item.conjugations as Record<string, string>) ?? undefined,
        conjugationType: (item.conjugation_type as string) ?? undefined,
        isSeparable: (item.is_separable as boolean) ?? undefined,
        takesCase: (item.takes_case as string) ?? undefined,
        comparative: (item.comparative as string) ?? undefined,
        superlative: (item.superlative as string) ?? undefined,
        pluralForm: (item.plural_form as string) ?? undefined,
      }))
    } catch (error) {
      console.error('Gemini enrichment failed:', error)
      return data.words.map(() => ({}))
    }
  })
