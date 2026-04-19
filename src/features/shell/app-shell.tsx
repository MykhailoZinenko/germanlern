import { Outlet } from '@tanstack/react-router'

import { SidebarInset, SidebarProvider } from '#/components/ui/sidebar'
import { Toaster } from '#/components/ui/sonner'
import { AppSidebar } from '#/features/shell/app-sidebar'
import { AppTopbar } from '#/features/shell/app-topbar'
import { AppBottomNav } from '#/features/shell/app-bottom-nav'
import { CompanionMini } from '#/features/shell/companion-mini'
import { FeedbackButton } from '#/features/shell/feedback-button'

export function AppShell() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppTopbar />
        <div className="flex-1 p-[var(--space-4)] pb-20 md:p-[var(--space-5)] md:pb-[var(--space-5)]">
          <Outlet />
        </div>
      </SidebarInset>
      <AppBottomNav />
      <CompanionMini />
      <FeedbackButton />
      <Toaster />
    </SidebarProvider>
  )
}
