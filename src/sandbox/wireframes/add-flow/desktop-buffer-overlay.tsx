/**
 * @screen add-flow/desktop-buffer-overlay
 * @shell DesktopShell with scrim on content only
 *
 * Buffer overlay — appears when user closes add modal with unverified words.
 * Scrim covers content area only. Persists across navigation.
 */
import { C, SZ } from "../_shared/tokens";
import { Btn, Icon } from "../_shared/primitives";
import { DesktopShell, DesktopTopbar } from "../_shared/shells";
import { DesktopOverlayCard } from "./_shared";

export function AWDesktopBufferOverlay() {
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
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(42,26,16,0.28)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <DesktopOverlayCard
          title="3 unverified words"
          subtitle="Verify before studying or browsing."
        >
          <Btn variant="default" style={{ width: "100%", height: SZ.btnMd }}>
            Verify now
          </Btn>
          <Btn variant="secondary" style={{ width: "100%", height: SZ.btnMd }}>
            Add more words
          </Btn>
        </DesktopOverlayCard>
      </div>
    </DesktopShell>
  );
}
