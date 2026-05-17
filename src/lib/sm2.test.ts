import { describe, it, expect } from 'vitest'
import {
  calculateEf,
  calculateInterval,
  computeSm2Update,
  scoreTyping,
  scoreChoice,
  scoreMultipleChoice,
  calculateJaccard,
  scoreExercise,
  buildStudyQueue,
  levenshtein,
  isFuzzyMatch,
  type QueueWord,
  type Sm2Word,
} from './sm2'

describe('calculateEf', () => {
  it('increases EF with perfect score (q=5)', () => {
    expect(calculateEf(2.5, 5)).toBe(2.6)
  })

  it('keeps EF unchanged with q=4', () => {
    expect(calculateEf(2.5, 4)).toBe(2.5)
  })

  it('decreases EF with q=3', () => {
    expect(calculateEf(2.5, 3)).toBe(2.36)
  })

  it('decreases EF significantly with q=0', () => {
    expect(calculateEf(2.5, 0)).toBe(1.7)
  })

  it('never goes below 1.3', () => {
    expect(calculateEf(1.3, 0)).toBe(1.3)
    expect(calculateEf(1.5, 1)).toBe(1.3)
  })
})

describe('calculateInterval', () => {
  it('resets to 1 when q < 3', () => {
    expect(calculateInterval(10, 2.5, 2, 5)).toBe(1)
    expect(calculateInterval(10, 2.5, 0, 5)).toBe(1)
  })

  it('returns 1 for first review', () => {
    expect(calculateInterval(0, 2.5, 5, 1)).toBe(1)
  })

  it('returns 6 for second review', () => {
    expect(calculateInterval(1, 2.5, 5, 2)).toBe(6)
  })

  it('multiplies interval by EF for subsequent reviews', () => {
    expect(calculateInterval(6, 2.5, 5, 3)).toBe(15)
    expect(calculateInterval(15, 2.5, 4, 4)).toBe(38)
  })
})

describe('computeSm2Update', () => {
  const baseWord: Sm2Word = {
    id: 'test-1',
    easiness_factor: 2.5,
    interval_days: 6,
    review_count: 2,
    next_review_date: '2026-05-15',
    last_reviewed: '2026-05-09',
  }

  it('produces correct update for perfect answer', () => {
    const today = new Date('2026-05-17')
    const result = computeSm2Update(baseWord, 5, today)

    expect(result.easiness_factor).toBe(2.6)
    expect(result.review_count).toBe(3)
    expect(result.interval_days).toBe(16)
    expect(result.next_review_date).toBe('2026-06-02')
    expect(result.last_reviewed).toBe('2026-05-17')
  })

  it('resets interval on failure', () => {
    const today = new Date('2026-05-17')
    const result = computeSm2Update(baseWord, 1, today)

    expect(result.interval_days).toBe(1)
    expect(result.next_review_date).toBe('2026-05-18')
  })

  it('handles brand new word (defaults)', () => {
    const newWord: Sm2Word = {
      id: 'new-1',
      easiness_factor: 2.5,
      interval_days: 0,
      review_count: 0,
      next_review_date: null,
      last_reviewed: null,
    }
    const today = new Date('2026-05-17')
    const result = computeSm2Update(newWord, 4, today)

    expect(result.review_count).toBe(1)
    expect(result.interval_days).toBe(1)
    expect(result.easiness_factor).toBe(2.5)
  })
})

describe('scoreTyping', () => {
  it('returns 5 for correct', () => {
    expect(scoreTyping(true, false)).toBe(5)
  })

  it('returns 3 for fuzzy match', () => {
    expect(scoreTyping(false, true)).toBe(3)
  })

  it('returns 1 for wrong', () => {
    expect(scoreTyping(false, false)).toBe(1)
  })
})

describe('scoreChoice', () => {
  it('returns 4 for correct', () => {
    expect(scoreChoice(true)).toBe(4)
  })

  it('returns 1 for wrong', () => {
    expect(scoreChoice(false)).toBe(1)
  })
})

describe('scoreMultipleChoice', () => {
  it('returns 4 for perfect jaccard', () => {
    expect(scoreMultipleChoice(1.0)).toBe(4)
  })

  it('returns 3 for jaccard >= 0.6', () => {
    expect(scoreMultipleChoice(0.6)).toBe(3)
    expect(scoreMultipleChoice(0.8)).toBe(3)
  })

  it('returns 2 for jaccard >= 0.3', () => {
    expect(scoreMultipleChoice(0.3)).toBe(2)
    expect(scoreMultipleChoice(0.5)).toBe(2)
  })

  it('returns 1 for jaccard < 0.3', () => {
    expect(scoreMultipleChoice(0.1)).toBe(1)
    expect(scoreMultipleChoice(0)).toBe(1)
  })
})

describe('calculateJaccard', () => {
  it('returns 1 for identical sets', () => {
    expect(calculateJaccard(new Set(['a', 'b']), new Set(['a', 'b']))).toBe(1)
  })

  it('returns 0 for disjoint sets', () => {
    expect(calculateJaccard(new Set(['a', 'b']), new Set(['c', 'd']))).toBe(0)
  })

  it('calculates partial overlap', () => {
    expect(calculateJaccard(new Set(['a', 'b', 'c']), new Set(['a', 'b']))).toBeCloseTo(2 / 3)
  })

  it('handles empty sets', () => {
    expect(calculateJaccard(new Set(), new Set())).toBe(0)
  })
})

describe('scoreExercise', () => {
  it('routes translation to typing scorer', () => {
    expect(scoreExercise('translation', { isCorrect: true })).toBe(5)
    expect(scoreExercise('reverse_translation', { isFuzzyMatch: true })).toBe(3)
  })

  it('routes single_choice to choice scorer', () => {
    expect(scoreExercise('single_choice', { isCorrect: true })).toBe(4)
    expect(scoreExercise('matching', { isCorrect: false })).toBe(1)
  })

  it('routes multi_choice to jaccard scorer', () => {
    expect(scoreExercise('multi_choice', { jaccard: 0.7 })).toBe(3)
  })
})

describe('levenshtein', () => {
  it('returns 0 for identical strings', () => {
    expect(levenshtein('hund', 'hund')).toBe(0)
  })

  it('returns length for empty vs non-empty', () => {
    expect(levenshtein('', 'abc')).toBe(3)
    expect(levenshtein('abc', '')).toBe(3)
  })

  it('counts single substitution', () => {
    expect(levenshtein('katze', 'katza')).toBe(1)
  })

  it('counts insertion and deletion', () => {
    expect(levenshtein('hund', 'hundt')).toBe(1)
    expect(levenshtein('hundt', 'hund')).toBe(1)
  })
})

describe('isFuzzyMatch', () => {
  it('returns false for exact match', () => {
    expect(isFuzzyMatch('Hund', 'hund')).toBe(false)
  })

  it('returns true for minor typo within threshold', () => {
    expect(isFuzzyMatch('hundt', 'hund')).toBe(true)
    expect(isFuzzyMatch('katza', 'katze')).toBe(true)
  })

  it('returns false for large differences', () => {
    expect(isFuzzyMatch('completely', 'different')).toBe(false)
  })
})

describe('buildStudyQueue', () => {
  const todayStr = new Date().toISOString().split('T')[0]

  function offsetDate(base: string, days: number): string {
    const [y, m, d] = base.split('-').map(Number)
    const date = new Date(Date.UTC(y, m - 1, d + days))
    return date.toISOString().split('T')[0]
  }

  const yesterdayStr = offsetDate(todayStr, -1)
  const tomorrowStr = offsetDate(todayStr, 1)

  const makeWord = (overrides: Partial<QueueWord>): QueueWord => ({
    id: 'w-1',
    german_word: 'test',
    easiness_factor: 2.5,
    interval_days: 1,
    review_count: 1,
    next_review_date: yesterdayStr,
    last_reviewed: null,
    ...overrides,
  })

  it('prioritizes due words sorted by lowest EF', () => {
    const words: QueueWord[] = [
      makeWord({ id: 'a', easiness_factor: 2.5, next_review_date: yesterdayStr }),
      makeWord({ id: 'b', easiness_factor: 1.5, next_review_date: yesterdayStr }),
      makeWord({ id: 'c', easiness_factor: 2.0, next_review_date: yesterdayStr }),
    ]
    const queue = buildStudyQueue(words)
    expect(queue.map((w) => w.id)).toEqual(['b', 'c', 'a'])
  })

  it('adds new words after due words (max 7)', () => {
    const dueWord = makeWord({ id: 'due-1' })
    const newWords = Array.from({ length: 10 }, (_, i) =>
      makeWord({ id: `new-${i}`, review_count: 0, next_review_date: null })
    )
    const queue = buildStudyQueue([dueWord, ...newWords])
    expect(queue.length).toBe(8) // 1 due + 7 new
    expect(queue[0].id).toBe('due-1')
  })

  it('falls back to not-yet-due words when nothing else available', () => {
    const futureWords = Array.from({ length: 15 }, (_, i) =>
      makeWord({
        id: `future-${i}`,
        easiness_factor: 2.0 + i * 0.1,
        next_review_date: tomorrowStr,
      })
    )
    const queue = buildStudyQueue(futureWords)
    expect(queue.length).toBe(10)
    expect(queue[0].id).toBe('future-0')
  })

  it('returns empty array when no words exist', () => {
    expect(buildStudyQueue([])).toEqual([])
  })
})
