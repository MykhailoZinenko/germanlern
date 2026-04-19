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
- Warm peach surfaces, lumi wisteria-purple for actions/companion, coral-to-green stages
- All tokens implemented in `src/styles.css` as CSS variables
- shadcn semantic variables remapped to DD.md tokens (no dark mode in v1)
- Reduced border radius (base 0.625rem), replaced all rounded-3xl/4xl → rounded-lg/xl

**Components:**
- 36 shadcn/ui components installed via CLI (radix-luma style)
- Supabase blocks: password-based-auth-tanstack, social-auth-tanstack, dropzone-tanstack
- Fixed Supabase block import paths (`@/registry/...` → `#/...`)
- Fixed sonner.tsx (removed next-themes dependency, hardcoded light theme)
- Component registry page at `/sandbox/registry` with all variants

**MCP & tooling:**
- Supabase MCP server configured (project ref: rjicqyixeykstlkvkcsa)
- shadcn MCP server configured
- Supabase agent skills installed

**Cleanup:**
- Removed TanStack Start boilerplate (Header/Footer rewritten, ThemeToggle deleted)
- Removed all dark mode CSS (no dark mode in v1)
- Removed template classes (island-shell, feature-card, nav-link, etc.)

### Phase 0b — File Naming Convention (2026-04-19)

- Unified all file names to kebab-case (dominant convention)
- Renamed: Header.tsx → header.tsx, Footer.tsx → footer.tsx
- Renamed companion feature files: Companion.tsx → companion.tsx, CompanionScene.tsx → companion-scene.tsx, FurShell.tsx → fur-shell.tsx
- Renamed companion hooks: useAnimationController → use-animation-controller, useCreatureGLTF → use-creature-gltf, useFurPhysics → use-fur-physics
- Renamed WireframeExplorer.tsx → wireframe-explorer.tsx
- Renamed routes: /sign-up → /register, /sign-up-success → /register-success
- Renamed component: sign-up-form.tsx → register-form.tsx (export: RegisterForm)
- Updated all internal imports

### Phase 1a — Database Schema (2026-04-19)

- Supabase CLI initialized (`supabase init`)
- 10 migration files created in `supabase/migrations/` with sequential timestamps
- All 17 tables from ADD.md section 17:
  - `profiles` — extends auth.users via trigger auto-creation
  - `settings` — companion name, language, daily goal, onboarding/tour flags
  - `words` — full vocabulary with SM-2 fields, search_vector (trigger-based tsvector)
  - `user_tags` + `word_user_tags` — many-to-many user tag system
  - `word_buffer` — unverified words staging area
  - `study_sessions` + `study_results` — study tracking
  - `streaks` — streak tracking (one per user)
  - `reading_texts` + `reading_word_events` — reading module
  - `documents` + `document_images` + `annotations` + `document_word_events` — document module
  - `feature_events` + `feedback` — analytics and user feedback
- RLS enabled on all tables with `for all using (user_id = auth.uid())` pattern
- Special RLS: word_user_tags via word ownership, study_results via session ownership, feedback allows any authenticated insert
- Performance indexes on all key query paths
- 4 database views: user_daily_stats, user_total_stats, words_due_today, word_stage_breakdown
- Storage bucket `user-files` (private, signed URLs, user-scoped RLS)
- TypeScript types generated at `src/types/database.ts`
- Migrations pushed to remote via `supabase db push`

## Current State

- All database tables, RLS, indexes, views, and storage created and verified
- Auth form components exist (login, register, forgot-password, update-password)
- Auth routes exist with callback handlers (confirm, oauth, error)
- Protected route layout exists (`_protected.tsx`) but no app shell yet
- Index page is a public placeholder ("Dashboard coming soon")
- No Google OAuth button wired yet
- Redirect targets still point to `/protected` (needs → `/`)
- Hardcoded localhost in forgot-password-form
- No sidebar/bottom nav/app shell layout yet

## Next Up — Phase 1b: Auth Flow

**Steps:**
1. Fix redirect targets in auth forms (`/protected` → `/`)
2. Fix hardcoded localhost URL in forgot-password-form
3. Add Google OAuth button (social-auth.tsx component)
4. Add authenticated user redirect from auth pages (require-anonymous.ts)
5. Move index route under `_protected` layout
6. Add Outlet component to `_protected.tsx`

## After That — Phase 1c: App Shell

**Steps:**
1. Create shell feature directory (`src/features/shell/`)
2. Build app-sidebar, app-bottom-nav, app-topbar, companion-mini, feedback-button
3. Create all route stubs under `_protected/` with Empty state
4. Wire app shell into `_protected.tsx`
5. Cleanup deprecated files (header, footer, about)
