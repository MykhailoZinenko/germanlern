export type StudyTab = 'auto' | 'by_tag' | 'ask_companion'

const TAB_CONFIG: { value: StudyTab; label: string }[] = [
  { value: 'auto', label: 'Auto' },
  { value: 'by_tag', label: 'By tag' },
  { value: 'ask_companion', label: 'Ask companion' },
]

interface StudyBookmarkTabsProps {
  active: StudyTab
  onChange: (tab: StudyTab) => void
}

export function StudyBookmarkTabs({ active, onChange }: StudyBookmarkTabsProps) {
  return (
    <div className="flex items-end">
      {TAB_CONFIG.map(({ value, label }) => {
        const isActive = value === active
        return (
          <div
            key={value}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(value)}
            className={[
              'relative cursor-pointer select-none rounded-t-[var(--radius-md)] border border-[var(--border-subtle)] text-sm',
              isActive
                ? 'z-[2] border-b-[var(--surface-page)] bg-[var(--surface-page)] px-5 pb-2 pt-4 font-semibold text-[var(--text-primary)]'
                : 'z-[1] border-b-0 bg-[var(--surface-sunken)] px-4 pb-2 pt-2 font-normal text-[var(--text-faint)]',
            ].join(' ')}
          >
            {label}
          </div>
        )
      })}
    </div>
  )
}
