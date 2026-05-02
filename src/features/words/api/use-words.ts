import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import {
  deleteWord,
  fetchWordById,
  fetchWords,
  markWordAsLeech,
  resetWordProgress,
  updateWord,
  type WordFilters,
} from './words-server-fns'

export function useWords(filters: WordFilters = {}) {
  return useQuery({
    queryKey: ['words', filters],
    queryFn: () => fetchWords({ data: filters }),
  })
}

export function useWord(id: string) {
  return useQuery({
    queryKey: ['words', id],
    queryFn: () => fetchWordById({ data: { id } }),
    enabled: !!id,
  })
}

export function useDeleteWord() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteWord({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['words'] })
      toast.success('Word deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}

export function useResetWordProgress() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => resetWordProgress({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['words'] })
      toast.success('Progress reset to Just Planted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}

export function useMarkWordAsLeech() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => markWordAsLeech({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['words'] })
      toast.success('Word flagged as leech')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}

export function useUpdateWord() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: {
      id: string
      german_word?: string
      translation?: string
      alt_translations?: string[]
      notes?: string | null
      custom_sentence?: string | null
    }) => updateWord({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['words'] })
      toast.success('Word updated')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}
