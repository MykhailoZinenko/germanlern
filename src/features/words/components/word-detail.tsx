import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import {
  Archive,
  Leaf,
  MoreHorizontal,
  RefreshCw,
  Trash2,
} from 'lucide-react'

import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Card, CardContent } from '#/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { Skeleton } from '#/components/ui/skeleton'
import { Textarea } from '#/components/ui/textarea'
import { useIsMobile } from '#/hooks/use-mobile'
import type { WordRow } from '#/features/words/api/words-server-fns'
import {
  useDeleteWord,
  useMarkWordAsLeech,
  useResetWordProgress,
  useUpdateWord,
} from '#/features/words/api/use-words'
import { getWordStage } from '#/features/words/utils/stage'

import { GrammarSection } from './grammar-section'
import { LearningStats } from './learning-stats'
import {
  AiTagChip,
  GenderChip,
  SrcChip,
  StageChip,
  TypeChip,
} from './word-chips'

export function WordDetail({ word }: { word: WordRow }) {
  const [editing, setEditing] = useState(false)
  const stage = getWordStage(word)
  const altTranslations = word.alt_translations as string[] | null
  const exampleSentences = word.example_sentences as Array<{
    german?: string
    de?: string
    translation?: string
  }> | null
  const aiTags = word.ai_tags ?? []
  const isMobile = useIsMobile()
  const navigate = useNavigate()

  const deleteMutation = useDeleteWord()
  const resetMutation = useResetWordProgress()
  const leechMutation = useMarkWordAsLeech()

  const handleDelete = () => {
    if (!window.confirm(`Delete "${word.german_word}"? This cannot be undone.`)) return
    deleteMutation.mutate(word.id, {
      onSuccess: () => {
        if (isMobile) {
          navigate({ to: '/words' })
        }
      },
    })
  }

  const handleReset = () => {
    resetMutation.mutate(word.id)
  }

  const handleLeech = () => {
    leechMutation.mutate(word.id)
  }

  if (editing) {
    return <WordEditForm word={word} onClose={() => setEditing(false)} />
  }

  return (
    <div className="flex flex-col gap-5 p-6 lg:p-6">
      <div className="flex flex-wrap gap-2">
        <GenderChip gender={word.gender} />
        <TypeChip type={word.word_type} />
        <StageChip stage={stage} />
        <SrcChip src={word.verification_source} />
      </div>

      <div>
        <h2 className="font-heading text-4xl font-semibold text-[var(--text-primary)]">
          {word.german_word}
        </h2>
        <p className="mt-1 text-lg text-[var(--text-secondary)]">
          {word.translation}
        </p>
      </div>

      {altTranslations && altTranslations.length > 0 && (
        <div>
          <Label className="mb-2 text-xs uppercase tracking-wider text-[var(--text-muted)]">
            Also translates as
          </Label>
          <div className="flex flex-wrap gap-2">
            {altTranslations.map((t) => (
              <Badge
                key={t}
                variant="outline"
                className="h-6 rounded-full border-[var(--status-neutral-border)] bg-[var(--status-neutral-bg)] px-3 text-[11px] font-medium text-[var(--status-neutral-text)]"
              >
                {t}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {exampleSentences && exampleSentences.length > 0 && (
        <div>
          <Label className="mb-2 text-xs uppercase tracking-wider text-[var(--text-muted)]">
            Examples
          </Label>
          <div className="flex flex-col gap-3">
            {exampleSentences.map((ex, i) => (
              <Card
                key={i}
                size="compact"
                className="border-[var(--border-subtle)] bg-[var(--surface-raised)]"
              >
                <CardContent className="p-4">
                  <p className="font-heading text-base text-[var(--text-primary)]">
                    {ex.german ?? ex.de}
                  </p>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">
                    {ex.translation}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <GrammarSection word={word} />

      {aiTags.length > 0 && (
        <div>
          <Label className="mb-2 text-xs uppercase tracking-wider text-[var(--text-muted)]">
            Tags
          </Label>
          <div className="flex flex-wrap gap-2">
            {aiTags.map((t) => (
              <AiTagChip key={t} label={t} />
            ))}
          </div>
        </div>
      )}

      <LearningStats word={word} />

      <div className="flex gap-2 pt-2">
        <Button className="h-10 rounded-[var(--radius-md)] px-4 text-sm font-medium">
          Study this word
        </Button>
        <Button
          variant="outline"
          className="h-10 rounded-[var(--radius-md)] border-[var(--action-secondary-border)] px-4 text-sm font-medium text-[var(--action-secondary-text)]"
          onClick={() => setEditing(true)}
        >
          Edit
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-10 w-10 rounded-[var(--radius-md)] p-0"
            >
              <MoreHorizontal className="size-4 text-[var(--text-secondary)]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[240px]">
            <DropdownMenuItem onClick={handleReset} disabled={resetMutation.isPending}>
              <RefreshCw className="mr-3 size-4" />
              <div>
                <div>Reset progress</div>
                <div className="text-xs text-[var(--text-muted)]">
                  Back to &lsquo;Just planted&rsquo;
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLeech} disabled={leechMutation.isPending}>
              <Leaf className="mr-3 size-4" />
              <div>
                <div>Mark as leech</div>
                <div className="text-xs text-[var(--text-muted)]">
                  Flag a stuck word
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <Archive className="mr-3 size-4" />
              <div>
                <div>Archive</div>
                <div className="text-xs text-[var(--text-muted)]">
                  Hide from reviews
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="text-[var(--status-error-text)] focus:text-[var(--status-error-text)]"
            >
              <Trash2 className="mr-3 size-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

function WordEditForm({
  word,
  onClose,
}: {
  word: WordRow
  onClose: () => void
}) {
  const [germanWord, setGermanWord] = useState(word.german_word)
  const [translation, setTranslation] = useState(word.translation ?? '')
  const [altTranslations, setAltTranslations] = useState(
    ((word.alt_translations as string[]) ?? []).join(', '),
  )
  const [notes, setNotes] = useState(word.notes ?? '')
  const [customSentence, setCustomSentence] = useState(word.custom_sentence ?? '')

  const updateMutation = useUpdateWord()

  const handleSave = () => {
    const altArr = altTranslations
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)

    updateMutation.mutate(
      {
        id: word.id,
        german_word: germanWord,
        translation,
        alt_translations: altArr.length > 0 ? altArr : undefined,
        notes: notes || null,
        custom_sentence: customSentence || null,
      },
      { onSuccess: onClose },
    )
  }

  return (
    <div className="flex flex-col gap-4 p-6">
      <h3 className="font-heading text-xl font-semibold text-[var(--text-primary)]">
        Edit word
      </h3>

      <div className="flex flex-col gap-1">
        <Label className="text-xs text-[var(--text-muted)]">German word</Label>
        <Input
          value={germanWord}
          onChange={(e) => setGermanWord(e.target.value)}
          className="h-10 border-[var(--border-subtle)] bg-[var(--surface-raised)]"
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label className="text-xs text-[var(--text-muted)]">Translation</Label>
        <Input
          value={translation}
          onChange={(e) => setTranslation(e.target.value)}
          className="h-10 border-[var(--border-subtle)] bg-[var(--surface-raised)]"
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label className="text-xs text-[var(--text-muted)]">
          Alternative translations (comma-separated)
        </Label>
        <Input
          value={altTranslations}
          onChange={(e) => setAltTranslations(e.target.value)}
          className="h-10 border-[var(--border-subtle)] bg-[var(--surface-raised)]"
          placeholder="e.g. merindukan, rindu yang dalam"
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label className="text-xs text-[var(--text-muted)]">Notes</Label>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="min-h-16 border-[var(--border-subtle)] bg-[var(--surface-raised)]"
          placeholder="Personal notes about this word…"
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label className="text-xs text-[var(--text-muted)]">Custom sentence</Label>
        <Textarea
          value={customSentence}
          onChange={(e) => setCustomSentence(e.target.value)}
          className="min-h-16 border-[var(--border-subtle)] bg-[var(--surface-raised)]"
          placeholder="Your own example sentence…"
        />
      </div>

      <div className="flex gap-2 pt-2">
        <Button onClick={handleSave} disabled={updateMutation.isPending}>
          {updateMutation.isPending ? 'Saving…' : 'Save'}
        </Button>
        <Button variant="outline" onClick={onClose} disabled={updateMutation.isPending}>
          Cancel
        </Button>
      </div>
    </div>
  )
}

export function WordDetailSkeleton() {
  return (
    <div className="flex flex-col gap-5 p-6">
      <div className="flex gap-2">
        <Skeleton className="h-6 w-10 rounded-full" />
        <Skeleton className="h-6 w-14 rounded-full" />
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>
      <div>
        <Skeleton className="h-10 w-48" />
        <Skeleton className="mt-2 h-5 w-32" />
      </div>
      <Skeleton className="h-20 w-full rounded-[var(--radius-xl)]" />
      <Skeleton className="h-16 w-full rounded-[var(--radius-xl)]" />
      <div className="grid grid-cols-2 gap-3">
        <Skeleton className="h-16 rounded-[var(--radius-xl)]" />
        <Skeleton className="h-16 rounded-[var(--radius-xl)]" />
        <Skeleton className="h-16 rounded-[var(--radius-xl)]" />
        <Skeleton className="h-16 rounded-[var(--radius-xl)]" />
      </div>
    </div>
  )
}
