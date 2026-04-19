import { createFileRoute } from '@tanstack/react-router'
import { BookText } from 'lucide-react'

import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia } from '#/components/ui/empty'

export const Route = createFileRoute('/_protected/read/')({
  component: ReadingLibrary,
})

function ReadingLibrary() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon"><BookText /></EmptyMedia>
        <EmptyTitle>Reading Library</EmptyTitle>
        <EmptyDescription>Reading texts are coming soon.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
