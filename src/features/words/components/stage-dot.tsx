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
    /* SDot: 8→mob 9→8→size-2, desk 14→14→size-3.5 */
    <span
      className={cn('inline-block size-2 shrink-0 rounded-full lg:size-3.5', DOT_COLORS[stage], className)}
    />
  )
}
