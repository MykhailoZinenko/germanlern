import { cn } from '#/lib/utils'
import { Card } from '#/components/ui/card'
import type { WordRow } from '#/features/words/api/words-server-fns'
import { getDueLabel, getWordStage } from '#/features/words/utils/stage'

import { DueBadge } from './due-badge'
import { AiTagChip, GenderPill, TypeChip } from './word-chips'

const STRIP_COLORS: Record<string, string> = {
  planted: 'bg-[var(--stage-planted-dot)]',
  growing: 'bg-[var(--stage-growing-dot)]',
  almost: 'bg-[var(--stage-almost-dot)]',
  mastered: 'bg-[var(--stage-mastered-dot)]',
}

export function WordCardItem({
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

  if (compact) {
    return (
      /* MiniWCard wireframe: r=7→×1.756=12→rounded-[var(--radius-lg)], strip h=2→4, pad=5 7→×1.756=9 12→py-2.5 px-3, word fs=10→×1.756=18→text-base, translation fs=8→×1.756=14→text-sm */
      <Card
        size="compact"
        onClick={onClick}
        className={cn(
          'cursor-pointer rounded-[var(--radius-lg)] transition-colors hover:bg-[var(--surface-hover)]',
          selected && 'border-[var(--border-strong)] bg-[var(--surface-sunken)]',
        )}
      >
        <div className={cn('h-1', STRIP_COLORS[stage])} />
        <div className="px-3 py-2.5">
          <p className={cn('truncate text-base text-[var(--text-primary)]', selected && 'font-medium')}>
            {word.german_word}
          </p>
          <p className="truncate text-sm text-[var(--text-muted)]">
            {word.translation}
          </p>
        </div>
      </Card>
    )
  }

  return (
    /* WCard: r=10→mob 11→10, desk 18; border=0.8→1; strip h=3→mob 3, desk 4; pad=10 12→mob p-2.5, desk p-4 px-5 */
    <Card
      size="compact"
      onClick={onClick}
      className={cn(
        'cursor-pointer rounded-[var(--radius-lg)] transition-colors hover:bg-[var(--surface-hover)] lg:rounded-[var(--radius-2xl)]',
        selected && 'border-[var(--border-strong)] bg-[var(--surface-sunken)]',
      )}
    >
      <div className={cn('h-[var(--wl-card-strip-h)] lg:h-1', STRIP_COLORS[stage])} />
      <div className="flex flex-1 flex-col p-2.5 lg:px-5 lg:py-4">
        <p className="mb-1.5 text-sm font-medium text-[var(--text-primary)] lg:mb-2.5 lg:text-lg">
          {word.german_word}
        </p>
        <div className="mb-1.5 flex min-h-5 gap-1 lg:mb-2.5 lg:min-h-7 lg:gap-1.5">
          <TypeChip type={word.word_type} />
          <GenderPill gender={word.gender} />
        </div>
        <p className="mb-2 text-xs text-[var(--text-secondary)] lg:mb-3.5 lg:text-base">
          {word.translation}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex gap-1">
            {tags.slice(0, 1).map((t) => (
              <AiTagChip key={t} label={t} />
            ))}
          </div>
          <DueBadge due={due} />
        </div>
      </div>
    </Card>
  )
}
