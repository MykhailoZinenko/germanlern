import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { useWordStore } from '#/store/word-store'

import { verifyBufferWords, type VerifiedWord } from './verify-server-fn'

export function useVerifyWords() {
  const setVerifyStep = useWordStore((s) => s.setVerifyStep)
  const setReviewIndex = useWordStore((s) => s.setReviewIndex)

  const mutation = useMutation({
    mutationFn: () => verifyBufferWords(),
    onSuccess: (data) => {
      if (data.length === 0) {
        toast.info('No words to verify')
        setVerifyStep('idle')
        return
      }
      setReviewIndex(0)
      setVerifyStep('review')
    },
    onError: (error) => {
      toast.error(`Verification failed: ${error.message}`)
      setVerifyStep('idle')
    },
  })

  return {
    ...mutation,
    verifiedWords: mutation.data ?? [],
  }
}

export type { VerifiedWord }
