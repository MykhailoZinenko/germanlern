import { useQuery } from '@tanstack/react-query'

import { fetchDueCount, fetchStudyQueue } from './study-server-fns'

export function useDueCount() {
  return useQuery({
    queryKey: ['study', 'due-count'],
    queryFn: () => fetchDueCount(),
    staleTime: 60_000,
  })
}

export function useStudyQueue(mode: 'auto' | 'by_tag', tagFilter?: string[]) {
  return useQuery({
    queryKey: ['study', 'queue', mode, tagFilter],
    queryFn: () => fetchStudyQueue({ data: { mode, tagFilter } }),
    enabled: false,
  })
}
