import { useMatches, useNavigate } from '@tanstack/react-router'
import { ArrowLeft, Plus, Search } from 'lucide-react'

import { Button } from '#/components/ui/button'
import { useWordStore } from '#/store/word-store'

const ROUTE_TITLES: Record<string, string> = {
  '/_protected/': 'GermanLern',
  '/_protected/words/': 'Your words',
  '/_protected/study/': 'Study',
  '/_protected/study/session': 'Study Session',
  '/_protected/read/': 'Read',
  '/_protected/documents/': 'Documents',
  '/_protected/settings': 'Settings',
  '/_protected/profile': 'Profile',
}

export function AppTopbar() {
  const setAddOpen = useWordStore((s) => s.setAddOpen)
  const setMobileSearchOpen = useWordStore((s) => s.setMobileSearchOpen)
  const mobileSearchOpen = useWordStore((s) => s.mobileSearchOpen)
  const matches = useMatches()
  const lastMatch = matches[matches.length - 1]
  const routeId = lastMatch?.routeId ?? ''
  const title = ROUTE_TITLES[routeId] ?? 'GermanLern'
  const navigate = useNavigate()

  const isWordDetail = routeId === '/_protected/words/$id'
  const isWordLibrary = routeId === '/_protected/words/'

  if (isWordDetail) {
    return (
      <>
        {/* Mobile detail topbar */}
        <header className="sticky top-0 z-20 flex h-[var(--shell-topbar-h-mobile)] shrink-0 items-center gap-3 border-b border-[var(--border-subtle)] bg-[var(--surface-raised)] px-[var(--shell-page-pad-x-mobile)] lg:hidden">
          <Button
            variant="ghost"
            className="h-10 w-10 rounded-[var(--radius-md)] p-0"
            onClick={() => navigate({ to: '/words' })}
          >
            <ArrowLeft className="size-5 text-[var(--text-secondary)]" />
          </Button>
          <div className="min-w-0 flex-1">
            <h1 className="font-heading text-xl font-semibold text-[var(--text-primary)]">
              Word
            </h1>
          </div>
        </header>
        {/* Desktop detail topbar */}
        <header className="sticky top-0 z-20 hidden h-[var(--shell-topbar-h)] shrink-0 items-center gap-4 border-b border-[var(--border-subtle)] bg-[var(--surface-raised)] px-[var(--shell-page-pad-x)] lg:flex">
          <div className="min-w-0 flex-1">
            <h1 className="font-heading text-2xl font-semibold text-[var(--text-primary)]">
              {title}
            </h1>
          </div>
          <Button
            id="btn-add-words"
            className="h-10 gap-2 rounded-[var(--radius-md)] px-4 text-sm font-medium"
            onClick={() => setAddOpen(true)}
          >
            <Plus className="size-4" />
            Add words
          </Button>
        </header>
      </>
    )
  }

  if (isWordLibrary && mobileSearchOpen) {
    return (
      <header className="sticky top-0 z-20 hidden h-[var(--shell-topbar-h)] shrink-0 items-center gap-4 border-b border-[var(--border-subtle)] bg-[var(--surface-raised)] px-[var(--shell-page-pad-x)] lg:flex">
        <div className="min-w-0 flex-1">
          <h1 className="font-heading text-2xl font-semibold text-[var(--text-primary)]">
            {title}
          </h1>
        </div>
        <Button
          id="btn-add-words"
          className="h-10 gap-2 rounded-[var(--radius-md)] px-4 text-sm font-medium"
          onClick={() => setAddOpen(true)}
        >
          <Plus className="size-4" />
          Add words
        </Button>
      </header>
    )
  }

  return (
    <>
      {/* Mobile topbar */}
      <header className="sticky top-0 z-20 flex h-[var(--shell-topbar-h-mobile)] shrink-0 items-center gap-3 border-b border-[var(--border-subtle)] bg-[var(--surface-raised)] px-[var(--shell-page-pad-x-mobile)] lg:hidden">
        <div className="min-w-0 flex-1">
          <h1 className="font-heading text-xl font-semibold text-[var(--text-primary)]">
            {isWordLibrary ? 'Words' : title}
          </h1>
        </div>
        {isWordLibrary && (
          <>
            <Button
              variant="ghost"
              className="h-10 w-10 rounded-[var(--radius-md)] p-0"
              onClick={() => setMobileSearchOpen(true)}
            >
              <Search className="size-5 text-[var(--text-secondary)]" />
            </Button>
            <Button
              variant="ghost"
              className="h-10 w-10 rounded-[var(--radius-md)] p-0"
              onClick={() => setAddOpen(true)}
            >
              <Plus className="size-5 text-[var(--text-secondary)]" />
            </Button>
          </>
        )}
      </header>
      {/* Desktop topbar */}
      <header className="sticky top-0 z-20 hidden h-[var(--shell-topbar-h)] shrink-0 items-center gap-4 border-b border-[var(--border-subtle)] bg-[var(--surface-raised)] px-[var(--shell-page-pad-x)] lg:flex">
        <div className="min-w-0 flex-1">
          <h1 className="font-heading text-2xl font-semibold text-[var(--text-primary)]">
            {title}
          </h1>
        </div>
        <Button
          id="btn-add-words"
          className="h-10 gap-2 rounded-[var(--radius-md)] px-4 text-sm font-medium"
          onClick={() => setAddOpen(true)}
        >
          <Plus className="size-4" />
          Add words
        </Button>
      </header>
    </>
  )
}
