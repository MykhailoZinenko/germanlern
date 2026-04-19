import { Plus } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '#/components/ui/button'

export function AppTopbar({ title = 'GermanLern' }: { title?: string }) {
  return (
    <header className="flex h-[var(--shell-topbar-h-mobile)] shrink-0 items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-[var(--space-4)] lg:h-[var(--shell-topbar-h)] lg:px-[var(--space-8)]">
      <span className="text-sm font-medium text-[var(--text-primary)] lg:text-xl">
        {title}
      </span>
      <Button
        id="btn-add-words"
        size="sm"
        className="lg:h-[var(--shell-topbar-btn-h)] lg:w-[var(--shell-topbar-btn-w)] lg:rounded-xl lg:text-lg"
        onClick={() => toast('Coming soon')}
      >
        <Plus className="size-4 lg:size-5" />
        Add words
      </Button>
    </header>
  )
}
