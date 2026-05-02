import type { WordRow } from '#/features/words/api/words-server-fns'

export type WordStage = 'planted' | 'growing' | 'almost' | 'mastered'

export const STAGE_CONFIG: Record<
  WordStage,
  { label: string; emoji: string; tokenPrefix: string }
> = {
  planted: { label: 'Just Planted', emoji: '\uD83C\uDF31', tokenPrefix: 'planted' },
  growing: { label: 'Still Growing', emoji: '\uD83D\uDD04', tokenPrefix: 'growing' },
  almost: { label: 'Almost There', emoji: '\uD83D\uDCAA', tokenPrefix: 'almost' },
  mastered: { label: 'Mastered', emoji: '\u2B50', tokenPrefix: 'mastered' },
}

export function getWordStage(word: WordRow): WordStage {
  const reviewCount = word.review_count ?? 0
  const ef = word.easiness_factor ?? 2.5

  if (reviewCount === 0) return 'planted'
  if (ef >= 2.5 && reviewCount >= 5) return 'mastered'
  if (ef >= 2.0) return 'almost'
  return 'growing'
}

export function getDueLabel(nextReviewDate: string | null): string | null {
  if (!nextReviewDate) return null

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const due = new Date(nextReviewDate)
  due.setHours(0, 0, 0, 0)

  const diffMs = due.getTime() - today.getTime()
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays <= 0) return 'today'
  if (diffDays === 1) return '1d'
  return `${diffDays}d`
}
