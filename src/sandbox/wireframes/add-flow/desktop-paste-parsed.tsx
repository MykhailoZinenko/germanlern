/**
 * @screen add-flow/desktop-paste-parsed
 * @shell DesktopShell with scrim on content only
 *
 * Desktop add word modal — Paste tab, parsed/results state.
 * Scrim only covers the content area — sidebar and topbar stay visible.
 */
import { C, SZ } from "../_shared/tokens";
import { Btn, Icon } from "../_shared/primitives";
import { DesktopShell, DesktopTopbar } from "../_shared/shells";
import { DesktopAddModal } from "./_shared";
import { PasteParsedContent } from "./_tab-contents";

export function AWDesktopPasteParsed() {
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
        <DesktopAddModal tab="paste" bufferCount={0}>
          <PasteParsedContent />
        </DesktopAddModal>
      </div>
    </DesktopShell>
  );
}
