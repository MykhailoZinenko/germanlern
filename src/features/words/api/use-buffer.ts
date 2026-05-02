import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { useWordStore } from '#/store/word-store'

import {
  addBufferWord,
  addBufferWordsBatch,
  clearBuffer,
  deleteBufferWord,
  fetchBufferWords,
} from './buffer-server-fns'

export function useBufferWords() {
  const setBufferCount = useWordStore((s) => s.setBufferCount)

  return useQuery({
    queryKey: ['buffer-words'],
    queryFn: () => fetchBufferWords(),
    select: (data) => {
      setBufferCount(data.length)
      return data
    },
  })
}

export function useAddBufferWord() {
  const queryClient = useQueryClient()
  const incrementBufferCount = useWordStore((s) => s.incrementBufferCount)

  return useMutation({
    mutationFn: (input: {
      germanWord: string
      translation?: string
      notes?: string
      customSentence?: string
      rawUserTags?: string[]
    }) => addBufferWord({ data: input }),
    onSuccess: () => {
      incrementBufferCount()
      queryClient.invalidateQueries({ queryKey: ['buffer-words'] })
      toast.success('Word added to buffer')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}

export function useAddBufferWordsBatch() {
  const queryClient = useQueryClient()
  const incrementBufferCount = useWordStore((s) => s.incrementBufferCount)

  return useMutation({
    mutationFn: (words: string[]) => addBufferWordsBatch({ data: { words } }),
    onSuccess: (_data, words) => {
      const count = words.filter((w) => w.trim()).length
      incrementBufferCount(count)
      queryClient.invalidateQueries({ queryKey: ['buffer-words'] })
      toast.success(`${count} word${count !== 1 ? 's' : ''} added to buffer`)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}

export function useDeleteBufferWord() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteBufferWord({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['buffer-words'] })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}

export function useClearBuffer() {
  const queryClient = useQueryClient()
  const setBufferCount = useWordStore((s) => s.setBufferCount)

  return useMutation({
    mutationFn: () => clearBuffer(),
    onSuccess: () => {
      setBufferCount(0)
      queryClient.invalidateQueries({ queryKey: ['buffer-words'] })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}
