/**
 * @screen word-library/mobile-search
 * @shell MobileShell active=library
 * @add-ref ADD.md §12 · Word Library » Mobile » Search active
 *
 * Search mode replaces the topbar. Shows: search field + X + Cancel,
 * "All stages" chip + dot+count chips, result count, then list rows.
 */
import { C, S, R, T, SZ, SHL, F, tt } from "../_shared/tokens";
import { Field, Icon, StageDot } from "../_shared/primitives";
import { MobileShell } from "../_shared/shells";
import { MobileWordRow } from "./_word-views";
import { STAGE_COUNTS, WORDS } from "./_data";

const STAGE_DOTS = [
  { key: "planted", dot: C.stage.planted.dot, count: STAGE_COUNTS.planted },
  { key: "growing", dot: C.stage.growing.dot, count: STAGE_COUNTS.growing },
  { key: "almost", dot: C.stage.almost.dot, count: STAGE_COUNTS.almost },
  { key: "mastered", dot: C.stage.mastered.dot, count: STAGE_COUNTS.mastered },
];

export function WLMobileSearch() {
  const results = WORDS.filter((w) => w.w.toLowerCase().includes("seh"));
  return (
    <MobileShell active="library">
      {/* Search bar replacing topbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: S[3],
          padding: `${S[2]}px ${SHL.pagePadXMobile}px`,
          borderBottom: `1px solid ${C.border.subtle}`,
          background: C.surface.raised,
        }}
      >
        <div style={{ flex: 1, position: "relative" }}>
          <Field
            placeholder="Search…"
            value="seh"
            leading={<Icon name="search" size={SZ.iconSm} color={C.text.muted} />}
            trailing={<Icon name="x" size={SZ.iconSm} color={C.text.muted} />}
          />
        </div>
        <span
          style={{
            ...tt(T.bodySm),
            color: C.action.bg,
            fontWeight: 500,
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          Cancel
        </span>
      </div>

      {/* Stage chips: "All stages" + dot chips */}
      <div
        style={{
          display: "flex",
          gap: S[2],
          padding: `${S[3]}px ${SHL.pagePadXMobile}px`,
          overflowX: "auto",
          borderBottom: `1px solid ${C.border.subtle}`,
          background: C.surface.raised,
        }}
      >
        <div
          style={{
            flexShrink: 0,
            height: 32,
            padding: `0 ${S[3]}px`,
            borderRadius: R.full,
            border: `1px solid ${C.border.strong}`,
            background: C.surface.sunken,
            color: C.text.primary,
            ...tt(T.bodySm),
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          All stages
        </div>
        {STAGE_DOTS.map((s) => (
          <div
            key={s.key}
            style={{
              flexShrink: 0,
              height: 32,
              padding: `0 ${S[3]}px`,
              borderRadius: R.full,
              border: `1px solid ${C.border.subtle}`,
              color: C.text.secondary,
              ...tt(T.bodySm),
              display: "inline-flex",
              alignItems: "center",
              gap: S[1] + 2,
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: R.full,
                background: s.dot,
                flexShrink: 0,
              }}
            />
            <span>{s.count}</span>
          </div>
        ))}
      </div>

      {/* Result count */}
      <div
        style={{
          padding: `${S[2]}px ${SHL.pagePadXMobile}px`,
          borderBottom: `1px solid ${C.border.subtle}`,
        }}
      >
        <span style={{ ...tt(T.caption), color: C.text.muted }}>
          {results.length} results for &ldquo;seh&rdquo;
        </span>
      </div>

      {/* List rows */}
      <div>
        {results.map((w, i) => (
          <MobileWordRow key={w.w} w={w} isLast={i === results.length - 1} />
        ))}
      </div>
    </MobileShell>
  );
}
