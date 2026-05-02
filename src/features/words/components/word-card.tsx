import { cn } from '#/lib/utils'
import type { WordRow } from '#/features/words/api/words-server-fns'
import { getDueLabel, getWordStage } from '#/features/words/utils/stage'

import { DueBadge } from './due-badge'
import { AiTagChip, GenderChip, TypeChip } from './word-chips'

const STRIP_COLORS: Record<string, string> = {
  planted: 'bg-[var(--stage-planted-dot)]',
  growing: 'bg-[var(--stage-growing-dot)]',
  almost: 'bg-[var(--stage-almost-dot)]',
  mastered: 'bg-[var(--stage-mastered-dot)]',
}

export function WordCardItem({
  word,
  selected,
  onClick,
}: {
  word: WordRow
  selected?: boolean
  onClick?: () => void
}) {
  const stage = getWordStage(word)
  const due = getDueLabel(word.next_review_date)
  const tags = word.ai_tags ?? []

  return (
    <div
      onClick={onClick}
      className={cn(
        'flex cursor-pointer flex-col overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] transition-colors hover:bg-[var(--surface-hover)]',
        selected && 'border-[var(--border-strong)]',
      )}
    >
      <div className={cn('h-[var(--wl-card-strip-h)]', STRIP_COLORS[stage])} />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-2">
          <GenderChip gender={word.gender} />
          <TypeChip type={word.word_type} />
          <div className="flex-1" />
          <DueBadge due={due} />
        </div>
        <p className="font-heading text-xl font-semibold text-[var(--text-primary)]">
          {word.german_word}
        </p>
        <p className="text-base text-[var(--text-secondary)]">
          {word.translation}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <AiTagChip key={t} label={t} />
          ))}
        </div>
      </div>
    </div>
  )
}
