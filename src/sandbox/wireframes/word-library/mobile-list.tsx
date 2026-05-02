/**
 * @screen word-library/mobile-list
 * @shell MobileShell active=library
 * @add-ref ADD.md §12 · Word Library » Mobile » List
 *
 * Mobile WL default view. Topbar: "Words" + search icon + plus icon.
 * Stage chips with colored dots and counts (no emoji). Card list below.
 */
import { C, S, R, T, SZ, SHL, F, tt } from "../_shared/tokens";
import { Btn, Icon } from "../_shared/primitives";
import { MobileShell, MobileTopbar } from "../_shared/shells";
import { WordCard, MobileWordRow } from "./_word-views";
import { STAGE_COUNTS, WORDS } from "./_data";

const STAGE_DOTS = [
  { key: "planted", dot: C.stage.planted.dot, count: STAGE_COUNTS.planted },
  { key: "growing", dot: C.stage.growing.dot, count: STAGE_COUNTS.growing },
  { key: "almost", dot: C.stage.almost.dot, count: STAGE_COUNTS.almost },
  { key: "mastered", dot: C.stage.mastered.dot, count: STAGE_COUNTS.mastered },
];

export function WLMobileList() {
  return (
    <MobileShell
      active="library"
      topbar={
        <MobileTopbar
          title="Words"
          right={
            <>
              <Btn variant="ghost" style={{ width: SZ.btnMd, height: SZ.btnMd, padding: 0 }}>
                <Icon name="search" size={SZ.iconMd} color={C.text.secondary} />
              </Btn>
              <Btn variant="ghost" style={{ width: SZ.btnMd, height: SZ.btnMd, padding: 0 }}>
                <Icon name="plus" size={SZ.iconMd} color={C.text.secondary} />
              </Btn>
            </>
          }
        />
      }
    >
      {/* Stage chips with colored dots + counts */}
      <div
        style={{
          display: "flex",
          gap: S[2],
          padding: `${S[3]}px ${SHL.pagePadXMobile}px`,
          overflowX: "auto",
          borderBottom: `1px solid ${C.border.subtle}`,
        }}
      >
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
      {/* Card list */}
      <div
        style={{
          padding: `${S[4]}px ${SHL.pagePadXMobile}px`,
          display: "flex",
          flexDirection: "column",
          gap: S[3],
        }}
      >
        {WORDS.slice(0, 6).map((w) => (
          <WordCard key={w.w} w={w} />
        ))}
      </div>
    </MobileShell>
  );
}
