import { Link, useMatchRoute } from '@tanstack/react-router'

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
    <Sidebar collapsible="none" className="hidden !h-auto lg:flex">
      <SidebarHeader className="flex h-[var(--shell-topbar-h)] items-center justify-center border-b border-sidebar-border">
        <div className="w-full rounded-xl bg-sidebar-accent px-[var(--space-3)] py-[var(--space-2)] text-center text-lg font-medium text-sidebar-foreground">
          GermanLern
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => (
                <SidebarMenuItem key={item.path} id={item.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={!!matchRoute({ to: item.path, fuzzy: item.path !== '/' })}
                    className="text-lg"
                  >
                    <Link to={item.path}>
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-[var(--space-6)] py-[var(--space-5)]">
        <div className="text-sm uppercase tracking-widest text-[var(--text-faint)]">Streak</div>
        <div className="mb-[var(--space-3)] text-2xl font-medium text-[var(--text-muted)]">0 days</div>
        <div className="text-sm uppercase tracking-widest text-[var(--text-faint)]">Words</div>
        <div className="text-2xl font-medium text-[var(--text-muted)]">0</div>
      </SidebarFooter>
    </Sidebar>
  )
}
