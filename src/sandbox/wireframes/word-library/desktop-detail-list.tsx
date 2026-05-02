/**
 * @screen word-library/desktop-detail-list
 * @shell DesktopShell active=library, showCompanionMini=false, contentScroll=false
 * @add-ref ADD.md §12 · Word Library » Detail
 *
 * Two-column split:
 *   left: 460px list rail with search at top + selectable word rows
 *   right: WordDetail fills remaining width
 *
 * Detail is rendered inside MAIN, NOT as a second topbar.
 */
import { C, S, SZ } from "../_shared/tokens";
import { Btn, Field, Icon, StageDot } from "../_shared/primitives";
import { DesktopShell, DesktopTopbar } from "../_shared/shells";
import { F, T, tt } from "../_shared/tokens";
import { DueChip } from "./_chips";
import { WordDetail } from "./_word-detail";
import { WORDS } from "./_data";

/** Width of the list rail inside the detail layout. */
export const DETAIL_LIST_W = 460;

export function WLDesktopDetailList() {
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
          data-role="list-column"
          style={{
            width: DETAIL_LIST_W,
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
          <div style={{ flex: 1, overflow: "auto" }}>
            {WORDS.map((w) => (
              <div
                key={w.w}
                style={{
                  padding: `${S[3]}px ${S[4]}px`,
                  display: "flex",
                  alignItems: "center",
                  gap: S[3],
                  borderBottom: `1px solid ${C.border.subtle}`,
                  background: sel.w === w.w ? C.surface.sunken : "transparent",
                  cursor: "pointer",
                }}
              >
                <StageDot stage={w.stage} />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div
                    style={{
                      ...tt(T.body),
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
                      ...tt(T.caption),
                      color: C.text.muted,
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
