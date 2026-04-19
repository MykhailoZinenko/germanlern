import { createFileRoute } from '@tanstack/react-router'
import { FileText } from 'lucide-react'

import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia } from '#/components/ui/empty'

export const Route = createFileRoute('/_protected/documents/')({
  component: DocumentLibrary,
})

function DocumentLibrary() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon"><FileText /></EmptyMedia>
        <EmptyTitle>Documents</EmptyTitle>
        <EmptyDescription>Document management is coming soon.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
