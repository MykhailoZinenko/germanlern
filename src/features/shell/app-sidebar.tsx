import { Link, useMatchRoute } from '@tanstack/react-router'

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/' as const, id: 'nav-dashboard' },
  { label: 'Library', path: '/words' as const, id: 'nav-library' },
  { label: 'Study', path: '/study' as const, id: 'nav-study' },
  { label: 'Read', path: '/read' as const, id: 'nav-read' },
  { label: 'Documents', path: '/documents' as const, id: 'nav-documents' },
  { label: 'Settings', path: '/settings' as const, id: undefined },
  { label: 'Profile', path: '/profile' as const, id: undefined },
] as const

export function AppSidebar() {
  const matchRoute = useMatchRoute()

  return (
    <aside className="hidden w-36 shrink-0 flex-col border-r border-[var(--border-subtle)] bg-[var(--surface-sunken)] md:flex">
      <div className="mx-2 my-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-hover)] px-3 py-2 text-center text-xs font-semibold text-[var(--text-primary)]">
        GermanLern
      </div>
      <nav className="flex flex-1 flex-col py-1">
        {NAV_ITEMS.map((item) => {
          const isActive = !!matchRoute({ to: item.path, fuzzy: item.path !== '/' })
          return (
            <Link
              key={item.path}
              to={item.path}
              id={item.id}
              className={`border-l-2 px-3.5 py-1.5 text-[11px] no-underline transition-colors ${
                isActive
                  ? 'border-[var(--text-faint)] bg-[var(--surface-hover)] font-medium text-[var(--text-primary)]'
                  : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="border-t border-[var(--border-subtle)] px-3.5 py-3">
        <div className="text-[8px] uppercase tracking-widest text-[var(--text-faint)]">Streak</div>
        <div className="text-base font-medium text-[var(--text-muted)]">0 days</div>
        <div className="mt-1.5 text-[8px] uppercase tracking-widest text-[var(--text-faint)]">Words</div>
        <div className="text-base font-medium text-[var(--text-muted)]">0</div>
      </div>
    </aside>
  )
}
