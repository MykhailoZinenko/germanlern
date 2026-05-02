# Word Library UI Rework — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current Word Library UI with production components matching the new high-fidelity wireframes in `src/sandbox/wireframes/word-library/`.

**Architecture:** The wireframes define exact layouts, token usage, and component composition. Each wireframe primitive maps to a shadcn component (marked via `data-shadcn` attributes). The shell (sidebar, topbar, bottom nav) is NOT touched — only the content area rendered by `<Outlet />` inside `AppShell`. The topbar already handles Word Library titles and the "Add words" button. CSS tokens are updated to match wireframe values, then components are rewritten to use Tailwind classes referencing those tokens.

**Tech Stack:** React, TanStack Router, TanStack Query, shadcn/ui (Badge, Card, Button, Input, ToggleGroup, DropdownMenu, Drawer, ScrollArea, Skeleton, Separator, Label), Tailwind CSS v4, Zustand, Lucide icons.

**Key wireframe-to-production mappings:**
- `Chip` → `Badge` (shadcn)
- `Btn` → `Button` (shadcn)
- `Field` → `Input` (shadcn)
- `Card` → `Card` (shadcn)
- `ToggleGroup` → `ToggleGroup` (shadcn)
- `MoreMenu` → `DropdownMenu` (shadcn, desktop) / `Drawer` (shadcn, mobile)
- `Sep` → `Separator` (shadcn)
- `Lbl` → `Label` (shadcn)

**CSS token changes (wireframe values → production):**
| Token | Old | New | Source |
|---|---|---|---|
| `--wl-search-h` | 32px | 40px | `wfSize.searchH = 40` |
| `--wl-search-h-desktop` | 60px | 40px | same field height on desktop |
| `--wl-filter-h` | 24px | 32px | stage chip height = 32 |
| `--wl-filter-h-desktop` | 40px | 32px | same |
| `--wl-detail-list-w` | 440px | 460px | `DETAIL_LIST_W = 460` |
| `--wl-card-strip-h` | 3px | 4px | `wfSize.cardStripH = 4` |
| `--wl-card-min-w` | 220px | 280px | `wfSize.cardMinW = 280` |
| NEW `--wl-detail-cards-w` | — | 620px | `DETAIL_CARDS_W = 620` |
| NEW `--wl-stage-dot` | — | 10px | `wfSize.stageDot = 10` |

---

### Task 1: Update CSS tokens

**Files:**
- Modify: `src/styles.css:165-173`

- [ ] **Step 1: Update word library tokens in styles.css**

Replace the `/* ── Word Library (wl/) ── */` block:

```css
/* ── Word Library (wl/) ── */
--wl-search-h: 40px;
--wl-filter-chip-h: 32px;
--wl-detail-list-w: 460px;
--wl-detail-cards-w: 620px;
--wl-card-strip-h: 4px;
--wl-card-min-w: 280px;
--wl-stage-dot: 10px;
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds. Some components may warn about removed tokens — that's fine, we're about to rewrite them.

- [ ] **Step 3: Commit**

```
feat(words): update word library CSS tokens to match wireframes
```

---

### Task 2: Rewrite stage-dot.tsx

**Files:**
- Modify: `src/features/words/components/stage-dot.tsx`

Wireframe ref: `primitives.tsx` `StageDot` — 10px circle, color from `C.stage[stage].dot`, `border-radius: full`.

- [ ] **Step 1: Rewrite stage-dot.tsx**

```tsx
import { cn } from '#/lib/utils'
import type { WordStage } from '#/features/words/utils/stage'

const DOT_COLORS: Record<WordStage, string> = {
  planted: 'bg-[var(--stage-planted-dot)]',
  growing: 'bg-[var(--stage-growing-dot)]',
  almost: 'bg-[var(--stage-almost-dot)]',
  mastered: 'bg-[var(--stage-mastered-dot)]',
}

export function StageDot({
  stage,
  className,
}: {
  stage: WordStage
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-block size-[var(--wl-stage-dot)] shrink-0 rounded-full',
        DOT_COLORS[stage],
        className,
      )}
    />
  )
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: PASS

---

### Task 3: Rewrite word-chips.tsx + due-badge.tsx

**Files:**
- Modify: `src/features/words/components/word-chips.tsx`
- Modify: `src/features/words/components/due-badge.tsx`

Wireframe ref: `_chips.tsx` — `GenderChip`, `TypeChip`, `StageChip` (with leading StageDot), `DueChip`, `SrcChip`. All use `Badge` with `h-6 px-3 rounded-full text-[11px] font-medium` (matching `wfSize.chip=24`, `wfType.chip`).

- [ ] **Step 1: Rewrite word-chips.tsx**

```tsx
import { Badge } from '#/components/ui/badge'
import { STAGE_CONFIG, type WordStage } from '#/features/words/utils/stage'
import { StageDot } from './stage-dot'

const CHIP = 'h-6 px-3 rounded-full text-[11px] font-medium'

export function GenderChip({ gender }: { gender: string | null }) {
  if (!gender) return null
  return (
    <Badge
      variant="outline"
      className={`${CHIP} border-[var(--status-neutral-border)] bg-[var(--status-neutral-bg)] text-[var(--status-neutral-text)]`}
    >
      {gender}
    </Badge>
  )
}

export function TypeChip({ type }: { type: string | null }) {
  if (!type) return null
  return (
    <Badge
      variant="outline"
      className={`${CHIP} border-[var(--status-neutral-border)] bg-[var(--status-neutral-bg)] text-[var(--status-neutral-text)]`}
    >
      {type}
    </Badge>
  )
}

const STAGE_CLASSES: Record<WordStage, string> = {
  planted:
    'border-[var(--stage-planted-border)] bg-[var(--stage-planted-bg)] text-[var(--stage-planted-text)]',
  growing:
    'border-[var(--stage-growing-border)] bg-[var(--stage-growing-bg)] text-[var(--stage-growing-text)]',
  almost:
    'border-[var(--stage-almost-border)] bg-[var(--stage-almost-bg)] text-[var(--stage-almost-text)]',
  mastered:
    'border-[var(--stage-mastered-border)] bg-[var(--stage-mastered-bg)] text-[var(--stage-mastered-text)]',
}

export function StageChip({ stage }: { stage: WordStage }) {
  const config = STAGE_CONFIG[stage]
  return (
    <Badge
      variant="outline"
      className={`${CHIP} gap-1 ${STAGE_CLASSES[stage]}`}
    >
      <StageDot stage={stage} className="size-[var(--wl-stage-dot)]" />
      {config.label}
    </Badge>
  )
}

export function AiTagChip({ label }: { label: string }) {
  return (
    <Badge
      variant="outline"
      className={`${CHIP} border-[var(--status-info-border)] bg-[var(--status-info-bg)] text-[var(--status-info-text)]`}
    >
      {label}
    </Badge>
  )
}

export function UserTagChip({ label }: { label: string }) {
  return (
    <Badge
      variant="outline"
      className={`${CHIP} border-[var(--status-neutral-border)] bg-[var(--status-neutral-bg)] text-[var(--status-neutral-text)]`}
    >
      {label}
    </Badge>
  )
}

export function SrcChip({ src }: { src: string | null }) {
  if (!src || src === 'pending') return null
  if (src === 'dwds' || src === 'wiktionary') {
    return (
      <Badge
        variant="outline"
        className={`${CHIP} border-[var(--status-success-border)] bg-[var(--status-success-bg)] text-[var(--status-success-text)]`}
      >
        {src === 'dwds' ? 'DWDS' : 'Wiktionary'}
      </Badge>
    )
  }
  if (src === 'ai_only') {
    return (
      <Badge
        variant="outline"
        className={`${CHIP} border-[var(--status-info-border)] bg-[var(--status-info-bg)] text-[var(--status-info-text)]`}
      >
        AI verified
      </Badge>
    )
  }
  return (
    <Badge
      variant="outline"
      className={`${CHIP} border-[var(--status-error-border)] bg-[var(--status-error-bg)] text-[var(--status-error-text)]`}
    >
      Unverified
    </Badge>
  )
}
```

- [ ] **Step 2: Rewrite due-badge.tsx**

```tsx
import { Badge } from '#/components/ui/badge'

const CHIP = 'h-6 px-3 rounded-full text-[11px] font-medium'

export function DueBadge({ due }: { due: string | null }) {
  if (!due) return null

  const isToday = due === 'today'

  return (
    <Badge
      variant="outline"
      className={`${CHIP} ${
        isToday
          ? 'border-[var(--status-warning-border)] bg-[var(--status-warning-bg)] text-[var(--status-warning-text)]'
          : 'border-[var(--status-neutral-border)] bg-[var(--status-neutral-bg)] text-[var(--status-neutral-text)]'
      }`}
    >
      {isToday ? 'Due today' : `Due ${due}`}
    </Badge>
  )
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 4: Commit**

```
feat(words): rewrite chips and due badge to match wireframe design
```

---

### Task 4: Rewrite word-row.tsx

**Files:**
- Modify: `src/features/words/components/word-row.tsx`

Wireframe ref: `_word-views.tsx` — `WordRow` (desktop: 5-column grid `24px 1.4fr 1fr auto auto`, padding `S[4] SHL.pagePadX` = `16px 32px`) and `MobileWordRow` (simpler: stageDot + word/translation stacked + due chip, padding `S[3] SHL.pagePadXMobile` = `12px 16px`).

The compact variant (used in detail rail) is: stageDot + word/translation stacked + due chip, padding `S[3] S[4]` = `12px 16px`.

- [ ] **Step 1: Rewrite word-row.tsx**

```tsx
import { cn } from '#/lib/utils'
import { useIsMobile } from '#/hooks/use-mobile'
import type { WordRow } from '#/features/words/api/words-server-fns'
import { getDueLabel, getWordStage } from '#/features/words/utils/stage'

import { DueBadge } from './due-badge'
import { StageDot } from './stage-dot'
import { AiTagChip, GenderChip, TypeChip } from './word-chips'

export function WordRowItem({
  word,
  selected,
  compact,
  onClick,
}: {
  word: WordRow
  selected?: boolean
  compact?: boolean
  onClick?: () => void
}) {
  const stage = getWordStage(word)
  const due = getDueLabel(word.next_review_date)
  const tags = word.ai_tags ?? []
  const isMobile = useIsMobile()

  if (compact) {
    return (
      <div
        onClick={onClick}
        className={cn(
          'flex cursor-pointer items-center gap-3 border-b border-[var(--border-subtle)] px-4 py-3 transition-colors hover:bg-[var(--surface-hover)]',
          selected && 'bg-[var(--surface-sunken)]',
        )}
      >
        <StageDot stage={stage} />
        <div className="min-w-0 flex-1">
          <p className="truncate font-heading text-base text-[var(--text-primary)]">
            {word.german_word}
          </p>
          <p className="truncate text-[11px] text-[var(--text-muted)]">
            {word.translation}
          </p>
        </div>
        <DueBadge due={due} />
      </div>
    )
  }

  if (isMobile) {
    return (
      <div
        onClick={onClick}
        className={cn(
          'flex cursor-pointer items-center gap-3 border-b border-[var(--border-subtle)] px-4 py-3 transition-colors hover:bg-[var(--surface-hover)]',
          selected && 'bg-[var(--surface-sunken)]',
        )}
      >
        <StageDot stage={stage} />
        <div className="min-w-0 flex-1">
          <p className="truncate font-heading text-lg text-[var(--text-primary)]">
            {word.german_word}
          </p>
          <p className="truncate text-sm text-[var(--text-secondary)]">
            {word.translation}
          </p>
        </div>
        <DueBadge due={due} />
      </div>
    )
  }

  return (
    <div
      onClick={onClick}
      className={cn(
        'grid cursor-pointer items-center gap-4 border-b border-[var(--border-subtle)] px-8 py-4 transition-colors hover:bg-[var(--surface-hover)]',
        selected && 'bg-[var(--surface-sunken)]',
      )}
      style={{ gridTemplateColumns: '24px 1.4fr 1fr auto auto' }}
    >
      <StageDot stage={stage} />
      <div className="flex min-w-0 items-baseline gap-3">
        <span className="font-heading text-lg text-[var(--text-primary)]">
          {word.german_word}
        </span>
        <GenderChip gender={word.gender} />
        <TypeChip type={word.word_type} />
      </div>
      <p className="min-w-0 truncate text-base text-[var(--text-secondary)]">
        {word.translation}
      </p>
      <div className="flex gap-2">
        {tags.slice(0, 1).map((t) => (
          <AiTagChip key={t} label={t} />
        ))}
      </div>
      <DueBadge due={due} />
    </div>
  )
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 3: Commit**

```
feat(words): rewrite word row to match wireframe grid layout
```

---

### Task 5: Rewrite word-card.tsx

**Files:**
- Modify: `src/features/words/components/word-card.tsx`

Wireframe ref: `_word-views.tsx` `WordCard` — stage color strip (4px), then padded body with: top row (gender + type chips, spacer, due chip), word heading (`T.h3` = 20px, heading font), translation (`T.body` = 16px), tag chips row.

- [ ] **Step 1: Rewrite word-card.tsx**

```tsx
import { cn } from '#/lib/utils'
import type { WordRow } from '#/features/words/api/words-server-fns'
import { getDueLabel, getWordStage } from '#/features/words/utils/stage'

import { DueBadge } from './due-badge'
import { AiTagChip, GenderChip, TypeChip } from './word-chips'

const STRIP_COLORS: Record<string, string> = {
  planted: 'bg-[var(--stage-planted-dot)]',
  growing: 'bg-[var(--stage-growing-dot)]',
  almost: 'bg-[var(--stage-almost-dot)]',
  mastered: 'bg-[var(--stage-mastered-dot)]',
}

export function WordCardItem({
  word,
  selected,
  onClick,
}: {
  word: WordRow
  selected?: boolean
  onClick?: () => void
}) {
  const stage = getWordStage(word)
  const due = getDueLabel(word.next_review_date)
  const tags = word.ai_tags ?? []

  return (
    <div
      onClick={onClick}
      className={cn(
        'flex cursor-pointer flex-col overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] transition-colors hover:bg-[var(--surface-hover)]',
        selected && 'border-[var(--border-strong)]',
      )}
    >
      <div className={cn('h-[var(--wl-card-strip-h)]', STRIP_COLORS[stage])} />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-2">
          <GenderChip gender={word.gender} />
          <TypeChip type={word.word_type} />
          <div className="flex-1" />
          <DueBadge due={due} />
        </div>
        <p className="font-heading text-xl font-semibold text-[var(--text-primary)]">
          {word.german_word}
        </p>
        <p className="text-base text-[var(--text-secondary)]">
          {word.translation}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <AiTagChip key={t} label={t} />
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 3: Commit**

```
feat(words): rewrite word card to match wireframe design
```

---

### Task 6: Rewrite word-detail.tsx + grammar-section.tsx + learning-stats.tsx

**Files:**
- Modify: `src/features/words/components/word-detail.tsx`
- Modify: `src/features/words/components/grammar-section.tsx`
- Modify: `src/features/words/components/learning-stats.tsx`

Wireframe ref: `_word-detail.tsx` `WordDetail` — sections: header chips (gender + type + stage + src), word (`T.display`=40px heading), translation (`T.bodyLg`=18px), alt translations as neutral chips, examples in cards, grammar in a card with 2-col grid, tags, 2x2 stat cards, action buttons (Study this word + Edit + More dropdown).

- [ ] **Step 1: Rewrite grammar-section.tsx**

```tsx
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
```

- [ ] **Step 2: Rewrite learning-stats.tsx**

```tsx
import { Card, CardContent } from '#/components/ui/card'
import { Label } from '#/components/ui/label'
import type { WordRow } from '#/features/words/api/words-server-fns'
import { getDueLabel } from '#/features/words/utils/stage'

export function LearningStats({ word }: { word: WordRow }) {
  const reviewCount = word.review_count ?? 0
  const due = getDueLabel(word.next_review_date)
  const stage = word.review_count === 0
    ? 'planted'
    : (word.easiness_factor ?? 2.5) >= 2.5 && reviewCount >= 5
      ? 'mastered'
      : (word.easiness_factor ?? 2.5) >= 2.0
        ? 'almost'
        : 'growing'

  return (
    <div>
      <Label className="mb-2 text-xs uppercase tracking-wider text-[var(--text-muted)]">
        Learning stats
      </Label>
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Reviews" value={String(reviewCount)} />
        <StatCard label="Correct rate" value="—" />
        <StatCard
          label="Next review"
          value={due ? (due === 'today' ? 'Today' : due) : '—'}
          small
        />
        <StatCard label="Stage" value={stage} small capitalize />
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
  small,
  capitalize,
}: {
  label: string
  value: string
  small?: boolean
  capitalize?: boolean
}) {
  return (
    <Card size="compact" className="border-[var(--border-subtle)] bg-[var(--surface-raised)]">
      <CardContent className="p-4">
        <p className="text-[11px] text-[var(--text-muted)]">{label}</p>
        <p
          className={`mt-1 text-[var(--text-primary)] ${
            small ? 'text-lg' : 'font-heading text-2xl font-semibold'
          } ${capitalize ? 'capitalize' : ''}`}
        >
          {value}
        </p>
      </CardContent>
    </Card>
  )
}
```

- [ ] **Step 3: Rewrite word-detail.tsx**

```tsx
import { MoreHorizontal } from 'lucide-react'

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
import { Label } from '#/components/ui/label'
import { Skeleton } from '#/components/ui/skeleton'
import type { WordRow } from '#/features/words/api/words-server-fns'
import { getWordStage } from '#/features/words/utils/stage'

import { GrammarSection } from './grammar-section'
import { LearningStats } from './learning-stats'
import { AiTagChip, GenderChip, SrcChip, StageChip, TypeChip, UserTagChip } from './word-chips'

export function WordDetail({ word }: { word: WordRow }) {
  const stage = getWordStage(word)
  const altTranslations = word.alt_translations as string[] | null
  const exampleSentences = word.example_sentences as Array<{
    german?: string
    de?: string
    translation?: string
  }> | null
  const aiTags = word.ai_tags ?? []

  return (
    <div className="flex flex-col gap-5">
      {/* Header chips */}
      <div className="flex flex-wrap gap-2">
        <GenderChip gender={word.gender} />
        <TypeChip type={word.word_type} />
        <StageChip stage={stage} />
        <SrcChip src={word.verification_source} />
      </div>

      {/* Word + translation */}
      <div>
        <h2 className="font-heading text-4xl font-semibold text-[var(--text-primary)]">
          {word.german_word}
        </h2>
        <p className="mt-1 text-lg text-[var(--text-secondary)]">
          {word.translation}
        </p>
      </div>

      {/* Alt translations */}
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

      {/* Examples */}
      {exampleSentences && exampleSentences.length > 0 && (
        <div>
          <Label className="mb-2 text-xs uppercase tracking-wider text-[var(--text-muted)]">
            Examples
          </Label>
          <div className="flex flex-col gap-3">
            {exampleSentences.map((ex, i) => (
              <Card key={i} size="compact" className="border-[var(--border-subtle)] bg-[var(--surface-raised)]">
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

      {/* Grammar */}
      <GrammarSection word={word} />

      {/* Tags */}
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

      {/* Learning stats */}
      <LearningStats word={word} />

      {/* Actions */}
      <div className="flex gap-2 pt-2">
        <Button>Study this word</Button>
        <Button variant="outline">Edit</Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Reset progress</DropdownMenuItem>
            <DropdownMenuItem>Mark as leech</DropdownMenuItem>
            <DropdownMenuItem>Archive</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-[var(--status-error-text)]">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export function WordDetailSkeleton() {
  return (
    <div className="flex flex-col gap-5">
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
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 5: Commit**

```
feat(words): rewrite word detail, grammar, and stats to match wireframes
```

---

### Task 7: Rewrite lib-search.tsx (filter bar + stage filters)

**Files:**
- Modify: `src/features/words/components/lib-search.tsx`

Wireframe ref: `_filter-bars.tsx` — `FilterBar` (search field width=320, Filters button, Sort button with label, spacer, word count text, ToggleGroup list/cards) and `StageFilters` (horizontal scrollable chip row with stage counts, `height: 32`, `border-radius: full`).

On mobile: search bar in its own row, then horizontal stage chips. No separate filter/sort buttons in the main bar — those go to a filter page.

The compact variant (used in detail rail) is just a search field, no filters/toggle.

- [ ] **Step 1: Rewrite lib-search.tsx**

```tsx
import { Filter, LayoutGrid, List, Search, SlidersHorizontal } from 'lucide-react'

import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { ToggleGroup, ToggleGroupItem } from '#/components/ui/toggle-group'
import { useIsMobile } from '#/hooks/use-mobile'
import type { WordFilters } from '#/features/words/api/words-server-fns'

const STAGES = [
  { value: '', label: 'All', emoji: '' },
  { value: 'planted', label: 'Planted', emoji: '🌱' },
  { value: 'growing', label: 'Growing', emoji: '🔄' },
  { value: 'almost', label: 'Almost', emoji: '💪' },
  { value: 'mastered', label: 'Mastered', emoji: '⭐' },
]

const SORT_LABELS: Record<string, string> = {
  date_added: 'Date added',
  alpha: 'A → Z',
  stage: 'Stage',
  last_reviewed: 'Last reviewed',
  next_review: 'Next review',
}

function ViewToggle({
  view,
  onViewChange,
}: {
  view: 'list' | 'grid'
  onViewChange: (v: 'list' | 'grid') => void
}) {
  return (
    <ToggleGroup
      type="single"
      value={view}
      onValueChange={(v) => {
        if (v) onViewChange(v as 'list' | 'grid')
      }}
      className="gap-0 rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-1"
    >
      <ToggleGroupItem
        value="list"
        size="sm"
        className="h-8 rounded-[var(--radius-sm)] px-3"
      >
        <List className="mr-2 size-4" />
        List
      </ToggleGroupItem>
      <ToggleGroupItem
        value="grid"
        size="sm"
        className="h-8 rounded-[var(--radius-sm)] px-3"
      >
        <LayoutGrid className="mr-2 size-4" />
        Cards
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

export function LibSearch({
  filters,
  onFiltersChange,
  wordCount,
  view,
  onViewChange,
  compact,
}: {
  filters: WordFilters
  onFiltersChange: (filters: WordFilters) => void
  wordCount: number
  view: 'list' | 'grid'
  onViewChange: (v: 'list' | 'grid') => void
  compact?: boolean
}) {
  const isMobile = useIsMobile()

  if (compact) {
    return (
      <div className="shrink-0 border-b border-[var(--border-subtle)] p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-muted)]" />
          <Input
            placeholder="Search…"
            value={filters.search ?? ''}
            onChange={(e) =>
              onFiltersChange({ ...filters, search: e.target.value || undefined })
            }
            className="h-10 rounded-[var(--radius-md)] pl-10 text-base"
          />
        </div>
      </div>
    )
  }

  if (isMobile) {
    return (
      <div className="sticky top-0 z-10 shrink-0 bg-[var(--surface-raised)]">
        <div className="border-b border-[var(--border-subtle)] px-4 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-muted)]" />
            <Input
              placeholder="Search words…"
              value={filters.search ?? ''}
              onChange={(e) =>
                onFiltersChange({ ...filters, search: e.target.value || undefined })
              }
              className="h-10 rounded-[var(--radius-md)] pl-10 text-base"
            />
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto border-b border-[var(--border-subtle)] px-4 py-3">
          {STAGES.map((s) => {
            const active = (filters.stage ?? '') === s.value
            return (
              <button
                key={s.value}
                onClick={() =>
                  onFiltersChange({ ...filters, stage: s.value || undefined })
                }
                className={`inline-flex h-8 shrink-0 items-center gap-1 rounded-full border px-3 text-sm ${
                  active
                    ? 'border-[var(--border-strong)] bg-[var(--surface-sunken)] text-[var(--text-primary)]'
                    : 'border-[var(--border-subtle)] text-[var(--text-secondary)]'
                }`}
              >
                {s.emoji && <span>{s.emoji}</span>}
                <span>{s.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="sticky top-0 z-10 shrink-0 bg-[var(--surface-raised)]">
      {/* Toolbar row */}
      <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] px-8 py-4">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-muted)]" />
          <Input
            placeholder="Search German or Indonesian…"
            value={filters.search ?? ''}
            onChange={(e) =>
              onFiltersChange({ ...filters, search: e.target.value || undefined })
            }
            className="h-10 rounded-[var(--radius-md)] pl-10 text-base"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="mr-2 size-4" />
          Filters
        </Button>
        <Button variant="ghost" size="sm">
          <SlidersHorizontal className="mr-2 size-4" />
          Sort: {SORT_LABELS[filters.sort ?? 'date_added']}
        </Button>
        <div className="flex-1" />
        <span className="text-sm text-[var(--text-muted)]">
          {wordCount} word{wordCount !== 1 ? 's' : ''}
        </span>
        <ViewToggle view={view} onViewChange={onViewChange} />
      </div>
      {/* Stage filter chips */}
      <div className="flex gap-2 border-b border-[var(--border-subtle)] px-8 py-3">
        {STAGES.map((s) => {
          const active = (filters.stage ?? '') === s.value
          return (
            <button
              key={s.value}
              onClick={() =>
                onFiltersChange({ ...filters, stage: s.value || undefined })
              }
              className={`inline-flex h-8 items-center rounded-full border px-3 text-sm ${
                active
                  ? 'border-[var(--border-strong)] bg-[var(--surface-sunken)] text-[var(--text-primary)]'
                  : 'border-[var(--border-subtle)] text-[var(--text-secondary)]'
              }`}
            >
              {s.emoji && <span className="mr-1">{s.emoji}</span>}
              {s.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 3: Commit**

```
feat(words): rewrite filter bar and stage filters to match wireframes
```

---

### Task 8: Rewrite word-detail-panel.tsx

**Files:**
- Modify: `src/features/words/components/word-detail-panel.tsx`

Wireframe ref: In the detail screens, the right pane is simply the WordDetail content in a scrollable area with padding. No separate header bar with "Word detail" title — the detail content has its own header chips and title.

- [ ] **Step 1: Rewrite word-detail-panel.tsx**

```tsx
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
    <div className="flex flex-1 flex-col overflow-hidden border-l border-[var(--border-subtle)] bg-[var(--surface-page)]">
      <ScrollArea className="flex-1">
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
      </ScrollArea>
    </div>
  )
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 3: Commit**

```
feat(words): simplify detail panel to match wireframe layout
```

---

### Task 9: Rewrite /words route (index.tsx)

**Files:**
- Modify: `src/routes/_protected/words/index.tsx`

Wireframe ref: The route has 4 states:
1. **List view** (desktop-list): sticky filter bar + stage chips + flat WordRow list
2. **Cards view** (desktop-cards): sticky filter bar + stage chips + responsive card grid
3. **Detail (list)** (desktop-detail-list): two-column split — 460px list rail (search + compact rows) + detail pane
4. **Detail (cards)** (desktop-detail-cards): two-column split — 620px card rail (search + 2-col cards) + detail pane

Mobile: list/cards views navigate to `/words/$id` on tap. No split mode.

The shell already provides the topbar with "Word Library" title and "Add words" button. The route must fill the content area edge-to-edge. The shell wraps content in `p-[var(--space-4)]` / `lg:p-[var(--space-5)]` — the route needs negative margins to break out of this padding for the sticky filter bar and edge-to-edge rows.

- [ ] **Step 1: Rewrite words/index.tsx**

```tsx
import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { BookOpen } from 'lucide-react'

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '#/components/ui/empty'
import { Skeleton } from '#/components/ui/skeleton'
import { useIsMobile } from '#/hooks/use-mobile'
import { useWords } from '#/features/words/api/use-words'
import type { WordFilters } from '#/features/words/api/words-server-fns'
import { LibSearch } from '#/features/words/components/lib-search'
import { WordCardItem } from '#/features/words/components/word-card'
import { WordDetailPanel } from '#/features/words/components/word-detail-panel'
import { WordRowItem } from '#/features/words/components/word-row'

export const Route = createFileRoute('/_protected/words/')({
  component: WordLibrary,
})

function WordLibrary() {
  const [view, setView] = useState<'list' | 'grid'>('list')
  const [filters, setFilters] = useState<WordFilters>({})
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const isMobile = useIsMobile()
  const navigate = useNavigate()

  const { data: words, isLoading } = useWords(filters)
  const selectedWord = words?.find((w) => w.id === selectedId)

  const handleWordClick = (id: string) => {
    if (isMobile) {
      navigate({ to: '/words/$id', params: { id } })
    } else {
      setSelectedId(id === selectedId ? null : id)
    }
  }

  const wordCount = words?.length ?? 0
  const inSplitMode = !!selectedId && !isMobile
  const railWidth = view === 'list' ? 'var(--wl-detail-list-w)' : 'var(--wl-detail-cards-w)'

  return (
    <div
      className={`-m-[var(--space-4)] flex h-[calc(100dvh-var(--shell-topbar-h-mobile)-var(--shell-bottomnav-h))] flex-col lg:-m-[var(--space-5)] lg:h-[calc(100dvh-var(--shell-topbar-h))] ${
        inSplitMode ? 'flex-row' : ''
      }`}
    >
      {/* Left panel */}
      <div
        className={`flex min-h-0 min-w-0 flex-col ${
          inSplitMode ? 'shrink-0' : 'flex-1'
        }`}
        style={inSplitMode ? { width: railWidth } : undefined}
      >
        <LibSearch
          filters={filters}
          onFiltersChange={setFilters}
          wordCount={wordCount}
          view={view}
          onViewChange={setView}
          compact={inSplitMode}
        />

        {isLoading ? (
          <WordListSkeleton view={inSplitMode ? 'list' : view} />
        ) : !words || words.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <BookOpen />
                </EmptyMedia>
                <EmptyTitle>No words yet</EmptyTitle>
                <EmptyDescription>
                  Add your first word to get started.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </div>
        ) : inSplitMode ? (
          <div className="flex-1 overflow-y-auto">
            {view === 'list' ? (
              words.map((w) => (
                <WordRowItem
                  key={w.id}
                  word={w}
                  selected={w.id === selectedId}
                  compact
                  onClick={() => handleWordClick(w.id)}
                />
              ))
            ) : (
              <div className="grid grid-cols-2 gap-3 p-4" style={{ alignContent: 'start' }}>
                {words.map((w) => (
                  <WordCardItem
                    key={w.id}
                    word={w}
                    selected={w.id === selectedId}
                    onClick={() => handleWordClick(w.id)}
                  />
                ))}
              </div>
            )}
          </div>
        ) : view === 'list' ? (
          <div className="flex-1 overflow-y-auto">
            {words.map((w) => (
              <WordRowItem
                key={w.id}
                word={w}
                selected={w.id === selectedId}
                onClick={() => handleWordClick(w.id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-8 py-5">
            <div
              className="grid gap-4"
              style={{
                gridTemplateColumns: `repeat(auto-fill, minmax(var(--wl-card-min-w), 1fr))`,
              }}
            >
              {words.map((w) => (
                <WordCardItem
                  key={w.id}
                  word={w}
                  selected={w.id === selectedId}
                  onClick={() => handleWordClick(w.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {inSplitMode && (
        <WordDetailPanel word={selectedWord} isLoading={!selectedWord && !!selectedId} />
      )}
    </div>
  )
}

function WordListSkeleton({ view }: { view: 'list' | 'grid' }) {
  if (view === 'list') {
    return (
      <div className="flex-1 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 border-b border-[var(--border-subtle)] px-8 py-4"
          >
            <Skeleton className="size-[var(--wl-stage-dot)] rounded-full" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-10" />
            <Skeleton className="h-5 flex-1" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-hidden px-8 py-5">
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: `repeat(auto-fill, minmax(var(--wl-card-min-w), 1fr))`,
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border-subtle)]"
          >
            <Skeleton className="h-[var(--wl-card-strip-h)] w-full" />
            <div className="flex flex-col gap-3 p-5">
              <div className="flex gap-2">
                <Skeleton className="h-6 w-10 rounded-full" />
                <Skeleton className="h-6 w-14 rounded-full" />
              </div>
              <Skeleton className="h-6 w-28" />
              <Skeleton className="h-5 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 3: Commit**

```
feat(words): rewrite word library route with wireframe layouts
```

---

### Task 10: Rewrite /words/$id route

**Files:**
- Modify: `src/routes/_protected/words/$id.tsx`

Wireframe ref: `mobile-detail.tsx` — full-page word detail. The topbar is already handled by `AppTopbar` (shows back button + "Edit" on mobile word detail). The content is just `WordDetail` rendered with mobile scope.

- [ ] **Step 1: Rewrite words/$id.tsx**

```tsx
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
    <div className="-m-[var(--space-4)]">
      {isLoading ? (
        <div className="p-4">
          <WordDetailSkeleton />
        </div>
      ) : word ? (
        <WordDetailContent word={word} />
      ) : (
        <p className="p-4 text-sm text-[var(--text-muted)]">Word not found.</p>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 3: Commit**

```
feat(words): rewrite mobile word detail page to match wireframes
```

---

### Task 11: Update topbar for new wireframe titles

**Files:**
- Modify: `src/features/shell/app-topbar.tsx:9` (route title only)

Wireframe ref: Desktop topbar shows "Your words" as the title, not "Word Library".

- [ ] **Step 1: Update the word library route title**

Change `'/_protected/words/': 'Word Library'` to `'/_protected/words/': 'Your words'` in `ROUTE_TITLES`.

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 3: Commit**

```
fix(shell): update word library topbar title to match wireframes
```

---

### Task 12: Final build verification + visual check

- [ ] **Step 1: Full build**

Run: `npm run build`
Expected: Clean build, no errors, no warnings about missing tokens.

- [ ] **Step 2: Ask user to verify visually**

Tell the user: "You need to run `npm run dev` and check these screens:
- `/words` desktop list view
- `/words` desktop cards view
- `/words` click a word → desktop split detail (list rail)
- `/words` switch to cards → desktop split detail (cards rail)
- `/words` mobile list view
- `/words` mobile cards view
- `/words/$id` mobile detail
- Compare each against the wireframes at `/sandbox/wireframes/word-library/*`"

- [ ] **Step 3: Commit all remaining changes**

```
feat(words): complete word library UI rework to match wireframes
```
