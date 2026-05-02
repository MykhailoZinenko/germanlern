import { Outlet } from '@tanstack/react-router'

import { SidebarInset, SidebarProvider } from '#/components/ui/sidebar'
import { Toaster } from '#/components/ui/sonner'
import { AppSidebar } from '#/features/shell/app-sidebar'
import { AppTopbar } from '#/features/shell/app-topbar'
import { AppBottomNav } from '#/features/shell/app-bottom-nav'
import { CompanionMini } from '#/features/shell/companion-mini'
import { FeedbackButton } from '#/features/shell/feedback-button'
import { AddWord } from '#/features/words/components/add-word'
import { VerifyFlow } from '#/features/words/components/verify-flow'

export function AppShell() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="relative">
        <AppTopbar />
        <div className="relative flex-1 p-[var(--shell-page-pad-x-mobile)] pb-[calc(var(--shell-bottomnav-h)+var(--shell-page-pad-x-mobile))] lg:p-[var(--shell-page-pad-x)] lg:pb-[var(--shell-page-pad-x)]">
          <Outlet />
          <VerifyFlow />
        </div>
      </SidebarInset>
      <AppBottomNav />
      <CompanionMini />
      <FeedbackButton />
      <AddWord />
      <Toaster />
    </SidebarProvider>
  )
}
