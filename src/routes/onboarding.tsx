import { createFileRoute, redirect } from '@tanstack/react-router'
import { Sparkles } from 'lucide-react'

import { fetchUser } from '#/lib/supabase/fetch-user-server-fn'
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia } from '#/components/ui/empty'

export const Route = createFileRoute('/onboarding')({
  beforeLoad: async () => {
    const user = await fetchUser()
    if (!user) {
      throw redirect({ to: '/register' })
    }
    return { user }
  },
  component: Onboarding,
})

function Onboarding() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon"><Sparkles /></EmptyMedia>
          <EmptyTitle>Meet Your Companion</EmptyTitle>
          <EmptyDescription>The companion introduction is coming soon.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  )
}
