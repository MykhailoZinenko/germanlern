import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import {
  deleteWord,
  fetchWordById,
  fetchWords,
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
