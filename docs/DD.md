# GermanLern — Design System & Color Specification

> Palette: Pantone Garden Party × Laura Ashley Summer fusion.
> Warm peach-white base from Laura Ashley. Coral, green, and mimosa accents from Pantone Garden Party.
> Lumi's lavender/wisteria anchors the whole system — every color was chosen to harmonize with her.

---

## 1. Design Philosophy

- **Warm over cold** — always prefer the warmer variant of any neutral
- **Saturated pastels** — colors have life and presence, not washed-out beige
- **Two families, clear roles** — warm coral-peach-gold for stages and surfaces, lumi purple exclusively for companion and AI
- **Positive only** — no color should feel alarming or punishing
- **Lavender anchors everything** — Lumi is always present, nothing clashes with her
- **No dark mode in v1** — single light theme, designed for warmth and natural daylight

---

## 2. Base Surfaces

Laura Ashley warm white base — peach-tinted, alive, not parchment.

| Token | Hex | Usage |
|---|---|---|
| `--surface-page` | `#fef0e8` | Page background, outermost layer |
| `--surface-raised` | `#fff8f4` | Cards, panels, modals — sits above page |
| `--surface-sunken` | `#fde8d8` | Input fields, inset areas, sidebar |
| `--surface-hover` | `#fcdcc8` | Hover state on interactive surfaces |
| `--surface-active` | `#f8c8b0` | Active/pressed state |

---

## 3. Border Colors

| Token | Hex | Usage |
|---|---|---|
| `--border-subtle` | `#f8d8c4` | Default border — cards, dividers, inputs |
| `--border-medium` | `#f0c4a8` | Emphasized borders, selected states |
| `--border-strong` | `#e8a888` | Focus rings, active component borders |

---

## 4. Typography Colors

Warm dark browns — never cold grey.

| Token | Hex | Usage |
|---|---|---|
| `--text-primary` | `#2a1a10` | Headlines, important labels, primary content |
| `--text-secondary` | `#4a3020` | Body text, descriptions |
| `--text-muted` | `#7a5840` | Secondary labels, captions, placeholder hints |
| `--text-faint` | `#a88870` | Disabled text, very secondary information |
| `--text-inverse` | `#fff8f4` | Text on dark/colored backgrounds |

---

## 5. Primary Action

Lumi wisteria-purple. Every primary action ties back to the companion.

| Token | Hex | Usage |
|---|---|---|
| `--action-bg` | `#8868c8` | Primary button background |
| `--action-text` | `#fff8f4` | Primary button label |
| `--action-hover` | `#7858b8` | Primary button hover |
| `--action-active` | `#6848a8` | Primary button pressed |
| `--action-secondary-bg` | `transparent` | Secondary button background |
| `--action-secondary-border` | `#f0c4a8` | Secondary button border |
| `--action-secondary-text` | `#4a3020` | Secondary button label |
| `--action-destructive-bg` | `#e05040` | Destructive action (logout, delete) |
| `--action-destructive-text` | `#fff8f4` | Destructive button label |

---

## 6. Lumi — Companion Colors

Wisteria-lavender family. Exclusive to companion and AI — nothing else uses these.

| Token | Hex | Source |
|---|---|---|
| `--lumi-lightest` | `#f5f0fc` | AI suggestion backgrounds, very subtle tints |
| `--lumi-light` | `#e8d8f8` | AI suggestion row background, companion bubble |
| `--lumi-soft` | `#c8b0e8` | Companion hover, soft accents |
| `--lumi-mid` | `#c4aee8` | Lumi's body color — Hanataba wisteria |
| `--lumi-deep` | `#8868c8` | Primary button, strong companion accent |
| `--lumi-text` | `#4a3490` | Text on lumi-light backgrounds |
| `--lumi-border` | `#b898e0` | AI suggestion borders, companion card border |

**Rule:** Purple = companion or AI. Always. No other element uses purple.

---

## 7. Word Stages

Warm coral-to-gold single family. Progress feels like morning peach light deepening to golden afternoon.
Sage green from Pantone Garden Party for mastered — the one exception, universally readable as success.

### 🌱 Just Planted — soft peach
| Token | Hex |
|---|---|
| `--stage-planted-bg` | `#f8c8b0` |
| `--stage-planted-text` | `#7a3018` |
| `--stage-planted-border` | `#f0a888` |
| `--stage-planted-dot` | `#e07848` |

### 🔄 Still Growing — warm yellow
| Token | Hex |
|---|---|
| `--stage-growing-bg` | `#f8e890` |
| `--stage-growing-text` | `#785010` |
| `--stage-growing-border` | `#f0d060` |
| `--stage-growing-dot` | `#c89820` |

### 💪 Almost There — golden amber
| Token | Hex |
|---|---|
| `--stage-almost-bg` | `#f0c858` |
| `--stage-almost-text` | `#703808` |
| `--stage-almost-border` | `#d8a030` |
| `--stage-almost-dot` | `#b87818` |

### ⭐ Mastered — garden green (Pantone)
| Token | Hex |
|---|---|
| `--stage-mastered-bg` | `#a8c8a0` |
| `--stage-mastered-text` | `#204818` |
| `--stage-mastered-border` | `#78a870` |
| `--stage-mastered-dot` | `#4a8840` |

---

## 8. Exercise Answer States

| State | Background | Text | Border |
|---|---|---|---|
| Idle | `#fff8f4` | `#2a1a10` | `#f8d8c4` |
| Selected | `#fde8d8` | `#2a1a10` | `#f0c4a8` |
| Correct | `#a8c8a0` | `#204818` | `#78a870` |
| Wrong | `#f8c8c8` | `#901818` | `#e89090` |
| Matched | `#a8c8a0` | `#204818` | `#78a870` |

---

## 9. Semantic Status Colors

| Semantic | Background | Text | Border | Usage |
|---|---|---|---|---|
| Success | `#a8c8a0` | `#204818` | `#78a870` | Correct, mastered, done, verified |
| Warning | `#f8c8b0` | `#7a3018` | `#f0a888` | Due today, buffer, urgency |
| Error | `#f8c8c8` | `#901818` | `#e89090` | Wrong answers, validation errors |
| Info | `#e8d8f8` | `#4a3490` | `#b898e0` | AI suggestions, companion messages |
| Neutral | `#fde8d8` | `#7a5840` | `#f8d8c4` | Default tags, chips, unverified |

---

## 10. Document & Reading Colors

| Token | Hex | Usage |
|---|---|---|
| `--highlight-bg` | `#f8e890` | Text highlight in documents and reading |
| `--highlight-border` | `#f0d060` | Highlight border |
| `--highlight-text` | `#785010` | Text inside highlight |
| `--sentence-tap-bg` | `#fde8d8` | Tapped sentence background |
| `--word-in-library` | `#c4aee8` | Dotted underline on words already in library |

---

## 11. Chip / Badge Presets

All chips: `height: 20px`, `border-radius: 9999px`, `font-size: 9px`, `padding: 0 8px`.

| Chip type | Background | Text | Border |
|---|---|---|---|
| Gender (der/die/das) | `#fde8d8` | `#7a5840` | `#f8d8c4` |
| Word type | `#fde8d8` | `#7a5840` | `#f8d8c4` |
| AI tag | `#e8d8f8` | `#4a3490` | `#b898e0` |
| User tag | `#fde8d8` | `#7a5840` | `#f8d8c4` |
| Due today | `#f8c8b0` | `#7a3018` | `#f0a888` |
| Due future | `#fde8d8` | `#7a5840` | `#f8d8c4` |
| PDF type | `#f8c8b0` | `#7a3018` | `#f0a888` |
| Rich text type | `#f8e890` | `#785010` | `#f0d060` |
| Streak 🔥 | `#f8c8b0` | `#7a3018` | `#f0a888` |
| Buffer | `#f8c8b0` | `#7a3018` | `#f0a888` |
| Verified (DWDS) | `#a8c8a0` | `#204818` | `#78a870` |
| AI-only verified | `#e8d8f8` | `#4a3490` | `#b898e0` |
| Unverified | `#f8c8c8` | `#901818` | `#e89090` |

---

## 12. Feedback Button

| Token | Hex | Usage |
|---|---|---|
| `--feedback-bg` | `#fde8d8` | Floating button background |
| `--feedback-text` | `#7a5840` | Icon/label |
| `--feedback-border` | `#f8d8c4` | Border |
| `--feedback-hover` | `#fcdcc8` | Hover state |

---

## 13. Spacing Scale

Consistent spacing across all components.

| Token | Value | Usage |
|---|---|---|
| `--space-1` | `4px` | Icon gaps, tight internal spacing |
| `--space-2` | `8px` | Component internal padding (compact) |
| `--space-3` | `12px` | Component internal padding (default) |
| `--space-4` | `16px` | Section padding (mobile) |
| `--space-5` | `20px` | Section padding (desktop) |
| `--space-6` | `24px` | Card padding |
| `--space-8` | `32px` | Section gaps |
| `--space-10` | `40px` | Large section separation |

---

## 13. Border Radius

shadcn defines one base `--radius` variable. All other radii are derived from it. Check `globals.css` after init to confirm the exact pixel value of `--radius-lg`.

| Token | Formula | Approx value | Usage |
|---|---|---|---|
| `--radius-sm` | `calc(var(--radius) - 4px)` | ~6px | Chips, pills, filter buttons, small badges |
| `--radius-md` | `calc(var(--radius) - 2px)` | ~8px | Input fields, small cards, option buttons |
| `--radius-lg` | `var(--radius)` | **check globals.css** | Cards, panels, modals — primary card radius |
| `--radius-xl` | `calc(var(--radius) + 4px)` | ~14px | Large cards, bottom sheets, companion widget |
| `--radius-2xl` | `calc(var(--radius) + 8px)` | ~18px | Companion expanded card |
| `--radius-full` | `9999px` | full pill | Chip badges, avatar circles, toggle thumb |

**Rule:** Never hardcode pixel values for border radius. Always use the token so restyling the preset updates everything at once.

---

## 14. Component Inventory

All components installed via CLI. Nothing copied manually.

### shadcn/ui components — install via `npx shadcn@latest add [name]`

| Component | Usage |
|---|---|
| `button` | All buttons everywhere |
| `input` | All text inputs |
| `textarea` | Feedback modal, companion chat input, paste mode |
| `label` | Form field labels |
| `form` | React Hook Form integration wrapper |
| `select` | Language selector in settings |
| `native-select` | Filter dropdowns where native feel preferred |
| `dialog` | Desktop modals — verify flow, feedback |
| `drawer` | Mobile bottom sheets — add word, word tap, sentence tap, annotations, companion chat |
| `sheet` | Desktop side panel — annotation panel in documents and reading |
| `popover` | Word tap popup in reading module on desktop |
| `tabs` | Bookmark-style tabs — add word modes, study configure modes |
| `badge` | Base for all chip/pill/tag/label variants |
| `card` | All card surfaces — word cards, document cards, text cards |
| `separator` | Dividers in sidebar, settings, profile |
| `progress` | Verify flow progress bar, study session progress bar |
| `avatar` | User profile, companion avatar in tour tooltip |
| `skeleton` | All loading states — word library, study generation, companion chat |
| `sonner` | All transient notifications — buffer added, verified, errors |
| `toast` | Fallback if Sonner insufficient |
| `tooltip` | In-app tour spotlight tooltip, icon button hints |
| `command` | Fuzzy search in word library, tag filter |
| `combobox` | Tag selection in add word, study tag filter |
| `dropdown-menu` | Sort menu, word card actions (edit, delete) |
| `scroll-area` | Companion chat history, annotation panel, word library |
| `switch` | Settings toggles |
| `alert` | Verify failure, AI unavailable warning, dictionary unavailable |
| `collapsible` | Optional fields in add word (notes, tags, custom sentence) |
| `checkbox` | Multiple choice exercise answer options |
| `toggle-group` | List/grid view toggle in word library |
| `input-otp` | OTP login flow |
| `sidebar` | Desktop sidebar navigation |
| `spinner` | Loading state inside buttons |
| `empty` | Empty word library, empty document list, empty reading history |
| `breadcrumb` | Document and reading module back navigation |
| `pagination` | Word library if paginated over infinite scroll |
| `kbd` | Keyboard shortcut hints |

### Supabase shadcn blocks — install via their CLI

| Block | Usage |
|---|---|
| `client` | Supabase client setup and configuration |
| `password-based-auth` | Login and register forms with email/password |
| `social-auth` | Google OAuth login button, wired to Supabase |
| `dropzone` | PDF upload in documents, photo upload in scan mode |

**Note:** All router-specific code in Supabase blocks (redirects, navigation) replaced with TanStack Router equivalents. Never use React Router APIs.

---

## 15. Spacing Scale

Consistent spacing across all components.

| Token | Value | Usage |
|---|---|---|
| `--space-1` | `4px` | Icon gaps, tight internal spacing |
| `--space-2` | `8px` | Component internal padding (compact) |
| `--space-3` | `12px` | Component internal padding (default) |
| `--space-4` | `16px` | Section padding (mobile) |
| `--space-5` | `20px` | Section padding (desktop) |
| `--space-6` | `24px` | Card padding |
| `--space-8` | `32px` | Section gaps |
| `--space-10` | `40px` | Large section separation |

---

## 16. Elevation & Shadows

Flat design — no decorative shadows. Shadows used only for functional elevation.

| Token | Value | Usage |
|---|---|---|
| `--shadow-sm` | `0 2px 8px rgba(60,50,30,0.08)` | Companion mini widget |
| `--shadow-md` | `0 4px 20px rgba(60,50,30,0.12)` | Companion expanded card |
| `--shadow-lg` | `0 8px 40px rgba(60,50,30,0.16)` | Modals, overlays |

---

## 17. Animation Tokens

| Token | Value | Usage |
|---|---|---|
| `--duration-fast` | `100ms` | Hover states, micro-interactions |
| `--duration-base` | `200ms` | State transitions, tab switches |
| `--duration-slow` | `300ms` | Panel slides, drawer open/close |
| `--easing-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | All standard transitions |
| `--easing-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Companion bounce, celebrations |
| `--easing-out` | `cubic-bezier(0, 0, 0.2, 1)` | Elements entering |
| `--easing-in` | `cubic-bezier(0.4, 0, 1, 1)` | Elements leaving |

**Note:** Companion animations (idle, happy, wave, sleeping, walking) are baked into the `.glb` model and driven by Three.js `AnimationMixer`. No CSS or Framer Motion involved for companion character animations.