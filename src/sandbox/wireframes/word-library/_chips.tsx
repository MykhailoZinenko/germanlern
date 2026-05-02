/**
 * Word Library · shared chips
 *
 * Tiny domain-specific wrappers around <Chip> with the right variant + label.
 * Used in rows, cards, and the detail header.
 */
import { Chip, StageDot } from "../_shared/primitives";
import type { Word, WordSource, WordStage } from "./_data";

export function GenderChip({ gender }: { gender?: Word["gender"] }) {
  if (!gender) return null;
  return <Chip variant="gender">{gender}</Chip>;
}

export function TypeChip({ type }: { type: Word["type"] }) {
  return <Chip variant="wordtype">{type}</Chip>;
}

const STAGE_LABEL: Record<WordStage, string> = {
  planted: "Just planted",
  growing: "Still growing",
  almost: "Almost there",
  mastered: "Mastered",
};

export function StageChip({ stage }: { stage: WordStage }) {
  return (
    <Chip variant={`stage-${stage}` as const} leading={<StageDot stage={stage} />}>
      {STAGE_LABEL[stage]}
    </Chip>
  );
}

export function DueChip({ due }: { due: string }) {
  return due === "today" ? (
    <Chip variant="due-today">Due today</Chip>
  ) : (
    <Chip variant="due-future">Due {due}</Chip>
  );
}

export function SrcChip({ src }: { src: WordSource }) {
  return src === "dwds" ? (
    <Chip variant="verified">DWDS</Chip>
  ) : (
    <Chip variant="ai-verified">AI verified</Chip>
  );
}
