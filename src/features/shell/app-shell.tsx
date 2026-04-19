import type React from 'react'
import { Outlet } from '@tanstack/react-router'

import { SidebarProvider } from '#/components/ui/sidebar'
import { Toaster } from '#/components/ui/sonner'
import { AppSidebar } from '#/features/shell/app-sidebar'
import { AppTopbar } from '#/features/shell/app-topbar'
import { AppBottomNav } from '#/features/shell/app-bottom-nav'
import { CompanionMini } from '#/features/shell/companion-mini'
import { FeedbackButton } from '#/features/shell/feedback-button'

export function AppShell() {
  return (
    <SidebarProvider style={{ "--sidebar-width": "9rem" } as React.CSSProperties}>
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <AppTopbar />
        <main className="flex-1 p-[var(--space-4)] pb-16 md:p-[var(--space-5)]">
          <Outlet />
        </main>
      </div>
      <AppBottomNav />
      <CompanionMini />
      <FeedbackButton />
      <Toaster />
    </SidebarProvider>
  )
}
