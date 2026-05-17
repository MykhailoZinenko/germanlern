import { ChevronRight, Sparkles } from 'lucide-react'

import { cn } from '#/lib/utils'
import { useWordStore } from '#/store/word-store'

export function BufferBadge({ className }: { className?: string }) {
  const bufferCount = useWordStore((s) => s.bufferCount)

  const hasWords = bufferCount > 0
  const text = hasWords
    ? `${bufferCount} word${bufferCount !== 1 ? 's' : ''} in buffer · not yet verified`
    : 'No words yet'

  return (
    <div
      className={cn(
        'flex h-10 shrink-0 items-center gap-2 px-4',
        hasWords
          ? 'border-b border-[var(--stage-planted-border)] bg-[var(--stage-planted-bg)]'
          : 'border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)]',
        className,
      )}
    >
      {hasWords && <Sparkles className="size-4 text-[var(--stage-planted-text)]" />}
      <span
        className={cn(
          'flex-1 text-sm',
          hasWords
            ? 'font-medium text-[var(--stage-planted-text)]'
            : 'text-[var(--text-muted)]',
        )}
      >
        {text}
      </span>
      {hasWords && <ChevronRight className="size-4 text-[var(--stage-planted-text)]" />}
    </div>
  )
}
