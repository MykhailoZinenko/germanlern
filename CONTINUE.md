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
- Wireframe explorer at `/sandbox/explorer`

### Phase 0b — File Naming Convention (2026-04-19)

- Unified all file names to kebab-case
- Renamed companion files, hooks, Header/Footer, WireframeExplorer
- Renamed routes: /sign-up → /register, /sign-up-success → /register-success
- Renamed component: sign-up-form.tsx → register-form.tsx

### Phase 1a — Database Schema (2026-04-19)

- Supabase CLI initialized, 10 migration files in `supabase/migrations/`
- 17 tables: profiles, settings, words, user_tags, word_user_tags, word_buffer, study_sessions, study_results, streaks, reading_texts, reading_word_events, documents, document_images, annotations, document_word_events, feature_events, feedback
- `profiles` + `settings` auto-created via trigger on `auth.users` insert
- RLS on all tables with `for all using (user_id = auth.uid())` pattern
- Performance indexes on all key query paths
- 4 dashboard views: user_daily_stats, user_total_stats, words_due_today, word_stage_breakdown
- Storage bucket `user-files` (private, user-scoped RLS)
- TypeScript types generated at `src/types/database.ts`
- Migrations pushed to remote via `supabase db push`

### Phase 1b — Auth Flow (2026-04-19)

- Fixed redirect targets: `/protected` → `/` in login and update-password forms
- Fixed register form emailRedirectTo → `${origin}/auth/confirm?next=/onboarding`
- Fixed hardcoded localhost in forgot-password → `${origin}/auth/confirm?next=/update-password`
- Fixed OAuth callback validator — `next` param now optional
- Added Google OAuth button (`src/components/social-auth.tsx`) with Google "G" SVG
- Integrated Google OAuth into login + register forms with "or continue with email" divider
- Added `requireAnonymous` guard (`src/lib/supabase/require-anonymous.ts`) on login, register, forgot-password routes
- Moved index route under `_protected` layout (URL stays `/`)
- Deleted test `_protected/protected.tsx` page
- Auth check cached for 5 minutes via `staleTime` on `_protected` route
- Google OAuth configured in Supabase Dashboard + Google Cloud Console

### Phase 1c — App Shell (2026-04-19)

- Created `src/features/shell/` with 6 components:
  - `app-shell.tsx` — SidebarProvider + SidebarInset layout wrapper
  - `app-sidebar.tsx` — shadcn Sidebar (collapsible=none, desktop-only via `lg:`)
  - `app-bottom-nav.tsx` — mobile bottom nav (5 items, text-only, `lg:hidden`)
  - `app-topbar.tsx` — topbar with page title + "+Add words" CTA
  - `companion-mini.tsx` — placeholder circle with pulsing dot
  - `feedback-button.tsx` — floating button with DD.md feedback tokens
- All shell sizes scaled from wireframes (×1.756 desktop, ×1.1 mobile)
- Shell layout tokens in `src/styles.css`: `--shell-topbar-h`, `--shell-topbar-h-mobile`, `--shell-bottomnav-h`, `--shell-topbar-btn-h/w`, `--shell-companion-mini-size`
- Sidebar header height matches topbar height
- Universal breakpoint: 1024px (`lg:`, `useIsMobile` hook updated)
- Created 11 route stubs under `_protected/` with Empty state
- Created `/onboarding` public route stub
- Deleted deprecated: header.tsx, footer.tsx, about.tsx
- All hardcoded values replaced with design tokens
- Error text uses `--status-error-text` (not `text-red-500`)
- Sonner toaster in app shell

### Documentation Updates (2026-04-19)

- CLAUDE.md: added wireframe section, updated project structure, breakpoint, database info, file naming, strict rules
- CODING_RULES.md: complete wireframe methodology (scale factors, process, examples, token table, 7 rules)

## Current State

- Full Phase 1 complete — database, auth, app shell all functional
- Unauthenticated → redirects to `/login`
- Authenticated → lands on `/` with sidebar (desktop) + bottom nav (mobile)
- Google OAuth working (configured in Supabase + Google Cloud Console)
- All nav items link to stub pages with Empty state
- Companion mini placeholder visible bottom-right
- Feedback button visible
- All code verified against docs — no hardcoded values, correct tokens, proper shadcn usage

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
