import { createFileRoute } from '@tanstack/react-router'
import { BookOpen } from 'lucide-react'

import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia } from '#/components/ui/empty'

export const Route = createFileRoute('/_protected/words/')({
  component: WordLibrary,
})

function WordLibrary() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon"><BookOpen /></EmptyMedia>
        <EmptyTitle>Word Library</EmptyTitle>
        <EmptyDescription>Your vocabulary collection is coming soon.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
