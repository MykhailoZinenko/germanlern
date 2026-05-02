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
