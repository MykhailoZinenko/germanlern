import { createFileRoute } from '@tanstack/react-router'
import { FileText } from 'lucide-react'

import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia } from '#/components/ui/empty'

export const Route = createFileRoute('/_protected/documents/$id')({
  component: DocumentReader,
})

function DocumentReader() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon"><FileText /></EmptyMedia>
        <EmptyTitle>Document</EmptyTitle>
        <EmptyDescription>The document reader is coming soon.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
