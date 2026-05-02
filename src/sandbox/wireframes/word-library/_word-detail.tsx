/**
 * Word Library · detail body
 *
 * The full word detail rendered both in the desktop right-pane and as a
 * standalone mobile page. `menuOpen` toggles the dropdown over the More
 * button (used by the menu-open screens).
 */
import React from "react";
import { C, S, R, T, F, SZ, tt } from "../_shared/tokens";
import { Btn, Card, Chip, Icon, Lbl } from "../_shared/primitives";
import { GenderChip, TypeChip, StageChip, SrcChip } from "./_chips";
import type { Word } from "./_data";

const MENU_ITEMS: { icon: import("../_shared/primitives").IconName; label: string; hint?: string; destructive?: boolean }[] = [
  { icon: "refresh", label: "Reset progress", hint: "Back to ‘Just planted’" },
  { icon: "leaf", label: "Mark as leech", hint: "Flag a stuck word" },
  { icon: "archive", label: "Archive", hint: "Hide from reviews" },
  { icon: "trash", label: "Delete", destructive: true },
];

function MoreMenu({ open }: { open: boolean }) {
  if (!open) return null;
  return (
    <div
      data-shadcn="DropdownMenuContent"
      role="menu"
      style={{
        position: "absolute",
        bottom: "100%",
        right: 0,
        marginBottom: S[1],
        minWidth: 240,
        background: C.surface.raised,
        border: `1px solid ${C.border.medium}`,
        borderRadius: R.md,
        boxShadow: "0 -12px 32px rgba(0,0,0,0.10)",
        padding: S[1],
        zIndex: 20,
      }}
    >
      {MENU_ITEMS.map((it, i) => {
        const col = it.destructive ? C.status.error.text : C.text.primary;
        return (
          <React.Fragment key={it.label}>
            {i === MENU_ITEMS.length - 1 && (
              <div style={{ height: 1, background: C.border.subtle, margin: `${S[1]}px 0` }} />
            )}
            <div
              data-shadcn="DropdownMenuItem"
              role="menuitem"
              style={{
                display: "flex",
                alignItems: "center",
                gap: S[3],
                padding: `${S[2]}px ${S[3]}px`,
                borderRadius: R.sm,
                cursor: "pointer",
              }}
            >
              <Icon name={it.icon} size={SZ.iconSm} color={col} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ ...tt(T.body), color: col }}>{it.label}</div>
                {it.hint && <div style={{ ...tt(T.caption), color: C.text.muted }}>{it.hint}</div>}
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

interface WordDetailProps {
  w: Word;
  scope?: "desktop" | "mobile";
  menuOpen?: boolean;
}

export function WordDetail({ w, scope = "desktop", menuOpen = false }: WordDetailProps) {
  const pad = scope === "mobile" ? S[4] : S[6];
  return (
    <div
      data-role="word-detail"
      style={{ display: "flex", flexDirection: "column", gap: S[5], padding: pad }}
    >
      {/* Header chips */}
      <div style={{ display: "flex", gap: S[2], flexWrap: "wrap" }}>
        <GenderChip gender={w.gender} />
        <TypeChip type={w.type} />
        <StageChip stage={w.stage} />
        <SrcChip src={w.src} />
      </div>

      {/* Word + translation */}
      <div>
        <div style={{ ...tt(T.display), fontFamily: F.heading, color: C.text.primary }}>{w.w}</div>
        <div style={{ ...tt(T.bodyLg), color: C.text.secondary, marginTop: S[1] }}>{w.tr}</div>
      </div>

      {/* Alt translations */}
      <div>
        <Lbl>Also translates as</Lbl>
        <div style={{ display: "flex", gap: S[2], marginTop: S[2], flexWrap: "wrap" }}>
          <Chip variant="status-neutral">merindukan</Chip>
          <Chip variant="status-neutral">rindu yang dalam</Chip>
        </div>
      </div>

      {/* Examples */}
      <div>
        <Lbl>Examples</Lbl>
        <div style={{ display: "flex", flexDirection: "column", gap: S[3], marginTop: S[2] }}>
          <Card padding={S[4]}>
            <div style={{ ...tt(T.body), fontFamily: F.heading, color: C.text.primary }}>
              Sie hatte eine tiefe Sehnsucht nach dem Meer.
            </div>
            <div style={{ ...tt(T.bodySm), color: C.text.muted, marginTop: S[1] }}>
              Dia memiliki kerinduan yang dalam akan laut.
            </div>
          </Card>
          <Card padding={S[4]}>
            <div style={{ ...tt(T.body), fontFamily: F.heading, color: C.text.primary }}>
              Die Sehnsucht nach Hause wurde immer stärker.
            </div>
            <div style={{ ...tt(T.bodySm), color: C.text.muted, marginTop: S[1] }}>
              Kerinduan akan rumah semakin kuat.
            </div>
          </Card>
        </div>
      </div>

      {/* Grammar */}
      <div>
        <Lbl>Grammar</Lbl>
        <Card padding={S[4]} style={{ marginTop: S[2] }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              gap: `${S[2]}px ${S[5]}px`,
              ...tt(T.bodySm),
            }}
          >
            <span style={{ color: C.text.muted }}>Gender</span>
            <span style={{ color: C.text.primary }}>die (feminine)</span>
            <span style={{ color: C.text.muted }}>Plural</span>
            <span style={{ color: C.text.primary }}>die Sehnsüchte</span>
            <span style={{ color: C.text.muted }}>Article</span>
            <span style={{ color: C.text.primary }}>die / eine</span>
          </div>
        </Card>
      </div>

      {/* Tags */}
      <div>
        <Lbl>Tags</Lbl>
        <div style={{ display: "flex", gap: S[2], marginTop: S[2], flexWrap: "wrap" }}>
          <Chip variant="ai">emotion</Chip>
          <Chip variant="ai">poetic</Chip>
          <Chip variant="user">Favourites</Chip>
        </div>
      </div>

      {/* Stats */}
      <div>
        <Lbl>Learning stats</Lbl>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: S[3],
            marginTop: S[2],
          }}
        >
          <Card padding={S[4]}>
            <div style={{ ...tt(T.caption), color: C.text.muted }}>Reviews</div>
            <div style={{ ...tt(T.h2), fontFamily: F.heading, color: C.text.primary }}>
              {w.reviews}
            </div>
          </Card>
          <Card padding={S[4]}>
            <div style={{ ...tt(T.caption), color: C.text.muted }}>Correct rate</div>
            <div style={{ ...tt(T.h2), fontFamily: F.heading, color: C.text.primary }}>
              {w.rate}
            </div>
          </Card>
          <Card padding={S[4]}>
            <div style={{ ...tt(T.caption), color: C.text.muted }}>Next review</div>
            <div style={{ ...tt(T.bodyLg), color: C.text.primary, marginTop: S[1] }}>
              {w.due === "today" ? "Today" : w.due}
            </div>
          </Card>
          <Card padding={S[4]}>
            <div style={{ ...tt(T.caption), color: C.text.muted }}>Stage</div>
            <div
              style={{
                ...tt(T.bodyLg),
                color: C.text.primary,
                marginTop: S[1],
                textTransform: "capitalize",
              }}
            >
              {w.stage}
            </div>
          </Card>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: S[2], paddingTop: S[2] }}>
        <Btn variant="default">Study this word</Btn>
        <Btn variant="secondary">Edit</Btn>
        <div style={{ position: "relative" }}>
          <Btn variant="ghost">
            <Icon name="dots" size={SZ.iconSm} color={C.text.secondary} />
          </Btn>
          <MoreMenu open={menuOpen} />
        </div>
      </div>
    </div>
  );
}
