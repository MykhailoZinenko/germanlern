import { create } from 'zustand'

type ActiveTab = 'type' | 'scan' | 'paste'
type VerifyStep = 'idle' | 'loading' | 'review' | 'done'

interface WordStore {
  addOpen: boolean
  setAddOpen: (open: boolean) => void

  activeTab: ActiveTab
  setActiveTab: (tab: ActiveTab) => void

  bufferCount: number
  setBufferCount: (n: number) => void
  incrementBufferCount: (by?: number) => void

  verifyOverlayOpen: boolean
  setVerifyOverlayOpen: (open: boolean) => void

  verifyStep: VerifyStep
  setVerifyStep: (step: VerifyStep) => void

  reviewIndex: number
  setReviewIndex: (i: number) => void

  mobileSearchOpen: boolean
  setMobileSearchOpen: (open: boolean) => void

  reset: () => void
}

export const useWordStore = create<WordStore>((set) => ({
  addOpen: false,
  setAddOpen: (open) => set({ addOpen: open }),

  activeTab: 'type',
  setActiveTab: (tab) => set({ activeTab: tab }),

  bufferCount: 0,
  setBufferCount: (n) => set({ bufferCount: n }),
  incrementBufferCount: (by = 1) =>
    set((state) => ({ bufferCount: state.bufferCount + by })),

  verifyOverlayOpen: false,
  setVerifyOverlayOpen: (open) => set({ verifyOverlayOpen: open }),

  verifyStep: 'idle',
  setVerifyStep: (step) => set({ verifyStep: step }),

  reviewIndex: 0,
  setReviewIndex: (i) => set({ reviewIndex: i }),

  mobileSearchOpen: false,
  setMobileSearchOpen: (open) => set({ mobileSearchOpen: open }),

  reset: () =>
    set({
      addOpen: false,
      activeTab: 'type',
      verifyOverlayOpen: false,
      verifyStep: 'idle',
      reviewIndex: 0,
      mobileSearchOpen: false,
    }),
}))
