import { cn } from '#/lib/utils'
import { useIsMobile } from '#/hooks/use-mobile'
import type { WordRow } from '#/features/words/api/words-server-fns'
import { getDueLabel, getWordStage } from '#/features/words/utils/stage'

import { DueBadge } from './due-badge'
import { StageDot } from './stage-dot'
import { AiTagChip, GenderChip, TypeChip } from './word-chips'

export function WordRowItem({
  word,
  selected,
  compact,
  onClick,
}: {
  word: WordRow
  selected?: boolean
  compact?: boolean
  onClick?: () => void
}) {
  const stage = getWordStage(word)
  const due = getDueLabel(word.next_review_date)
  const tags = word.ai_tags ?? []
  const isMobile = useIsMobile()

  if (compact) {
    return (
      <div
        onClick={onClick}
        className={cn(
          'flex cursor-pointer items-center gap-3 border-b border-[var(--border-subtle)] px-4 py-3 transition-colors hover:bg-[var(--surface-hover)]',
          selected && 'bg-[var(--surface-sunken)]',
        )}
      >
        <StageDot stage={stage} />
        <div className="min-w-0 flex-1">
          <p className="truncate font-heading text-base text-[var(--text-primary)]">
            {word.german_word}
          </p>
          <p className="truncate text-[11px] text-[var(--text-muted)]">
            {word.translation}
          </p>
        </div>
        <DueBadge due={due} />
      </div>
    )
  }

  if (isMobile) {
    return (
      <div
        onClick={onClick}
        className={cn(
          'flex cursor-pointer items-center gap-3 border-b border-[var(--border-subtle)] px-4 py-3 transition-colors hover:bg-[var(--surface-hover)]',
          selected && 'bg-[var(--surface-sunken)]',
        )}
      >
        <StageDot stage={stage} />
        <div className="min-w-0 flex-1">
          <p className="truncate font-heading text-lg text-[var(--text-primary)]">
            {word.german_word}
          </p>
          <p className="truncate text-sm text-[var(--text-secondary)]">
            {word.translation}
          </p>
        </div>
        <DueBadge due={due} />
      </div>
    )
  }

  return (
    <div
      onClick={onClick}
      className={cn(
        'grid cursor-pointer items-center gap-4 border-b border-[var(--border-subtle)] px-8 py-4 transition-colors hover:bg-[var(--surface-hover)]',
        selected && 'bg-[var(--surface-sunken)]',
      )}
      style={{ gridTemplateColumns: '24px 1.4fr 1fr auto auto' }}
    >
      <StageDot stage={stage} />
      <div className="flex min-w-0 items-baseline gap-3">
        <span className="font-heading text-lg text-[var(--text-primary)]">
          {word.german_word}
        </span>
        <GenderChip gender={word.gender} />
        <TypeChip type={word.word_type} />
      </div>
      <p className="min-w-0 truncate text-base text-[var(--text-secondary)]">
        {word.translation}
      </p>
      <div className="flex gap-2">
        {tags.slice(0, 1).map((t) => (
          <AiTagChip key={t} label={t} />
        ))}
      </div>
      <DueBadge due={due} />
    </div>
  )
}
