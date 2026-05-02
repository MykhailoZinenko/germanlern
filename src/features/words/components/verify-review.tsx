import { useRef, useState } from 'react'

import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { Progress } from '#/components/ui/progress'
import { useWordStore } from '#/store/word-store'
import type { VerifiedWord } from '#/features/words/api/verify-server-fn'

import { AiSuggestionRow } from './ai-suggestion-row'

type ReviewFields = {
  germanWord: string
  translation: string
  aiTags: string[]
  spellingAccepted: boolean
  translationAccepted: boolean
}

export function VerifyReview({
  verifiedWords,
  onFinish,
  isSaving,
}: {
  verifiedWords: VerifiedWord[]
  onFinish: (finalWords: VerifiedWord[]) => void
  isSaving?: boolean
}) {
  const reviewIndex = useWordStore((s) => s.reviewIndex)
  const setReviewIndex = useWordStore((s) => s.setReviewIndex)
  const total = verifiedWords.length
  const current = verifiedWords[reviewIndex]

  const [fields, setFields] = useState<ReviewFields>(() =>
    buildFieldsFromWord(current),
  )

  const [dismissed, setDismissed] = useState<{
    spelling: boolean
    translation: boolean
  }>({ spelling: false, translation: false })

  const [tagInput, setTagInput] = useState('')
  const [showTagInput, setShowTagInput] = useState(false)
  const tagInputRef = useRef<HTMLInputElement>(null)

  function buildFieldsFromWord(word: VerifiedWord): ReviewFields {
    return {
      germanWord: word.germanWord,
      translation: word.userTranslation || '',
      aiTags: word.aiEnrichment.aiTags ?? [],
      spellingAccepted: false,
      translationAccepted: false,
    }
  }

  const spellingCorrected = current.aiEnrichment.spellingCorrection
  const hasSuggestion =
    spellingCorrected &&
    spellingCorrected !== fields.germanWord &&
    !dismissed.spelling
  const translationSuggested = current.aiEnrichment.suggestedTranslation
  const hasTranslationSuggestion =
    translationSuggested &&
    translationSuggested !== fields.translation &&
    !dismissed.translation

  const dict = current.dictionaryResult

  const applyToWord = (): VerifiedWord => ({
    ...current,
    germanWord: fields.germanWord,
    aiEnrichment: {
      ...current.aiEnrichment,
      suggestedTranslation: fields.translation,
      aiTags: fields.aiTags,
    },
  })

  const handleAcceptAll = () => {
    const ai = current.aiEnrichment
    setFields((f) => ({
      ...f,
      germanWord: ai.spellingCorrection || f.germanWord,
      translation: ai.suggestedTranslation || f.translation,
      spellingAccepted: true,
      translationAccepted: true,
    }))
    setDismissed({ spelling: true, translation: true })
  }

  const handleNext = () => {
    const updatedWord = applyToWord()
    const updated = [...verifiedWords]
    updated[reviewIndex] = updatedWord

    if (reviewIndex >= total - 1) {
      onFinish(updated)
    } else {
      const nextWord = verifiedWords[reviewIndex + 1]
      setFields(buildFieldsFromWord(nextWord))
      setDismissed({ spelling: false, translation: false })
      setReviewIndex(reviewIndex + 1)
    }
  }

  const isLast = reviewIndex >= total - 1
  const percent = Math.round(((reviewIndex + 1) / total) * 100)

  return (
    /* Mobile: full-page, pad=16→×1.1=18→16. Desktop: centered card */
    <div className="flex flex-1 items-start justify-center overflow-y-auto p-4 lg:items-center lg:p-8">
      {/* VReview: w=420→×1.756=738→740→var(--vf-review-w); r=16→desk 28→var(--vf-card-radius), mob 18→16 */}
      {/* pad=18 20 22→desk 32 35 39→32 36 40→var(--vf-review-pt/px/pb), mob 20 22 24→20 22 24 */}
      <div className="w-full max-w-sm rounded-[var(--card-radius-mobile)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] px-6 pb-6 pt-5 lg:max-w-[var(--vf-review-w)] lg:rounded-[var(--vf-card-radius)] lg:px-[var(--vf-review-px)] lg:pb-[var(--vf-review-pb)] lg:pt-[var(--vf-review-pt)]">
        {/* header: gap=10→mob 11→12, desk 18→16; mb=14→mob 15→16, desk 25→24 */}
        {/* label: fs=9→mob 10→text-xs, desk 16→text-sm */}
        {/* progress: h=4→mob 4→4, desk 7→8→var(--vf-progress-h-sm) */}
        <div className="mb-4 flex items-center gap-3 lg:mb-6 lg:gap-4">
          <span className="whitespace-nowrap text-xs uppercase tracking-wider text-[var(--text-faint)] lg:text-sm">
            Word {reviewIndex + 1} of {total}
          </span>
          <Progress value={percent} className="h-1 flex-1 lg:h-[var(--vf-progress-h-sm)]" />
        </div>

        {/* field sections: mb=10→mob 11→12, desk 18→16 */}
        <div className="mb-3 lg:mb-4">
          {/* Lbl: fs=9→mob 10→text-xs, desk 16→text-sm; mb=4→mob 4→4, desk 7→8 */}
          <Label className="mb-1 text-xs lg:mb-2 lg:text-sm">Word</Label>
          {/* Input: h=38→mob 42→h-10, desk 67→68; r=9→mob 10→var(--radius-lg), desk 16→var(--radius-xl); fs=12→mob 13→text-sm, desk 21→text-lg */}
          <Input
            value={fields.germanWord}
            onChange={(e) =>
              setFields((f) => ({ ...f, germanWord: e.target.value }))
            }
            className="h-10 rounded-[var(--radius-lg)] text-sm lg:h-[var(--field-h-desktop)] lg:rounded-[var(--radius-xl)] lg:px-6 lg:text-lg"
          />
          {hasSuggestion && (
            <AiSuggestionRow
              text={current.aiEnrichment.spellingCorrection!}
              onAccept={() => {
                setFields((f) => ({
                  ...f,
                  germanWord: current.aiEnrichment.spellingCorrection!,
                  spellingAccepted: true,
                }))
                setDismissed((d) => ({ ...d, spelling: true }))
              }}
              onDismiss={() => setDismissed((d) => ({ ...d, spelling: true }))}
            />
          )}
        </div>

        <div className="mb-3 lg:mb-4">
          <Label className="mb-1 text-xs lg:mb-2 lg:text-sm">Translation</Label>
          <Input
            value={fields.translation}
            onChange={(e) =>
              setFields((f) => ({ ...f, translation: e.target.value }))
            }
            className="h-10 rounded-[var(--radius-lg)] text-sm lg:h-[var(--field-h-desktop)] lg:rounded-[var(--radius-xl)] lg:px-6 lg:text-lg"
          />
          {hasTranslationSuggestion && (
            <AiSuggestionRow
              text={current.aiEnrichment.suggestedTranslation!}
              onAccept={() => {
                setFields((f) => ({
                  ...f,
                  translation: current.aiEnrichment.suggestedTranslation!,
                  translationAccepted: true,
                }))
                setDismissed((d) => ({ ...d, translation: true }))
              }}
              onDismiss={() =>
                setDismissed((d) => ({ ...d, translation: true }))
              }
            />
          )}
        </div>

        <div className="mb-3 lg:mb-4">
          <Label className="mb-1 text-xs lg:mb-2 lg:text-sm">Type / Gender</Label>
          {/* two columns: gap=8→mob 9→8, desk 14→16 */}
          {/* Fld h=32→mob 35→36, desk 56→56; r=9→same; fs=11→mob 12→text-xs, desk 19→text-base */}
          <div className="flex gap-2 lg:gap-4">
            <Input
              value={dict.wordType ?? 'unknown'}
              readOnly
              className="h-9 flex-1 rounded-[var(--radius-lg)] bg-[var(--surface-sunken)] text-xs lg:h-14 lg:rounded-[var(--radius-xl)] lg:px-5 lg:text-base"
            />
            {dict.gender ? (
              <div className="flex h-9 flex-1 items-center rounded-[var(--radius-lg)] border border-[var(--status-success-border)] bg-[var(--status-success-bg)] px-3 text-xs text-[var(--status-success-text)] lg:h-14 lg:rounded-[var(--radius-xl)] lg:px-5 lg:text-base">
                {dict.gender} &middot; verified
              </div>
            ) : (
              <Input
                value="—"
                readOnly
                className="h-9 flex-1 rounded-[var(--radius-lg)] bg-[var(--surface-sunken)] text-xs lg:h-14 lg:rounded-[var(--radius-xl)] lg:px-5 lg:text-base"
              />
            )}
          </div>
        </div>

        {/* tags: mb=12→mob 13→12, desk 21→20 */}
        {/* chip: h=20→mob 22→h-[var(--chip-h-mobile)], desk 35→36→h-9; pad=0 8→mob 0 9→px-2, desk 0 14→px-4; fs=9→mob 10→text-xs, desk 16→text-sm */}
        <div className="mb-3 lg:mb-5">
          <Label className="mb-1 text-xs lg:mb-2 lg:text-sm">Tags</Label>
          <div className="flex flex-wrap gap-1 lg:gap-2">
            {fields.aiTags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="h-[var(--chip-h-mobile)] cursor-pointer rounded-full px-2 text-xs border-[var(--lumi-border)] bg-[var(--lumi-lightest)] text-[var(--lumi-text)] lg:h-9 lg:px-4 lg:text-sm"
                onClick={() => setFields((f) => ({ ...f, aiTags: f.aiTags.filter((t) => t !== tag) }))}
              >
                {tag} ×
              </Badge>
            ))}
            {showTagInput ? (
              <Input
                ref={tagInputRef}
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && tagInput.trim()) {
                    const newTag = tagInput.trim().toLowerCase()
                    if (!fields.aiTags.includes(newTag)) {
                      setFields((f) => ({ ...f, aiTags: [...f.aiTags, newTag] }))
                    }
                    setTagInput('')
                    setShowTagInput(false)
                  }
                  if (e.key === 'Escape') {
                    setTagInput('')
                    setShowTagInput(false)
                  }
                }}
                onBlur={() => {
                  if (tagInput.trim()) {
                    const newTag = tagInput.trim().toLowerCase()
                    if (!fields.aiTags.includes(newTag)) {
                      setFields((f) => ({ ...f, aiTags: [...f.aiTags, newTag] }))
                    }
                  }
                  setTagInput('')
                  setShowTagInput(false)
                }}
                placeholder="Tag name"
                autoFocus
                className="h-[var(--chip-h-mobile)] w-24 rounded-full px-3 text-xs lg:h-9 lg:w-32 lg:text-sm"
              />
            ) : (
              <Badge
                variant="outline"
                className="h-[var(--chip-h-mobile)] cursor-pointer rounded-full px-2 text-xs border-[var(--border-subtle)] text-[var(--text-faint)] hover:bg-[var(--surface-hover)] lg:h-9 lg:px-4 lg:text-sm"
                onClick={() => {
                  setShowTagInput(true)
                  setTimeout(() => tagInputRef.current?.focus(), 50)
                }}
              >
                + add
              </Badge>
            )}
          </div>
        </div>

        {/* buttons: h=34→mob 37→38, desk 60→var(--vf-btn-h); gap=8→mob 9→8, desk 14→16 */}
        <div className="flex gap-2 lg:gap-4">
          <Button variant="outline" className="h-[var(--btn-h-mobile)] flex-1 rounded-[var(--radius-lg)] text-xs lg:h-[var(--btn-h-desktop)] lg:rounded-[var(--radius-xl)] lg:text-lg" onClick={handleAcceptAll} disabled={isSaving}>
            Accept all
          </Button>
          <Button className="h-[var(--btn-h-mobile)] flex-1 rounded-[var(--radius-lg)] text-xs lg:h-[var(--btn-h-desktop)] lg:rounded-[var(--radius-xl)] lg:text-lg" onClick={handleNext} disabled={isSaving}>
            {isSaving ? 'Saving...' : isLast ? 'Finish' : 'Next word \u2192'}
          </Button>
        </div>
      </div>
    </div>
  )
}
