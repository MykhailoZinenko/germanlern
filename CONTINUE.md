# CONTINUE.md

Progress tracking for GermanLern development.

---

## Completed

### Phase 0 — Foundation (2026-04-19)

**Initial setup:**
- TanStack Start project with file-based routing (Vite + Nitro)
- TypeScript strict, ESLint flat config
- All stack deps: TanStack Router/Query, Tailwind v4, Framer Motion, Three.js + R3F, RHF + Zod, Zustand, Lucide, Supabase SSR

**3D Companion:**
- `src/features/companion/` — full fur-shell rendering system
- creature.glb loaded (18 meshes, 28 bones, 5 animations: idle, happy, wave, sleeping, walking)
- Custom vertex/fragment shaders for fur, physics (gravity, wind, velocity)
- Eye cutouts, pompom fur with skinned mesh binding

**Design system (DD.md):**
- Cottagecore palette: Pantone Garden Party × Laura Ashley Summer fusion
- All tokens implemented in `src/styles.css` as CSS variables
- shadcn semantic variables remapped to DD.md tokens (no dark mode in v1)

**Components:**
- 36 shadcn/ui components installed via CLI (radix-luma style)
- Supabase blocks: password-based-auth-tanstack, social-auth-tanstack, dropzone-tanstack
- Component registry page at `/sandbox/registry`

### Phase 0b — File Naming Convention (2026-04-19)

- Unified all file names to kebab-case
- Renamed companion files, hooks, Header/Footer, WireframeExplorer
- Renamed routes: /sign-up → /register, /sign-up-success → /register-success
- Renamed component: sign-up-form.tsx → register-form.tsx

### Phase 1a — Database Schema (2026-04-19)

- Supabase CLI initialized, 10 migration files in `supabase/migrations/`
- 17 tables: profiles, settings, words, user_tags, word_user_tags, word_buffer, study_sessions, study_results, streaks, reading_texts, reading_word_events, documents, document_images, annotations, document_word_events, feature_events, feedback
- RLS on all tables, performance indexes, 4 dashboard views
- Storage bucket `user-files` (private, user-scoped)
- TypeScript types at `src/types/database.ts`

### Phase 1b — Auth Flow (2026-04-19)

- Fixed redirect targets: `/protected` → `/` in login and update-password forms
- Fixed register form emailRedirectTo → `/auth/confirm?next=/onboarding`
- Fixed hardcoded localhost in forgot-password → `${window.location.origin}/auth/confirm?next=/update-password`
- Added Google OAuth button (`src/components/social-auth.tsx`) integrated into login + register forms with "or continue with email" divider
- Added `requireAnonymous` guard (`src/lib/supabase/require-anonymous.ts`) on login, register, forgot-password routes
- Moved index route under `_protected` layout (URL stays `/`)
- Deleted test `_protected/protected.tsx` page

### Phase 1c — App Shell (2026-04-19)

- Created `src/features/shell/` with 6 components:
  - `app-shell.tsx` — main layout wrapper with SidebarProvider
  - `app-sidebar.tsx` — desktop sidebar with 7 nav items + streak/word count footer
  - `app-bottom-nav.tsx` — mobile bottom nav (5 items, md:hidden)
  - `app-topbar.tsx` — top bar with SidebarTrigger + "+Add words" CTA
  - `companion-mini.tsx` — 80×80 lumi-light circle with pulsing dot
  - `feedback-button.tsx` — floating feedback button with DD.md tokens
- Created 11 route stubs under `_protected/` with Empty state:
  - `/` (Dashboard), `/words`, `/words/$id`, `/study`, `/study/session`
  - `/read`, `/read/$id`, `/documents`, `/documents/$id`, `/settings`, `/profile`
- Created `/onboarding` public route stub (requires user session)
- Wired AppShell as component of `_protected.tsx` layout
- Deleted deprecated: header.tsx, footer.tsx, about.tsx
- Sonner toaster added to app shell

## Current State

- Full Phase 1 complete — database, auth, and app shell all functional
- Unauthenticated → redirects to `/login`
- Authenticated → lands on `/` with sidebar (desktop) + bottom nav (mobile)
- All nav items link to stub pages with Empty state
- Google OAuth button present (requires Supabase dashboard config to activate)
- Companion mini placeholder visible bottom-right
- Feedback button visible

## Next Up — Phase 2: Word Pipeline

See `docs/ROADMAP.md` for full details.

**Phase 2a — Add word UI:**
- Add word drawer (mobile) / dialog (desktop) with bookmark tabs
- Type mode + paste mode
- Buffer badge + buffer prompt

**Phase 2b — Verify flow:**
- DWDS + Wiktionary dictionary lookup server functions
- Gemini AI enrichment server function
- Verify overlay with word-by-word review

**Phase 2c — Word library:**
- List + card views with toggle
- Word detail panel
- Search + filter + sort
