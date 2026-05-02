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
      {/* Modal: w=360→×1.756=632→var(--aw-modal-w), h≈320→×1.756=562→560→var(--aw-modal-h) */}
      {/* borderRadius: 0 12 12 12→×1.756=0 21 21 21→0 var(--radius-xl) var(--radius-xl) var(--radius-xl) */}
      <DialogContent
        showCloseButton={false}
        className="flex h-[var(--aw-modal-h)] w-[var(--aw-modal-w)] max-w-[var(--aw-modal-w)] sm:max-w-[var(--aw-modal-w)] flex-col gap-0 overflow-visible rounded-[var(--radius-xl)] rounded-tl-none bg-[var(--surface-page)] p-0"
      >
        {/* BTabs above modal: height=var(--aw-tab-h)=48px */}
        <div className="absolute bottom-full left-0">
          <BookmarkTabs />
        </div>
        {/* BufferBadge: rounded top-right to match modal */}
        <BufferBadge className="rounded-tr-[var(--radius-xl)]" />
        {/* Header: pad=14 16 0→×1.756=25 28 0→24 28 0, mb=12→×1.756=21→20 */}
        {/* Title fs=13→×1.756=23→text-xl, close fs=16→×1.756=28→text-2xl */}
        <div className="flex items-center justify-between px-7 pb-5 pt-6">
          <DialogTitle className="text-xl">Add word</DialogTitle>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => handleClose(false)}
            className="text-2xl leading-none text-[var(--text-faint)]"
          >
            &times;
          </Button>
        </div>
        {/* TabContent: h=TAB_H=212→×1.756=372→var(--aw-tab-content-h-desktop), pad=4 16 16→×1.756=7 28 28→8 28 28 */}
        <div className="h-[var(--aw-tab-content-h-desktop)] flex-1 overflow-y-auto px-7 pb-7 pt-2">
          {activeTab === 'type' && <TabType />}
          {activeTab === 'scan' && <TabScan />}
          {activeTab === 'paste' && <TabPaste />}
        </div>
      </DialogContent>
    </Dialog>
  )
}
