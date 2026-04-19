import { createFileRoute } from '@tanstack/react-router'
import { LayoutDashboard } from 'lucide-react'

import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia } from '#/components/ui/empty'

export const Route = createFileRoute('/_protected/')({
  component: Dashboard,
})

function Dashboard() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon"><LayoutDashboard /></EmptyMedia>
        <EmptyTitle>Dashboard</EmptyTitle>
        <EmptyDescription>Your daily summary is coming soon.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
