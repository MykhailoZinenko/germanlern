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
    /* DSidebar: w=DSW=144→×1.756=253→252; pad=10 0→18 0→py-4 */
    <Sidebar collapsible="none" className="hidden !h-auto lg:flex">
      {/* Logo: margin=0 8 14→0 14 25→mx-4 mb-6; pad=7→12; r=7→12→var(--radius-lg); fs=11→19→text-lg; fw=500 */}
      <SidebarHeader className="flex h-[var(--shell-topbar-h)] items-center justify-center border-b border-sidebar-border px-4">
        <div className="w-full rounded-[var(--radius-lg)] bg-sidebar-accent px-3 py-3 text-center text-lg font-medium text-sidebar-foreground">
          GermanLern
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => {
                const isActive = !!matchRoute({ to: item.path, fuzzy: item.path !== '/' })
                return (
                  <SidebarMenuItem key={item.path} id={item.id}>
                    {/* Nav item: pad=7 14→12 25→py-3 px-6; fs=11→19→text-lg; borderLeft active=2→4→border-l-[var(--shell-nav-indicator)] */}
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="h-auto rounded-none py-3 px-6 text-lg"
                    >
                      <Link to={item.path}>
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
      {/* Footer: pad=12 14→21 25→py-5 px-6 */}
      <SidebarFooter className="px-6 py-5">
        {/* label: fs=8→14→text-sm */}
        <div className="text-sm uppercase tracking-widest text-[var(--text-faint)]">Streak</div>
        {/* value: fs=16→28→text-2xl; mb=6→11→mb-3 */}
        <div className="mb-3 text-2xl font-medium text-[var(--text-muted)]">0 days</div>
        <div className="text-sm uppercase tracking-widest text-[var(--text-faint)]">Words</div>
        <div className="text-2xl font-medium text-[var(--text-muted)]">0</div>
      </SidebarFooter>
    </Sidebar>
  )
}
