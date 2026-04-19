import { Plus } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '#/components/ui/button'

export function AppTopbar({ title = 'GermanLern' }: { title?: string }) {
  return (
    <header className="flex h-[var(--shell-topbar-h-mobile)] shrink-0 items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-[var(--space-4)] md:h-[var(--shell-topbar-h)] md:px-[var(--space-8)]">
      <span className="text-sm font-medium text-[var(--text-primary)] md:text-xl">
        {title}
      </span>
      <Button
        id="btn-add-words"
        size="sm"
        className="md:h-[var(--shell-topbar-btn-h)] md:w-[var(--shell-topbar-btn-w)] md:rounded-xl md:text-lg"
        onClick={() => toast('Coming soon')}
      >
        <Plus className="size-4 md:size-5" />
        Add words
      </Button>
    </header>
  )
}
