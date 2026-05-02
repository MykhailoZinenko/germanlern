import type { WordRow } from '#/features/words/api/words-server-fns'

import { WordDetail, WordDetailSkeleton } from './word-detail'

export function WordDetailPanel({
  word,
  isLoading,
}: {
  word?: WordRow
  isLoading?: boolean
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col border-l border-[var(--border-subtle)] bg-[var(--surface-page)]">
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {isLoading ? (
            <WordDetailSkeleton />
          ) : word ? (
            <WordDetail word={word} />
          ) : (
            <p className="text-sm text-[var(--text-faint)]">
              Select a word to view details
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
