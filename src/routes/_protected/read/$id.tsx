import { createFileRoute } from '@tanstack/react-router'
import { BookText } from 'lucide-react'

import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia } from '#/components/ui/empty'

export const Route = createFileRoute('/_protected/read/$id')({
  component: ReadingText,
})

function ReadingText() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon"><BookText /></EmptyMedia>
        <EmptyTitle>Reading Text</EmptyTitle>
        <EmptyDescription>The reader is coming soon.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
