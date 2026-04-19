import { redirect } from '@tanstack/react-router'

import { fetchUser } from '#/lib/supabase/fetch-user-server-fn'

export async function requireAnonymous() {
  const user = await fetchUser()
  if (user) {
    throw redirect({ to: '/' })
  }
}
