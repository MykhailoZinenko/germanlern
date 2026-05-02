import { Link, useMatchRoute } from '@tanstack/react-router'
import {
  BookOpen,
  Files,
  Flame,
  Home,
  GraduationCap,
  BookOpenText,
  Settings,
  User,
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '#/components/ui/sidebar'

const NAV_ITEMS = [
  { label: 'Dashboard', icon: Home, path: '/' as const, id: 'nav-dashboard' },
  { label: 'Words', icon: BookOpen, path: '/words' as const, id: 'nav-library' },
  { label: 'Study', icon: GraduationCap, path: '/study' as const, id: 'nav-study' },
  { label: 'Read', icon: BookOpenText, path: '/read' as const, id: 'nav-read' },
  { label: 'Documents', icon: Files, path: '/documents' as const, id: 'nav-documents' },
] as const

export function AppSidebar() {
  const matchRoute = useMatchRoute()

  return (
    <Sidebar
      collapsible="none"
      className="hidden !h-auto lg:flex"
      style={{ '--sidebar-width': 'var(--shell-sidebar-w)' } as React.CSSProperties}
    >
      <SidebarHeader className="flex h-[var(--shell-topbar-h)] flex-row items-center gap-3 border-b border-sidebar-border px-5">
        <div className="size-7 rounded-[var(--radius-md)] bg-[var(--lumi-deep)]" />
        <span className="font-heading text-xl font-semibold text-sidebar-foreground">
          GermanLern
        </span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="p-3">
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = !!matchRoute({ to: item.path, fuzzy: item.path !== '/' })
                return (
                  <SidebarMenuItem key={item.path} id={item.id}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="h-11 gap-3 rounded-[var(--radius-md)] px-3 text-sm"
                    >
                      <Link to={item.path}>
                        <item.icon className="size-5" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
        <div className="flex items-center gap-3 rounded-[var(--radius-md)] border border-[var(--stage-planted-border)] bg-[var(--stage-planted-bg)] px-3 py-2">
          <div className="flex size-8 items-center justify-center rounded-full bg-[var(--surface-raised)]">
            <Flame className="size-5 text-[var(--stage-planted-dot)]" />
          </div>
          <div>
            <p className="font-heading text-xl leading-none text-[var(--stage-planted-text)]">
              0
            </p>
            <p className="text-[11px] text-[var(--stage-planted-text)] opacity-75">
              day streak
            </p>
          </div>
        </div>
        <div className="flex items-baseline justify-between px-1">
          <span className="text-[11px] text-[var(--text-muted)]">0 words</span>
          <span className="text-[11px] text-[var(--text-muted)]">0 mastered</span>
        </div>
      </SidebarFooter>

      {/* Profile */}
      <Link
        to="/profile"
        className="flex h-14 items-center gap-3 border-t border-[var(--border-subtle)] px-4 no-underline"
      >
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--lumi-light)] text-sm font-semibold text-[var(--lumi-text)]">
          C
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-[var(--text-primary)]">Cindy</p>
          <p className="truncate text-[11px] text-[var(--text-muted)]">cindy@mail.com</p>
        </div>
      </Link>
    </Sidebar>
  )
}
