/**
 * @screen word-library/desktop-cards
 * @shell DesktopShell active=library
 * @add-ref ADD.md §12 · Word Library » Views » Cards
 *
 * Sticky filter bar + stage-filter chips, then a responsive WordCard grid.
 */
import { C, S, SZ, SHL } from "../_shared/tokens";
import { Btn, Icon } from "../_shared/primitives";
import { DesktopShell, DesktopTopbar } from "../_shared/shells";
import { FilterBar, StageFilters } from "./_filter-bars";
import { WordCard } from "./_word-views";
import { STAGE_COUNTS, WORDS } from "./_data";

export function WLDesktopCards() {
  return (
    <DesktopShell
      active="library"
      showCompanionMini
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
      <div data-role="sticky-filters" style={{ position: "sticky", top: 0, zIndex: 2 }}>
        <FilterBar view="cards" total={STAGE_COUNTS.total} />
        <StageFilters active="all" />
      </div>
      <div
        style={{
          padding: `${S[5]}px ${SHL.pagePadX}px`,
          display: "grid",
          gridTemplateColumns: `repeat(auto-fill, minmax(${SZ.cardMinW}px, 1fr))`,
          gap: S[4],
        }}
      >
        {WORDS.map((w) => (
          <WordCard key={w.w} w={w} />
        ))}
      </div>
    </DesktopShell>
  );
}
