# GermanLern — Claude Code Rules

## Context
Read the architecture document and design system document before making any decisions. Every feature, flow, and design decision is already defined there. Do not invent or assume.

---

## Project Setup

- Framework: **TanStack Start** (built on Vite/Vinxi)
- Routing: **TanStack Router** — file-based routing, built into TanStack Start
- Auth blocks and Dropzone from Supabase shadcn library are compatible and should be used directly
- All server-side logic lives in **TanStack Start server functions** (`createServerFn`) — not Supabase Edge Functions
- Supabase Edge Functions used only for database-triggered webhooks — nothing else
- Auth, AI calls, file operations, feedback — all via server functions

---

## Code Style

- TypeScript everywhere — no `.js` files
- No `any` — use `unknown` and narrow properly
- Functional components only — no class components
- Named exports for components, default export for pages/routes
- DRY always — if something is written twice, extract it
- Never hardcode values — constants in `src/constants/`, secrets in environment variables
- Never write TODOs, placeholders, or incomplete implementations — every piece of code must be production-ready and fully functional
- Never leave empty catch blocks — always handle errors meaningfully
- No inline styles — Tailwind classes only
- Keep components small and focused — split when a component exceeds ~100 lines
- Co-locate component files with their styles and logic — no deep folder nesting

---

## Project Structure

```
src/
  components/         # Shared reusable components
  routes/             # TanStack Router file-based routes
    __root.tsx
    index.tsx         # Dashboard
    words/
    study/
    read/
    documents/
    settings.tsx
    profile.tsx
    login.tsx
    register.tsx
    onboarding.tsx
  features/           # Feature-specific components and logic
    words/
    study/
    reading/
    documents/
    companion/
    auth/
  hooks/              # Custom React hooks
  store/              # Zustand stores
  lib/                # Supabase client, helpers, utilities
  constants/          # All constant values, never inline
  types/              # Shared TypeScript types
supabase/
  functions/          # Database-triggered webhooks only
  migrations/         # SQL migration files
```

---

## Stack Rules

**Routing**
- TanStack Router only — file-based routing in `src/routes/`
- Protected routes via TanStack Router `beforeLoad` — redirect unauthenticated users to `/login`
- Never use `window.location` for navigation — always use TanStack Router's `navigate`

**Server functions**
- All AI calls via `createServerFn` — never call Gemini from the client
- All sensitive Supabase operations via `createServerFn` — never expose service role key to client
- All server functions validate the user session before processing
- Every server function has try/catch with meaningful error response

**Styling**
- Tailwind + shadcn/ui only
- Never override shadcn component internals — restyle via CSS variables and Tailwind only
- Border radius always uses shadcn tokens (`--radius-sm/md/lg/xl/2xl/full`) — never hardcode pixel values
- All semantic colors from `DESIGN.md` — never invent new colors

**State**
- **Zustand** — client state only: companion animation state, buffer word count, tour step, UI modals
- **TanStack Query** — server state only: all Supabase fetching, caching, loading/error states
- Never store server data in Zustand
- Never use TanStack Query for pure UI state
- React `useState` for local component state
- No prop drilling beyond 2 levels

**Database**
- Always go through Supabase client — never raw SQL in frontend
- Every new table must have RLS policies before use
- User data isolated via `user_id = auth.uid()`

**File uploads**
- Always to Supabase Storage via server function
- Never store binary data in the database
- Storage buckets are private — signed URLs only

**AI calls**
- All AI calls in server functions via Gemini 2.0 Flash
- All prompts request structured JSON output — never parse free text
- Every AI call has try/catch with a meaningful fallback
- Batch what can be batched — word verification sends all buffer words in one call
- Study session questions generated in one upfront batch — no mid-session AI calls

**Forms**
- React Hook Form + Zod for all forms
- No uncontrolled inputs
- Validate on submit and on blur

---

## Component Rules

**Installation**
- Every component installed via CLI before use — never copy-paste manually
- shadcn: `npx shadcn@latest add [component]`
- Supabase blocks: via their CLI
- Never build from scratch what shadcn or Supabase blocks already provide

**Component selection by use case**

| Use case | Component |
|---|---|
| Desktop modals | `Dialog` |
| Mobile bottom sheets | `Drawer` |
| Desktop side panels | `Sheet` |
| Desktop word/sentence tap popup | `Popover` |
| All text inputs | `Input` |
| Multiline input | `Textarea` |
| Fuzzy search | `Command` |
| Tag selection | `Combobox` |
| All transient notifications | `Sonner` |
| All loading states | `Skeleton` |
| Progress indicators | `Progress` |
| Settings toggles | `Switch` |
| Multiple choice checkboxes | `Checkbox` |
| List/grid view toggle | `Toggle Group` |
| All scrollable panels | `Scroll Area` |
| Empty states | `Empty` |
| OTP input | `Input OTP` |
| Desktop sidebar nav | `Sidebar` |
| Bookmark-style tabs | `Tabs` |
| All chip/pill/badge variants | `Badge` (wrapped) |
| All card surfaces | `Card` |
| Button loading state | `Spinner` inside `Button` |

**Supabase blocks**
- `password-based-auth` — login and register forms
- `social-auth` — Google OAuth button
- `dropzone` — PDF upload, scan mode photo upload
- Any router-specific code in blocks replaced with TanStack Router equivalents

**General**
- `Drawer` for mobile, `Dialog` for desktop — never mix
- `Badge` is the base for all chips — wrap it, never duplicate chip logic
- `Sonner` for all toasts — never build custom toast
- Companion character animations driven by Three.js `AnimationMixer` using named actions baked into `.glb` — never CSS or Framer Motion for character animations

---

## Supabase Rules

- RLS on every table — no exceptions
- User data isolated via `user_id = auth.uid()`
- Storage buckets private — signed URLs only
- Service role key only in server functions, never in client code
- Google OAuth configured via Supabase dashboard, wired to `social-auth` block

---

## UX Rules

- Never block the user waiting on AI — all AI runs via server functions, triggered async
- Never use the word "wrong" anywhere in UI copy — frame everything positively
- Buffer badge always visible inside add word drawer/modal regardless of active tab
- Verify flow is the only gate before accessing library/study — word adding itself is never gated
- Study mode hides companion completely — no distractions
- Session results always show correct count first — never lead with errors
- Empty states use the `Empty` component — never a blank white area

---

## Wireframes

### Where to find them

All wireframes live in `src/sandbox/wireframe-explorer.tsx` and are accessible at `/sandbox/explorer` in the running app. The file contains a `TREE` array mapping screen IDs to components, and a `SCREENS` object mapping IDs to JSX. Every screen has both a mobile and desktop variant.

Key wireframe components for the app shell:
- `DSidebar` — desktop sidebar layout
- `TBar` — desktop topbar
- `MobTopBar` — mobile topbar
- `MobBottomNav` — mobile bottom navigation
- `DashMob` / `DashDesk` — dashboard layouts (use these to see how the shell wraps content)

### Wireframe dimensions (DO NOT use literally)

The wireframe explorer renders screens inside fixed-size frames:
- **Desktop frame:** `DW = 820px`, `DH = 520px`
- **Mobile frame:** `PW = 340px`, `PH = 700px`

These are **scaled-down representations**, not real screen sizes.

### How to scale wireframe values to real UI

Real screens are larger than wireframe frames. Calculate the scale factor and multiply every wireframe value.

**Desktop scale factor:** real viewport (~1440px) / wireframe width (820px) = **×1.756**
**Mobile scale factor:** real viewport (~375px) / wireframe width (340px) = **×1.1**

**Process for every wireframe value:**
1. Read the exact pixel value from the wireframe component source code
2. Multiply by the scale factor (×1.756 desktop, ×1.1 mobile)
3. Map the result to the nearest existing design token (`--space-*`, `--radius-*`, Tailwind size class)
4. If no token is close enough, **create a new CSS variable** in `src/styles.css` — never hardcode the pixel value in a component

**Example — desktop topbar:**
- Wireframe `TBar` height: `DTB = 48px`
- Scaled: 48 × 1.756 = 84px
- No existing token → created `--shell-topbar-h: 84px` in styles.css
- Component uses `h-[var(--shell-topbar-h)]`

**Example — desktop topbar title font:**
- Wireframe `TBar` title fontSize: `13px`
- Scaled: 13 × 1.756 = 23px
- Nearest Tailwind class: `text-xl` (20px)
- Component uses `text-xl`

**Example — mobile bottom nav:**
- Wireframe `MobBottomNav` height: `PBN = 50px`
- Scaled: 50 × 1.1 = 55px
- Created `--shell-bottomnav-h: 56px` in styles.css
- Component uses `h-[var(--shell-bottomnav-h)]`

### Shell layout tokens (already defined in `src/styles.css`)

| Token | Value | Source |
|---|---|---|
| `--shell-topbar-h` | 84px | TBar DTB=48 × 1.756 |
| `--shell-topbar-h-mobile` | 48px | MobTopBar 44 × 1.1 |
| `--shell-bottomnav-h` | 56px | MobBottomNav PBN=50 × 1.1 |
| `--shell-nav-indicator` | 3px | DSidebar borderLeft 2 × 1.756 |
| `--shell-topbar-btn-h` | 53px | TBar Btn height 30 × 1.756 |
| `--shell-topbar-btn-w` | 228px | TBar Btn width 130 × 1.756 |
| `--shell-companion-mini-size` | 5rem | Companion mini 80×80 |

### Breakpoint

The universal mobile/desktop breakpoint is **1024px** (`lg:` in Tailwind). The `useIsMobile` hook in `src/hooks/use-mobile.ts` uses this same value. The shadcn `Sidebar` component reads this hook internally.

- Below 1024px: mobile layout (topbar + bottom nav, no sidebar)
- Above 1024px: desktop layout (sidebar + topbar, no bottom nav)

### Rules

1. **Read the wireframe source code** — open `wireframe-explorer.tsx`, find the component, read every style property
2. **Scale every value** — desktop ×1.756, mobile ×1.1. Never use wireframe pixels literally
3. **Map to tokens** — use existing `--space-*`, `--radius-*`, Tailwind classes. Create new CSS variables if nothing fits
4. **Never hardcode pixel values in components** — all sizing goes through CSS variables or Tailwind classes
5. **Never drop shadcn components** — customize via props, className, and CSS variable overrides. If a shadcn component exists for the job, use it
6. **Check every element** — fonts, heights, widths, paddings, margins, border-radius, border-width. Missing one is a bug
7. **Desktop and mobile are different scales** — the same wireframe element may need different Tailwind classes at `lg:` breakpoint vs default

---

## What Not To Do

- Do not add libraries not in the stack without asking
- Do not create new **color** tokens — use only what `DESIGN.md` and the shadcn preset define. Layout/sizing tokens (e.g. `--shell-*`) can be created in `src/styles.css` when no existing token matches a scaled wireframe value
- Do not add features not in the architecture document
- Do not use Supabase Edge Functions for anything handled by TanStack Start server functions
- Do not call any AI API from the client — always server functions
- Do not skip RLS policies — every new table needs them before it is used
- Do not use `any` — type everything properly
- Do not put business logic in components — extract to hooks or server functions
- Do not hardcode colors, radii, or spacing — use tokens
- Do not use pixel values from wireframes as real measurements — always scale (×1.756 desktop, ×1.1 mobile)
- Do not drop or replace shadcn components with hand-built alternatives — always customize via props and CSS variables
- Do not guess sizes — read the wireframe source code, scale, and verify every element