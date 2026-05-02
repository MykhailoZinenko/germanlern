import { Label } from '#/components/ui/label'
import { Skeleton } from '#/components/ui/skeleton'
import type { WordRow } from '#/features/words/api/words-server-fns'
import { getWordStage } from '#/features/words/utils/stage'

import { GrammarSection } from './grammar-section'
import { LearningStats } from './learning-stats'
import { AiTagChip, GenderPill, StageChip, TypeChip } from './word-chips'

export function WordDetail({ word }: { word: WordRow }) {
  const stage = getWordStage(word)
  const altTranslations = word.alt_translations as string[] | null
  const exampleSentences = word.example_sentences as Array<{
    german?: string
    de?: string
    translation?: string
  }> | null
  const tags = word.ai_tags ?? []

  return (
    <div>
      {/* chips row: gap=5→mob 6→4, desk 9→8; mb≈6→mob 7→8, desk 11→12 */}
      <div className="mb-2 flex flex-wrap items-center gap-1 lg:mb-3 lg:gap-2">
        <GenderPill gender={word.gender} />
        <TypeChip type={word.word_type} />
        <StageChip stage={stage} />
      </div>

      {/* title: fs=26→mob 29→text-2xl, desk 46→text-4xl; fw=500; mb=4→mob 4→4, desk 7→8 */}
      <h2 className="mb-1 font-heading text-2xl font-medium text-[var(--text-primary)] lg:mb-2 lg:text-4xl">
        {word.german_word}
      </h2>

      {/* subtitle: fs=13→mob 14→text-sm, desk 23→text-xl; mb=14→mob 15→16, desk 25→24 */}
      <p className="mb-4 text-sm text-[var(--text-secondary)] lg:mb-6 lg:text-xl">
        {word.translation}
      </p>

      {/* sections mb=12→mob 13→12, desk 21→20 */}
      {altTranslations && altTranslations.length > 0 && (
        <div className="mb-3 lg:mb-5">
          {/* Lbl: fs=9→mob 10→text-xs, desk 16→text-sm; mb=4→mob 4→4, desk 7→8 */}
          <Label className="mb-1 text-xs lg:mb-2 lg:text-sm">Also means</Label>
          {/* content: fs=10→mob 11→text-xs, desk 18→text-base */}
          <p className="text-xs text-[var(--text-muted)] lg:text-sm">
            {altTranslations.join(' \u00B7 ')}
          </p>
        </div>
      )}

      {exampleSentences && exampleSentences.length > 0 && (
        <div className="mb-3 lg:mb-5">
          <Label className="mb-1 text-xs lg:mb-2 lg:text-sm">Example sentences</Label>
          {exampleSentences.map((ex, i) => (
            /* example: pad=7 10→mob 8 11→8 12, desk 12 18→12 16; r=8→mob 9→var(--radius-md), desk 14→var(--radius-xl); mb=5→mob 6→4, desk 9→8 */
            <div
              key={i}
              className="mb-1 rounded-[var(--radius-md)] bg-[var(--surface-sunken)] p-2 px-3 lg:mb-2 lg:rounded-[var(--radius-xl)] lg:p-3 lg:px-4"
            >
              {/* german: fs=11→mob 12→text-xs, desk 19→text-base; mb=2→mob 2→2, desk 4→4 */}
              <p className="text-xs text-[var(--text-primary)] lg:text-sm">
                {ex.german ?? ex.de}
              </p>
              {/* indonesian: fs=9→mob 10→text-[10px], desk 16→text-sm */}
              <p className="text-[10px] text-[var(--text-muted)] lg:text-xs">
                {ex.translation}
              </p>
            </div>
          ))}
        </div>
      )}

      <GrammarSection word={word} />

      {tags.length > 0 && (
        <div className="mb-3 lg:mb-5">
          <Label className="mb-1 text-xs lg:mb-2 lg:text-sm">Tags</Label>
          <div className="flex flex-wrap gap-1 lg:gap-2">
            {tags.map((t) => (
              <AiTagChip key={t} label={t} />
            ))}
          </div>
        </div>
      )}

      <LearningStats word={word} />
    </div>
  )
}

export function WordDetailSkeleton() {
  return (
    <div>
      <div className="mb-2 flex gap-1 lg:mb-3 lg:gap-2">
        <Skeleton className="h-[var(--chip-h-mobile)] w-10 rounded-full lg:h-9 lg:w-16" />
        <Skeleton className="h-[var(--chip-h-mobile)] w-12 rounded-full lg:h-9 lg:w-20" />
        <Skeleton className="h-[var(--chip-h-mobile)] w-20 rounded-full lg:h-9 lg:w-28" />
      </div>
      <Skeleton className="mb-1 h-8 w-40 lg:mb-2 lg:h-12 lg:w-60" />
      <Skeleton className="mb-4 h-5 w-24 lg:mb-6 lg:h-6 lg:w-36" />
      <Skeleton className="mb-3 h-16 w-full lg:mb-5 lg:h-20" />
      <Skeleton className="mb-3 h-20 w-full lg:mb-5 lg:h-24" />
      <Skeleton className="h-24 w-full lg:h-28" />
    </div>
  )
}
