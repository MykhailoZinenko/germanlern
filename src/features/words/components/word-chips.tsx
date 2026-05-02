import { Badge } from '#/components/ui/badge'
import { STAGE_CONFIG, type WordStage } from '#/features/words/utils/stage'

/* Badge base: h-5 (20px), px-2, text-xs, rounded-lg
   Desktop override: lg:h-7 (28px), lg:px-3, rounded-full for pill shape */
const CHIP_OVERRIDE = 'rounded-full lg:h-7 lg:px-3'

export function GenderPill({ gender }: { gender: string | null }) {
  if (!gender) return null
  return (
    <Badge
      variant="outline"
      className={`${CHIP_OVERRIDE} border-[var(--status-neutral-border)] bg-[var(--status-neutral-bg)] text-[var(--status-neutral-text)]`}
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
      className={`${CHIP_OVERRIDE} border-[var(--status-neutral-border)] bg-[var(--status-neutral-bg)] text-[var(--status-neutral-text)]`}
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
    <Badge variant="outline" className={`${CHIP_OVERRIDE} ${STAGE_CLASSES[stage]}`}>
      {config.emoji} {config.label}
    </Badge>
  )
}

export function AiTagChip({ label }: { label: string }) {
  return (
    <Badge
      variant="outline"
      className={`${CHIP_OVERRIDE} border-[var(--lumi-border)] bg-[var(--lumi-lightest)] text-[var(--lumi-text)]`}
    >
      {label}
    </Badge>
  )
}

export function UserTagChip({ label }: { label: string }) {
  return (
    <Badge
      variant="outline"
      className={`${CHIP_OVERRIDE} border-[var(--status-neutral-border)] bg-[var(--status-neutral-bg)] text-[var(--status-neutral-text)]`}
    >
      {label}
    </Badge>
  )
}
