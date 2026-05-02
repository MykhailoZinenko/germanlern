import { Label } from '#/components/ui/label'
import type { WordRow } from '#/features/words/api/words-server-fns'
import { getDueLabel } from '#/features/words/utils/stage'

export function LearningStats({ word }: { word: WordRow }) {
  const reviewCount = word.review_count ?? 0
  const ef = word.easiness_factor ?? 2.5
  const due = getDueLabel(word.next_review_date)

  return (
    <div>
      {/* Lbl: fs=9→mob 10→text-xs, desk 16→text-sm */}
      <Label className="mb-1 text-xs lg:mb-2 lg:text-sm">Learning stats</Label>
      {/* stats grid: gap=6 16→mob 7 18→8 16, desk 11 28→12 28; pad=8 12→mob 9 13→8 12, desk 14 21→16 20; r=8→mob 9→var(--radius-md), desk 14→var(--radius-xl) */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 rounded-[var(--radius-md)] bg-[var(--surface-sunken)] p-2 px-3 lg:gap-x-7 lg:gap-y-3 lg:rounded-[var(--radius-xl)] lg:px-5 lg:py-4">
        <div>
          <Label className="mb-0.5 text-[10px] lg:text-xs">Reviews</Label>
          {/* value: fs=12→mob 13→text-sm, desk 21→text-lg */}
          <p className="text-sm font-medium text-[var(--text-primary)] lg:text-lg">
            {reviewCount}
          </p>
        </div>
        <div>
          <Label className="mb-0.5 text-[10px] lg:text-xs">Next review</Label>
          <p className="text-sm font-medium text-[var(--text-primary)] lg:text-lg">
            {due ? (due === 'today' ? 'Today' : `in ${due}`) : '—'}
          </p>
        </div>
        <div>
          <Label className="mb-0.5 text-[10px] lg:text-xs">EF</Label>
          <p className="text-sm font-medium text-[var(--text-primary)] lg:text-lg">
            {ef.toFixed(1)}
          </p>
        </div>
        <div>
          <Label className="mb-0.5 text-[10px] lg:text-xs">Interval</Label>
          <p className="text-sm font-medium text-[var(--text-primary)] lg:text-lg">
            {word.interval_days ?? 1}d
          </p>
        </div>
      </div>
    </div>
  )
}
