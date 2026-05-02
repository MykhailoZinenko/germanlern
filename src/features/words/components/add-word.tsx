import { useEffect } from 'react'

import { useIsMobile } from '#/hooks/use-mobile'
import { useBufferWords } from '#/features/words/api/use-buffer'
import { useWordStore } from '#/store/word-store'

import { AddWordDialog } from './add-word-dialog'
import { AddWordDrawer } from './add-word-drawer'
import { VerifyOverlay } from './verify-overlay'

export function AddWord() {
  const isMobile = useIsMobile()
  const { data: bufferWords } = useBufferWords()
  const addOpen = useWordStore((s) => s.addOpen)
  const setVerifyOverlayOpen = useWordStore((s) => s.setVerifyOverlayOpen)
  const setBufferCount = useWordStore((s) => s.setBufferCount)
  const verifyStep = useWordStore((s) => s.verifyStep)

  useEffect(() => {
    if (bufferWords && bufferWords.length > 0 && verifyStep === 'idle' && !addOpen) {
      setBufferCount(bufferWords.length)
      setVerifyOverlayOpen(true)
    }
  }, [bufferWords, verifyStep, addOpen, setBufferCount, setVerifyOverlayOpen])

  return (
    <>
      {isMobile ? <AddWordDrawer /> : <AddWordDialog />}
      <VerifyOverlay />
    </>
  )
}
