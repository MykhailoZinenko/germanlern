import { Label } from '#/components/ui/label'
import type { WordRow } from '#/features/words/api/words-server-fns'

export function GrammarSection({ word }: { word: WordRow }) {
  if (word.word_type === 'noun') return <NounGrammar word={word} />
  if (word.word_type === 'verb') return <VerbGrammar word={word} />
  if (word.word_type === 'adjective') return <AdjectiveGrammar word={word} />
  return null
}

function NounGrammar({ word }: { word: WordRow }) {
  if (!word.plural_form && !word.gender) return null

  return (
    /* section mb=12→mob 13→12, desk 21→20 */
    <div className="mb-3 lg:mb-5">
      {/* Lbl: fs=9→mob 10→text-xs, desk 16→text-sm; mb=4→mob 4→4, desk 7→8 */}
      <Label className="mb-1 text-xs lg:mb-2 lg:text-sm">Grammar &middot; Noun</Label>
      {/* grammar: pad=8 12→mob 9 13→8 12, desk 14 21→16 20; r=8→mob 9→var(--radius-md), desk 14→var(--radius-xl); gap=20→mob 22→20, desk 35→36 */}
      <div className="flex gap-5 rounded-[var(--radius-md)] bg-[var(--surface-sunken)] p-2 px-3 lg:gap-9 lg:rounded-[var(--radius-xl)] lg:px-5 lg:py-4">
        {word.plural_form && (
          <div>
            {/* inner label: fs=9→mob 10→text-[10px], desk 16→text-xs; mb=2 */}
            <Label className="mb-0.5 text-[10px] lg:text-xs">Plural</Label>
            {/* value: fs=12→mob 13→text-sm, desk 21→text-lg */}
            <p className="text-sm font-medium text-[var(--text-primary)] lg:text-lg">
              {word.plural_form}
            </p>
          </div>
        )}
        {word.gender && (
          <div>
            <Label className="mb-0.5 text-[10px] lg:text-xs">Gender</Label>
            <p className="text-sm font-medium text-[var(--text-primary)] lg:text-lg">
              {word.gender} ({word.gender === 'der' ? 'masculine' : word.gender === 'die' ? 'feminine' : 'neuter'})
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function VerbGrammar({ word }: { word: WordRow }) {
  const conjugations = word.conjugations as Record<string, string> | null

  if (!conjugations && !word.conjugation_type && word.is_separable === null) return null

  return (
    <div className="mb-3 lg:mb-5">
      <Label className="mb-1 text-xs lg:mb-2 lg:text-sm">Grammar &middot; Verb</Label>
      <div className="space-y-2 rounded-[var(--radius-md)] bg-[var(--surface-sunken)] p-2 px-3 lg:space-y-3 lg:rounded-[var(--radius-xl)] lg:px-5 lg:py-4">
        {conjugations && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 lg:gap-x-7">
            {Object.entries(conjugations).map(([pronoun, form]) => (
              <div key={pronoun} className="flex gap-2">
                <span className="text-[10px] text-[var(--text-muted)] lg:text-xs">{pronoun}</span>
                <span className="text-sm font-medium text-[var(--text-primary)] lg:text-lg">
                  {form}
                </span>
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-5 lg:gap-9">
          {word.conjugation_type && (
            <div>
              <Label className="mb-0.5 text-[10px] lg:text-xs">Type</Label>
              <p className="text-sm text-[var(--text-primary)] lg:text-lg">
                {word.conjugation_type}
              </p>
            </div>
          )}
          {word.is_separable !== null && (
            <div>
              <Label className="mb-0.5 text-[10px] lg:text-xs">Separable</Label>
              <p className="text-sm text-[var(--text-primary)] lg:text-lg">
                {word.is_separable ? 'Yes' : 'No'}
              </p>
            </div>
          )}
          {word.takes_case && (
            <div>
              <Label className="mb-0.5 text-[10px] lg:text-xs">Case</Label>
              <p className="text-sm text-[var(--text-primary)] lg:text-lg">
                {word.takes_case}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function AdjectiveGrammar({ word }: { word: WordRow }) {
  if (!word.comparative && !word.superlative) return null

  return (
    <div className="mb-3 lg:mb-5">
      <Label className="mb-1 text-xs lg:mb-2 lg:text-sm">Grammar &middot; Adjective</Label>
      <div className="flex gap-5 rounded-[var(--radius-md)] bg-[var(--surface-sunken)] p-2 px-3 lg:gap-9 lg:rounded-[var(--radius-xl)] lg:px-5 lg:py-4">
        {word.comparative && (
          <div>
            <Label className="mb-0.5 text-[10px] lg:text-xs">Comparative</Label>
            <p className="text-sm font-medium text-[var(--text-primary)] lg:text-lg">
              {word.comparative}
            </p>
          </div>
        )}
        {word.superlative && (
          <div>
            <Label className="mb-0.5 text-[10px] lg:text-xs">Superlative</Label>
            <p className="text-sm font-medium text-[var(--text-primary)] lg:text-lg">
              {word.superlative}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
