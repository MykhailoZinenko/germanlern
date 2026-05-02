import { cn } from '#/lib/utils'
import type { WordStage } from '#/features/words/utils/stage'

const DOT_COLORS: Record<WordStage, string> = {
  planted: 'bg-[var(--stage-planted-dot)]',
  growing: 'bg-[var(--stage-growing-dot)]',
  almost: 'bg-[var(--stage-almost-dot)]',
  mastered: 'bg-[var(--stage-mastered-dot)]',
}

export function StageDot({
  stage,
  className,
}: {
  stage: WordStage
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-block size-[var(--wl-stage-dot)] shrink-0 rounded-full',
        DOT_COLORS[stage],
        className,
      )}
    />
  )
}
