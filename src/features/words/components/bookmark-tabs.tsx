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
              'relative cursor-pointer select-none rounded-t-[var(--radius-md)] border border-[var(--border-subtle)] text-[11px] lg:rounded-t-[var(--radius-xl)] lg:text-base',
              active
                ? 'z-[2] border-b-[var(--surface-page)] bg-[var(--surface-page)] px-[22px] pb-2.5 pt-2 font-medium text-[var(--text-primary)] lg:px-9 lg:pb-4 lg:pt-4'
                : 'z-[1] border-b-0 bg-[var(--surface-sunken)] px-[18px] pb-2.5 pt-1.5 font-normal text-[var(--text-faint)] lg:px-8 lg:pb-4 lg:pt-3',
            ].join(' ')}
          >
            {TAB_LABELS[tab]}
          </div>
        )
      })}
    </div>
  )
}
