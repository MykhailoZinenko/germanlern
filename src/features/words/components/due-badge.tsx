import { Badge } from '#/components/ui/badge'

const CHIP = 'h-6 px-3 rounded-full text-[11px] font-medium'

export function DueBadge({ due }: { due: string | null }) {
  if (!due) return null

  const isToday = due === 'today'

  return (
    <Badge
      variant="outline"
      className={`${CHIP} ${
        isToday
          ? 'border-[var(--status-warning-border)] bg-[var(--status-warning-bg)] text-[var(--status-warning-text)]'
          : 'border-[var(--status-neutral-border)] bg-[var(--status-neutral-bg)] text-[var(--status-neutral-text)]'
      }`}
    >
      {isToday ? 'Due today' : `Due ${due}`}
    </Badge>
  )
}
