import { Card, CardContent } from '#/components/ui/card'
import { Label } from '#/components/ui/label'
import type { WordRow } from '#/features/words/api/words-server-fns'

export function GrammarSection({ word }: { word: WordRow }) {
  if (word.word_type === 'noun') return <NounGrammar word={word} />
  if (word.word_type === 'verb') return <VerbGrammar word={word} />
  if (word.word_type === 'adjective') return <AdjectiveGrammar word={word} />
  return null
}

function GrammarRow({ label, value }: { label: string; value: string }) {
  return (
    <>
      <span className="text-sm text-[var(--text-muted)]">{label}</span>
      <span className="text-sm text-[var(--text-primary)]">{value}</span>
    </>
  )
}

function NounGrammar({ word }: { word: WordRow }) {
  if (!word.plural_form && !word.gender) return null
  return (
    <div>
      <Label className="mb-2 text-xs uppercase tracking-wider text-[var(--text-muted)]">
        Grammar
      </Label>
      <Card size="compact" className="border-[var(--border-subtle)] bg-[var(--surface-raised)]">
        <CardContent className="p-4">
          <div className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 text-sm">
            {word.gender && (
              <GrammarRow
                label="Gender"
                value={`${word.gender} (${word.gender === 'der' ? 'masculine' : word.gender === 'die' ? 'feminine' : 'neuter'})`}
              />
            )}
            {word.plural_form && (
              <GrammarRow label="Plural" value={word.plural_form} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function VerbGrammar({ word }: { word: WordRow }) {
  const conjugations = word.conjugations as Record<string, string> | null
  if (!conjugations && !word.conjugation_type && word.is_separable === null) return null
  return (
    <div>
      <Label className="mb-2 text-xs uppercase tracking-wider text-[var(--text-muted)]">
        Grammar
      </Label>
      <Card size="compact" className="border-[var(--border-subtle)] bg-[var(--surface-raised)]">
        <CardContent className="space-y-3 p-4">
          {conjugations && (
            <div className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 text-sm">
              {Object.entries(conjugations).map(([pronoun, form]) => (
                <GrammarRow key={pronoun} label={pronoun} value={form} />
              ))}
            </div>
          )}
          <div className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 text-sm">
            {word.conjugation_type && (
              <GrammarRow label="Type" value={word.conjugation_type} />
            )}
            {word.is_separable !== null && (
              <GrammarRow label="Separable" value={word.is_separable ? 'Yes' : 'No'} />
            )}
            {word.takes_case && (
              <GrammarRow label="Case" value={word.takes_case} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AdjectiveGrammar({ word }: { word: WordRow }) {
  if (!word.comparative && !word.superlative) return null
  return (
    <div>
      <Label className="mb-2 text-xs uppercase tracking-wider text-[var(--text-muted)]">
        Grammar
      </Label>
      <Card size="compact" className="border-[var(--border-subtle)] bg-[var(--surface-raised)]">
        <CardContent className="p-4">
          <div className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 text-sm">
            {word.comparative && (
              <GrammarRow label="Comparative" value={word.comparative} />
            )}
            {word.superlative && (
              <GrammarRow label="Superlative" value={word.superlative} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
