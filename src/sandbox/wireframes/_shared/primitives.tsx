/**
 * GermanLern · Wireframe primitives (TS port of wireframes/atoms.jsx atoms)
 *
 * Each primitive carries data-shadcn + data-variant attributes. When porting
 * a wireframe to production, the rule is:
 *
 *   "Replace <Chip data-shadcn='Badge'/> with <Badge/> from src/components/ui/badge.tsx"
 *
 * Every value is read from tokens — no literal pixels or hex anywhere.
 */
import type { CSSProperties, ReactNode } from "react";
import { C, S, R, T, SZ, F, tt } from "./tokens";

/* ═══════════════════════════════════════════════════════════════════════════
 * ICON
 * @shadcn lucide-react
 * ═══════════════════════════════════════════════════════════════════════════ */
const ICON_PATHS: Record<string, string> = {
  plus: "M12 5v14M5 12h14",
  search: "M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16zM21 21l-4.35-4.35",
  chevRight: "M9 6l6 6-6 6",
  chevDown: "M6 9l6 6 6-6",
  chevLeft: "M15 6l-6 6 6 6",
  x: "M6 6l12 12M18 6L6 18",
  list: "M3 6h18M3 12h18M3 18h18",
  grid: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
  home: "M3 11l9-8 9 8M5 10v10h14V10",
  book: "M4 5a2 2 0 0 1 2-2h13v18H6a2 2 0 0 1-2-2zM4 5v14",
  target:
    "M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0-18 0M12 12m-5 0a5 5 0 1 0 10 0a5 5 0 1 0-10 0M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0",
  reader:
    "M2 4h9a3 3 0 0 1 3 3v14a2 2 0 0 0-2-2H2zM22 4h-9a3 3 0 0 0-3 3v14a2 2 0 0 1 2-2h10z",
  files: "M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM14 3v6h6",
  settings:
    "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51",
  user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8",
  sparkle: "M12 3l2.5 5.5L20 11l-5.5 2.5L12 19l-2.5-5.5L4 11l5.5-2.5z",
  flame:
    "M12 2s4 4 4 8-1.5 6-4 6-4-2-4-6 4-8 4-8zM12 22a6 6 0 0 0 6-6c0-2-1-4-2-5 0 3-2 4-4 4s-4-1-4-4c-1 1-2 3-2 5a6 6 0 0 0 6 6z",
  dots: "M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
  filter: "M3 4h18M6 12h12M10 20h4",
  sort: "M3 6h13M3 12h9M3 18h5M17 10v10M17 20l-4-4M17 20l4-4",
  arrRight: "M5 12h14M13 6l6 6-6 6",
  check: "M20 6L9 17l-5-5",
  mic:
    "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v3",
  message: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  leaf: "M11 20A7 7 0 0 1 4 13c0-6 5-10 16-10 0 8-3 17-9 17zM4 21c3-7 8-11 14-13",
  archive: "M3 7h18v4H3zM5 11h14v10H5zM10 15h4",
  trash:
    "M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M6 6l1 14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-14M10 11v6M14 11v6",
  refresh:
    "M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5",
};

export type IconName = keyof typeof ICON_PATHS;

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  style?: CSSProperties;
}

export function Icon({ name, size = SZ.iconMd, color = C.text.muted, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
    >
      <path d={ICON_PATHS[name] ?? ICON_PATHS.plus} />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * CHIP / BADGE
 * @shadcn Badge
 * @variants stage-{planted|growing|almost|mastered} | status-{...} | gender |
 *           wordtype | ai | ai-verified | user | due-today | due-future |
 *           verified | unverified | streak | buffer
 * ═══════════════════════════════════════════════════════════════════════════ */
export type ChipVariant =
  | "stage-planted" | "stage-growing" | "stage-almost" | "stage-mastered"
  | "status-success" | "status-warning" | "status-error" | "status-info" | "status-neutral"
  | "gender" | "wordtype" | "user" | "ai" | "ai-verified"
  | "verified" | "unverified" | "due-today" | "due-future"
  | "streak" | "buffer";

interface ChipProps {
  variant?: ChipVariant;
  children?: ReactNode;
  leading?: ReactNode;
  style?: CSSProperties;
}

const CHIP_PALETTE: Record<ChipVariant, { bg: string; text: string; border: string }> = {
  "stage-planted": C.stage.planted,
  "stage-growing": C.stage.growing,
  "stage-almost": C.stage.almost,
  "stage-mastered": C.stage.mastered,
  "status-success": C.status.success,
  "status-warning": C.status.warning,
  "status-error": C.status.error,
  "status-info": C.status.info,
  "status-neutral": C.status.neutral,
  gender: C.status.neutral,
  wordtype: C.status.neutral,
  user: C.status.neutral,
  ai: C.status.info,
  "ai-verified": C.status.info,
  verified: C.status.success,
  unverified: C.status.error,
  "due-future": C.status.neutral,
  "due-today": C.status.warning,
  streak: C.status.warning,
  buffer: C.status.warning,
};

export function Chip({ variant = "status-neutral", children, leading, style }: ChipProps) {
  const c = CHIP_PALETTE[variant];
  return (
    <span
      data-shadcn="Badge"
      data-variant={variant}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: S[1],
        height: SZ.chip,
        padding: `0 ${S[3]}px`,
        borderRadius: R.full,
        background: c.bg,
        color: c.text,
        border: `1px solid ${c.border}`,
        ...tt(T.chip),
        whiteSpace: "nowrap",
        flexShrink: 0,
        ...style,
      }}
    >
      {leading}
      {children}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * STAGE DOT
 * Decorative — not a shadcn primitive.
 * ═══════════════════════════════════════════════════════════════════════════ */
export type Stage = "planted" | "growing" | "almost" | "mastered";

interface StageDotProps {
  stage?: Stage;
  size?: number;
}

export function StageDot({ stage = "planted", size = SZ.stageDot }: StageDotProps) {
  return (
    <span
      data-role="stage-dot"
      data-stage={stage}
      style={{
        width: size,
        height: size,
        borderRadius: R.full,
        background: C.stage[stage].dot,
        flexShrink: 0,
        display: "inline-block",
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * BUTTON
 * @shadcn Button
 * @variants default (wisteria) | secondary (outline) | destructive | ghost
 * ═══════════════════════════════════════════════════════════════════════════ */
type BtnVariant = "default" | "secondary" | "destructive" | "ghost";
type BtnSize = "sm" | "md" | "lg";

interface BtnProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
  variant?: BtnVariant;
  size?: BtnSize;
  leading?: ReactNode;
  trailing?: ReactNode;
}

export function Btn({
  variant = "default",
  size = "md",
  children,
  leading,
  trailing,
  style,
  ...rest
}: BtnProps) {
  const h = { sm: SZ.btnSm, md: SZ.btnMd, lg: SZ.btnLg }[size];
  const px = { sm: S[3], md: S[4], lg: S[5] }[size];
  const palette: Record<BtnVariant, { bg: string; color: string; border: string }> = {
    default: { bg: C.action.bg, color: C.action.text, border: "transparent" },
    secondary: {
      bg: "transparent",
      color: C.action.secondaryText,
      border: C.action.secondaryBorder,
    },
    destructive: {
      bg: C.action.destructiveBg,
      color: C.action.destructiveText,
      border: "transparent",
    },
    ghost: { bg: "transparent", color: C.text.secondary, border: "transparent" },
  };
  const p = palette[variant];
  return (
    <button
      data-shadcn="Button"
      data-variant={variant}
      data-size={size}
      style={{
        height: h,
        padding: `0 ${px}px`,
        borderRadius: R.md,
        background: p.bg,
        color: p.color,
        border: `1px solid ${p.border}`,
        ...tt(T.button),
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: S[2],
        cursor: "pointer",
        flexShrink: 0,
        ...style,
      }}
      {...rest}
    >
      {leading}
      {children}
      {trailing}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * INPUT
 * @shadcn Input
 * ═══════════════════════════════════════════════════════════════════════════ */
interface FieldProps {
  placeholder?: string;
  value?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  style?: CSSProperties;
}

export function Field({ placeholder, value, leading, trailing, style }: FieldProps) {
  return (
    <div
      data-shadcn="Input"
      style={{
        display: "flex",
        alignItems: "center",
        gap: S[2],
        height: SZ.fieldMd,
        padding: `0 ${S[3]}px`,
        borderRadius: R.md,
        background: C.surface.raised,
        border: `1px solid ${C.border.subtle}`,
        ...tt(T.body),
        color: value ? C.text.primary : C.text.faint,
        ...style,
      }}
    >
      {leading}
      <div style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {value || placeholder}
      </div>
      {trailing}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * LABEL
 * @shadcn Label
 * ═══════════════════════════════════════════════════════════════════════════ */
interface LblProps {
  children: ReactNode;
  style?: CSSProperties;
}

export function Lbl({ children, style }: LblProps) {
  return (
    <div
      data-shadcn="Label"
      style={{ ...tt(T.label), color: C.text.muted, textTransform: "uppercase", ...style }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * CARD
 * @shadcn Card
 * ═══════════════════════════════════════════════════════════════════════════ */
interface CardProps {
  children: ReactNode;
  style?: CSSProperties;
  padding?: number;
  raised?: boolean;
  onClick?: () => void;
}

export function Card({ children, style, padding = S[5], raised = true, onClick }: CardProps) {
  return (
    <div
      data-shadcn="Card"
      onClick={onClick}
      style={{
        background: raised ? C.surface.raised : "transparent",
        border: `1px solid ${C.border.subtle}`,
        borderRadius: R.xl,
        padding,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * SEPARATOR
 * @shadcn Separator
 * ═══════════════════════════════════════════════════════════════════════════ */
interface SepProps {
  vertical?: boolean;
  style?: CSSProperties;
}

export function Sep({ vertical, style }: SepProps) {
  return (
    <div
      data-shadcn="Separator"
      style={{
        background: C.border.subtle,
        ...(vertical ? { width: 1, alignSelf: "stretch" } : { height: 1, width: "100%" }),
        ...style,
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * TOGGLE GROUP (list/grid)
 * @shadcn ToggleGroup
 * ═══════════════════════════════════════════════════════════════════════════ */
interface ToggleOption<V extends string> {
  value: V;
  icon?: ReactNode;
  label: ReactNode;
}

interface ToggleGroupProps<V extends string> {
  value: V;
  onChange?: (v: V) => void;
  options: ToggleOption<V>[];
}

export function ToggleGroup<V extends string>({
  value,
  onChange,
  options,
}: ToggleGroupProps<V>) {
  return (
    <div
      data-shadcn="ToggleGroup"
      style={{
        display: "inline-flex",
        background: C.surface.sunken,
        padding: S[1],
        borderRadius: R.md,
        border: `1px solid ${C.border.subtle}`,
      }}
    >
      {options.map((o) => (
        <div
          key={o.value}
          data-shadcn="ToggleGroupItem"
          data-active={value === o.value}
          onClick={() => onChange?.(o.value)}
          style={{
            height: 32,
            padding: `0 ${S[3]}px`,
            borderRadius: R.sm,
            display: "inline-flex",
            alignItems: "center",
            gap: S[2],
            background: value === o.value ? C.surface.raised : "transparent",
            border:
              value === o.value
                ? `1px solid ${C.border.subtle}`
                : "1px solid transparent",
            color: value === o.value ? C.text.primary : C.text.muted,
            ...tt(T.bodySm),
            cursor: "pointer",
          }}
        >
          {o.icon}
          {o.label}
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * AVATAR
 * @shadcn Avatar
 * ═══════════════════════════════════════════════════════════════════════════ */
interface AvatarProps {
  initials?: string;
  size?: number;
  style?: CSSProperties;
}

export function Avatar({ initials = "C", size = SZ.avatarMd, style }: AvatarProps) {
  return (
    <div
      data-shadcn="Avatar"
      style={{
        width: size,
        height: size,
        borderRadius: R.full,
        background: C.lumi.light,
        color: C.lumi.text,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        ...tt(T.bodySm),
        fontWeight: 600,
        flexShrink: 0,
        ...style,
      }}
    >
      {initials}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * LUMI CANVAS placeholder — Three.js mounts here in real app
 * ═══════════════════════════════════════════════════════════════════════════ */
interface LumiCanvasProps {
  size?: number;
  label?: string;
}

export function LumiCanvas({ size = 80, label = "LUMI 3D CANVAS" }: LumiCanvasProps) {
  return (
    <div
      data-role="lumi-canvas"
      data-size={size}
      style={{
        width: size,
        height: size,
        borderRadius: R.full,
        background: `repeating-linear-gradient(45deg, ${C.lumi.light}, ${C.lumi.light} 6px, ${C.lumi.lightest} 6px, ${C.lumi.lightest} 12px)`,
        border: `1px dashed ${C.lumi.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: C.lumi.text,
        ...tt(T.caption),
        fontFamily: "ui-monospace, monospace",
        textAlign: "center",
        padding: S[2],
        flexShrink: 0,
      }}
    >
      {label}
      <br />
      {size}×{size}
    </div>
  );
}

/* Re-export font alias so screens can read `F.heading` directly. */
export { F };
