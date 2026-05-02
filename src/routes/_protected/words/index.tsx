import { useMemo, useState } from 'react'
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
import { getWordStage } from '#/features/words/utils/stage'
import { LibSearch, type StageCounts } from '#/features/words/components/lib-search'
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

  const { data: allWords } = useWords({})
  const { data: words, isLoading } = useWords(filters)
  const selectedWord = words?.find((w) => w.id === selectedId)

  const stageCounts = useMemo<StageCounts>(() => {
    if (!allWords) return {}
    const counts: StageCounts = { planted: 0, growing: 0, almost: 0, mastered: 0 }
    for (const w of allWords) {
      counts[getWordStage(w)]++
    }
    return counts
  }, [allWords])

  const handleWordClick = (id: string) => {
    if (isMobile) {
      navigate({ to: '/words/$id', params: { id } })
    } else {
      setSelectedId(id === selectedId ? null : id)
    }
  }

  const wordCount = words?.length ?? 0
  const inSplitMode = !!selectedId && !isMobile
  const railWidth = view === 'list' ? 'var(--wl-detail-list-w)' : 'var(--wl-detail-cards-w)'

  return (
    <div
      className={`-m-[var(--shell-page-pad-x-mobile)] flex h-[calc(100dvh-var(--shell-topbar-h-mobile)-var(--shell-bottomnav-h))] flex-col lg:-m-[var(--shell-page-pad-x)] lg:h-[calc(100dvh-var(--shell-topbar-h))] ${
        inSplitMode ? 'flex-row' : ''
      }`}
    >
      <div
        className={`flex min-h-0 min-w-0 flex-col ${
          inSplitMode ? 'shrink-0' : 'flex-1'
        }`}
        style={inSplitMode ? { width: railWidth } : undefined}
      >
        <LibSearch
          filters={filters}
          onFiltersChange={setFilters}
          wordCount={wordCount}
          stageCounts={stageCounts}
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
              <div className="grid grid-cols-2 gap-3 p-4" style={{ alignContent: 'start' }}>
                {words.map((w) => (
                  <WordCardItem
                    key={w.id}
                    word={w}
                    selected={w.id === selectedId}
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
          <div className="flex-1 overflow-y-auto px-8 py-5">
            <div
              className="grid gap-4"
              style={{
                gridTemplateColumns: `repeat(auto-fill, minmax(var(--wl-card-min-w), 1fr))`,
              }}
            >
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
            className="flex items-center gap-4 border-b border-[var(--border-subtle)] px-8 py-4"
          >
            <Skeleton className="size-[var(--wl-stage-dot)] rounded-full" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-10" />
            <Skeleton className="h-5 flex-1" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-hidden px-8 py-5">
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: `repeat(auto-fill, minmax(var(--wl-card-min-w), 1fr))`,
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border-subtle)]"
          >
            <Skeleton className="h-[var(--wl-card-strip-h)] w-full" />
            <div className="flex flex-col gap-3 p-5">
              <div className="flex gap-2">
                <Skeleton className="h-6 w-10 rounded-full" />
                <Skeleton className="h-6 w-14 rounded-full" />
              </div>
              <Skeleton className="h-6 w-28" />
              <Skeleton className="h-5 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
