import { Badge } from '#/components/ui/badge'

export function DueBadge({ due }: { due: string | null }) {
  if (!due) return null

  const isToday = due === 'today'

  return (
    <Badge
      variant="outline"
      className={[
        'rounded-full lg:h-7 lg:px-3',
        isToday
          ? 'border-[var(--status-warning-border)] bg-[var(--status-warning-bg)] text-[var(--status-warning-text)]'
          : 'border-[var(--status-neutral-border)] bg-[var(--status-neutral-bg)] text-[var(--status-neutral-text)]',
      ].join(' ')}
    >
      {isToday ? 'due today' : `in ${due}`}
    </Badge>
  )
}
