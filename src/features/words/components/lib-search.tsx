import { useEffect, useRef } from 'react'
import { Check, Filter, LayoutGrid, List, Search, SlidersHorizontal, X } from 'lucide-react'

import { Button } from '#/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import { Input } from '#/components/ui/input'
import { ToggleGroup, ToggleGroupItem } from '#/components/ui/toggle-group'
import { useWordStore } from '#/store/word-store'
import type { WordFilters } from '#/features/words/api/words-server-fns'

const STAGES = [
  { value: '', label: 'All', emoji: '' },
  { value: 'planted', label: 'Planted', emoji: '🌱' },
  { value: 'growing', label: 'Growing', emoji: '🔄' },
  { value: 'almost', label: 'Almost', emoji: '💪' },
  { value: 'mastered', label: 'Mastered', emoji: '⭐' },
]

const MOBILE_STAGE_DEFS = [
  { value: 'planted', dot: 'bg-[var(--stage-planted-dot)]' },
  { value: 'growing', dot: 'bg-[var(--stage-growing-dot)]' },
  { value: 'almost', dot: 'bg-[var(--stage-almost-dot)]' },
  { value: 'mastered', dot: 'bg-[var(--stage-mastered-dot)]' },
]

export type StageCounts = Record<string, number>

const SORT_LABELS: Record<string, string> = {
  date_added: 'Date added',
  alpha: 'A → Z',
  stage: 'Stage',
  last_reviewed: 'Last reviewed',
  next_review: 'Next review',
}

const WORD_TYPES = [
  { value: 'noun', label: 'Noun' },
  { value: 'verb', label: 'Verb' },
  { value: 'adjective', label: 'Adjective' },
  { value: 'adverb', label: 'Adverb' },
  { value: 'other', label: 'Other' },
]

function ViewToggle({
  view,
  onViewChange,
}: {
  view: 'list' | 'grid'
  onViewChange: (v: 'list' | 'grid') => void
}) {
  return (
    <ToggleGroup
      type="single"
      value={view}
      onValueChange={(v) => {
        if (v) onViewChange(v as 'list' | 'grid')
      }}
      className="gap-0 rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-1"
    >
      <ToggleGroupItem
        value="list"
        size="sm"
        className="h-8 gap-2 rounded-[var(--radius-sm)] px-3 text-sm data-[state=on]:border data-[state=on]:border-[var(--border-subtle)] data-[state=on]:bg-[var(--surface-raised)] data-[state=on]:text-[var(--text-primary)] data-[state=on]:shadow-none"
      >
        <List className="size-4" />
        List
      </ToggleGroupItem>
      <ToggleGroupItem
        value="grid"
        size="sm"
        className="h-8 gap-2 rounded-[var(--radius-sm)] px-3 text-sm data-[state=on]:border data-[state=on]:border-[var(--border-subtle)] data-[state=on]:bg-[var(--surface-raised)] data-[state=on]:text-[var(--text-primary)] data-[state=on]:shadow-none"
      >
        <LayoutGrid className="size-4" />
        Cards
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

export function LibSearch({
  filters,
  onFiltersChange,
  wordCount,
  stageCounts,
  view,
  onViewChange,
  compact,
}: {
  filters: WordFilters
  onFiltersChange: (filters: WordFilters) => void
  wordCount: number
  stageCounts?: StageCounts
  view: 'list' | 'grid'
  onViewChange: (v: 'list' | 'grid') => void
  compact?: boolean
}) {
  const mobileSearchOpen = useWordStore((s) => s.mobileSearchOpen)
  const setMobileSearchOpen = useWordStore((s) => s.setMobileSearchOpen)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (mobileSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [mobileSearchOpen])

  const handleCancelSearch = () => {
    onFiltersChange({ ...filters, search: undefined })
    setMobileSearchOpen(false)
  }

  if (compact) {
    return (
      <div className="shrink-0 border-b border-[var(--border-subtle)] p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-muted)]" />
          <Input
            placeholder="Search…"
            value={filters.search ?? ''}
            onChange={(e) =>
              onFiltersChange({ ...filters, search: e.target.value || undefined })
            }
            className="h-10 rounded-[var(--radius-md)] border-[var(--border-subtle)] bg-[var(--surface-raised)] pl-10 text-base"
          />
        </div>
      </div>
    )
  }

  return (
    <>
      {/* ── Mobile ── */}
      <div className="sticky top-0 z-10 shrink-0 bg-[var(--surface-raised)] lg:hidden">
        {mobileSearchOpen && (
          <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] px-4 py-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-muted)]" />
              <Input
                ref={searchInputRef}
                placeholder="Search…"
                value={filters.search ?? ''}
                onChange={(e) =>
                  onFiltersChange({ ...filters, search: e.target.value || undefined })
                }
                className="h-10 rounded-[var(--radius-md)] border-[var(--border-subtle)] bg-[var(--surface-raised)] pl-10 pr-9 text-base"
              />
              {filters.search && (
                <button
                  onClick={() => onFiltersChange({ ...filters, search: undefined })}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="size-4 text-[var(--text-muted)]" />
                </button>
              )}
            </div>
            <button
              onClick={handleCancelSearch}
              className="shrink-0 text-sm font-medium text-[var(--action-bg)]"
            >
              Cancel
            </button>
          </div>
        )}
        <div className="flex gap-2 overflow-x-auto border-b border-[var(--border-subtle)] px-4 py-3">
          {mobileSearchOpen && (
            <span className="inline-flex h-8 shrink-0 items-center rounded-full border border-[var(--border-strong)] bg-[var(--surface-sunken)] px-3 text-sm text-[var(--text-primary)]">
              All stages
            </span>
          )}
          {MOBILE_STAGE_DEFS.map((s) => (
            <button
              key={s.value}
              onClick={() =>
                onFiltersChange({
                  ...filters,
                  stage: filters.stage === s.value ? undefined : s.value,
                })
              }
              className={`inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border px-3 text-sm ${
                filters.stage === s.value
                  ? 'border-[var(--border-strong)] bg-[var(--surface-sunken)] text-[var(--text-primary)]'
                  : 'border-[var(--border-subtle)] text-[var(--text-secondary)]'
              }`}
            >
              <span className={`inline-block size-2.5 rounded-full ${s.dot}`} />
              <span>{stageCounts?.[s.value] ?? 0}</span>
            </button>
          ))}
        </div>
        {mobileSearchOpen && filters.search && (
          <div className="border-b border-[var(--border-subtle)] px-4 py-2">
            <span className="text-xs text-[var(--text-muted)]">
              {wordCount} result{wordCount !== 1 ? 's' : ''} for &ldquo;{filters.search}&rdquo;
            </span>
          </div>
        )}
      </div>

      {/* ── Desktop ── */}
      <div className="sticky top-0 z-10 hidden shrink-0 bg-[var(--surface-raised)] lg:block">
        <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] px-8 py-4">
          <div className="relative" style={{ width: 320 }}>
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-muted)]" />
            <Input
              placeholder="Search German or Indonesian…"
              value={filters.search ?? ''}
              onChange={(e) =>
                onFiltersChange({ ...filters, search: e.target.value || undefined })
              }
              className="h-10 rounded-[var(--radius-md)] border-[var(--border-subtle)] bg-[var(--surface-raised)] pl-10 text-base"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={`h-10 gap-2 rounded-[var(--radius-md)] border-[var(--action-secondary-border)] px-4 text-sm font-medium text-[var(--text-secondary)] ${filters.wordType ? 'bg-[var(--surface-sunken)]' : ''}`}
              >
                <Filter className="size-4" />
                Filters{filters.wordType ? ` · ${filters.wordType}` : ''}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-[200px]">
              <DropdownMenuLabel>Word type</DropdownMenuLabel>
              {WORD_TYPES.map((wt) => (
                <DropdownMenuItem
                  key={wt.value}
                  onClick={() =>
                    onFiltersChange({
                      ...filters,
                      wordType: filters.wordType === wt.value ? undefined : wt.value,
                    })
                  }
                  className={filters.wordType === wt.value ? 'font-medium' : ''}
                >
                  {wt.label}
                  {filters.wordType === wt.value && <Check className="ml-auto size-4" />}
                </DropdownMenuItem>
              ))}
              {filters.wordType && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => onFiltersChange({ ...filters, wordType: undefined })}
                    className="text-[var(--text-muted)]"
                  >
                    Clear filter
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-10 gap-2 rounded-[var(--radius-md)] px-4 text-sm font-medium text-[var(--text-secondary)]"
              >
                <SlidersHorizontal className="size-4" />
                Sort: {SORT_LABELS[filters.sort ?? 'date_added']}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {Object.entries(SORT_LABELS).map(([value, label]) => (
                <DropdownMenuItem
                  key={value}
                  onClick={() =>
                    onFiltersChange({ ...filters, sort: value as WordFilters['sort'] })
                  }
                  className={
                    filters.sort === value || (!filters.sort && value === 'date_added')
                      ? 'font-medium'
                      : ''
                  }
                >
                  {label}
                  {(filters.sort === value || (!filters.sort && value === 'date_added')) && (
                    <Check className="ml-auto size-4" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex-1" />
          <span className="text-sm text-[var(--text-muted)]">
            {wordCount} word{wordCount !== 1 ? 's' : ''}
          </span>
          <ViewToggle view={view} onViewChange={onViewChange} />
        </div>
        <div className="flex gap-2 border-b border-[var(--border-subtle)] px-8 py-3">
          {STAGES.map((s) => {
            const active = (filters.stage ?? '') === s.value
            return (
              <button
                key={s.value}
                onClick={() =>
                  onFiltersChange({ ...filters, stage: s.value || undefined })
                }
                className={`inline-flex h-8 items-center rounded-full border px-3 text-sm ${
                  active
                    ? 'border-[var(--border-strong)] bg-[var(--surface-sunken)] text-[var(--text-primary)]'
                    : 'border-[var(--border-subtle)] text-[var(--text-secondary)]'
                }`}
              >
                {s.emoji && <span className="mr-1">{s.emoji}</span>}
                {s.label}
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}
