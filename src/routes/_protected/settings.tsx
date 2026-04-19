import { createFileRoute } from '@tanstack/react-router'
import { Settings } from 'lucide-react'

import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia } from '#/components/ui/empty'

export const Route = createFileRoute('/_protected/settings')({
  component: SettingsPage,
})

function SettingsPage() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon"><Settings /></EmptyMedia>
        <EmptyTitle>Settings</EmptyTitle>
        <EmptyDescription>Settings are coming soon.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
