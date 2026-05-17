import { create } from 'zustand'

import type { StudyQueueWord } from '#/features/study/api/study-server-fns'

interface StudySession {
  mode: 'auto' | 'by_tag'
  tagFilter?: string[]
  words: StudyQueueWord[]
  queue: string[]
}

interface StudyState {
  session: StudySession | null
  currentIndex: number
  results: SessionResult[]
  streak: number

  startSession: (session: StudySession) => void
  recordResult: (result: SessionResult) => void
  nextWord: () => void
  endSession: () => void
}

export interface SessionResult {
  wordId: string
  exerciseType: string
  qualityScore: number
  wasCorrect: boolean
}

export const useStudyStore = create<StudyState>((set) => ({
  session: null,
  currentIndex: 0,
  results: [],
  streak: 0,

  startSession: (session) =>
    set({ session, currentIndex: 0, results: [], streak: 0 }),

  recordResult: (result) =>
    set((state) => ({
      results: [...state.results, result],
      streak: result.wasCorrect ? state.streak + 1 : 0,
    })),

  nextWord: () =>
    set((state) => ({ currentIndex: state.currentIndex + 1 })),

  endSession: () =>
    set({ session: null, currentIndex: 0, results: [], streak: 0 }),
}))
