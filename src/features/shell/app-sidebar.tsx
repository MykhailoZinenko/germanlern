import { Link, useMatchRoute } from '@tanstack/react-router'
import {
  BookOpen,
  BookText,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Settings,
  User,
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '#/components/ui/sidebar'

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/' as const, icon: LayoutDashboard, id: 'nav-dashboard' },
  { label: 'Words', path: '/words' as const, icon: BookOpen, id: 'nav-library' },
  { label: 'Study', path: '/study' as const, icon: GraduationCap, id: 'nav-study' },
  { label: 'Read', path: '/read' as const, icon: BookText, id: 'nav-read' },
  { label: 'Documents', path: '/documents' as const, icon: FileText, id: 'nav-documents' },
] as const

const SECONDARY_ITEMS = [
  { label: 'Settings', path: '/settings' as const, icon: Settings },
  { label: 'Profile', path: '/profile' as const, icon: User },
] as const

export function AppSidebar() {
  const matchRoute = useMatchRoute()

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center gap-2 px-2 py-3">
            <span className="h-2 w-2 rounded-full bg-[var(--lumi-mid)]" />
            <span className="font-heading text-sm font-semibold">GermanLern</span>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => (
                <SidebarMenuItem key={item.path} id={item.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={!!matchRoute({ to: item.path, fuzzy: item.path !== '/' })}
                  >
                    <Link to={item.path}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {SECONDARY_ITEMS.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={!!matchRoute({ to: item.path })}
                  >
                    <Link to={item.path}>
                      <item.icon />
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
        <div className="flex flex-col gap-1 px-2 py-2 text-xs text-[var(--text-muted)]">
          <span>🔥 0 day streak</span>
          <span>0 words</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
