import { useCallback, useEffect, useRef, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { useWordStore } from '#/store/word-store'
import { useBufferWords } from '#/features/words/api/use-buffer'
import { useVerifyWords } from '#/features/words/api/use-verify'
import { saveVerifiedWords } from '#/features/words/api/save-words-server-fn'
import type { VerifiedWord } from '#/features/words/api/verify-server-fn'

import { VerifyDone } from './verify-done'
import { VerifyLoading } from './verify-loading'
import { VerifyReview } from './verify-review'

export function VerifyFlow() {
  const verifyStep = useWordStore((s) => s.verifyStep)
  const setVerifyStep = useWordStore((s) => s.setVerifyStep)
  const setBufferCount = useWordStore((s) => s.setBufferCount)
  const queryClient = useQueryClient()

  const { data: bufferWords } = useBufferWords()
  const verify = useVerifyWords()
  const hasStarted = useRef(false)
  const [doneCount, setDoneCount] = useState(0)

  useEffect(() => {
    if (verifyStep === 'loading' && !hasStarted.current) {
      hasStarted.current = true
      verify.mutate()
    }
    if (verifyStep === 'idle') {
      hasStarted.current = false
    }
  }, [verifyStep, verify])

  const saveMutation = useMutation({
    mutationFn: (words: VerifiedWord[]) =>
      saveVerifiedWords({
        data: {
          words: words.map((w) => ({
            ...w,
            finalGermanWord: w.germanWord,
            finalTranslation:
              w.aiEnrichment.suggestedTranslation || w.userTranslation || '',
            finalAiTags: [
              ...new Set([
                ...(w.aiEnrichment.aiTags ?? []),
                ...(w.userRawTags ?? []),
              ]),
            ],
          })),
        },
      }),
    onSuccess: async (result) => {
      if (result.skippedDuplicates.length > 0) {
        toast.info(`Skipped ${result.skippedDuplicates.length} duplicate${result.skippedDuplicates.length !== 1 ? 's' : ''}: ${result.skippedDuplicates.join(', ')}`)
      }
      if (result.saved > 0) {
        toast.success(`${result.saved} word${result.saved !== 1 ? 's' : ''} added to your library`)
      }
      setBufferCount(0)
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['buffer-words'] }),
        queryClient.invalidateQueries({ queryKey: ['words'] }),
      ])
      setDoneCount(result.saved)
      setVerifyStep('done')
    },
    onError: (error) => {
      toast.error(`Failed to save words: ${error.message}`)
      setVerifyStep('idle')
    },
  })

  const handleReviewFinish = useCallback(
    (finalWords: VerifiedWord[]) => {
      saveMutation.mutate(finalWords)
    },
    [saveMutation],
  )

  const handleDoneComplete = useCallback(() => {
    setVerifyStep('idle')
  }, [setVerifyStep])

  if (verifyStep === 'idle') return null

  const bufferWordNames = (bufferWords ?? []).map((bw) => bw.german_word)
  const isSaving = saveMutation.isPending

  return (
    <div className="absolute inset-0 z-40 flex flex-col bg-[var(--surface-page)]">
      {verifyStep === 'loading' && (
        <VerifyLoading
          total={bufferWordNames.length}
          processed={verify.isSuccess ? bufferWordNames.length : 0}
          wordStatuses={bufferWordNames.map((word) => ({
            word,
            done: verify.isSuccess,
          }))}
        />
      )}
      {verifyStep === 'review' && verify.verifiedWords.length > 0 && (
        <VerifyReview
          verifiedWords={verify.verifiedWords}
          onFinish={handleReviewFinish}
          isSaving={isSaving}
        />
      )}
      {verifyStep === 'done' && (
        <VerifyDone
          count={doneCount}
          onComplete={handleDoneComplete}
        />
      )}
    </div>
  )
}
