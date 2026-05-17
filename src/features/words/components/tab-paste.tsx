import { useMemo, useState } from 'react'
import { Sparkles } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '#/components/ui/button'
import { Spinner } from '#/components/ui/spinner'
import { Textarea } from '#/components/ui/textarea'
import { useAddBufferWordsBatch, useExtractWords } from '#/features/words/api/use-buffer'
import type { ExtractedWord } from '#/features/words/api/gemini-server-fns'

type Phase = 'idle' | 'extracting' | 'results'

export function TabPaste() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [text, setText] = useState('')
  const [extractResult, setExtractResult] = useState<ExtractedWord[]>([])
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const extractMutation = useExtractWords()
  const batchMutation = useAddBufferWordsBatch()

  const handleExtract = () => {
    if (!text.trim()) return
    setPhase('extracting')
    extractMutation.mutate(text, {
      onSuccess: (data) => {
        setExtractResult(data.words)
        const newWords = new Set(
          data.words
            .filter((w) => w.status === 'new')
            .map((w) => w.word.toLowerCase()),
        )
        setSelected(newWords)
        setPhase('results')
      },
      onError: () => {
        setPhase('idle')
      },
    })
  }

  const handleToggle = (word: string) => {
    const lower = word.toLowerCase()
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(lower)) {
        next.delete(lower)
      } else {
        next.add(lower)
      }
      return next
    })
  }

  const handleSelectAll = () => {
    const allNew = extractResult
      .filter((w) => w.status === 'new')
      .map((w) => w.word.toLowerCase())
    setSelected(
      selected.size === allNew.length ? new Set() : new Set(allNew),
    )
  }

  const handleAdd = () => {
    const aiWords = extractResult
      .filter((w) => w.status === 'new' && selected.has(w.word.toLowerCase()))
      .map((w) => w.word)
    const aiWordsLower = new Set(aiWords.map((w) => w.toLowerCase()))
    const manualWords = [...selected].filter((w) => !aiWordsLower.has(w))
    const words = [...new Set([...aiWords, ...manualWords])]
    if (words.length === 0) return
    batchMutation.mutate(words, {
      onSuccess: () => {
        toast.success(`${words.length} word${words.length !== 1 ? 's' : ''} added to buffer`)
        setText('')
        setExtractResult([])
        setSelected(new Set())
        setPhase('idle')
      },
    })
  }

  if (phase === 'results') {
    return (
      <PasteResults
        text={text}
        words={extractResult}
        selected={selected}
        onToggle={handleToggle}
        onSelectAll={handleSelectAll}
        onAdd={handleAdd}
        onBack={() => setPhase('idle')}
        isPending={batchMutation.isPending}
      />
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm text-[var(--text-muted)]">
        Paste any German text — AI extracts vocabulary
      </span>
      <Textarea
        placeholder="Paste a paragraph, article, or any German text here…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={phase === 'extracting'}
        className="h-40 resize-none rounded-[var(--radius-md)] border-[var(--border-subtle)] bg-[var(--surface-raised)] text-base"
      />
      <Button
        className="h-10 w-full text-sm font-medium"
        onClick={handleExtract}
        disabled={!text.trim() || phase === 'extracting'}
      >
        {phase === 'extracting' ? (
          <>
            <Spinner className="size-4" />
            Extracting…
          </>
        ) : (
          'Extract words'
        )}
      </Button>
    </div>
  )
}

function PasteResults({
  text,
  words,
  selected,
  onToggle,
  onSelectAll,
  onAdd,
  onBack,
  isPending,
}: {
  text: string
  words: ExtractedWord[]
  selected: Set<string>
  onToggle: (word: string) => void
  onSelectAll: () => void
  onAdd: () => void
  onBack: () => void
  isPending: boolean
}) {
  const newWords = words.filter((w) => w.status === 'new')
  const libWords = words.filter((w) => w.status === 'inLibrary' || w.status === 'inBuffer')
  const selectedCount = selected.size
  const allSelected = selectedCount === newWords.length

  const segments = useMemo(
    () => buildSegments(text, words),
    [text, words],
  )

  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-[var(--lumi-deep)]" />
            <span className="text-sm font-semibold text-[var(--text-primary)]">
              {newWords.length} new word{newWords.length !== 1 ? 's' : ''}
            </span>
          </div>
          <button
            onClick={onSelectAll}
            className="shrink-0 text-sm font-medium text-[var(--lumi-deep)]"
          >
            {allSelected ? 'Deselect all' : 'Select all'}
          </button>
        </div>
        <span className="pl-6 text-[11px] text-[var(--text-muted)]">
          {selectedCount} selected · {libWords.length} already in library
        </span>
      </div>

      <div className="flex-1 overflow-y-auto rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-4 text-base leading-[2.4]">
        {segments.map((seg, i) => {
          if (seg.type === 'plain') {
            return <span key={i}>{seg.text}</span>
          }
          if (seg.type === 'unidentified') {
            const isSelected = selected.has(seg.text.toLowerCase())
            return (
              <span
                key={i}
                onClick={() => onToggle(seg.text)}
                className={`inline cursor-pointer rounded-[var(--radius-sm)] px-0.5 py-0.5 ${
                  isSelected
                    ? 'border border-[var(--lumi-border)] bg-[var(--lumi-light)] px-2 py-1 text-[var(--lumi-text)]'
                    : 'text-[var(--text-primary)] hover:bg-[var(--surface-sunken)]'
                }`}
              >
                {seg.text}
              </span>
            )
          }
          if (seg.status === 'inLibrary' || seg.status === 'inBuffer') {
            return (
              <span
                key={i}
                className="inline rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-2 py-1 text-[var(--text-faint)] line-through"
              >
                {seg.text}
              </span>
            )
          }
          const isSelected = selected.has(seg.text.toLowerCase())
          return (
            <span
              key={i}
              onClick={() => onToggle(seg.text)}
              className={`inline cursor-pointer rounded-[var(--radius-sm)] border px-2 py-1 ${
                isSelected
                  ? 'border-[var(--lumi-border)] bg-[var(--lumi-light)] text-[var(--lumi-text)]'
                  : 'border-[var(--border-medium)] bg-transparent text-[var(--text-secondary)]'
              }`}
            >
              {seg.text}
            </span>
          )
        })}
      </div>

      <p className="text-center text-[11px] text-[var(--text-muted)]">
        Tap any word to toggle. Words already in your library are crossed out.
      </p>

      <div className="flex gap-2">
        <Button
          variant="outline"
          className="h-10 border-[var(--action-secondary-border)] px-4 text-sm font-medium text-[var(--action-secondary-text)]"
          onClick={onBack}
          disabled={isPending}
        >
          Back
        </Button>
        <Button
          className="h-10 flex-1 text-sm font-medium"
          onClick={onAdd}
          disabled={selectedCount === 0 || isPending}
        >
          {isPending ? (
            <Spinner className="size-4" />
          ) : (
            `Add ${selectedCount} word${selectedCount !== 1 ? 's' : ''} to buffer`
          )}
        </Button>
      </div>
    </div>
  )
}

type Segment =
  | { type: 'plain'; text: string }
  | { type: 'word'; text: string; status: ExtractedWord['status'] }
  | { type: 'unidentified'; text: string }

function buildSegments(text: string, words: ExtractedWord[]): Segment[] {
  const positions: Array<{ start: number; end: number; word: string; status: ExtractedWord['status'] }> = []

  for (const { word, status } of words) {
    const regex = new RegExp(`\\b${escapeRegex(word)}\\b`, 'gi')
    let match: RegExpExecArray | null
    while ((match = regex.exec(text)) !== null) {
      positions.push({
        start: match.index,
        end: match.index + match[0].length,
        word: match[0],
        status,
      })
    }
  }

  positions.sort((a, b) => a.start - b.start)

  const deduped: typeof positions = []
  for (const pos of positions) {
    const last = deduped[deduped.length - 1]
    if (last && pos.start < last.end) continue
    deduped.push(pos)
  }

  const raw: Segment[] = []
  let cursor = 0
  for (const pos of deduped) {
    if (pos.start > cursor) {
      raw.push({ type: 'plain', text: text.slice(cursor, pos.start) })
    }
    raw.push({ type: 'word', text: pos.word, status: pos.status })
    cursor = pos.end
  }
  if (cursor < text.length) {
    raw.push({ type: 'plain', text: text.slice(cursor) })
  }

  const segments: Segment[] = []
  for (const seg of raw) {
    if (seg.type !== 'plain') {
      segments.push(seg)
      continue
    }
    const tokens = seg.text.match(/[a-zA-ZäöüÄÖÜß]+|[^a-zA-ZäöüÄÖÜß]+/g)
    if (!tokens) continue
    for (const token of tokens) {
      if (/[a-zA-ZäöüÄÖÜß]/.test(token)) {
        segments.push({ type: 'unidentified', text: token })
      } else {
        segments.push({ type: 'plain', text: token })
      }
    }
  }

  return segments
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
