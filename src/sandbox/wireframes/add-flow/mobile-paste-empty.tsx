/**
 * @screen add-flow/mobile-paste-empty
 * @shell MobileShell with drawer overlay
 *
 * Mobile add word drawer — Paste tab, empty state.
 * Scrim only covers content area — topbar and bottom nav stay visible.
 */
import { C, SZ } from "../_shared/tokens";
import { Btn, Icon } from "../_shared/primitives";
import { MobileShell, MobileTopbar } from "../_shared/shells";
import { MobileAddDrawer } from "./_shared";
import { PasteEmptyContent } from "./_tab-contents";

export function AWMobilePasteEmpty() {
  return (
    <MobileShell
      active="library"
      showCompanionMini={false}
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
      <div style={{ position: "absolute", inset: 0, background: "rgba(42,26,16,0.28)", zIndex: 15 }} />
      <MobileAddDrawer tab="paste" bufferCount={0}>
        <PasteEmptyContent />
      </MobileAddDrawer>
    </MobileShell>
  );
}
