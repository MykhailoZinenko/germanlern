import { Loader2 } from 'lucide-react'

import { Button } from '#/components/ui/button'
import { Skeleton } from '#/components/ui/skeleton'
import { useDueCount } from '#/features/study/api/use-study'

interface TabAutoProps {
  onStart: () => void
  isLoading?: boolean
}

export function TabAuto({ onStart, isLoading }: TabAutoProps) {
  const { data, isLoading: isCountLoading } = useDueCount()

  const dueCount = data?.dueCount ?? 0
  const estimatedMinutes = Math.max(1, Math.round(dueCount * 0.4))

  return (
    <div className="space-y-4">
      <div className="rounded-[var(--radius-lg)] bg-[var(--surface-sunken)] p-4">
        {isCountLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-7 w-32" />
            <Skeleton className="h-3 w-16" />
          </div>
        ) : (
          <>
            <p className="text-xs text-[var(--text-muted)]">
              Today's queue · SM-2
            </p>
            <p className="mt-1 text-2xl font-medium text-[var(--text-primary)]">
              {dueCount} words due
            </p>
            <p className="mt-1 text-xs text-[var(--text-faint)]">
              ~{estimatedMinutes} min
            </p>
          </>
        )}
      </div>

      <Button
        className="w-full"
        onClick={onStart}
        disabled={isLoading || isCountLoading || dueCount === 0}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Preparing...
          </>
        ) : (
          'Start studying'
        )}
      </Button>
    </div>
  )
}
