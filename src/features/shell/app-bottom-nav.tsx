import { Link, useMatchRoute } from '@tanstack/react-router'
import {
  BookOpen,
  BookText,
  FileText,
  GraduationCap,
  LayoutDashboard,
} from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Home', path: '/' as const, icon: LayoutDashboard },
  { label: 'Words', path: '/words' as const, icon: BookOpen },
  { label: 'Study', path: '/study' as const, icon: GraduationCap },
  { label: 'Read', path: '/read' as const, icon: BookText },
  { label: 'Docs', path: '/documents' as const, icon: FileText },
] as const

export function AppBottomNav() {
  const matchRoute = useMatchRoute()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--border-subtle)] bg-[var(--surface-raised)] pb-[env(safe-area-inset-bottom)] md:hidden">
      <div className="flex items-center justify-around py-2">
        {NAV_ITEMS.map((item) => {
          const isActive = !!matchRoute({ to: item.path, fuzzy: item.path !== '/' })
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center gap-0.5 no-underline"
            >
              <item.icon
                className={`size-5 ${isActive ? 'text-[var(--action-bg)]' : 'text-[var(--text-muted)]'}`}
              />
              <span
                className={`text-[10px] ${isActive ? 'font-medium text-[var(--action-bg)]' : 'text-[var(--text-muted)]'}`}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
