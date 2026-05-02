import { Drawer, DrawerContent, DrawerTitle } from '#/components/ui/drawer'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { useWordStore } from '#/store/word-store'

import { BookmarkTabs } from './bookmark-tabs'
import { BufferBadge } from './buffer-badge'
import { TabPaste } from './tab-paste'
import { TabScan } from './tab-scan'
import { TabType } from './tab-type'

export function AddWordDrawer() {
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
    <Drawer open={addOpen} onOpenChange={handleClose}>
      <DrawerContent
        showDragHandle={false}
        className="p-0 before:inset-0 before:rounded-none before:rounded-tr-[var(--radius-lg)] before:border-b-0 before:bg-[var(--surface-page)] before:shadow-none data-[vaul-drawer-direction=bottom]:pb-[var(--shell-bottomnav-h)]"
      >
        <VisuallyHidden>
          <DrawerTitle>Add words</DrawerTitle>
        </VisuallyHidden>
        <div className="absolute bottom-full left-0">
          <BookmarkTabs />
        </div>
        <BufferBadge className="rounded-tr-[var(--radius-lg)]" />
        <div className="mx-auto my-2.5 h-1 w-[var(--aw-drag-w)] rounded-full bg-[var(--surface-hover)]" />
        <div className="h-[var(--aw-tab-content-h)] overflow-y-auto px-[var(--space-4)] pb-[var(--space-4)]">
          {activeTab === 'type' && <TabType />}
          {activeTab === 'scan' && <TabScan />}
          {activeTab === 'paste' && <TabPaste />}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
