/**
 * GermanLern · Wireframe shells
 *
 * DesktopShell + MobileShell wrap a screen with the app's nav chrome
 * (sidebar / topbar / bottom nav / browser-chrome placeholders) at real
 * device scale (1440 desktop, 375 mobile).
 *
 * Pages plug into the topbar via the `topbar` slot — they NEVER render
 * a second topbar inside their content.
 */
import type { ReactNode } from "react";
import { C, S, R, T, SZ, F, SHL, wfViewport, tt } from "./tokens";
import { Icon, Avatar, LumiCanvas, type IconName } from "./primitives";

export interface NavItem {
  id: string;
  label: string;
  icon: IconName;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "home", href: "/" },
  { id: "library", label: "Words", icon: "book", href: "/words" },
  { id: "study", label: "Study", icon: "target", href: "/study" },
  { id: "read", label: "Read", icon: "reader", href: "/read" },
  { id: "documents", label: "Documents", icon: "files", href: "/documents" },
];

/* ═══════════════════════════════════════════════════════════════════════════
 * DESKTOP SIDEBAR
 * @shadcn Sidebar
 * ═══════════════════════════════════════════════════════════════════════════ */
interface DesktopSidebarProps {
  active?: string;
}

export function DesktopSidebar({ active }: DesktopSidebarProps) {
  return (
    <aside
      data-shadcn="Sidebar"
      style={{
        width: SHL.sidebarW,
        background: C.surface.sunken,
        borderRight: `1px solid ${C.border.subtle}`,
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      }}
    >
      {/* Brand */}
      <div
        style={{
          height: SHL.topbarH,
          display: "flex",
          alignItems: "center",
          padding: `0 ${S[5]}px`,
          gap: S[3],
          borderBottom: `1px solid ${C.border.subtle}`,
        }}
      >
        <div style={{ width: 28, height: 28, borderRadius: R.md, background: C.lumi.deep }} />
        <span style={{ ...tt(T.h3), color: C.text.primary }}>GermanLern</span>
      </div>

      {/* Nav */}
      <nav
        style={{
          flex: 1,
          padding: S[3],
          display: "flex",
          flexDirection: "column",
          gap: S[1],
        }}
      >
        {NAV_ITEMS.map((n) => {
          const on = active === n.id;
          return (
            <a
              key={n.id}
              data-shadcn="SidebarMenuButton"
              data-active={on}
              style={{
                height: 44,
                padding: `0 ${S[3]}px`,
                borderRadius: R.md,
                display: "flex",
                alignItems: "center",
                gap: S[3],
                background: on ? C.surface.raised : "transparent",
                color: on ? C.text.primary : C.text.secondary,
                border: on ? `1px solid ${C.border.subtle}` : "1px solid transparent",
                ...tt(T.bodySm),
                fontWeight: on ? 600 : 500,
                textDecoration: "none",
              }}
            >
              <Icon name={n.icon} size={SZ.iconMd} color={on ? C.text.primary : C.text.muted} />
              {n.label}
            </a>
          );
        })}
      </nav>

      {/* Footer: streak + totals */}
      <div
        style={{
          padding: S[4],
          borderTop: `1px solid ${C.border.subtle}`,
          display: "flex",
          flexDirection: "column",
          gap: S[3],
        }}
      >
        {/* Streak — warm chip card */}
        <div
          data-role="sidebar-streak"
          style={{
            display: "flex",
            alignItems: "center",
            gap: S[3],
            padding: `${S[2]}px ${S[3]}px`,
            background: C.stage.planted.bg,
            border: `1px solid ${C.stage.planted.border}`,
            borderRadius: R.md,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: R.full,
              background: C.surface.raised,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon name="flame" size={SZ.iconMd} color={C.stage.planted.dot} />
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div
              style={{
                ...tt(T.h3),
                color: C.stage.planted.text,
                fontFamily: F.heading,
                lineHeight: 1,
              }}
            >
              7
            </div>
            <div
              style={{
                ...tt(T.caption),
                color: C.stage.planted.text,
                opacity: 0.75,
              }}
            >
              day streak
            </div>
          </div>
        </div>

        {/* Words total + mastered count */}
        <div
          data-role="sidebar-words"
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            padding: `0 ${S[1]}px`,
          }}
        >
          <span style={{ ...tt(T.caption), color: C.text.muted }}>184 words</span>
          <span style={{ ...tt(T.caption), color: C.text.muted }}>23 mastered</span>
        </div>
      </div>

      {/* Profile */}
      <a
        data-shadcn="SidebarMenuButton"
        style={{
          height: 56,
          padding: `0 ${S[4]}px`,
          display: "flex",
          alignItems: "center",
          gap: S[3],
          borderTop: `1px solid ${C.border.subtle}`,
          textDecoration: "none",
          color: C.text.primary,
        }}
      >
        <Avatar initials="C" size={SZ.avatarSm} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ ...tt(T.bodySm), fontWeight: 600 }}>Cindy</div>
          <div
            style={{
              ...tt(T.caption),
              color: C.text.muted,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            cindy@mail.com
          </div>
        </div>
      </a>
    </aside>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * DESKTOP TOPBAR
 * Pages pass {title, leading, actions}. No second topbar may sit under this.
 * ═══════════════════════════════════════════════════════════════════════════ */
interface DesktopTopbarProps {
  title?: ReactNode;
  leading?: ReactNode;
  actions?: ReactNode;
}

export function DesktopTopbar({ title, leading, actions }: DesktopTopbarProps) {
  return (
    <header
      data-role="app-topbar"
      style={{
        height: SHL.topbarH,
        padding: `0 ${SHL.pagePadX}px`,
        display: "flex",
        alignItems: "center",
        gap: S[4],
        background: C.surface.raised,
        borderBottom: `1px solid ${C.border.subtle}`,
        flexShrink: 0,
      }}
    >
      {leading}
      <div style={{ flex: 1, minWidth: 0 }}>
        {typeof title === "string" ? (
          <h1 style={{ ...tt(T.h2), color: C.text.primary, margin: 0 }}>{title}</h1>
        ) : (
          title
        )}
      </div>
      <div style={{ display: "flex", gap: S[2], alignItems: "center" }}>{actions}</div>
    </header>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * DESKTOP SHELL
 * ═══════════════════════════════════════════════════════════════════════════ */
interface DesktopShellProps {
  active?: string;
  topbar?: ReactNode;
  children: ReactNode;
  showCompanionMini?: boolean;
  contentScroll?: boolean;
}

export function DesktopShell({
  active,
  topbar,
  children,
  showCompanionMini = true,
  contentScroll = true,
}: DesktopShellProps) {
  return (
    <div
      data-screen-viewport="desktop"
      style={{
        width: wfViewport.desktop.w,
        height: wfViewport.desktop.h,
        display: "flex",
        background: C.surface.page,
        color: C.text.primary,
        fontFamily: F.sans,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <DesktopSidebar active={active} />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          minHeight: 0,
        }}
      >
        {topbar}
        <main
          style={{
            flex: 1,
            minWidth: 0,
            minHeight: 0,
            overflow: contentScroll ? "auto" : "hidden",
            display: contentScroll ? "block" : "flex",
          }}
        >
          {children}
        </main>
      </div>
      {showCompanionMini && (
        <div style={{ position: "absolute", right: S[5], bottom: S[5] }}>
          <LumiCanvas size={SHL.companionMini} />
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * MOBILE TOPBAR
 * ═══════════════════════════════════════════════════════════════════════════ */
interface MobileTopbarProps {
  title?: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
}

export function MobileTopbar({ title, left, right }: MobileTopbarProps) {
  return (
    <header
      data-role="app-topbar-mobile"
      style={{
        height: SHL.topbarHMobile,
        padding: `0 ${SHL.pagePadXMobile}px`,
        display: "flex",
        alignItems: "center",
        gap: S[3],
        background: C.surface.raised,
        borderBottom: `1px solid ${C.border.subtle}`,
        flexShrink: 0,
      }}
    >
      {left}
      <div style={{ flex: 1, minWidth: 0 }}>
        {typeof title === "string" ? (
          <h1 style={{ ...tt(T.h3), color: C.text.primary, margin: 0 }}>{title}</h1>
        ) : (
          title
        )}
      </div>
      <div style={{ display: "flex", gap: S[2] }}>{right}</div>
    </header>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * MOBILE BOTTOM NAV
 * ═══════════════════════════════════════════════════════════════════════════ */
interface MobileBottomNavProps {
  active?: string;
}

export function MobileBottomNav({ active }: MobileBottomNavProps) {
  return (
    <nav
      data-role="bottom-nav"
      style={{
        height: SHL.bottomNavH,
        display: "flex",
        background: C.surface.raised,
        borderTop: `1px solid ${C.border.subtle}`,
        flexShrink: 0,
      }}
    >
      {NAV_ITEMS.map((n) => {
        const on = active === n.id;
        return (
          <a
            key={n.id}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              color: on ? C.action.bg : C.text.muted,
              textDecoration: "none",
            }}
          >
            <Icon name={n.icon} size={SZ.iconMd} color={on ? C.action.bg : C.text.muted} />
            <span style={{ ...tt(T.caption), fontSize: 10 }}>{n.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * BROWSER-CHROME PLACEHOLDER
 * Red-striped pattern marks space reserved for Safari/Chrome controls.
 * ═══════════════════════════════════════════════════════════════════════════ */
interface BrowserChromeProps {
  edge?: "top" | "bottom";
  label?: string;
}

export function BrowserChromePlaceholder({ edge = "top", label }: BrowserChromeProps) {
  return (
    <div
      data-role={`browser-chrome-${edge}`}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        [edge]: 0,
        height: edge === "top" ? SHL.safeTopMobile : SHL.safeBottomMobile,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "repeating-linear-gradient(45deg, #e05040 0 8px, #c03828 8px 16px)",
        color: "#fff",
        ...tt(T.caption),
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        fontFamily: "ui-monospace, monospace",
        borderTop: edge === "bottom" ? "1px solid rgba(0,0,0,0.3)" : "none",
        borderBottom: edge === "top" ? "1px solid rgba(0,0,0,0.3)" : "none",
      }}
    >
      {label}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * MOBILE SHELL
 * ═══════════════════════════════════════════════════════════════════════════ */
interface MobileShellProps {
  active?: string;
  topbar?: ReactNode;
  children: ReactNode;
  showCompanionMini?: boolean;
  overlay?: ReactNode;
}

export function MobileShell({
  active,
  topbar,
  children,
  showCompanionMini = true,
  overlay,
}: MobileShellProps) {
  return (
    <div
      data-screen-viewport="mobile"
      style={{
        width: wfViewport.mobile.w,
        height: wfViewport.mobile.h,
        display: "flex",
        flexDirection: "column",
        background: C.surface.page,
        color: C.text.primary,
        fontFamily: F.sans,
        position: "relative",
        overflow: "hidden",
        paddingTop: SHL.safeTopMobile,
        paddingBottom: SHL.safeBottomMobile,
      }}
    >
      <BrowserChromePlaceholder edge="top" label="Browser URL bar" />
      {topbar}
      <main style={{ flex: 1, overflow: "auto", minHeight: 0 }}>{children}</main>
      <MobileBottomNav active={active} />
      <BrowserChromePlaceholder edge="bottom" label="Browser controls" />
      {showCompanionMini && (
        <div
          style={{
            position: "absolute",
            right: S[4],
            bottom: SHL.bottomNavH + SHL.safeBottomMobile + S[4],
          }}
        >
          <LumiCanvas size={SHL.companionMini} />
        </div>
      )}
      {overlay}
    </div>
  );
}
