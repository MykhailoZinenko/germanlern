import { Button } from '#/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '#/components/ui/dialog'
import { useWordStore } from '#/store/word-store'

import { BookmarkTabs } from './bookmark-tabs'
import { BufferBadge } from './buffer-badge'
import { TabPaste } from './tab-paste'
import { TabScan } from './tab-scan'
import { TabType } from './tab-type'

export function AddWordDialog() {
  const addOpen = useWordStore((s) => s.addOpen)
  const setAddOpen = useWordStore((s) => s.setAddOpen)
  const activeTab = useWordStore((s) => s.activeTab)
  const bufferCount = useWordStore((s) => s.bufferCount)
  const setVerifyOverlayOpen = useWordStore((s) => s.setVerifyOverlayOpen)

  const handleClose = (open: boolean) => {
    if (!open && bufferCount > 0) {
      setVerifyOverlayOpen(true)
    }
    setAddOpen(open)
  }

  return (
    <Dialog open={addOpen} onOpenChange={handleClose}>
      <DialogContent
        showCloseButton={false}
        className="flex w-[560px] max-w-[560px] flex-col gap-0 overflow-visible rounded-[var(--radius-xl)] rounded-tl-none bg-[var(--surface-page)] p-0 sm:max-w-[560px]"
      >
        <div className="absolute bottom-full left-0">
          <BookmarkTabs />
        </div>
        <BufferBadge className="rounded-tr-[var(--radius-xl)]" />
        <div className="flex items-center justify-between px-6 pb-4 pt-5">
          <DialogTitle className="font-heading text-xl font-semibold">Add word</DialogTitle>
          <Button
            variant="ghost"
            className="h-10 w-10 p-0 text-xl text-[var(--text-faint)]"
            onClick={() => handleClose(false)}
          >
            ×
          </Button>
        </div>
        <div className="h-[340px] overflow-y-auto px-6 pb-6 pt-1">
          {activeTab === 'type' && <TabType />}
          {activeTab === 'scan' && <TabScan />}
          {activeTab === 'paste' && <TabPaste />}
        </div>
      </DialogContent>
    </Dialog>
  )
}
