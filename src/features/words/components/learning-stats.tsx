import { Card, CardContent } from '#/components/ui/card'
import { Label } from '#/components/ui/label'
import type { WordRow } from '#/features/words/api/words-server-fns'
import { getDueLabel } from '#/features/words/utils/stage'

export function LearningStats({ word }: { word: WordRow }) {
  const reviewCount = word.review_count ?? 0
  const due = getDueLabel(word.next_review_date)
  const stage = word.review_count === 0
    ? 'planted'
    : (word.easiness_factor ?? 2.5) >= 2.5 && reviewCount >= 5
      ? 'mastered'
      : (word.easiness_factor ?? 2.5) >= 2.0
        ? 'almost'
        : 'growing'

  return (
    <div>
      <Label className="mb-2 text-xs uppercase tracking-wider text-[var(--text-muted)]">
        Learning stats
      </Label>
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Reviews" value={String(reviewCount)} />
        <StatCard label="Correct rate" value="—" />
        <StatCard
          label="Next review"
          value={due ? (due === 'today' ? 'Today' : due) : '—'}
          small
        />
        <StatCard label="Stage" value={stage} small capitalize />
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
  small,
  capitalize,
}: {
  label: string
  value: string
  small?: boolean
  capitalize?: boolean
}) {
  return (
    <Card size="compact" className="border-[var(--border-subtle)] bg-[var(--surface-raised)]">
      <CardContent className="p-4">
        <p className="text-[11px] text-[var(--text-muted)]">{label}</p>
        <p
          className={`mt-1 text-[var(--text-primary)] ${
            small ? 'text-lg' : 'font-heading text-2xl font-semibold'
          } ${capitalize ? 'capitalize' : ''}`}
        >
          {value}
        </p>
      </CardContent>
    </Card>
  )
}
