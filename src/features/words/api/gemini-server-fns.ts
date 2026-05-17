import { GoogleGenAI } from '@google/genai'
import { createServerFn } from '@tanstack/react-start'

import type { DictionaryResult } from './dictionary-server-fns'

const GEMINI_CHUNK_SIZE = 15

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size))
  }
  return chunks
}

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

function parseEnrichResponse(item: Record<string, unknown>): AiEnrichment {
  return {
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
  }
}

async function enrichChunk(ai: GoogleGenAI, words: EnrichInput[]): Promise<AiEnrichment[]> {
  const wordList = words.map((w, i) => {
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
  return parsed.map(parseEnrichResponse)
}

export const enrichWords = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => input as { words: EnrichInput[] })
  .handler(async (ctx): Promise<AiEnrichment[]> => {
    const data = ctx.data
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) throw new Error('GEMINI_API_KEY not configured')

    const ai = new GoogleGenAI({ apiKey })
    const chunks = chunkArray(data.words, GEMINI_CHUNK_SIZE)
    console.log(`[enrich] Processing ${data.words.length} words in ${chunks.length} parallel chunks`)

    try {
      const chunkResults = await Promise.all(
        chunks.map((chunk, i) => {
          console.log(`[enrich] Chunk ${i + 1}/${chunks.length}: ${chunk.length} words`)
          return enrichChunk(ai, chunk)
        }),
      )
      return chunkResults.flat()
    } catch (error) {
      console.error('Gemini enrichment failed:', error)
      return data.words.map(() => ({}))
    }
  })

export type NormalizedWord = {
  original: string
  base: string
}

async function normalizeChunk(ai: GoogleGenAI, words: string[]): Promise<NormalizedWord[]> {
  const prompt = `You are a German language expert. Convert each word below to its dictionary/base form (Grundform).

RULES:
1. Nouns → singular nominative (e.g. Häuser → Haus, Kindern → Kind)
2. Verbs → infinitive (e.g. aufgestanden → aufstehen, gegessen → essen, isst → essen)
3. Adjectives → positive form (e.g. schönsten → schön, bessere → gut)
4. Adverbs, prepositions, etc. → keep as-is
5. Return ONLY a JSON array of objects — no markdown, no code fences.

Words:
${words.map((w, i) => `${i + 1}. "${w}"`).join('\n')}

Response format:
[{"original": "aufgestanden", "base": "aufstehen"}, ...]`

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
  })

  const raw = response.text ?? ''
  const cleaned = raw
    .replace(/```json\n?/g, '')
    .replace(/```\n?/g, '')
    .trim()

  return JSON.parse(cleaned) as NormalizedWord[]
}

export const normalizeWords = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => input as { words: string[] })
  .handler(async (ctx): Promise<{ words: NormalizedWord[] }> => {
    const { words } = ctx.data
    if (words.length === 0) return { words: [] }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) throw new Error('GEMINI_API_KEY not configured')

    const ai = new GoogleGenAI({ apiKey })
    const chunks = chunkArray(words, GEMINI_CHUNK_SIZE)
    console.log(`[normalize] Processing ${words.length} words in ${chunks.length} parallel chunks`)

    try {
      const chunkResults = await Promise.all(
        chunks.map((chunk, i) => {
          console.log(`[normalize] Chunk ${i + 1}/${chunks.length}: ${chunk.length} words`)
          return normalizeChunk(ai, chunk)
        }),
      )
      return { words: chunkResults.flat() }
    } catch (error) {
      console.error('Word normalization failed:', error)
      return { words: words.map((w) => ({ original: w, base: w })) }
    }
  })

export type ExtractedWord = {
  word: string
  status: 'new' | 'inLibrary' | 'inBuffer'
}

export const extractWordsFromText = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => input as { text: string })
  .handler(async (ctx): Promise<{ words: ExtractedWord[] }> => {
    const { text } = ctx.data
    if (!text.trim()) return { words: [] }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) throw new Error('GEMINI_API_KEY not configured')

    const { createClient } = await import('#/lib/supabase/server')
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const ai = new GoogleGenAI({ apiKey })

    const prompt = `You are a German language expert. Extract all unique German vocabulary words from the text below.

RULES:
1. Return ONLY a JSON array of strings — no markdown, no code fences, no explanation.
2. Return each word in its base/dictionary form (singular nouns, infinitive verbs, positive adjectives).
3. Skip: articles (der/die/das/ein/eine/einem/einer/eines/einen), prepositions (in/auf/an/mit/zu/von/nach/für/über/unter/vor/aus/um/bei/durch/gegen/ohne/zwischen), conjunctions (und/oder/aber/denn/weil/dass/wenn/ob/als/sondern/noch/doch), pronouns (ich/du/er/sie/es/wir/ihr/man/sich/mich/dich/uns/euch/ihm/ihn/ihnen/mein/dein/sein/ihr/unser/euer), auxiliary/modal verbs (sein/haben/werden/können/müssen/sollen/wollen/dürfen/mögen), common adverbs (nicht/auch/sehr/schon/noch/immer/hier/dort/dann/jetzt/nur).
4. Deduplicate — each word appears once.
5. If a word appears conjugated/declined, return its base form only.

Text:
${text}

Response (JSON array of strings only):`

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      })

      const raw = response.text ?? ''
      const cleaned = raw
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim()

      const extracted = JSON.parse(cleaned) as string[]

      const [libraryResult, bufferResult] = await Promise.all([
        supabase.from('words').select('german_word').eq('user_id', user.id),
        supabase.from('word_buffer').select('german_word').eq('user_id', user.id),
      ])

      const libraryWords = new Set(
        (libraryResult.data ?? []).map((w) => w.german_word.toLowerCase()),
      )
      const bufferWords = new Set(
        (bufferResult.data ?? []).map((w) => w.german_word.toLowerCase()),
      )

      const words: ExtractedWord[] = extracted.map((word) => {
        const lower = word.toLowerCase()
        if (libraryWords.has(lower)) return { word, status: 'inLibrary' as const }
        if (bufferWords.has(lower)) return { word, status: 'inBuffer' as const }
        return { word, status: 'new' as const }
      })

      return { words }
    } catch (error) {
      console.error('Word extraction failed:', error)
      throw new Error('Failed to extract words from text')
    }
  })
