import { createServerFn } from '@tanstack/react-start'

export type DictionaryResult = {
  found: boolean
  source: 'dwds' | 'wiktionary' | 'not_found' | 'api_error'
  wordType?: string
  gender?: string
  pluralForm?: string
  englishTranslation?: string
}

async function lookupDWDS(word: string): Promise<DictionaryResult | null> {
  try {
    const url = `https://www.dwds.de/api/wb/snippet?q=${encodeURIComponent(word)}`
    const res = await fetch(url)
    if (!res.ok) return null

    const data = await res.json()
    if (!Array.isArray(data) || data.length === 0) return null

    const preferred = ['verb', 'substantiv', 'adjektiv', 'adverb']
    const entry = data.find((e: Record<string, unknown>) => {
      const wt = (e.wortart as string)?.toLowerCase() ?? ''
      return preferred.some((p) => wt.includes(p))
    }) ?? data[0]
    const rawType = (entry.wortart as string)?.toLowerCase()
    const normalizedType = normalizeWordType(rawType)

    return {
      found: true,
      source: 'dwds',
      wordType: normalizedType,
    }
  } catch {
    return null
  }
}

async function lookupWiktionary(word: string): Promise<DictionaryResult | null> {
  try {
    const url = `https://en.wiktionary.org/api/rest_v1/page/definition/${encodeURIComponent(word)}`
    const res = await fetch(url)
    if (!res.ok) return null

    const data = await res.json()
    const germanSection = data?.de
    if (!Array.isArray(germanSection) || germanSection.length === 0) return null

    const entry = germanSection[0]
    const partOfSpeech = entry.partOfSpeech?.toLowerCase() as string | undefined
    const normalizedType = normalizeWordType(partOfSpeech)

    let englishTranslation: string | undefined

    const definitions = entry.definitions as Array<{ definition?: string }> | undefined
    if (definitions?.[0]?.definition) {
      const defText = definitions[0].definition as string
      const cleaned = defText
        .replace(/<[^>]*>/g, '')
        .replace(/\(.*?\)/g, '')
        .trim()
      if (cleaned && cleaned.length < 100) {
        englishTranslation = cleaned
      }
    }

    return {
      found: true,
      source: 'wiktionary',
      wordType: normalizedType,
      englishTranslation,
    }
  } catch {
    return null
  }
}

function normalizeWordType(raw?: string): string | undefined {
  if (!raw) return undefined
  const lower = raw.toLowerCase()
  if (lower.includes('verb')) return 'verb'
  if (lower.includes('substantiv') || lower === 'noun') return 'noun'
  if (lower.includes('adjektiv') || lower === 'adjective') return 'adjective'
  if (lower.includes('adverb') || lower === 'adv') return 'adverb'
  const exact: Record<string, string> = {
    präposition: 'other',
    preposition: 'other',
    konjunktion: 'other',
    conjunction: 'other',
    pronomen: 'other',
    pronoun: 'other',
    partikel: 'other',
    particle: 'other',
    interjektion: 'other',
    interjection: 'other',
  }
  return exact[lower] ?? 'other'
}

export const lookupWord = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => input as { word: string })
  .handler(async (ctx): Promise<DictionaryResult> => {
    const dwds = await lookupDWDS(ctx.data.word)
    if (dwds) return dwds

    const wikt = await lookupWiktionary(ctx.data.word)
    if (wikt) return wikt

    return { found: false, source: 'not_found' }
  })
