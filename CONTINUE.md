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
- Shell layout tokens in `src/styles.css`
- Universal breakpoint: 1024px (`lg:`, `useIsMobile` hook updated)
- Created 11 route stubs under `_protected/` with Empty state
- Created `/onboarding` public route stub

### Phase 2a — Add Word UI (2026-04-20)

- Zustand store at `src/store/word-store.ts` for add/verify UI state
- Buffer server functions with TanStack Query hooks
- Duplicate detection server function checks both `words` and `word_buffer` tables
- BookmarkTabs component (custom divs, proper bookmark visual style)
- BufferBadge component with skeleton loading state
- Tab contents: Type (word input + optional fields + autofocus), Scan (stub), Paste (multi-word textarea)
- AddWordDrawer (mobile, flush edges, custom drag handle) + AddWordDialog (desktop, tabs visible via overflow-visible) + responsive wrapper
- VerifyOverlay as centered Dialog on all screens (not bottom drawer)
- Verify overlay only appears when add drawer/dialog is NOT open
- Topbar "+Add words" button wired to Zustand store

### Phase 2b — Verify Flow (2026-04-20)

- Dictionary server function: DWDS API (prefers verb/noun entries for ambiguous words) → Wiktionary fallback → not_found
- DWDS word type normalization uses `includes()` matching (catches Hilfsverb, Modalverb, etc.)
- Gemini AI enrichment server function (`@google/genai` SDK, Gemini 3 Flash)
- Verification pipeline: dictionary lookup (parallel) → Gemini batch → merge results
- Original user input preserved in review — AI corrections shown as suggestions, not auto-applied
- VerifyLoading screen with Progress bar + per-word status pills (shows buffer words during processing)
- AiSuggestionRow component (accept applies suggestion, dismiss keeps original)
- VerifyReview: word-by-word form with AI suggestions, Accept All, inline tag add/remove, Next/Finish
- Save completes before Done screen appears (no race condition)
- Post-verification duplicate check: words corrected by AI are checked against library before insert
- VerifyDone screen: completion message + auto-close
- SaveVerifiedWords: inserts to `words` table (including notes, custom_sentence), upserts user_tags, merges user raw tags with AI tags, deletes buffer entries
- Errors propagated to user (not silently swallowed)
- DB migration: added `notes` and `custom_sentence` columns to `words` table

### Phase 2c — Word Library (2026-04-20)

- Word server functions: `fetchWords` (ilike search on german_word + translation, stage/type/tag filters), `fetchWordById`, `deleteWord`
- Tag server functions + hooks: `fetchUserTags`, `createTag`
- Stage utility: `getWordStage()`, `getDueLabel()`, `STAGE_CONFIG`
- Chip components (all wrap Badge): GenderPill, TypeChip, StageChip, AiTagChip, UserTagChip
- StageDot + DueBadge components
- LibSearch: search input + Select-based filter chips (Stage, Type, Sort) — uses shadcn Select, not DropdownMenu
- WordRowItem (list view) + WordCardItem (card view, badges pinned to bottom with mt-auto)
- WordDetail + WordDetailSkeleton: full word detail content with scrollable panel
- GrammarSection: noun/verb/adjective grammar display
- LearningStats: 2x2 grid of SM-2 stats
- WordDetailPanel: desktop right panel with ScrollArea
- `/words` route: full library with list/card toggle, search, filter, desktop split panel
- `/words/$id` route: mobile word detail page (back/edit in shell topbar, no duplicate header)

### Phase 2 — UI Polish (2026-04-20)

- CSS variable audit: all hardcoded px values mapped to semantic CSS vars
- Unified semantically similar values (btn heights, edit btn, buffer badge, AI row)
- Unified control heights: topbar button, search input, toggle, edit button all 60px desktop; filter chips and toggle items both h-7 mobile / h-10 desktop
- Compact split mode: search + toggle in single row (no duplicate "Word Library" header)
- Surface color system: `surface-page` for main backgrounds, `surface-sunken` for shell chrome + inner UI cards, `surface-raised` for verify flow cards
- Component misuse fixes: DropdownMenu → Select for filters, raw buttons → shadcn Button
- Select viewport inner padding added
- DrawerContent: `showDragHandle` prop added for custom handle control

## Current State

- Full Phase 1 + Phase 2 complete (except items below)
- Core add → buffer → verify → save pipeline working end-to-end
- Word library with list/card views, search, stage/type filters, desktop split panel
- Google OAuth working
- Gemini API key configured in `.env.local`

## Phase 2 — Not Done / Known Issues

- **Scan mode**: stub only (camera/OCR not implemented, Tesseract.js not added)
- **Edit word**: button exists but no handler — needs edit form/flow
- **Sorting**: implemented but buggy/not usable — needs rework
- **Verification source filter**: not implemented
- **Tags filter UI**: Select exists but no tag options loaded (needs to fetch user_tags)
- **Skip verification option**: not implemented (AI-only fallback exists but no user-facing skip button)
- **word_user_tags junction table**: not populated (tags saved directly to `ai_tags` column on words)
- **UI rework planned**: user wants to redesign the word library and add word UI

## Next Up — Phase 3: Study Engine

See `docs/ROADMAP.md` for full details.

**Phase 3a — SM-2 engine:**
- Core algorithm: EF update, interval calculation, quality scoring
- Queue logic: due words prioritized, new word mixing
- Pure functions with tests

**Phase 3b — Study configure:**
- Auto / By tag / Ask companion modes with bookmark tabs

**Phase 3c — Exercise UI:**
- Single choice, multiple choice, translation, reverse translation, matching

**Phase 3d — Session generation & results:**
- Gemini generates all questions upfront
- Results screen with positive framing
