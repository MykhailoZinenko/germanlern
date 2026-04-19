import { Link, useMatchRoute } from '@tanstack/react-router'

const NAV_ITEMS = [
  { label: 'Home', path: '/' as const },
  { label: 'Library', path: '/words' as const },
  { label: 'Study', path: '/study' as const },
  { label: 'Read', path: '/read' as const },
  { label: 'Docs', path: '/documents' as const },
] as const

export function AppBottomNav() {
  const matchRoute = useMatchRoute()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 flex h-[var(--shell-bottomnav-h)] shrink-0 items-center justify-around border-t border-[var(--border-subtle)] bg-[var(--surface-sunken)] pb-[env(safe-area-inset-bottom)] md:hidden">
      {NAV_ITEMS.map((item) => {
        const isActive = !!matchRoute({ to: item.path, fuzzy: item.path !== '/' })
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`text-xs no-underline ${
              isActive
                ? 'font-medium text-[var(--text-primary)]'
                : 'text-[var(--text-faint)]'
            }`}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
