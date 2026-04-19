import { Plus } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '#/components/ui/button'

export function AppTopbar({ title = 'GermanLern' }: { title?: string }) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-[var(--space-4)] md:px-[var(--space-5)]">
      <span className="text-sm font-medium text-[var(--text-primary)]">
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
