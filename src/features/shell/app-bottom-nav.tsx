import { Link, useMatchRoute } from '@tanstack/react-router'
import { BookOpen, BookOpenText, Files, GraduationCap, Home } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Dashboard', icon: Home, path: '/' as const },
  { label: 'Words', icon: BookOpen, path: '/words' as const },
  { label: 'Study', icon: GraduationCap, path: '/study' as const },
  { label: 'Read', icon: BookOpenText, path: '/read' as const },
  { label: 'Documents', icon: Files, path: '/documents' as const },
] as const

export function AppBottomNav() {
  const matchRoute = useMatchRoute()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 flex h-[var(--shell-bottomnav-h)] shrink-0 items-center justify-around border-t border-[var(--border-subtle)] bg-[var(--surface-raised)] pb-[env(safe-area-inset-bottom)] lg:hidden">
      {NAV_ITEMS.map((item) => {
        const isActive = !!matchRoute({ to: item.path, fuzzy: item.path !== '/' })
        return (
          <Link
            key={item.path}
            to={item.path}
            className="flex flex-col items-center justify-center gap-0.5 no-underline"
          >
            <item.icon
              className={`size-5 ${isActive ? 'text-[var(--action-bg)]' : 'text-[var(--text-muted)]'}`}
            />
            <span
              className={`text-[10px] ${isActive ? 'text-[var(--action-bg)]' : 'text-[var(--text-muted)]'}`}
            >
              {item.label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
