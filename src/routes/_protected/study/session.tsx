import { createFileRoute } from '@tanstack/react-router'
import { GraduationCap } from 'lucide-react'

import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia } from '#/components/ui/empty'

export const Route = createFileRoute('/_protected/study/session')({
  component: StudySession,
})

function StudySession() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon"><GraduationCap /></EmptyMedia>
        <EmptyTitle>Study Session</EmptyTitle>
        <EmptyDescription>Active study sessions are coming soon.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
