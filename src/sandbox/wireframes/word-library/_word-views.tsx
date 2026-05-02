/**
 * Word Library · row + card
 *
 * The two presentations of a word. Rows live in list views (desktop + mobile);
 * cards live in cards views and as the left-rail items on desktop detail-cards.
 */
import { C, S, R, T, F, SZ, SHL, tt } from "../_shared/tokens";
import { Chip, StageDot } from "../_shared/primitives";
import { GenderChip, TypeChip, DueChip } from "./_chips";
import type { Word } from "./_data";

interface WordRowProps {
  w: Word;
  selected?: boolean;
  onClick?: () => void;
}

export function WordRow({ w, selected, onClick }: WordRowProps) {
  return (
    <div
      data-shadcn="Card"
      data-variant="row"
      data-selected={!!selected}
      onClick={onClick}
      style={{
        display: "grid",
        gridTemplateColumns: "24px 1.4fr 1fr auto auto",
        alignItems: "center",
        gap: S[4],
        padding: `${S[4]}px ${SHL.pagePadX}px`,
        borderBottom: `1px solid ${C.border.subtle}`,
        background: selected ? C.surface.sunken : "transparent",
        cursor: "pointer",
      }}
    >
      <StageDot stage={w.stage} />
      <div style={{ display: "flex", alignItems: "baseline", gap: S[3], minWidth: 0 }}>
        <span style={{ ...tt(T.bodyLg), fontFamily: F.heading, color: C.text.primary }}>
          {w.w}
        </span>
        <GenderChip gender={w.gender} />
        <TypeChip type={w.type} />
      </div>
      <div
        style={{
          ...tt(T.body),
          color: C.text.secondary,
          minWidth: 0,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {w.tr}
      </div>
      <div style={{ display: "flex", gap: S[2] }}>
        {w.tags.slice(0, 1).map((t) => (
          <Chip key={t} variant="ai">
            {t}
          </Chip>
        ))}
      </div>
      <DueChip due={w.due} />
    </div>
  );
}

interface WordCardProps {
  w: Word;
  selected?: boolean;
  onClick?: () => void;
}

export function WordCard({ w, selected, onClick }: WordCardProps) {
  return (
    <div
      data-shadcn="Card"
      data-variant="wordcard"
      data-selected={!!selected}
      onClick={onClick}
      style={{
        background: C.surface.raised,
        border: `1px solid ${selected ? C.border.strong : C.border.subtle}`,
        borderRadius: R.xl,
        overflow: "hidden",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ height: SZ.cardStripH, background: C.stage[w.stage].dot }} />
      <div style={{ padding: S[5], display: "flex", flexDirection: "column", gap: S[3] }}>
        <div style={{ display: "flex", alignItems: "center", gap: S[2] }}>
          <GenderChip gender={w.gender} />
          <TypeChip type={w.type} />
          <div style={{ flex: 1 }} />
          <DueChip due={w.due} />
        </div>
        <div style={{ ...tt(T.h3), fontFamily: F.heading, color: C.text.primary }}>{w.w}</div>
        <div style={{ ...tt(T.body), color: C.text.secondary }}>{w.tr}</div>
        <div style={{ display: "flex", gap: S[2], flexWrap: "wrap" }}>
          {w.tags.map((t) => (
            <Chip key={t} variant="ai">
              {t}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  );
}

interface MobileWordRowProps {
  w: Word;
  isLast?: boolean;
}

export function MobileWordRow({ w, isLast }: MobileWordRowProps) {
  return (
    <div
      data-shadcn="Card"
      data-variant="row-mobile"
      style={{
        padding: `${S[3]}px ${SHL.pagePadXMobile}px`,
        display: "flex",
        alignItems: "center",
        gap: S[3],
        borderBottom: isLast ? "none" : `1px solid ${C.border.subtle}`,
      }}
    >
      <StageDot stage={w.stage} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            ...tt(T.bodyLg),
            fontFamily: F.heading,
            color: C.text.primary,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {w.w}
        </div>
        <div
          style={{
            ...tt(T.bodySm),
            color: C.text.secondary,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {w.tr}
        </div>
      </div>
      <DueChip due={w.due} />
    </div>
  );
}
