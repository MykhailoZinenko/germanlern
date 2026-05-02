import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { BookOpen } from 'lucide-react'

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '#/components/ui/empty'
import { Skeleton } from '#/components/ui/skeleton'
import { useIsMobile } from '#/hooks/use-mobile'
import { useWords } from '#/features/words/api/use-words'
import type { WordFilters } from '#/features/words/api/words-server-fns'
import { LibSearch } from '#/features/words/components/lib-search'
import { WordCardItem } from '#/features/words/components/word-card'
import { WordDetailPanel } from '#/features/words/components/word-detail-panel'
import { WordRowItem } from '#/features/words/components/word-row'

export const Route = createFileRoute('/_protected/words/')({
  component: WordLibrary,
})

function WordLibrary() {
  const [view, setView] = useState<'list' | 'grid'>('list')
  const [filters, setFilters] = useState<WordFilters>({})
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const isMobile = useIsMobile()
  const navigate = useNavigate()

  const { data: words, isLoading } = useWords(filters)
  const selectedWord = words?.find((w) => w.id === selectedId)

  const handleWordClick = (id: string) => {
    if (isMobile) {
      navigate({ to: '/words/$id', params: { id } })
    } else {
      setSelectedId(id === selectedId ? null : id)
    }
  }

  const wordCount = words?.length ?? 0
  const inSplitMode = !!selectedId && !isMobile

  return (
    <div className={`-m-[var(--space-4)] flex h-[calc(100vh-var(--shell-topbar-h-mobile)-var(--shell-bottomnav-h))] lg:-m-[var(--space-5)] lg:h-[calc(100vh-var(--shell-topbar-h))] ${inSplitMode ? '-mt-[calc(var(--space-5)+var(--shell-topbar-h))] flex-row lg:h-[calc(100vh)]' : 'flex-col'}`}>
      {/* Left panel: full width normally, 440px in split mode */}
      <div className={`flex flex-col overflow-hidden ${inSplitMode ? 'w-[var(--wl-detail-list-w)] shrink-0' : 'flex-1'}`}>
        <LibSearch
          filters={filters}
          onFiltersChange={setFilters}
          wordCount={wordCount}
          view={view}
          onViewChange={setView}
          compact={inSplitMode}
        />

        {isLoading ? (
          <WordListSkeleton view={inSplitMode ? 'list' : view} />
        ) : !words || words.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <BookOpen />
                </EmptyMedia>
                <EmptyTitle>No words yet</EmptyTitle>
                <EmptyDescription>
                  Add your first word to get started.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </div>
        ) : inSplitMode ? (
          <div className="flex-1 overflow-y-auto">
            {view === 'list' ? (
              words.map((w) => (
                <WordRowItem
                  key={w.id}
                  word={w}
                  selected={w.id === selectedId}
                  compact
                  onClick={() => handleWordClick(w.id)}
                />
              ))
            ) : (
              <div className="grid grid-cols-2 gap-1.5 p-2.5">
                {words.map((w) => (
                  <WordCardItem
                    key={w.id}
                    word={w}
                    selected={w.id === selectedId}
                    compact
                    onClick={() => handleWordClick(w.id)}
                  />
                ))}
              </div>
            )}
          </div>
        ) : view === 'list' ? (
          <div className="flex-1 overflow-y-auto">
            {words.map((w) => (
              <WordRowItem
                key={w.id}
                word={w}
                selected={w.id === selectedId}
                onClick={() => handleWordClick(w.id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-3 lg:px-8 lg:py-5">
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-[repeat(auto-fill,minmax(var(--wl-card-min-w),1fr))] lg:gap-4">
              {words.map((w) => (
                <WordCardItem
                  key={w.id}
                  word={w}
                  selected={w.id === selectedId}
                  onClick={() => handleWordClick(w.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {inSplitMode && (
        <WordDetailPanel word={selectedWord} isLoading={!selectedWord && !!selectedId} />
      )}
    </div>
  )
}

function WordListSkeleton({ view }: { view: 'list' | 'grid' }) {
  if (view === 'list') {
    return (
      <div className="flex-1 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-2 border-b border-[var(--border-subtle)] px-4 py-2 lg:gap-4 lg:px-8 lg:py-4"
          >
            <Skeleton className="size-2 rounded-full lg:size-3.5" />
            <Skeleton className="h-4 w-24 lg:h-6 lg:w-40" />
            <Skeleton className="h-4 w-10 lg:h-5 lg:w-14" />
            <Skeleton className="h-4 flex-1 lg:h-5" />
            <Skeleton className="h-5 w-12 rounded-full lg:h-7 lg:w-16" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-hidden p-3 lg:px-8 lg:py-5">
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-[repeat(auto-fill,minmax(var(--wl-card-min-w),1fr))] lg:gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-subtle)] lg:rounded-[var(--radius-2xl)]"
          >
            <Skeleton className="h-[var(--wl-card-strip-h)] w-full lg:h-1" />
            <div className="space-y-2 p-2.5 lg:space-y-3 lg:px-5 lg:py-4">
              <Skeleton className="h-4 w-20 lg:h-6 lg:w-28" />
              <Skeleton className="h-4 w-12 lg:h-5 lg:w-16" />
              <Skeleton className="h-4 w-16 lg:h-5 lg:w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
