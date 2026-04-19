# GermanLern — v1 Roadmap

Each phase is a deployable increment. Later phases depend on earlier ones.

---

## Phase 0 — Foundation ✅

> Design system, component library, project scaffolding.

- [x] TanStack Start project with file-based routing
- [x] Tailwind v4 + shadcn/ui (radix-luma, taupe base, preset b7W7uXIuG)
- [x] DD.md design tokens implemented in styles.css
- [x] All shadcn components installed via CLI (36 components)
- [x] Supabase blocks installed (auth, social-auth, dropzone — TanStack variants)
- [x] Supabase client/server SSR helpers
- [x] Supabase MCP + shadcn MCP configured
- [x] 3D companion rendering (fur shells, animations, shaders)
- [x] Component registry at /sandbox/registry
- [x] CLAUDE.md, ADD.md, DD.md, CODING_RULES.md

---

## Phase 1 — Database & Auth

> User can register, log in, and land on a protected shell. Data layer is ready for all features.

### 1a. Database schema
- All tables from ADD.md section 17 as Supabase migrations
- `settings`, `words`, `word_buffer`, `review_sessions`, `review_results`, `reading_texts`, `documents`, `annotations`, `streaks`
- RLS policies on every table (`user_id = auth.uid()`)
- Supabase Storage bucket (private, signed URLs)

### 1b. Auth flow
- Wire up existing Supabase auth blocks (login-form, sign-up-form, forgot-password, update-password)
- Google OAuth configuration (Supabase dashboard + social-auth block)
- OTP email verification on register
- Protected route guard (`_authed.tsx` layout with `beforeLoad`)
- Redirect: unauthenticated → `/login`, authenticated → `/`
- Session persistence (stays logged in)

### 1c. App shell
- Root layout with sidebar (desktop) + bottom nav (mobile)
- Navigation: Dashboard, Words, Study, Read, Documents, Settings, Profile
- Sidebar shows streak count + total words (placeholder data for now)
- "+Add words" CTA button in topbar
- Companion mini placeholder (80×80 circle, bottom-right, pulsing dot)
- Feedback button (floating, every page)
- All route files created as stubs per ADD.md section 18

---

## Phase 2 — Word Pipeline

> User can add words, verify them with AI, and browse their library.

### 2a. Add word UI
- Add word drawer (mobile) / dialog (desktop) with bookmark tabs
- Type mode: single word input, submit to buffer
- Paste mode: textarea, one word per line, submit all to buffer
- Buffer badge visible inside drawer/modal at all times
- Buffer prompt on close if unverified words exist

### 2b. Verify flow
- Server function: DWDS dictionary lookup → Wiktionary fallback
- Server function: Gemini AI enrichment (translation, example sentences, tags, spelling)
- Verify overlay: loading → word-by-word review → finishing
- Accept/reject individual AI suggestions, "Accept All"
- Duplicate detection (client-side against cached library)
- Failure handling: AI-only fallback, skip verification option

### 2c. Word library
- List view + card view with toggle (ToggleGroup)
- Chip component wrapping Badge for all presets (gender, type, stage, tags, due)
- Word detail: desktop split panel, mobile full page
- Search: fuzzy dual-language (German + Indonesian)
- Filters: stage, word type, tags
- Sort: A→Z, date added, stage, last reviewed, next review

---

## Phase 3 — Study Engine

> User can study words with spaced repetition and 5 exercise types.

### 3a. SM-2 engine
- Core algorithm: EF update, interval calculation, quality scoring
- Queue logic: due words prioritized by lowest EF, new word mixing
- Exercise type auto-selection based on review count and EF
- All logic in `src/lib/` as pure functions with tests

### 3b. Study configure
- Study configure page with bookmark tabs (Auto / By tag / Ask companion)
- Auto: start immediately with SM-2 queue
- By tag: tag selection via Command/Combobox, filtered session
- Ask companion: text input → server function → AI maps to word set (deferred until companion chat in Phase 5)

### 3c. Exercise UI
- Single choice (4 options, tap one)
- Multiple choice (4+ options, tap all correct, Jaccard scoring)
- Translation (German → type Indonesian, fuzzy match)
- Reverse translation (Indonesian → type German)
- Matching (connect 4 pairs, drag or tap-to-match)
- Progress bar across session
- No companion visible during session

### 3d. Session generation & results
- Server function: Gemini generates all questions + plausible distractors upfront
- Session runs from local JSON, no mid-session AI calls
- Results screen: correct count (positive frame), per-word breakdown
- SM-2 updates applied after session ends
- Streak update on session completion

---

## Phase 4 — Reading Module

> User can read German texts and mine vocabulary from them.

### 4a. Reading library
- Reading library page: history cards (title, date, word count, words added)
- Paste/upload text input
- AI text generation (server function → Gemini, optional prompt, level-matched)

### 4b. Reader
- Continuous scrollable text view
- Known words: dotted underline (`--word-in-library` color)
- Tap word → popover (desktop) / bottom sheet (mobile): translation, type, gender, stage, "Add to buffer"
- Tap sentence → popup: German + Indonesian translation, "Add distinct words to buffer"
- Server functions: `translate-word`, `mine-vocabulary`
- Buffer badge in reader topbar
- Words go to buffer silently, verified later by normal flow

---

## Phase 5 — Documents

> User can store, read, and annotate PDFs and rich text documents.

### 5a. Document library
- Document library page: cards for each document (title, type chip, date)
- Upload PDF (Dropzone → Supabase Storage)
- Create rich text document (Tiptap editor)

### 5b. PDF viewer + rich text reader
- PDF viewer (read-only, page navigation)
- Rich text: Edit mode (Tiptap toolbar) / Read mode (clean view)
- Toggle in topbar

### 5c. Annotations
- Highlight: select text → save with color and position
- Bookmark: mark position with optional note
- Desktop: collapsible right panel (220px) for annotation list
- Mobile: bottom sheet via toolbar button
- Persist in database

### 5d. Vocabulary mining
- Select word → popup with translation + add to buffer
- Select sentence → server function extracts meaningful words → pick which to add

---

## Phase 6 — Companion Integration

> Lumi is alive everywhere — mini mode, expanded chat, context-aware messages.

### 6a. Mini companion
- 80×80 fixed overlay, bottom-right, on all pages except study
- 3D model rendered in small canvas (reuse existing companion system)
- Pulsing dot indicator
- Tap → Framer Motion expand animation to center screen

### 6b. Companion chat
- Expanded card: chat history (ScrollArea) + text input
- Server function: Gemini with full context payload (word stats, streak, due words, session history, current page)
- Session memory (conversation history, resets on app close)
- Close → reverse animation back to bottom-right

### 6c. Companion states
- Map animation names to triggers: idle, happy, wave, sleeping, walking
- Dashboard: full-size companion in hero section
- Post-session: companion message matching session energy
- Sleeping after 2+ days inactivity
- Excited on new words or streak milestone

---

## Phase 7 — Dashboard

> The home screen with stats, quick actions, and full companion presence.

### 7a. Dashboard layout
- Desktop: sidebar (already built) + topbar greeting + hero section
- Hero: companion (left, full size) + stats board (right: due today CTA, word stages breakdown)
- Quick actions: 4 cards (Add words, Study, Read, Documents) with contextual hints
- Bottom row: Word of the Day (flex:2) + Last Session + This Week bar chart

### 7b. Mobile dashboard
- Companion + speech bubble at top
- Three stat cards (streak, study time, words)
- Word stages breakdown card
- Due today card with Study now CTA
- Three quick action cards
- Word of the day

### 7c. Data queries
- TanStack Query hooks for: word count by stage, due today count, current streak, last session summary, weekly activity
- Word of the day: random word from library or AI-suggested

---

## Phase 8 — Onboarding & Settings

> First-run experience and user preferences.

### 8a. Companion introduction
- Full-screen 3-step flow after register
- Step 1: name the companion (text input)
- Step 2: choose target language (pills, Indonesian pre-selected)
- Step 3: daily goal (5/10/20 pills, 10 pre-selected)
- Save to `settings` table → navigate to dashboard → trigger tour

### 8b. In-app tour
- TourOverlay component via React portal
- Spotlight cutout (`box-shadow: 0 0 0 9999px rgba(0,0,0,0.55)`)
- 7 steps targeting nav items + companion area
- Companion avatar + title + body + step counter + prev/next
- `tourCompleted` in localStorage, never repeats

### 8c. Settings page
- Target language selector
- Companion name edit
- Daily goal picker (5/10/20)

### 8d. Profile page
- Email (read-only + change link)
- Password (masked + change link)
- Logout button (destructive styling)
- Account deletion

---

## Phase 9 — Polish & Ship

> Error handling, feedback system, performance, deployment.

### 9a. Error tracking & feedback
- Sentry integration (free tier, Telegram alerts)
- Feedback button → modal (bug/suggestion) → server function → Telegram bot
- Global error boundaries on all routes

### 9b. Performance
- TanStack Query cache tuning (stale times, prefetching on hover)
- Code splitting per route (TanStack Router handles this)
- Image optimization for documents
- Companion 3D: LOD, lazy loading, mobile performance

### 9c. Deployment
- Vercel deployment configuration
- Environment variables (Supabase URL/key, Gemini key, Sentry DSN, Telegram bot token)
- Build verification on CI

### 9d. Pre-launch
- Test with 2-3 people
- Fix critical bugs
- Privacy policy one-pager
- Gift delivery 🎁
