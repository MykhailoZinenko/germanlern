import { Button } from '#/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '#/components/ui/dialog'
import { useWordStore } from '#/store/word-store'

function OverlayContent() {
  const bufferCount = useWordStore((s) => s.bufferCount)
  const setVerifyOverlayOpen = useWordStore((s) => s.setVerifyOverlayOpen)
  const setAddOpen = useWordStore((s) => s.setAddOpen)
  const setVerifyStep = useWordStore((s) => s.setVerifyStep)

  const handleVerify = () => {
    setVerifyOverlayOpen(false)
    setVerifyStep('loading')
  }

  const handleAddMore = () => {
    setVerifyOverlayOpen(false)
    setAddOpen(true)
  }

  return (
    <div>
      <div className="mb-5 lg:mb-[var(--space-8)]">
        <p className="mb-1 font-heading text-sm font-medium text-[var(--text-primary)] lg:mb-2 lg:text-xl">
          {bufferCount} unverified word{bufferCount !== 1 ? 's' : ''}
        </p>
        <p className="text-xs text-[var(--text-muted)] lg:text-base">
          Verify before studying or browsing.
        </p>
      </div>
      <div className="space-y-2 lg:space-y-4">
        <Button className="h-[var(--btn-h-mobile)] w-full rounded-[var(--radius-lg)] text-xs lg:h-[var(--btn-h-desktop)] lg:rounded-[var(--radius-xl)] lg:text-lg" onClick={handleVerify}>
          Verify now
        </Button>
        <Button variant="outline" className="h-[var(--btn-h-mobile)] w-full rounded-[var(--radius-lg)] text-xs lg:h-[var(--btn-h-desktop)] lg:rounded-[var(--radius-xl)] lg:text-lg" onClick={handleAddMore}>
          Add more words
        </Button>
      </div>
    </div>
  )
}

export function VerifyOverlay() {
  const open = useWordStore((s) => s.verifyOverlayOpen)

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        showCloseButton={false}
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="rounded-[var(--card-radius-mobile)] px-7 py-8 lg:w-[var(--vf-overlay-w)] lg:max-w-[var(--vf-overlay-w)] lg:rounded-[var(--vf-card-radius)] lg:px-[var(--vf-content-px)] lg:py-[var(--vf-card-py)]"
      >
        <DialogTitle className="sr-only">Unverified words</DialogTitle>
        <DialogDescription className="sr-only">
          You have unverified words in your buffer
        </DialogDescription>
        <OverlayContent />
      </DialogContent>
    </Dialog>
  )
}
