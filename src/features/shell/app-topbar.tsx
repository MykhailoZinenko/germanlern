import { useMatches, useNavigate } from '@tanstack/react-router'
import { ArrowLeft, Plus } from 'lucide-react'

import { Button } from '#/components/ui/button'
import { useIsMobile } from '#/hooks/use-mobile'
import { useWordStore } from '#/store/word-store'

const ROUTE_TITLES: Record<string, string> = {
  '/_protected/': 'GermanLern',
  '/_protected/words/': 'Word Library',
  '/_protected/study/': 'Study',
  '/_protected/study/session': 'Study Session',
  '/_protected/read/': 'Read',
  '/_protected/documents/': 'Documents',
  '/_protected/settings': 'Settings',
  '/_protected/profile': 'Profile',
}

export function AppTopbar() {
  const setAddOpen = useWordStore((s) => s.setAddOpen)
  const matches = useMatches()
  const lastMatch = matches[matches.length - 1]
  const routeId = lastMatch?.routeId ?? ''
  const title = ROUTE_TITLES[routeId] ?? 'GermanLern'
  const isMobile = useIsMobile()
  const navigate = useNavigate()

  const isWordDetail = routeId === '/_protected/words/$id'

  if (isMobile && isWordDetail) {
    return (
      <header className="flex h-[var(--shell-topbar-h-mobile)] shrink-0 items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-[var(--space-4)]">
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-[var(--text-secondary)]"
          onClick={() => navigate({ to: '/words' })}
        >
          <ArrowLeft className="size-3.5" />
          Library
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-[var(--text-secondary)]"
        >
          Edit
        </Button>
      </header>
    )
  }

  return (
    <header className="flex h-[var(--shell-topbar-h-mobile)] shrink-0 items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-[var(--space-4)] lg:h-[var(--shell-topbar-h)] lg:px-[var(--space-8)]">
      <span className="text-sm font-medium text-[var(--text-primary)] lg:text-xl">
        {title}
      </span>
      <Button
        id="btn-add-words"
        size="sm"
        className="lg:h-[var(--shell-topbar-btn-h)] lg:w-[var(--shell-topbar-btn-w)] lg:rounded-xl lg:text-lg"
        onClick={() => setAddOpen(true)}
      >
        <Plus className="size-4 lg:size-5" />
        Add words
      </Button>
    </header>
  )
}
