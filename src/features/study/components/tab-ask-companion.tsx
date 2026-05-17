import { Button } from '#/components/ui/button'
import { Textarea } from '#/components/ui/textarea'

interface TabAskCompanionProps {
  prompt: string
  onPromptChange: (value: string) => void
}

export function TabAskCompanion({ prompt, onPromptChange }: TabAskCompanionProps) {
  return (
    <div className="space-y-3">
      <p className="text-xs text-[var(--text-muted)]">Describe what you want to study</p>

      <Textarea
        placeholder="I want to practice animal vocabulary..."
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        className="min-h-[60px] resize-none"
      />

      <Button className="w-full" disabled>
        Ask companion
      </Button>

      <p className="text-center text-xs text-[var(--text-faint)]">
        Coming soon — companion chat in a future update
      </p>
    </div>
  )
}
