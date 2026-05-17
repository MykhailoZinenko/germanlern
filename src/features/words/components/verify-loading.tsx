import { Badge } from '#/components/ui/badge'
import { Progress } from '#/components/ui/progress'
import { Check, Loader2 } from 'lucide-react'

const MAX_VISIBLE_PILLS = 12

type WordStatus = {
  word: string
  done: boolean
}

export function VerifyLoading({
  wordStatuses,
  total,
  processed,
}: {
  wordStatuses: WordStatus[]
  total: number
  processed: number
}) {
  const percent = total > 0 ? Math.round((processed / total) * 100) : 0
  const visible = wordStatuses.slice(0, MAX_VISIBLE_PILLS)
  const remaining = wordStatuses.length - MAX_VISIBLE_PILLS

  return (
    <div className="flex flex-1 items-center justify-center p-5 lg:p-8">
      <div className="w-full max-w-sm rounded-[var(--card-radius-mobile)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] px-7 py-8 text-center lg:max-w-[var(--vf-loading-w)] lg:rounded-[var(--vf-card-radius)] lg:px-[var(--vf-content-px)] lg:py-[var(--vf-card-py)]">
        <p className="mb-2 font-heading text-sm font-medium text-[var(--text-primary)] lg:mb-3 lg:text-xl">
          Verifying your words
        </p>
        <p className="mb-5 text-xs text-[var(--text-muted)] lg:mb-9 lg:text-sm">
          won&apos;t take long
        </p>
        <Progress value={percent} className="mb-3 h-1.5 lg:mb-4 lg:h-[var(--vf-progress-h)]" />
        <p className="mb-5 text-xs text-[var(--text-faint)] lg:mb-9 lg:text-sm">
          {processed} of {total} words processed
        </p>
        <div className="flex flex-wrap justify-center gap-2 lg:gap-4">
          {visible.map((ws) => (
            <Badge
              key={ws.word}
              variant="outline"
              className={
                ws.done
                  ? 'h-6 rounded-full px-3 text-xs border-[var(--status-success-border)] bg-[var(--status-success-bg)] text-[var(--status-success-text)] lg:h-9 lg:px-5 lg:text-sm'
                  : 'h-6 rounded-full px-3 text-xs border-[var(--border-subtle)] bg-[var(--surface-sunken)] text-[var(--text-muted)] lg:h-9 lg:px-5 lg:text-sm'
              }
            >
              {ws.word}{' '}
              {ws.done ? (
                <Check className="ml-1 size-3 lg:size-4" />
              ) : (
                <Loader2 className="ml-1 size-3 animate-spin lg:size-4" />
              )}
            </Badge>
          ))}
          {remaining > 0 && (
            <Badge
              variant="outline"
              className="h-6 rounded-full px-3 text-xs border-[var(--border-subtle)] bg-[var(--surface-sunken)] text-[var(--text-muted)] lg:h-9 lg:px-5 lg:text-sm"
            >
              +{remaining} more
            </Badge>
          )}
        </div>
      </div>
    </div>
  )
}
