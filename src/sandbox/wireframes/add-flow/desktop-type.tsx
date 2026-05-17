/**
 * @screen add-flow/desktop-type
 * @shell DesktopShell with scrim on content only
 *
 * Desktop add word modal — Type tab active.
 * Scrim only covers the content area — sidebar and topbar stay visible.
 */
import { C, SZ } from "../_shared/tokens";
import { Btn, Icon } from "../_shared/primitives";
import { DesktopShell, DesktopTopbar } from "../_shared/shells";
import { DesktopAddModal } from "./_shared";
import { TypeContent } from "./_tab-contents";

export function AWDesktopType() {
  return (
    <DesktopShell
      active="library"
      showCompanionMini={false}
      contentScroll={false}
      topbar={
        <DesktopTopbar
          title="Your words"
          actions={
            <Btn variant="default" leading={<Icon name="plus" size={SZ.iconSm} color={C.action.text} />}>
              Add words
            </Btn>
          }
        />
      }
    >
      <div style={{ position: "absolute", inset: 0, background: "rgba(42,26,16,0.28)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}>
        <DesktopAddModal tab="type" bufferCount={2}>
          <TypeContent />
        </DesktopAddModal>
      </div>
    </DesktopShell>
  );
}
