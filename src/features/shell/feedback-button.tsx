import { MessageSquare } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '#/components/ui/button'

export function FeedbackButton() {
  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed bottom-36 right-4 z-40 border-[var(--feedback-border)] bg-[var(--feedback-bg)] text-[var(--feedback-text)] hover:bg-[var(--feedback-hover)] md:bottom-20 md:right-6"
      onClick={() => toast('Feedback coming soon')}
    >
      <MessageSquare className="size-4" />
    </Button>
  )
}
