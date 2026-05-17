import { Loader2 } from 'lucide-react'

import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Skeleton } from '#/components/ui/skeleton'
import { useUserTags } from '#/features/words/api/use-tags'

interface TabByTagProps {
  selectedTags: string[]
  onToggleTag: (tag: string) => void
  onStart: () => void
  isLoading?: boolean
}

export function TabByTag({ selectedTags, onToggleTag, onStart, isLoading }: TabByTagProps) {
  const { data: tags, isLoading: isTagsLoading } = useUserTags()

  return (
    <div className="space-y-3">
      <p className="text-xs text-[var(--text-muted)]">Select tags to study</p>

      {isTagsLoading ? (
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-7 w-16 rounded-full" />
          ))}
        </div>
      ) : tags && tags.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => {
            const isSelected = selectedTags.includes(tag.name)
            return (
              <Badge
                key={tag.id}
                variant={isSelected ? 'default' : 'outline'}
                className="cursor-pointer select-none"
                onClick={() => onToggleTag(tag.name)}
              >
                {tag.name}
              </Badge>
            )
          })}
        </div>
      ) : (
        <p className="text-xs text-[var(--text-faint)]">
          No tags yet. Add tags to your words first.
        </p>
      )}

      {selectedTags.length > 0 && (
        <p className="text-xs text-[var(--text-faint)]">
          {selectedTags.length} tag{selectedTags.length > 1 ? 's' : ''} selected
        </p>
      )}

      <Button
        className="w-full"
        onClick={onStart}
        disabled={isLoading || selectedTags.length === 0}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Preparing...
          </>
        ) : (
          'Start session'
        )}
      </Button>
    </div>
  )
}
