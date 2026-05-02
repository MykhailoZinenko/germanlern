import { Badge } from '#/components/ui/badge'
import { Progress } from '#/components/ui/progress'
import { Check, Loader2 } from 'lucide-react'

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

  return (
    /* Mobile: full page centered, pad=20→×1.1=22→20. Desktop: scrim + centered card */
    <div className="flex flex-1 items-center justify-center p-5 lg:p-8">
      {/* VLoading: w=380→×1.756=668→var(--vf-loading-w); r=16→desk 28→var(--vf-card-radius), mob 18→16; pad=28 24→desk 49 42→48 44, mob 31 26→32 28 */}
      <div className="w-full max-w-sm rounded-[var(--card-radius-mobile)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] px-7 py-8 text-center lg:max-w-[var(--vf-loading-w)] lg:rounded-[var(--vf-card-radius)] lg:px-[var(--vf-content-px)] lg:py-[var(--vf-card-py)]">
        {/* title: fs=13→mob 14→text-sm, desk 23→text-xl; mb=6→mob 7→8, desk 11→12 */}
        <p className="mb-2 font-heading text-sm font-medium text-[var(--text-primary)] lg:mb-3 lg:text-xl">
          Verifying your words
        </p>
        {/* subtitle: fs=10→mob 11→text-xs, desk 18→text-base; mb=20→mob 22→20, desk 35→36 */}
        <p className="mb-5 text-xs text-[var(--text-muted)] lg:mb-9 lg:text-sm">
          won&apos;t take long
        </p>
        {/* progress: h=6→mob 7→6, desk 11→10→var(--vf-progress-h); mb=10→mob 11→12, desk 18→16 */}
        <Progress value={percent} className="mb-3 h-1.5 lg:mb-4 lg:h-[var(--vf-progress-h)]" />
        {/* counter: fs=9→mob 10→text-xs, desk 16→text-sm; mb=20→mob 22→20, desk 35→36 */}
        <p className="mb-5 text-xs text-[var(--text-faint)] lg:mb-9 lg:text-sm">
          {processed} of {total} words processed
        </p>
        {/* pills: gap=8→mob 9→8, desk 14→16; pad=4 12→mob 4 13→4 12, desk 7 21→8 20; r=20→full; fs=9→mob 10→text-xs, desk 16→text-sm */}
        <div className="flex flex-wrap justify-center gap-2 lg:gap-4">
          {wordStatuses.map((ws) => (
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
        </div>
      </div>
    </div>
  )
}
