import { Plus } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '#/components/ui/button'
import { SidebarTrigger } from '#/components/ui/sidebar'

export function AppTopbar() {
  return (
    <header className="flex items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--surface-raised)] px-4 py-2">
      <SidebarTrigger />
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
