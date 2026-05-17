export type ExerciseType =
  | 'single_choice'
  | 'multi_choice'
  | 'translation'
  | 'reverse_translation'
  | 'matching'

export type QualityScore = 0 | 1 | 2 | 3 | 4 | 5

export interface Sm2Word {
  id: string
  easiness_factor: number
  interval_days: number
  review_count: number
  next_review_date: string | null
  last_reviewed: string | null
}

export interface Sm2Update {
  easiness_factor: number
  interval_days: number
  review_count: number
  next_review_date: string
  last_reviewed: string
}

const EF_MINIMUM = 1.3
const EF_DEFAULT = 2.5

export function calculateEf(currentEf: number, q: QualityScore): number {
  const ef = currentEf + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  return Math.max(EF_MINIMUM, Math.round(ef * 100) / 100)
}

export function calculateInterval(
  previousInterval: number,
  ef: number,
  q: QualityScore,
  reviewCount: number
): number {
  if (q < 3) return 1

  if (reviewCount <= 1) return 1
  if (reviewCount === 2) return 6
  return Math.round(previousInterval * ef)
}

export function computeSm2Update(word: Sm2Word, q: QualityScore, today?: Date): Sm2Update {
  const now = today ?? new Date()
  const currentEf = word.easiness_factor ?? EF_DEFAULT
  const currentInterval = word.interval_days ?? 0
  const reviewCount = (word.review_count ?? 0) + 1

  const newEf = calculateEf(currentEf, q)
  const newInterval = calculateInterval(currentInterval, newEf, q, reviewCount)

  const nextReview = new Date(now)
  nextReview.setDate(nextReview.getDate() + newInterval)

  return {
    easiness_factor: newEf,
    interval_days: newInterval,
    review_count: reviewCount,
    next_review_date: nextReview.toISOString().split('T')[0],
    last_reviewed: now.toISOString().split('T')[0],
  }
}

export function scoreTyping(isCorrect: boolean, isFuzzyMatch: boolean): QualityScore {
  if (isCorrect) return 5
  if (isFuzzyMatch) return 3
  return 1
}

export function scoreChoice(isCorrect: boolean): QualityScore {
  return isCorrect ? 4 : 1
}

export function scoreMultipleChoice(jaccard: number): QualityScore {
  if (jaccard >= 1.0) return 4
  if (jaccard >= 0.6) return 3
  if (jaccard >= 0.3) return 2
  return 1
}

export function calculateJaccard(correct: Set<string>, selected: Set<string>): number {
  const intersection = new Set([...correct].filter((x) => selected.has(x)))
  const union = new Set([...correct, ...selected])
  if (union.size === 0) return 0
  return intersection.size / union.size
}

export function scoreExercise(
  type: ExerciseType,
  params: { isCorrect?: boolean; isFuzzyMatch?: boolean; jaccard?: number }
): QualityScore {
  switch (type) {
    case 'translation':
    case 'reverse_translation':
      return scoreTyping(params.isCorrect ?? false, params.isFuzzyMatch ?? false)
    case 'single_choice':
    case 'matching':
      return scoreChoice(params.isCorrect ?? false)
    case 'multi_choice':
      return scoreMultipleChoice(params.jaccard ?? 0)
  }
}

export function levenshtein(a: string, b: string): number {
  const m = a.length
  const n = b.length
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0))

  for (let i = 0; i <= m; i++) dp[i][0] = i
  for (let j = 0; j <= n; j++) dp[0][j] = j

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
    }
  }

  return dp[m][n]
}

export function isFuzzyMatch(input: string, expected: string, threshold = 2): boolean {
  const a = input.trim().toLowerCase()
  const b = expected.trim().toLowerCase()
  if (a === b) return false
  return levenshtein(a, b) <= threshold
}

export interface QueueWord extends Sm2Word {
  german_word: string
  word_type?: string | null
}

export function buildStudyQueue(words: QueueWord[], maxNewWords = 7): QueueWord[] {
  const todayStr = new Date().toISOString().split('T')[0]

  const dueWords: QueueWord[] = []
  const newWords: QueueWord[] = []
  const notYetDue: QueueWord[] = []

  for (const word of words) {
    if ((word.review_count ?? 0) === 0) {
      newWords.push(word)
    } else if (word.next_review_date) {
      if (word.next_review_date <= todayStr) {
        dueWords.push(word)
      } else {
        notYetDue.push(word)
      }
    } else {
      dueWords.push(word)
    }
  }

  dueWords.sort((a, b) => (a.easiness_factor ?? EF_DEFAULT) - (b.easiness_factor ?? EF_DEFAULT))

  const queue: QueueWord[] = [...dueWords]

  const newToAdd = newWords.slice(0, maxNewWords)
  queue.push(...newToAdd)

  if (queue.length === 0) {
    notYetDue.sort((a, b) => (a.easiness_factor ?? EF_DEFAULT) - (b.easiness_factor ?? EF_DEFAULT))
    queue.push(...notYetDue.slice(0, 10))
  }

  return queue
}

export function selectExerciseType(word: QueueWord): ExerciseType {
  const reviewCount = word.review_count ?? 0
  const ef = word.easiness_factor ?? EF_DEFAULT

  if (reviewCount === 0) {
    return Math.random() < 0.5 ? 'single_choice' : 'multi_choice'
  }

  if (reviewCount <= 2) {
    const r = Math.random()
    if (r < 0.4) return 'multi_choice'
    if (r < 0.8) return 'matching'
    return 'single_choice'
  }

  if (ef >= 2.5 && reviewCount >= 5) {
    return 'single_choice'
  }

  const r = Math.random()
  if (r < 0.4) return 'translation'
  if (r < 0.8) return 'reverse_translation'
  return 'matching'
}
