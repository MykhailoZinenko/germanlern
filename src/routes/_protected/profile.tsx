import { createFileRoute } from '@tanstack/react-router'
import { User } from 'lucide-react'

import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia } from '#/components/ui/empty'

export const Route = createFileRoute('/_protected/profile')({
  component: ProfilePage,
})

function ProfilePage() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon"><User /></EmptyMedia>
        <EmptyTitle>Profile</EmptyTitle>
        <EmptyDescription>Profile management is coming soon.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
