/**
 * Word Library · desktop filter bars
 *
 * Used by desktop list and cards views (NOT detail screens — those use a
 * narrow search field in the list rail).
 */
import { C, S, R, T, SZ, SHL, tt } from "../_shared/tokens";
import { Btn, Field, Icon, ToggleGroup } from "../_shared/primitives";

type WLView = "list" | "cards";

interface FilterBarProps {
  view: WLView;
  onViewChange?: (v: WLView) => void;
  selected?: number;
  total: number;
}

export function FilterBar({ view, onViewChange, selected, total }: FilterBarProps) {
  return (
    <div
      data-role="page-toolbar"
      style={{
        display: "flex",
        alignItems: "center",
        gap: S[3],
        padding: `${S[4]}px ${SHL.pagePadX}px`,
        borderBottom: `1px solid ${C.border.subtle}`,
        background: C.surface.raised,
      }}
    >
      <Field
        placeholder="Search German or Indonesian…"
        leading={<Icon name="search" size={SZ.iconSm} color={C.text.muted} />}
        style={{ width: 320 }}
      />
      <Btn
        variant="secondary"
        leading={<Icon name="filter" size={SZ.iconSm} color={C.text.secondary} />}
      >
        Filters
      </Btn>
      <Btn
        variant="ghost"
        leading={<Icon name="sort" size={SZ.iconSm} color={C.text.secondary} />}
      >
        Sort: Date added
      </Btn>
      <div style={{ flex: 1 }} />
      <div style={{ ...tt(T.bodySm), color: C.text.muted }}>
        {selected ? `${selected} of ${total}` : `${total} words`}
      </div>
      <ToggleGroup
        value={view}
        onChange={onViewChange}
        options={[
          {
            value: "list",
            icon: <Icon name="list" size={SZ.iconSm} color={C.text.muted} />,
            label: "List",
          },
          {
            value: "cards",
            icon: <Icon name="grid" size={SZ.iconSm} color={C.text.muted} />,
            label: "Cards",
          },
        ]}
      />
    </div>
  );
}

interface StageFiltersProps {
  active?: string;
}

export function StageFilters({ active = "all" }: StageFiltersProps) {
  const filters = [
    { id: "all", label: "All · 184" },
    { id: "planted", label: "🌱 Planted · 42" },
    { id: "growing", label: "🔄 Growing · 58" },
    { id: "almost", label: "💪 Almost · 61" },
    { id: "mastered", label: "⭐ Mastered · 23" },
  ];
  return (
    <div
      style={{
        display: "flex",
        gap: S[2],
        padding: `${S[3]}px ${SHL.pagePadX}px`,
        borderBottom: `1px solid ${C.border.subtle}`,
        background: C.surface.raised,
      }}
    >
      {filters.map((f) => (
        <div
          key={f.id}
          data-shadcn="Badge"
          data-variant="filter"
          style={{
            height: 32,
            padding: `0 ${S[3]}px`,
            borderRadius: R.full,
            border: `1px solid ${active === f.id ? C.border.strong : C.border.subtle}`,
            background: active === f.id ? C.surface.sunken : "transparent",
            color: active === f.id ? C.text.primary : C.text.secondary,
            ...tt(T.bodySm),
            display: "inline-flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          {f.label}
        </div>
      ))}
    </div>
  );
}
