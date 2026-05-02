/**
 * @screen word-library/desktop-detail-cards
 * @shell DesktopShell active=library, showCompanionMini=false, contentScroll=false
 * @add-ref ADD.md §12 · Word Library » Detail (cards layout)
 *
 * Two-column split:
 *   left: 620px rail with a 2-col card grid
 *   right: WordDetail
 */
import { C, S, SZ } from "../_shared/tokens";
import { Btn, Field, Icon } from "../_shared/primitives";
import { DesktopShell, DesktopTopbar } from "../_shared/shells";
import { WordCard } from "./_word-views";
import { WordDetail } from "./_word-detail";
import { WORDS } from "./_data";

/** Width of the cards rail inside the detail layout. */
export const DETAIL_CARDS_W = 620;

export function WLDesktopDetailCards() {
  const sel = WORDS[0];
  return (
    <DesktopShell
      active="library"
      showCompanionMini={false}
      contentScroll={false}
      topbar={
        <DesktopTopbar
          title="Your words"
          actions={
            <Btn
              variant="default"
              leading={<Icon name="plus" size={SZ.iconSm} color={C.action.text} />}
            >
              Add words
            </Btn>
          }
        />
      }
    >
      <div style={{ flex: 1, display: "flex", minHeight: 0, minWidth: 0 }}>
        <div
          data-role="cards-column"
          style={{
            width: DETAIL_CARDS_W,
            borderRight: `1px solid ${C.border.subtle}`,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          <div style={{ padding: S[4], borderBottom: `1px solid ${C.border.subtle}` }}>
            <Field
              placeholder="Search…"
              leading={<Icon name="search" size={SZ.iconSm} color={C.text.muted} />}
            />
          </div>
          <div
            style={{
              flex: 1,
              overflow: "auto",
              padding: S[4],
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: S[3],
              alignContent: "start",
            }}
          >
            {WORDS.slice(0, 8).map((w) => (
              <WordCard key={w.w} w={w} selected={sel.w === w.w} />
            ))}
          </div>
        </div>
        <div style={{ flex: 1, overflow: "auto", minHeight: 0, background: C.surface.page }}>
          <WordDetail w={sel} scope="desktop" />
        </div>
      </div>
    </DesktopShell>
  );
}
