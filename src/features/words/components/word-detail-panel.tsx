import { Button } from '#/components/ui/button'
import { ScrollArea } from '#/components/ui/scroll-area'
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
    <div className="flex flex-1 flex-col overflow-hidden border-l border-[var(--border-subtle)]">
      {/* DetailPanel header: h=DTB=48→×1.756=84→var(--shell-topbar-h); pad=0 20→×1.756=0 35→0 36→px-9 */}
      {/* title fs=13→×1.756=23→text-xl */}
      {/* Edit btn: w=60→×1.756=105→w-auto, h=26→×1.756=46→h-auto, fs=10→×1.756=18→text-base */}
      <div className="flex h-[var(--shell-topbar-h)] shrink-0 items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--surface-page)] px-9">
        <span className="text-xl font-medium text-[var(--text-primary)]">
          Word detail
        </span>
        <Button variant="outline" className="h-[var(--wl-search-h-desktop)] px-8 text-base">
          Edit
        </Button>
      </div>
      {/* content: pad=16 20→×1.756=28 35→28 36 */}
      <ScrollArea className="flex-1 overflow-hidden">
        <div className="px-9 py-7">
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
      </ScrollArea>
    </div>
  )
}
