/**
 * @screen word-library/mobile-filters
 * @shell MobileShell active=library, contentScroll=true
 * @add-ref ADD.md §12 · Word Library » Mobile » Filters
 *
 * Full-page filter editor. Reached from a filter action in the mobile
 * list view. Bottom button row commits or clears.
 */
import { C, S, R, T, F, SZ, SHL, tt } from "../_shared/tokens";
import { Btn, Icon, Lbl, Chip } from "../_shared/primitives";
import { MobileShell, MobileTopbar } from "../_shared/shells";

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: S[2] }}>
      <Lbl>{label}</Lbl>
      <div style={{ display: "flex", flexWrap: "wrap", gap: S[2] }}>{children}</div>
    </div>
  );
}

function FilterChip({ label, active }: { label: string; active?: boolean }) {
  return (
    <div
      style={{
        height: 32,
        padding: `0 ${S[3]}px`,
        borderRadius: R.full,
        border: `1px solid ${active ? C.border.strong : C.border.subtle}`,
        background: active ? C.surface.sunken : "transparent",
        color: active ? C.text.primary : C.text.secondary,
        ...tt(T.bodySm),
        display: "inline-flex",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      {label}
    </div>
  );
}

function SortRow({ label, active }: { label: string; active?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: `${S[3]}px ${S[3]}px`,
        borderRadius: R.md,
        background: active ? C.surface.sunken : "transparent",
        border: `1px solid ${active ? C.border.strong : C.border.subtle}`,
      }}
    >
      <span style={{ ...tt(T.body), color: C.text.primary }}>{label}</span>
      {active && <Icon name="check" size={SZ.iconSm} color={C.text.primary} />}
    </div>
  );
}

export function WLMobileFilters() {
  return (
    <MobileShell
      active="library"
      topbar={
        <MobileTopbar
          left={
            <Btn variant="ghost" style={{ width: SZ.btnMd, height: SZ.btnMd, padding: 0 }}>
              <Icon name="x" size={SZ.iconMd} color={C.text.secondary} />
            </Btn>
          }
          title="Filters & sort"
        />
      }
    >
      <div
        style={{
          padding: `${S[5]}px ${SHL.pagePadXMobile}px ${S[8]}px`,
          display: "flex",
          flexDirection: "column",
          gap: S[6],
        }}
      >
        <Section label="Stage">
          <FilterChip label="All · 184" active />
          <FilterChip label="🌱 Planted · 42" />
          <FilterChip label="🔄 Growing · 58" />
          <FilterChip label="💪 Almost · 61" />
          <FilterChip label="⭐ Mastered · 23" />
        </Section>

        <Section label="Word type">
          <FilterChip label="Nouns" />
          <FilterChip label="Verbs" />
          <FilterChip label="Adjectives" />
        </Section>

        <Section label="Source">
          <FilterChip label="DWDS verified" />
          <FilterChip label="AI verified" />
        </Section>

        <Section label="Tags">
          <Chip variant="ai">emotion</Chip>
          <Chip variant="ai">daily-life</Chip>
          <Chip variant="ai">academic</Chip>
          <Chip variant="ai">poetic</Chip>
          <Chip variant="user">Favourites</Chip>
        </Section>

        <div style={{ display: "flex", flexDirection: "column", gap: S[2] }}>
          <Lbl>Sort by</Lbl>
          <div style={{ display: "flex", flexDirection: "column", gap: S[2] }}>
            <SortRow label="Date added (newest)" active />
            <SortRow label="Alphabetical" />
            <SortRow label="Stage" />
            <SortRow label="Next review" />
            <SortRow label="Most reviewed" />
          </div>
        </div>

        <div
          style={{
            ...tt(T.caption),
            color: C.text.muted,
            fontFamily: F.mono,
            paddingTop: S[2],
          }}
        >
          84 words match
        </div>
      </div>

      <div
        style={{
          position: "sticky",
          bottom: 0,
          padding: `${S[3]}px ${SHL.pagePadXMobile}px`,
          borderTop: `1px solid ${C.border.subtle}`,
          background: C.surface.raised,
          display: "flex",
          gap: S[2],
        }}
      >
        <Btn variant="secondary" style={{ flex: 1 }}>
          Clear all
        </Btn>
        <Btn variant="default" style={{ flex: 2 }}>
          Apply
        </Btn>
      </div>
    </MobileShell>
  );
}
