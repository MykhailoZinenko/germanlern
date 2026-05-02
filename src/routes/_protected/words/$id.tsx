import { createFileRoute } from '@tanstack/react-router'

import { useWord } from '#/features/words/api/use-words'
import {
  WordDetail as WordDetailContent,
  WordDetailSkeleton,
} from '#/features/words/components/word-detail'

export const Route = createFileRoute('/_protected/words/$id')({
  component: WordDetailPage,
})

function WordDetailPage() {
  const { id } = Route.useParams()
  const { data: word, isLoading } = useWord(id)

  return (
    <div>
      {isLoading ? (
        <WordDetailSkeleton />
      ) : word ? (
        <WordDetailContent word={word} />
      ) : (
        <p className="text-sm text-[var(--text-muted)]">Word not found.</p>
      )}
    </div>
  )
}
