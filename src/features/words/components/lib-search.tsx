import { LayoutGrid, List, Search } from 'lucide-react'

import { Input } from '#/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select'
import { ToggleGroup, ToggleGroupItem } from '#/components/ui/toggle-group'
import { useIsMobile } from '#/hooks/use-mobile'
import type { WordFilters } from '#/features/words/api/words-server-fns'

const STAGES = [
  { value: '', label: 'All stages' },
  { value: 'planted', label: 'Just Planted' },
  { value: 'growing', label: 'Still Growing' },
  { value: 'almost', label: 'Almost There' },
  { value: 'mastered', label: 'Mastered' },
]

const WORD_TYPES = [
  { value: '', label: 'All types' },
  { value: 'noun', label: 'Noun' },
  { value: 'verb', label: 'Verb' },
  { value: 'adjective', label: 'Adjective' },
  { value: 'adverb', label: 'Adverb' },
  { value: 'other', label: 'Other' },
]

const SORT_OPTIONS = [
  { value: 'alpha', label: 'A \u2192 Z' },
  { value: 'date_added', label: 'Date added' },
  { value: 'next_review', label: 'Next review' },
  { value: 'last_reviewed', label: 'Last reviewed' },
]

function ViewToggle({
  view,
  onViewChange,
  compact,
}: {
  view: 'list' | 'grid'
  onViewChange: (v: 'list' | 'grid') => void
  compact?: boolean
}) {
  return (
    <ToggleGroup
      type="single"
      value={view}
      spacing={1}
      onValueChange={(v) => {
        if (v) onViewChange(v as 'list' | 'grid')
      }}
      className={
        compact
          ? 'h-[var(--wl-search-h-desktop)] gap-0 rounded-[var(--radius-xl)] border border-[var(--border-medium)] bg-[var(--surface-page)] p-1.5'
          : 'gap-0 rounded-[var(--radius-lg)] border border-[var(--border-subtle)] p-0.5 lg:rounded-[var(--radius-xl)] lg:p-1'
      }
    >
      <ToggleGroupItem
        value="list"
        size="sm"
        className={
          compact
            ? 'h-full w-12 rounded-[var(--radius-lg)] px-0 shadow-none'
            : 'h-7 w-8 rounded-[var(--radius-md)] px-0 shadow-none lg:h-10 lg:w-12 lg:rounded-[var(--radius-lg)]'
        }
      >
        <List className={compact ? 'size-5' : 'size-3.5 lg:size-5'} />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="grid"
        size="sm"
        className={
          compact
            ? 'h-full w-12 rounded-[var(--radius-lg)] px-0 shadow-none'
            : 'h-7 w-8 rounded-[var(--radius-md)] px-0 shadow-none lg:h-10 lg:w-12 lg:rounded-[var(--radius-lg)]'
        }
      >
        <LayoutGrid className={compact ? 'size-5' : 'size-3.5 lg:size-5'} />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

const ALL_VALUE = '__all__'

function FilterSelect({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: Array<{ value: string; label: string }>
  value: string
  onChange: (v: string) => void
}) {
  return (
    <Select
      value={value || ALL_VALUE}
      onValueChange={(v) => onChange(v === ALL_VALUE ? '' : v)}
    >
      <SelectTrigger className="h-7 shrink-0 gap-1 rounded-md border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-2 text-[10px] text-[var(--text-muted)] lg:h-10 lg:rounded-[var(--radius-lg)] lg:px-4 lg:text-sm">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent align="start">
        {options.map((opt) => (
          <SelectItem key={opt.value || ALL_VALUE} value={opt.value || ALL_VALUE}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export function LibSearch({
  filters,
  onFiltersChange,
  wordCount,
  view,
  onViewChange,
  compact,
}: {
  filters: WordFilters
  onFiltersChange: (filters: WordFilters) => void
  wordCount: number
  view: 'list' | 'grid'
  onViewChange: (v: 'list' | 'grid') => void
  compact?: boolean
}) {
  const isMobile = useIsMobile()

  if (compact) {
    return (
      <div className="flex h-[var(--shell-topbar-h)] shrink-0 items-center gap-3 border-b border-[var(--border-subtle)] bg-[var(--surface-page)] px-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-faint)]" />
          <Input
            placeholder="Search..."
            value={filters.search ?? ''}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value || undefined })}
            className="h-[var(--wl-search-h-desktop)] rounded-[var(--radius-xl)] pl-10 text-sm"
          />
        </div>
        <ViewToggle view={view} onViewChange={onViewChange} compact />
      </div>
    )
  }

  return (
    <div className="shrink-0 border-b border-[var(--border-subtle)] bg-[var(--surface-page)] px-4 pb-2 pt-2 lg:px-8 lg:pb-4 lg:pt-4">
      <div className="relative mb-1.5 lg:mb-4">
        <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-[var(--text-faint)] lg:left-4 lg:size-5" />
        <Input
          placeholder={isMobile ? 'Search...' : 'Search in German or Indonesian...'}
          value={filters.search ?? ''}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value || undefined })}
          className="h-[var(--wl-search-h)] rounded-[var(--radius-lg)] pl-8 text-[10px] lg:h-[var(--wl-search-h-desktop)] lg:rounded-[var(--radius-xl)] lg:pl-12 lg:text-sm"
        />
      </div>
      <div className="flex items-center gap-1 lg:gap-2">
        <FilterSelect label="Stage" options={STAGES} value={filters.stage ?? ''} onChange={(v) => onFiltersChange({ ...filters, stage: v || undefined })} />
        <FilterSelect label="Type" options={WORD_TYPES} value={filters.wordType ?? ''} onChange={(v) => onFiltersChange({ ...filters, wordType: v || undefined })} />
        {!isMobile && <FilterSelect label="Tags" options={[{ value: '', label: 'All tags' }]} value="" onChange={() => {}} />}
        <FilterSelect label="Sort" options={SORT_OPTIONS} value={filters.sort ?? ''} onChange={(v) => onFiltersChange({ ...filters, sort: (v as WordFilters['sort']) || undefined })} />
        <div className="ml-auto flex items-center gap-2 lg:gap-3">
          <span className="text-[10px] text-[var(--text-faint)] lg:text-sm">
            {wordCount} word{wordCount !== 1 ? 's' : ''}
          </span>
          <ViewToggle view={view} onViewChange={onViewChange} />
        </div>
      </div>
    </div>
  )
}
