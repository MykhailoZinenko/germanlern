import { Sparkles } from 'lucide-react'

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
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-[var(--lumi-light)]">
        <Sparkles className="size-6 text-[var(--lumi-deep)]" />
      </div>
      <h3 className="mb-2 font-heading text-xl font-semibold text-[var(--text-primary)]">
        {bufferCount} unverified word{bufferCount !== 1 ? 's' : ''}
      </h3>
      <p className="mb-6 text-sm text-[var(--text-muted)]">
        Verify before studying or browsing.
      </p>
      <div className="flex w-full flex-col gap-3">
        <Button
          className="h-10 w-full text-sm font-medium"
          onClick={handleVerify}
        >
          Verify now
        </Button>
        <Button
          variant="outline"
          className="h-10 w-full border-[var(--action-secondary-border)] text-sm font-medium text-[var(--action-secondary-text)]"
          onClick={handleAddMore}
        >
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
        className="w-[400px] max-w-[400px] rounded-[var(--radius-2xl)] px-6 py-8"
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
