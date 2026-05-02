/**
 * @screen word-library/mobile-cards
 * @shell MobileShell active=library
 * @add-ref ADD.md §12 · Word Library » Mobile » Cards
 *
 * Same topbar as mobile-list. Single-column card list.
 */
import { C, S, SZ, SHL } from "../_shared/tokens";
import { Btn, Icon } from "../_shared/primitives";
import { MobileShell, MobileTopbar } from "../_shared/shells";
import { WordCard } from "./_word-views";
import { WORDS } from "./_data";

export function WLMobileCards() {
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
