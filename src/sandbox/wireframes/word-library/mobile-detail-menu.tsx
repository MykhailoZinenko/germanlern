/**
 * @screen word-library/mobile-detail-menu
 * @shell MobileShell active=library, contentScroll=true
 * @add-ref ADD.md §12 · Word Library » Mobile » Detail » More menu
 *
 * Same as mobile-detail with the action sheet open. Renders a full-width
 * sheet pinned to the bottom safe area; in production this is a shadcn
 * Sheet anchored from the More button.
 */
import React from "react";
import { C, S, R, T, SZ, F, tt } from "../_shared/tokens";
import { Btn, Icon } from "../_shared/primitives";
import { MobileShell, MobileTopbar } from "../_shared/shells";
import { WordDetail } from "./_word-detail";
import { WORDS } from "./_data";

const ITEMS: { icon: import("../_shared/primitives").IconName; label: string; hint?: string; destructive?: boolean }[] = [
  { icon: "refresh", label: "Reset progress", hint: "Back to ‘Just planted’" },
  { icon: "leaf", label: "Mark as leech", hint: "Flag a stuck word" },
  { icon: "archive", label: "Archive", hint: "Hide from reviews" },
  { icon: "trash", label: "Delete", destructive: true },
];

function ActionSheet() {
  return (
    <div
      data-shadcn="Sheet"
      data-side="bottom"
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        background: C.surface.raised,
        borderTopLeftRadius: R.xl,
        borderTopRightRadius: R.xl,
        boxShadow: "0 -12px 32px rgba(0,0,0,0.12)",
        padding: `${S[3]}px ${S[4]}px ${S[6]}px`,
        zIndex: 30,
      }}
    >
      <div
        style={{
          width: 36,
          height: 4,
          borderRadius: R.full,
          background: C.border.medium,
          margin: `${S[1]}px auto ${S[3]}px`,
        }}
      />
      <div style={{ ...tt(T.caption), color: C.text.muted, fontFamily: F.mono, padding: `0 ${S[2]}px ${S[2]}px` }}>
        die Sehnsucht
      </div>
      {ITEMS.map((it, i) => {
        const col = it.destructive ? C.status.error.text : C.text.primary;
        return (
          <React.Fragment key={it.label}>
            {i === ITEMS.length - 1 && (
              <div style={{ height: 1, background: C.border.subtle, margin: `${S[2]}px 0` }} />
            )}
            <div
              data-shadcn="SheetItem"
              role="menuitem"
              style={{
                display: "flex",
                alignItems: "center",
                gap: S[3],
                padding: `${S[3]}px ${S[2]}px`,
                borderRadius: R.md,
                cursor: "pointer",
              }}
            >
              <Icon name={it.icon} size={SZ.iconMd} color={col} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ ...tt(T.bodyLg), color: col }}>{it.label}</div>
                {it.hint && <div style={{ ...tt(T.caption), color: C.text.muted }}>{it.hint}</div>}
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export function WLMobileDetailMenu() {
  const w = WORDS[0];
  return (
    <MobileShell
      active="library"
      topbar={
        <MobileTopbar
          left={
            <Btn variant="ghost" size="icon">
              <Icon name="chevron-left" size={SZ.iconSm} color={C.text.secondary} />
            </Btn>
          }
          title={w.w}
          right={
            <Btn variant="ghost" size="icon">
              <Icon name="dots" size={SZ.iconSm} color={C.text.secondary} />
            </Btn>
          }
        />
      }
      overlay={
        <>
          <div
            data-role="scrim"
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.32)",
              zIndex: 25,
            }}
          />
          <ActionSheet />
        </>
      }
    >
      <WordDetail w={w} scope="mobile" />
    </MobileShell>
  );
}
