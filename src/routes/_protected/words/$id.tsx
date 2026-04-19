import { createFileRoute } from '@tanstack/react-router'
import { BookOpen } from 'lucide-react'

import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia } from '#/components/ui/empty'

export const Route = createFileRoute('/_protected/words/$id')({
  component: WordDetail,
})

function WordDetail() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon"><BookOpen /></EmptyMedia>
        <EmptyTitle>Word Detail</EmptyTitle>
        <EmptyDescription>Word details are coming soon.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
