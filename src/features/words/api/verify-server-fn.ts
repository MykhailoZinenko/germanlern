import { createServerFn } from '@tanstack/react-start'

import { createClient } from '#/lib/supabase/server'

import { lookupWord, type DictionaryResult } from './dictionary-server-fns'
import { enrichWords, normalizeWords, type AiEnrichment } from './gemini-server-fns'

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

    const t0 = Date.now()

    const [{ data: bufferWords, error }, { data: existingWords }] = await Promise.all([
      supabase
        .from('word_buffer')
        .select('*')
        .order('created_at', { ascending: true }),
      supabase
        .from('words')
        .select('german_word')
        .eq('user_id', user.id),
    ])

    if (error) throw new Error(error.message)
    if (!bufferWords || bufferWords.length === 0) {
      throw new Error('No words to verify')
    }

    console.log(`[verify] Starting verification of ${bufferWords.length} buffer words`)

    // Step 1: Normalize all buffer words to base/dictionary form
    const rawWords = bufferWords.map((bw) => bw.german_word)
    console.log(`[verify] Step 1: Normalizing ${rawWords.length} words...`)
    const tNorm = Date.now()
    const { words: normalized } = await normalizeWords({
      data: { words: rawWords },
    })
    console.log(`[verify] Step 1 done in ${Date.now() - tNorm}ms — normalized ${normalized.length} words`)

    const normalizedMap = new Map<string, string>()
    for (let i = 0; i < bufferWords.length; i++) {
      const base = normalized[i]?.base ?? bufferWords[i].german_word
      normalizedMap.set(bufferWords[i].id, base)
    }

    // Step 2: Deduplicate — group buffer entries by normalized base form
    const seen = new Map<string, typeof bufferWords[0]>()
    const duplicateIds: string[] = []
    for (const bw of bufferWords) {
      const base = normalizedMap.get(bw.id) ?? bw.german_word
      const key = base.toLowerCase()
      if (seen.has(key)) {
        duplicateIds.push(bw.id)
      } else {
        seen.set(key, bw)
      }
    }

    const librarySet = new Set(
      (existingWords ?? []).map((w) => w.german_word.toLowerCase()),
    )

    const dedupedEntries: Array<{ buffer: typeof bufferWords[0]; baseForm: string }> = []
    const libraryDuplicateIds: string[] = []
    for (const [key, bw] of seen) {
      if (librarySet.has(key)) {
        libraryDuplicateIds.push(bw.id)
      } else {
        dedupedEntries.push({ buffer: bw, baseForm: normalizedMap.get(bw.id) ?? bw.german_word })
      }
    }

    // Delete duplicates from buffer
    const allDuplicateIds = [...duplicateIds, ...libraryDuplicateIds]
    if (allDuplicateIds.length > 0) {
      await supabase
        .from('word_buffer')
        .delete()
        .in('id', allDuplicateIds)
    }

    if (dedupedEntries.length === 0) {
      throw new Error('All words are duplicates or already in your library')
    }

    console.log(`[verify] Step 2: Dedup — ${bufferWords.length} → ${dedupedEntries.length} unique (removed ${duplicateIds.length} dupes, ${libraryDuplicateIds.length} already in library)`)

    // Step 3: Dictionary lookup on normalized base forms
    console.log(`[verify] Step 3: Dictionary lookup for ${dedupedEntries.length} words...`)
    const tDict = Date.now()
    const dictionaryResults = await Promise.all(
      dedupedEntries.map((entry) =>
        lookupWord({ data: { word: entry.baseForm } }).catch(
          (): DictionaryResult => ({
            found: false,
            source: 'api_error',
          }),
        ),
      ),
    )

    console.log(`[verify] Step 3 done in ${Date.now() - tDict}ms`)

    // Step 4: AI enrichment on normalized base forms
    console.log(`[verify] Step 4: AI enrichment for ${dedupedEntries.length} words...`)
    const tAi = Date.now()
    let aiResults: AiEnrichment[]
    try {
      aiResults = await enrichWords({
        data: {
          words: dedupedEntries.map((entry, i) => ({
            germanWord: entry.baseForm,
            translation: entry.buffer.translation ?? undefined,
            dictionaryResult: dictionaryResults[i],
          })),
        },
      })
    } catch {
      aiResults = dedupedEntries.map(() => ({}))
    }
    console.log(`[verify] Step 4 done in ${Date.now() - tAi}ms`)
    console.log(`[verify] Total verification time: ${Date.now() - t0}ms`)

    return dedupedEntries.map((entry, i) => {
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
        bufferId: entry.buffer.id,
        germanWord: entry.baseForm,
        userTranslation: entry.buffer.translation ?? undefined,
        userNotes: entry.buffer.notes ?? undefined,
        userCustomSentence: entry.buffer.custom_sentence ?? undefined,
        userRawTags: entry.buffer.raw_user_tags ?? undefined,
        dictionaryResult: dict,
        aiEnrichment: ai,
        verificationSource,
      }
    })
  },
)
