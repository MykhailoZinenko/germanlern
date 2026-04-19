import { Plus } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '#/components/ui/button'

export function AppTopbar({ title = 'GermanLern' }: { title?: string }) {
  return (
    <header className="flex h-12 shrink-0 items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-4 md:px-5">
      <span className="text-xs font-medium text-[var(--text-primary)] md:text-sm">
        {title}
      </span>
      <Button
        id="btn-add-words"
        size="sm"
        onClick={() => toast('Coming soon')}
      >
        <Plus className="size-4" />
        Add words
      </Button>
    </header>
  )
}
