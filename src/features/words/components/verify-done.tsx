import { useEffect } from 'react'

import { Progress } from '#/components/ui/progress'

export function VerifyDone({
  count,
  onComplete,
}: {
  count: number
  onComplete: () => void
}) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="flex flex-1 items-center justify-center p-5 lg:p-8">
      {/* VDone: w=320→×1.756=562→560→var(--vf-done-w); r=16→desk 28→var(--vf-card-radius), mob 18→16 */}
      {/* pad=32 24→desk 56 42→56 44→var(--vf-done-py/px), mob 35 26→36 28 */}
      <div className="w-full max-w-sm rounded-[var(--card-radius-mobile)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] px-7 py-9 text-center lg:max-w-[var(--vf-done-w)] lg:rounded-[var(--vf-card-radius)] lg:px-[var(--vf-content-px)] lg:py-[var(--vf-done-py)]">
        {/* title: fs=13→mob 14→text-sm, desk 23→text-xl; mb=6→mob 7→8, desk 11→12 */}
        <p className="mb-2 font-heading text-sm font-medium text-[var(--text-primary)] lg:mb-3 lg:text-xl">
          All done
        </p>
        {/* subtitle: fs=10→mob 11→text-xs, desk 18→text-base; mb=20→mob 22→20, desk 35→36 */}
        <p className="mb-5 text-xs text-[var(--text-muted)] lg:mb-9 lg:text-sm">
          {count} word{count !== 1 ? 's' : ''} added to your library
        </p>
        {/* bar: h=5→mob 6→6, desk 9→8; mb=8→mob 9→8, desk 14→16 */}
        <Progress
          value={100}
          className="mb-2 h-1.5 lg:mb-4 lg:h-2 [&>[data-slot=progress-indicator]]:bg-[var(--status-success-bg)]"
        />
        {/* fs=9→mob 10→text-xs, desk 16→text-sm */}
        <p className="text-xs text-[var(--text-faint)] lg:text-sm">taking you back...</p>
      </div>
    </div>
  )
}
