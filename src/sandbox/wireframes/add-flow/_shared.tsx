/**
 * Add-flow · shared atoms
 */
import type { ReactNode } from "react";
import { C, S, R, T, SZ, SHL, F, tt } from "../_shared/tokens";
import { Btn, Icon } from "../_shared/primitives";

/* ── Add-flow layout tokens ── */

export const AW = {
  modalW: 560,
  modalContentH: 340,
  drawerContentH: 420,
  overlayW: 400,
  overlayIconSize: SZ.btnLg,
  dragHandleW: SZ.btnMd,
  dragHandleH: S[1],
  textareaH: 160,
  dropzoneH: 200,
  dropzoneHMobile: 160,
} as const;

/* ── Bookmark Tabs ── */

export type TabId = "type" | "scan" | "paste";

const TABS: { id: TabId; label: string }[] = [
  { id: "type", label: "Type" },
  { id: "scan", label: "Scan" },
  { id: "paste", label: "Paste" },
];

export function BookmarkTabs({ active = "type" }: { active?: TabId }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end" }}>
      {TABS.map((tab) => {
        const on = tab.id === active;
        return (
          <div
            key={tab.id}
            style={{
              padding: on
                ? `${S[4]}px ${S[5]}px ${S[2]}px`
                : `${S[2]}px ${S[4]}px ${S[2]}px`,
              background: on ? C.surface.page : C.surface.sunken,
              border: `1px solid ${C.border.subtle}`,
              borderBottom: on ? `1px solid ${C.surface.page}` : "none",
              borderRadius: `${R.md}px ${R.md}px 0 0`,
              ...tt(T.bodySm),
              fontWeight: on ? 600 : 400,
              color: on ? C.text.primary : C.text.faint,
              cursor: "pointer",
              position: "relative",
              zIndex: on ? 2 : 1,
              whiteSpace: "nowrap",
            }}
          >
            {tab.label}
          </div>
        );
      })}
    </div>
  );
}

/* ── Buffer Badge (prominent version) ── */

export function BufferBadge({ count = 0 }: { count?: number }) {
  const text =
    count === 0
      ? "No words yet"
      : `${count} word${count !== 1 ? "s" : ""} in buffer · not yet verified`;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: S[2],
        height: SZ.btnMd,
        padding: `0 ${S[4]}px`,
        background: count > 0 ? C.stage.planted.bg : C.surface.sunken,
        border: count > 0 ? `1px solid ${C.stage.planted.border}` : "none",
        borderBottom: `1px solid ${count > 0 ? C.stage.planted.border : C.border.subtle}`,
        flexShrink: 0,
      }}
    >
      {count > 0 && (
        <Icon name="sparkle" size={SZ.iconSm} color={C.stage.planted.text} />
      )}
      <span
        style={{
          ...tt(T.bodySm),
          fontWeight: count > 0 ? 500 : 400,
          color: count > 0 ? C.stage.planted.text : C.text.muted,
          flex: 1,
        }}
      >
        {text}
      </span>
      {count > 0 && (
        <Icon name="chevRight" size={SZ.iconSm} color={C.stage.planted.text} />
      )}
    </div>
  );
}

/* ── Highlighted word chip (selected = lumi purple, deselected = muted) ── */

export function WordHighlight({ word, selected = true }: { word: string; selected?: boolean }) {
  return (
    <span
      style={{
        display: "inline",
        padding: `${S[1]}px ${S[2]}px`,
        borderRadius: R.sm,
        background: selected ? C.lumi.light : "transparent",
        border: selected ? `1px solid ${C.lumi.border}` : `1px solid ${C.border.medium}`,
        color: selected ? C.lumi.text : C.text.secondary,
        ...tt(T.body),
        cursor: "pointer",
      }}
    >
      {word}
    </span>
  );
}

/* ── Already-in-library word (crossed out) ── */

export function WordInLibrary({ word }: { word: string }) {
  return (
    <span
      style={{
        display: "inline",
        padding: `${S[1]}px ${S[2]}px`,
        borderRadius: R.sm,
        background: C.surface.sunken,
        border: `1px solid ${C.border.subtle}`,
        color: C.text.faint,
        ...tt(T.body),
        textDecoration: "line-through",
      }}
    >
      {word}
    </span>
  );
}

/* ── Desktop Modal Container (fixed content height) ── */

interface DesktopModalProps {
  tab?: TabId;
  bufferCount?: number;
  children: ReactNode;
}

export function DesktopAddModal({ tab = "type", bufferCount = 0, children }: DesktopModalProps) {
  return (
    <div
      data-role="add-word-modal"
      style={{ width: AW.modalW, position: "relative", display: "flex", flexDirection: "column" }}
    >
      <div style={{ position: "relative", zIndex: 3 }}>
        <BookmarkTabs active={tab} />
      </div>
      <div
        style={{
          background: C.surface.page,
          border: `1px solid ${C.border.subtle}`,
          borderRadius: `0 ${R.xl}px ${R.xl}px ${R.xl}px`,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          position: "relative",
          zIndex: 2,
        }}
      >
        <BufferBadge count={bufferCount} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: `${S[5]}px ${S[6]}px ${S[4]}px`,
          }}
        >
          <span style={{ ...tt(T.h3), fontFamily: F.heading, color: C.text.primary }}>Add word</span>
          <span style={{ ...tt(T.h3), color: C.text.faint, cursor: "pointer" }}>×</span>
        </div>
        <div style={{ height: AW.modalContentH, overflowY: "auto", padding: `0 ${S[6]}px ${S[6]}px` }}>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ── Desktop Buffer Overlay Card ── */

export function DesktopOverlayCard({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div
      data-role="buffer-overlay"
      style={{
        width: AW.overlayW,
        background: C.surface.raised,
        borderRadius: R["2xl"],
        padding: `${S[8]}px ${S[6]}px`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: AW.overlayIconSize,
          height: AW.overlayIconSize,
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
      <div style={{ ...tt(T.h3), fontFamily: F.heading, color: C.text.primary, marginBottom: S[2] }}>{title}</div>
      <div style={{ ...tt(T.bodySm), color: C.text.muted, marginBottom: S[6] }}>{subtitle}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: S[3], width: "100%" }}>{children}</div>
    </div>
  );
}

/* ── Mobile Drawer Container (fixed content height) ── */

export function MobileAddDrawer({ tab = "type", bufferCount = 0, children }: { tab?: TabId; bufferCount?: number; children: ReactNode }) {
  return (
    <div
      data-role="add-word-drawer"
      style={{ position: "absolute", bottom: 0, left: 0, right: 0, display: "flex", flexDirection: "column", zIndex: 20 }}
    >
      <div>
        <BookmarkTabs active={tab} />
      </div>
      <div
        style={{
          background: C.surface.page,
          borderTop: `1px solid ${C.border.subtle}`,
          borderRadius: `0 ${R.xl}px 0 0`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <BufferBadge count={bufferCount} />
        <div style={{ display: "flex", justifyContent: "center", padding: `${S[2]}px 0` }}>
          <div style={{ width: AW.dragHandleW, height: AW.dragHandleH, borderRadius: R.full, background: C.surface.hover }} />
        </div>
        <div style={{ height: AW.drawerContentH, overflowY: "auto", padding: `0 ${SHL.pagePadXMobile}px ${SHL.pagePadXMobile}px` }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export { Btn, Icon };
