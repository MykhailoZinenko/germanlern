/**
 * GermanLern · Wireframe tokens (TS port of wireframes/tokens.js)
 *
 * Source of truth for every pixel and color used in the wireframe screens.
 * Maps 1:1 to docs/DD.md and src/styles.css. When porting a wireframe to
 * production, the name read here is the name to write in real components.
 *
 * RULES
 *  - No literal pixel or hex values in atoms or screens. Read from these tokens.
 *  - Every size rounds to the 4px grid.
 *  - Every color traces back to DD.md.
 */

export const wfColor = {
  surface: {
    page: "#fef0e8",
    raised: "#fff8f4",
    sunken: "#fde8d8",
    hover: "#fcdcc8",
    active: "#f8c8b0",
  },
  border: {
    subtle: "#f8d8c4",
    medium: "#f0c4a8",
    strong: "#e8a888",
  },
  text: {
    primary: "#2a1a10",
    secondary: "#4a3020",
    muted: "#7a5840",
    faint: "#a88870",
    inverse: "#fff8f4",
  },
  action: {
    bg: "#8868c8",
    text: "#fff8f4",
    hover: "#7858b8",
    active: "#6848a8",
    secondaryBorder: "#f0c4a8",
    secondaryText: "#4a3020",
    destructiveBg: "#e05040",
    destructiveText: "#fff8f4",
  },
  lumi: {
    lightest: "#f5f0fc",
    light: "#e8d8f8",
    soft: "#c8b0e8",
    mid: "#c4aee8",
    deep: "#8868c8",
    text: "#4a3490",
    border: "#b898e0",
  },
  stage: {
    planted: { bg: "#f8c8b0", text: "#7a3018", border: "#f0a888", dot: "#e07848" },
    growing: { bg: "#f8e890", text: "#785010", border: "#f0d060", dot: "#c89820" },
    almost: { bg: "#f0c858", text: "#703808", border: "#d8a030", dot: "#b87818" },
    mastered: { bg: "#a8c8a0", text: "#204818", border: "#78a870", dot: "#4a8840" },
  },
  status: {
    success: { bg: "#a8c8a0", text: "#204818", border: "#78a870" },
    warning: { bg: "#f8c8b0", text: "#7a3018", border: "#f0a888" },
    error: { bg: "#f8c8c8", text: "#901818", border: "#e89090" },
    info: { bg: "#e8d8f8", text: "#4a3490", border: "#b898e0" },
    neutral: { bg: "#fde8d8", text: "#7a5840", border: "#f8d8c4" },
  },
} as const;

export const wfSpace = {
  1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32, 10: 40, 12: 48, 16: 64,
} as const;

export const wfRadius = {
  sm: 6, md: 8, lg: 10, xl: 14, "2xl": 18, full: 9999,
} as const;

export const wfShadow = {
  sm: "0 2px 8px rgba(60,50,30,0.08)",
  md: "0 4px 20px rgba(60,50,30,0.12)",
  lg: "0 8px 40px rgba(60,50,30,0.16)",
} as const;

export type FontFamilyKey = "heading" | "sans";

export interface TypeScale {
  size: number;
  weight: number;
  family: FontFamilyKey;
  lh: number;
  tracking?: number;
}

export const wfType: Record<string, TypeScale> = {
  display: { size: 40, weight: 600, family: "heading", lh: 1.1 },
  h1: { size: 32, weight: 600, family: "heading", lh: 1.15 },
  h2: { size: 24, weight: 600, family: "heading", lh: 1.2 },
  h3: { size: 20, weight: 600, family: "heading", lh: 1.3 },
  bodyLg: { size: 18, weight: 400, family: "sans", lh: 1.5 },
  body: { size: 16, weight: 400, family: "sans", lh: 1.5 },
  bodySm: { size: 14, weight: 400, family: "sans", lh: 1.45 },
  label: { size: 12, weight: 500, family: "sans", lh: 1.3, tracking: 0.06 },
  caption: { size: 11, weight: 400, family: "sans", lh: 1.3 },
  button: { size: 14, weight: 500, family: "sans", lh: 1 },
  chip: { size: 11, weight: 500, family: "sans", lh: 1 },
};

export const wfShell = {
  breakpoint: 1024,
  sidebarW: 240,
  topbarH: 64,
  topbarHMobile: 56,
  bottomNavH: 64,
  safeTopMobile: 44,
  safeBottomMobile: 34,
  contentMaxW: 1280,
  pagePadX: 32,
  pagePadXMobile: 16,
  companionMini: 80,
  companionDashboard: 320,
} as const;

export const wfSize = {
  btnSm: 32,
  btnMd: 40,
  btnLg: 48,
  fieldMd: 40,
  fieldLg: 48,
  chip: 24,
  searchH: 40,
  iconSm: 16,
  iconMd: 20,
  iconLg: 24,
  cardMinW: 280,
  cardStripH: 4,
  stageDot: 10,
  avatarSm: 32,
  avatarMd: 40,
  avatarLg: 56,
} as const;

export const wfViewport = {
  mobile: { w: 375, h: 812 },
  desktop: { w: 1440, h: 900 },
} as const;

export const wfFont = {
  heading: "'Fraunces', Georgia, serif",
  sans: "'Inter', ui-sans-serif, system-ui, sans-serif",
} as const;

/** Convert a TypeScale into a React style object. */
export function tt(scale: TypeScale): React.CSSProperties {
  return {
    fontSize: scale.size,
    fontWeight: scale.weight,
    fontFamily: scale.family === "heading" ? wfFont.heading : wfFont.sans,
    lineHeight: scale.lh,
    letterSpacing: scale.tracking ? `${scale.tracking}em` : undefined,
  };
}

/* Short aliases — match the wireframe-source naming so screens read 1:1. */
export const C = wfColor;
export const S = wfSpace;
export const R = wfRadius;
export const SH = wfShadow;
export const T = wfType;
export const SHL = wfShell;
export const SZ = wfSize;
export const F = wfFont;
