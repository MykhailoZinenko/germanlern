/**
 * @screen word-library/desktop-list
 * @shell DesktopShell active=library
 * @add-ref ADD.md §12 · Word Library » Views » List
 *
 * Sticky filter bar + stage-filter chip row, then a flat list of WordRow.
 * Topbar action: "Add words" (primary).
 */
import { useState } from "react";
import { C, SZ } from "../_shared/tokens";
import { Btn, Icon } from "../_shared/primitives";
import { DesktopShell, DesktopTopbar } from "../_shared/shells";
import { FilterBar, StageFilters } from "./_filter-bars";
import { WordRow } from "./_word-views";
import { STAGE_COUNTS, WORDS } from "./_data";

export function WLDesktopList() {
  const [sel, setSel] = useState<string | null>(null);
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
        <FilterBar view="list" total={STAGE_COUNTS.total} />
        <StageFilters active="all" />
      </div>
      <div data-role="list">
        {WORDS.map((w) => (
          <WordRow key={w.w} w={w} selected={sel === w.w} onClick={() => setSel(w.w)} />
        ))}
      </div>
    </DesktopShell>
  );
}
