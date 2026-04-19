import { createFileRoute } from '@tanstack/react-router'
import { GraduationCap } from 'lucide-react'

import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia } from '#/components/ui/empty'

export const Route = createFileRoute('/_protected/study/')({
  component: StudyConfigure,
})

function StudyConfigure() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon"><GraduationCap /></EmptyMedia>
        <EmptyTitle>Study</EmptyTitle>
        <EmptyDescription>Study sessions are coming soon.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
