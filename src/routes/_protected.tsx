import { createFileRoute, redirect } from '@tanstack/react-router'

import { fetchUser } from '#/lib/supabase/fetch-user-server-fn'
import { AppShell } from '#/features/shell/app-shell'

export const Route = createFileRoute('/_protected')({
  beforeLoad: async () => {
    const user = await fetchUser()

    if (!user) {
      throw redirect({ to: '/login' })
    }

    return {
      user,
    }
  },
  component: AppShell,
})
