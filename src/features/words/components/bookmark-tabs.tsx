import { useWordStore } from '#/store/word-store'

const TAB_VALUES = ['type', 'scan', 'paste'] as const
const TAB_LABELS: Record<string, string> = { type: 'Type', scan: 'Scan', paste: 'Paste' }

export function BookmarkTabs() {
  const activeTab = useWordStore((s) => s.activeTab)
  const setActiveTab = useWordStore((s) => s.setActiveTab)

  return (
    <div className="flex items-end">
      {TAB_VALUES.map((tab) => {
        const active = tab === activeTab
        return (
          <div
            key={tab}
            role="tab"
            aria-selected={active}
            onClick={() => setActiveTab(tab)}
            className={[
              'relative cursor-pointer select-none rounded-t-[var(--radius-md)] border border-[var(--border-subtle)] text-sm',
              active
                ? 'z-[2] border-b-[var(--surface-page)] bg-[var(--surface-page)] px-5 pb-2 pt-4 font-semibold text-[var(--text-primary)]'
                : 'z-[1] border-b-0 bg-[var(--surface-sunken)] px-4 pb-2 pt-2 font-normal text-[var(--text-faint)]',
            ].join(' ')}
          >
            {TAB_LABELS[tab]}
          </div>
        )
      })}
    </div>
  )
}
