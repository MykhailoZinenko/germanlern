# GermanLern — Claude Code Rules

## Context
Read the architecture document and design system document before making any decisions. Every feature, flow, and design decision is already defined there. Do not invent or assume.

---

## Project Setup

- Framework: **TanStack Start** (built on Vite/Vinxi)
- Routing: **TanStack Router** — file-based routing, built into TanStack Start
- All server-side logic lives in **TanStack Start server functions** (`createServerFn`) — not Supabase Edge Functions
- Supabase Edge Functions used only for database-triggered webhooks (e.g. new user registration alert to Telegram) — nothing else
- Auth, AI calls, file operations, feedback — all via server functions

---

## Code Style

- TypeScript everywhere — no `.js` files, no `any`, no type assertions without justification
- Use `unknown` and narrow properly instead of `any`
- Functional components only — no class components
- Named exports for components, default export for pages/routes
- DRY always — if something is written twice, extract it
- Never hardcode values — constants in `src/constants/`, secrets in environment variables
- Never write TODOs, placeholders, or incomplete implementations — every piece of code must be production-ready and fully functional
- Never leave empty catch blocks — always handle errors meaningfully
- No inline styles — Tailwind classes only
- Keep components small and focused — split when a component exceeds ~100 lines
- Co-locate component files with their styles and tests — no deep folder nesting

---

## Project Structure

```
src/
  components/         # Shared reusable components
  routes/             # TanStack Router file-based routes
    __root.tsx        # Root layout
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
  functions/          # Only database-triggered webhooks
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
- Every server function has try/catch with meaningful error response — never let a server error crash the UI silently

**Styling**
- Tailwind + shadcn/ui only
- Never override shadcn component internals — restyle via CSS variables and Tailwind only
- Border radius always uses shadcn tokens (`--radius-sm/md/lg/xl/2xl/full`) — never hardcode pixel values
- All semantic colors from the design system document — never invent new colors

**State**
- **Zustand** — client state only: companion animation state, buffer word count, tour step, UI modals, current page context
- **TanStack Query** — server state only: all Supabase data fetching, caching, loading/error states
- Never store server data in Zustand
- Never use TanStack Query for pure UI state
- React `useState` for local component state
- No prop drilling beyond 2 levels — use Zustand or TanStack Query

**Database**
- Always go through Supabase client — never raw SQL in frontend
- Every new table must have RLS policies before use
- User can only read/write their own data via `user_id = auth.uid()`

**File uploads**
- Always to Supabase Storage via server function
- Never store binary data in the database
- Storage buckets are private — access via signed URLs only

**AI calls**
- All AI calls in server functions via Gemini 2.0 Flash
- All prompts request structured JSON output — never parse free text
- Every AI call has try/catch with a meaningful fallback — never let AI failure crash the UI
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
| Desktop modal | `Dialog` |
| Mobile bottom sheet | `Drawer` |
| Desktop side panel | `Sheet` |
| Desktop word/sentence tap popup | `Popover` |
| All text inputs | `Input` |
| Multiline input | `Textarea` |
| Fuzzy search | `Command` |
| Tag selection | `Combobox` |
| Transient notifications | `Sonner` |
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
- Any router-specific code in blocks replaced with TanStack Router equivalents — never use React Router APIs

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

## What Not To Do

- Do not add libraries not in the stack without asking
- Do not create new design tokens — use only what the shadcn preset and design document define
- Do not add features not in the architecture document
- Do not use Supabase Edge Functions for anything handled by TanStack Start server functions
- Do not call any AI API from the client — always server functions
- Do not skip RLS policies — every new table needs them before it is used
- Do not use `any` — type everything properly
- Do not put business logic in components — extract to hooks or server functions
- Do not hardcode colors, radii, or spacing — use tokens