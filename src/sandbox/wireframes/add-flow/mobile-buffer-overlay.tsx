/**
 * @screen add-flow/mobile-buffer-overlay
 * @shell MobileShell with centered card overlay
 *
 * Mobile buffer overlay — appears when user closes add drawer with unverified words.
 * Centered card covers content area only — topbar and bottom nav stay visible.
 */
import { C, S, R, T, SZ, F, tt } from "../_shared/tokens";
import { Btn, Icon } from "../_shared/primitives";
import { MobileShell, MobileTopbar } from "../_shared/shells";

export function AWMobileBufferOverlay() {
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
        <div
          style={{
            width: "85%",
            background: C.surface.raised,
            borderRadius: R["2xl"],
            padding: `${S[8]}px ${S[5]}px`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: SZ.btnLg,
              height: SZ.btnLg,
              borderRadius: R.full,
              background: C.lumi.light,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: S[4],
            }}
          >
            <Icon name="sparkle" size={SZ.iconLg} color={C.lumi.deep} />
          </div>
          <div style={{ ...tt(T.h3), fontFamily: F.heading, color: C.text.primary, marginBottom: S[2] }}>
            3 unverified words
          </div>
          <div style={{ ...tt(T.bodySm), color: C.text.muted, marginBottom: S[6] }}>
            Verify before studying or browsing.
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: S[3], width: "100%" }}>
            <Btn variant="default" style={{ width: "100%", height: SZ.btnMd }}>
              Verify now
            </Btn>
            <Btn variant="secondary" style={{ width: "100%", height: SZ.btnMd }}>
              Add more words
            </Btn>
          </div>
        </div>
      </div>
    </MobileShell>
  );
}
