import { cn } from '#/lib/utils'
import { useIsMobile } from '#/hooks/use-mobile'
import type { WordRow } from '#/features/words/api/words-server-fns'
import { getDueLabel, getWordStage } from '#/features/words/utils/stage'

import { DueBadge } from './due-badge'
import { StageDot } from './stage-dot'
import { AiTagChip, GenderPill, TypeChip } from './word-chips'

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
      /* WLDeskDL compact row: pad=7 12→×1.756=12 21→py-3 px-5, gap=8→14→gap-3.5 */
      /* word fs=11→19→text-base, translation fs=9→16→text-sm */
      <div
        onClick={onClick}
        className={cn(
          'flex cursor-pointer items-center gap-3.5 border-b border-[var(--border-subtle)] px-5 py-3 transition-colors hover:bg-[var(--surface-hover)]',
          selected && 'bg-[var(--surface-sunken)]',
        )}
      >
        <StageDot stage={stage} />
        <div className="min-w-0 flex-1">
          <p className={cn('truncate text-base text-[var(--text-primary)]', selected && 'font-medium')}>
            {word.german_word}
          </p>
          <p className="truncate text-sm text-[var(--text-muted)]">
            {word.translation}
          </p>
        </div>
      </div>
    )
  }

  if (isMobile) {
    return (
      /* WLMobList row: pad=8 14→py-2 px-4, gap=8→8 */
      <div
        onClick={onClick}
        className={cn(
          'flex cursor-pointer items-center gap-2 border-b border-[var(--border-subtle)] px-4 py-2 transition-colors hover:bg-[var(--surface-hover)]',
          selected && 'bg-[var(--surface-sunken)]',
        )}
      >
        <StageDot stage={stage} />
        <div className="min-w-0 flex-1">
          <div className="mb-0.5 flex items-center gap-1">
            <span className="text-sm font-medium text-[var(--text-primary)]">
              {word.german_word}
            </span>
            <GenderPill gender={word.gender} />
          </div>
          <p className="truncate text-[10px] text-[var(--text-secondary)]">
            {word.translation}
          </p>
        </div>
        <DueBadge due={due} />
      </div>
    )
  }

  return (
    /* WRow desktop full: pad=9 18→16 32→py-4 px-8, gap=10→18→gap-4 */
    <div
      onClick={onClick}
      className={cn(
        'flex cursor-pointer items-center gap-4 border-b border-[var(--border-subtle)] px-8 py-4 transition-colors hover:bg-[var(--surface-hover)]',
        selected && 'bg-[var(--surface-sunken)]',
      )}
    >
      <StageDot stage={stage} />
      <span className="min-w-[var(--wl-word-col-min-w)] shrink-0 text-xl font-medium text-[var(--text-primary)]">
        {word.german_word}
      </span>
      <GenderPill gender={word.gender} />
      <TypeChip type={word.word_type} />
      <span className="flex-1 truncate text-lg text-[var(--text-secondary)]">
        {word.translation}
      </span>
      <div className="flex gap-2">
        {tags.slice(0, 2).map((t) => (
          <AiTagChip key={t} label={t} />
        ))}
      </div>
      <DueBadge due={due} />
    </div>
  )
}
