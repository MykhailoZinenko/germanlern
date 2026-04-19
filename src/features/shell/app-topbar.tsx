import { Plus } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '#/components/ui/button'

export function AppTopbar({ title = 'GermanLern' }: { title?: string }) {
  return (
    <header className="flex h-12 shrink-0 items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-[var(--space-4)] md:h-[84px] md:px-[var(--space-5)]">
      <span className="text-sm font-medium text-[var(--text-primary)] md:text-xl">
        {title}
      </span>
      <Button
        id="btn-add-words"
        size="sm"
        className="md:h-10 md:px-6 md:text-base"
        onClick={() => toast('Coming soon')}
      >
        <Plus className="size-4" />
        Add words
      </Button>
    </header>
  )
}
