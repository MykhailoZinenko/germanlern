import { Check, X } from 'lucide-react'

import { Button } from '#/components/ui/button'

export function AiSuggestionRow({
  text,
  onAccept,
  onDismiss,
}: {
  text: string
  onAccept: () => void
  onDismiss: () => void
}) {
  return (
    <div className="mt-1 flex h-7 items-center gap-2 rounded-[var(--radius-md)] border border-[var(--lumi-border)] bg-[var(--lumi-lightest)] px-3 lg:mt-1 lg:h-[var(--vf-ai-row-h)] lg:gap-3 lg:rounded-[var(--radius-lg)] lg:px-4">
      <span className="flex-1 text-xs text-[var(--lumi-text)] lg:text-sm">
        AI suggests: {text}
      </span>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={onAccept}
        className="size-5 rounded-full text-[var(--status-success-text)] hover:bg-[var(--status-success-bg)] lg:size-7"
      >
        <Check className="size-3.5 lg:size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={onDismiss}
        className="size-5 rounded-full text-[var(--text-faint)] hover:bg-[var(--surface-hover)] lg:size-7"
      >
        <X className="size-3.5 lg:size-4" />
      </Button>
    </div>
  )
}
