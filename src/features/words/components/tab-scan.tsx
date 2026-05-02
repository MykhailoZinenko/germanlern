import { Camera } from 'lucide-react'

import { Button } from '#/components/ui/button'

export function TabScan() {
  return (
    /* gap: mob 6→×1.1=7→8, desk 6→×1.756=11→12 */
    <div className="flex flex-col items-center gap-2 lg:gap-3">
      {/* viewfinder: h=108→mob 119→120, desk 190→192; r=10→mob 11→var(--radius-lg), desk 18→var(--radius-xl) */}
      <div className="flex h-[var(--aw-scan-h)] w-full flex-col items-center justify-center gap-2 rounded-[var(--radius-lg)] border border-dashed border-[var(--border-medium)] bg-[var(--surface-sunken)] lg:h-[var(--aw-scan-h-desktop)] lg:gap-3 lg:rounded-[var(--radius-xl)]">
        <Camera className="size-8 text-[var(--text-faint)] lg:size-12" />
        {/* fs=10→mob 11→text-xs, desk 18→text-base */}
        <span className="text-xs text-[var(--text-muted)] lg:text-sm">Coming soon</span>
      </div>
      {/* Btn: same as tab-type */}
      <Button className="h-[var(--btn-h-mobile)] w-full rounded-[var(--radius-lg)] text-xs lg:h-[var(--btn-h-desktop)] lg:rounded-[var(--radius-xl)] lg:text-lg" disabled>
        Capture
      </Button>
      {/* fs=10→mob 11→text-xs, desk 18→text-base */}
      <span className="text-xs text-[var(--text-faint)] lg:text-sm">or upload a photo</span>
    </div>
  )
}
