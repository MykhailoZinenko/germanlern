import { MessageSquare } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '#/components/ui/button'

export function FeedbackButton() {
  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed bottom-[calc(var(--shell-bottomnav-h)+var(--space-4)+5rem+var(--space-2))] right-[var(--space-4)] z-40 border-[var(--feedback-border)] bg-[var(--feedback-bg)] text-[var(--feedback-text)] hover:bg-[var(--feedback-hover)] md:bottom-[calc(var(--space-6)+5rem+var(--space-2))] md:right-[var(--space-6)]"
      onClick={() => toast('Feedback coming soon')}
    >
      <MessageSquare className="size-4" />
    </Button>
  )
}
