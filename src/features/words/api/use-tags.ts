import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { createTag, fetchUserTags } from './tags-server-fns'

export function useUserTags() {
  return useQuery({
    queryKey: ['user-tags'],
    queryFn: () => fetchUserTags(),
  })
}

export function useCreateTag() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (name: string) => createTag({ data: { name } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-tags'] })
    },
  })
}
