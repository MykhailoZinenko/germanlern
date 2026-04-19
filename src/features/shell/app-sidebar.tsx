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
    <Sidebar collapsible="none" className="hidden !h-auto md:flex">
      <SidebarHeader>
        <div className="rounded-lg border border-sidebar-border bg-sidebar-accent px-3 py-2 text-center text-xs font-semibold text-sidebar-foreground">
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
      <SidebarFooter>
        <div className="flex flex-col gap-1.5 px-2 py-2">
          <div className="text-[8px] uppercase tracking-widest text-[var(--text-faint)]">Streak</div>
          <div className="text-base font-medium text-[var(--text-muted)]">0 days</div>
          <div className="mt-1 text-[8px] uppercase tracking-widest text-[var(--text-faint)]">Words</div>
          <div className="text-base font-medium text-[var(--text-muted)]">0</div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
