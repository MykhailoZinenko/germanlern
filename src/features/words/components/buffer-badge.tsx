import { Skeleton } from '#/components/ui/skeleton'
import { useWordStore } from '#/store/word-store'
import { cn } from '#/lib/utils'

export function BufferBadge({ className }: { className?: string }) {
  const bufferCount = useWordStore((s) => s.bufferCount)

  const text =
    bufferCount === 0
      ? 'No words yet'
      : `${bufferCount} word${bufferCount !== 1 ? 's' : ''} in buffer \u00B7 not yet verified`

  return (
    <div
      className={cn(
        'flex h-[var(--aw-buffer-h)] shrink-0 items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-[var(--space-4)] lg:h-[var(--aw-buffer-h-desktop)] lg:px-[var(--space-8)]',
        className,
      )}
    >
      {/* fs=9 → mob 10→text-xs, desk 16→text-base */}
      <span className="text-xs text-[var(--text-muted)] lg:text-sm">{text}</span>
      {bufferCount > 0 && (
        /* dot: 6→mob 7→6, desk 11→10 */
        <span className="inline-block size-1.5 shrink-0 rounded-full bg-[var(--stage-planted-dot)] lg:size-2.5" />
      )}
    </div>
  )
}

export function BufferBadgeSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex h-[var(--aw-buffer-h)] shrink-0 items-center border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-[var(--space-4)] lg:h-[var(--aw-buffer-h-desktop)] lg:px-[var(--space-8)]',
        className,
      )}
    >
      <Skeleton className="h-3 w-40 lg:h-4" />
    </div>
  )
}
