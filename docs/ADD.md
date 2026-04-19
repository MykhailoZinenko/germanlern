# GermanLern — Architecture Document

> A personal German vocabulary learning web app built as a surprise gift for Cindy.
> Every decision in this document was made through discussion — nothing invented.

---

## 1. Project Overview

| Property | Value |
|---|---|
| Type | Web Application |
| Hosting | Vercel |
| Primary user | Indonesian native, learning German |
| Source language | German |
| Target translation language | Indonesian (configurable in settings) |
| Database region | Supabase — Singapore (closest to Indonesia) |

---

## 2. Core Principles

- **AI assists, never blocks** — all AI runs via server functions, triggered async. User is never waiting.
- **Never punish** — all results framed positively. Show what she got right. Never emphasize wrong.
- **Single source of truth** — everything related to German learning lives here. Words, documents, reading texts, study history, progress.
- **Warm and personal** — the companion is the emotional center of the app. It has a name, it reacts, it encourages.
- **Hidden complexity** — the scoring engine runs silently. She never sees raw numbers like EF or interval.

---

## 3. Tech Stack

### Frontend

| Layer | Technology | Reason |
|---|---|---|
| Framework | TanStack Start | Built on Vite/Vinxi. Much lighter than Next.js (300–600MB dev RAM vs 1–3GB). File-based routing, server functions (`createServerFn`) built in, full Vercel support. No separate backend needed. |
| Routing | TanStack Router | Built into TanStack Start. File-based routing, type-safe, already familiar to developer. |
| Styling | Tailwind CSS | Utility-first, pairs with shadcn |
| Component library | shadcn/ui | Flexible, unstyled base. Initialized via `npx shadcn@latest init --preset b7W7uXIuG --template vite` to bake in the pastel token set from day one. Supabase shadcn blocks used for auth and file uploads. |
| Animations | Framer Motion | Layout transitions, onboarding spotlight tour, companion walk animation between states |
| 3D Companion | Three.js | Renders custom `.glb` model. Asset produced via Tripo3D → Blender rigging → named animation actions baked in. |
| Rich text editor | Tiptap | Handles text + inline images in documents. Built on ProseMirror. |
| Forms | React Hook Form + Zod | Form state + schema validation for all forms. |
| Server state | TanStack Query | All Supabase data fetching, caching, loading/error states. |
| Client state | Zustand | UI state only — companion animation state, buffer word count, tour step, modals. |
| Icons | Lucide | Standard for shadcn. |

### Backend

| Layer | Technology | Reason |
|---|---|---|
| Database | Supabase (PostgreSQL) | Free tier, built-in auth, built-in storage, Singapore region. |
| File storage | Supabase Storage (S3-compatible) | PDFs, images inside rich text documents. Database stores paths only. |
| AI | Gemini 2.0 Flash (Google AI Studio) | Free tier, fast, capable for all AI tasks. |
| Server functions | TanStack Start `createServerFn` | All AI calls and sensitive operations. Ships with frontend to Vercel as serverless functions. Gemini key in environment variable, never exposed to client. |
| Error tracking | Sentry | Free tier, 5,000 errors/month. Alerts to Telegram. |
| Feedback | Telegram bot | User feedback and Sentry alerts via Telegram bot API. |
| Hosting | Vercel | Free tier, instant deploys. Custom domain when ready. |

### Server Functions

Created as needed. All AI calls and sensitive operations run here.

| Function | Purpose |
|---|---|
| `verifyWords` | Duplicate check → DWDS → Wiktionary → Gemini enrichment batch |
| `generateStudySession` | Build all questions and distractors upfront before session starts |
| `companionMessage` | Companion chat response with full app context payload |
| `translateWord` | Reading module word tap translation |
| `translateSentence` | Reading module sentence tap translation |
| `generateReadingText` | AI text generation for reading module |
| `mineVocabulary` | Extract distinct meaningful words from document selection |
| `sendFeedback` | Post user feedback to Telegram bot |
| `checkDictionary` | DWDS + Wiktionary lookup for word verification |

### Supabase Edge Functions

Used only for database-triggered webhooks.

| Function | Purpose |
|---|---|
| `on-new-user` | Triggered on new registration. Posts notification to Telegram. |

### Storage Structure

```
{user_id}/
  documents/
    {document_id}/
      file.pdf
      images/
        {image_id}.{ext}
```

### Phase 2 Additions
- Tesseract.js — OCR for camera/photo word capture

### Phase 3 Additions
- ElevenLabs API — voice cloning for companion voice messages

### Visual Theme
Pantone Garden Party × Laura Ashley Summer fusion. Warm peach-white base, coral-to-gold word stages, Lumi wisteria-purple exclusively for companion and AI. Baked in via shadcn preset from day one. No dark mode in v1. Full design specification in `DESIGN.md`.

---

## 4. Authentication

### Login methods

| Method | Status | Notes |
|---|---|---|
| Google OAuth | Primary | One click, no password. Configured via Supabase OAuth providers. |
| Email + password | Fallback | For users without Google. |
| OTP via email | Passwordless | 6-digit code. Also used for email verification on register. |
| Password reset | Forgot password | `supabase.auth.resetPasswordForEmail()` |

### Auth flows

- New user → Register → Companion Introduction → In-app tour → Dashboard
- Returning user → Login → Dashboard
- No landing page — straight to Register on first visit
- Session persists

### Email infrastructure

**Now (dev + early testing):**
- Supabase built-in email (3/hour limit)
- Google OAuth as primary to avoid email dependency

**When scaling to 60 people:**
- Buy domain — `germanlern.app` via Cloudflare Registrar (~€14/year)
- Set up Resend free tier (3,000 emails/month) connected to Supabase SMTP
- Sending address: `noreply@germanlern.app`

### Security

- RLS on every table — `user_id = auth.uid()` on all policies
- Rate limiting on all server functions — prevent AI quota abuse
- Input sanitization on all user text before database storage
- Account deletion — users can delete account and all data (GDPR)
- Storage buckets private — signed URLs only
- Service role key only in server functions, never in client

### Feedback & Error Reporting

- Sentry catches crashes automatically, alerts to Telegram
- Feedback button on every page — bug or suggestion, posts to Telegram bot

```
🐛 Bug Report
User: cindy@email.com
Page: /study/session
Message: "Matching exercise froze after first pair"
Time: Apr 19, 2026 14:32
```

---

## 5. The Companion — Lumi

The emotional and visual core of the app.

### Design
- Custom 3D lavender furball creature with string-like limbs ending in fur puffs
- Produced via: Tripo3D text-to-3D → Blender rigging (FK bone chains) → named animation actions baked into `.glb`
- Default name: **Lumi** (set during onboarding, editable in settings)

### Behavior by page

| Page | State |
|---|---|
| Dashboard | Full size, center stage in hero. Wanders freely, nudges stats board. |
| All other pages (except study) | 80×80px fixed overlay, bottom right, 20px from edges. Wanders in small area. |
| Study session | Hidden completely. No distractions. |

### Mini companion interaction

Tap the mini widget → Framer Motion animation: companion walks from bottom right to center screen, card expands, scrim fades in. Chat history above, text input below. On close: reverse animation.

### Companion states (Three.js AnimationMixer, named actions in `.glb`)

| State | Trigger |
|---|---|
| `idle` | Default — subtle breathing, wanders |
| `happy` | After a good study session |
| `wave` | Greeting on dashboard open |
| `cheering` | Mid-session encouragement |
| `consoling` | After a hard session |
| `sleeping` | No activity for 2+ days |
| `excited` | Streak milestone, new words added |
| `walking` | Transition animation between positions |

### Companion intelligence

Fully context-aware. Every message includes a context payload:
- Current page
- Word count by stage
- Weak words (lowest EF)
- Words due today
- Current streak
- Today's activity
- Last session result
- Conversation history this session (resets on app close — per-session memory only)

**Rule:** Purple = companion or AI. Always. No other element uses Lumi's lavender colors.

---

## 6. Onboarding

### Companion Introduction (full screen, once after register)

Three steps, progress dots at top. Companion animated throughout.

| Step | Content |
|---|---|
| 1 | Companion appears. "Hi! What would you like to call me?" → name input |
| 2 | "What language should I translate German words into?" → language pills, Indonesian pre-selected |
| 3 | "How many new words per day?" → 5 / 10 / 20 pills, 10 pre-selected → "Let's go!" |

On complete: saves name, language, daily goal to `settings` → triggers in-app tour.

### In-app Tour (spotlight overlay, once)

`TourOverlay` component via React portal. Scrim `rgba(0,0,0,0.55)`. Cutout highlights target. Tooltip card has companion avatar, title, body, step counter, prev/next.

| Step | Target ID | Title | Body |
|---|---|---|---|
| 1 | `nav-dashboard` | Your home base | This is where Lumi lives and your daily summary waits. |
| 2 | `nav-library` | Your word library | Every word you add lives here. |
| 3 | `btn-add-words` | Adding words | Type, scan, or paste a list. |
| 4 | `nav-study` | Study sessions | The app decides what you need, or you choose. |
| 5 | `nav-read` | Reading module | Tap any word for instant translation. |
| 6 | `nav-documents` | Your documents | Store textbooks, notes, and PDFs. |
| 7 | `companion-area` | Meet Lumi | They'll cheer you on and answer your questions. |

`tour_completed` saved to `settings` table. Never repeats.

---

## 7. Word Adding Flow

### Input modes (bookmark-style tabs — active tab higher, flush to panel)

| Mode | Description |
|---|---|
| Type | Manual word-by-word input |
| Scan | Camera or photo upload, OCR (Phase 2) |
| Paste | Paste a list, one word per line |

### The buffer

- Words land in the buffer — never go directly to the library
- Adding is always free and unblocked
- Buffer badge always visible inside drawer/modal regardless of active tab
- When she navigates away with unverified words → prompt to verify or add more
- She is **never** interrupted mid-add

### Add UI

**Mobile:** Bottom drawer, no bottom rounding, bookmark tabs protrude from top. Fixed height across all tabs — never resizes.

**Desktop:** Centered modal with scrim. Same bookmark tab pattern. Fixed modal dimensions.

### Duplicate detection (client-side, before AI)

- Word does not exist → proceed normally
- Word exists, same translation → skip silently
- Word exists, different translation → add to `alt_translations[]` on existing entry, notify user

### Verification pipeline (three layers)

**Layer 1 — Dictionary (authoritative)**
1. DWDS (Digitales Wörterbuch der deutschen Sprache) — primary, free API, returns gender and word type as ground truth
2. Wiktionary — fallback if DWDS has no result
3. Not found anywhere → warn user: "Couldn't confirm this word — add anyway?"

**Layer 2 — AI enrichment (Gemini, after dictionary confirms)**
- Spelling correction (rejectable)
- Translation suggestion (editable)
- 1–2 example sentences with translation
- Auto AI tags (animals, food, travel, daily life, academic, etc.)

AI never determines gender or word type — dictionary is ground truth for those.

**Layer 3 — User review**

Two-stage modal: Loading (batch AI call with per-word progress pills) → Word-by-word review form (AI suggestions highlighted, accept individually or "Accept All").

### AI / dictionary failure handling

- Dictionary API fails → fall back to AI-only, flag word as `ai_only`
- AI batch fails → offer retry or "Add anyway" with `unverified` flag
- Unverified words visible in library, can be enriched later

---

## 8. Word Database Structure

Grammar fields populated per `word_type`. AI never overrides dictionary-sourced gender or word type.

**Noun:** `gender`, `plural_form`
**Verb:** `conjugations`, `conjugation_type`, `is_separable`, `takes_case`
**Adjective:** `comparative`, `superlative`

Full schema in Section 17.

### Vocabulary stages (derived from SM-2 fields, never raw numbers shown)

| Stage | Label | Condition |
|---|---|---|
| 🌱 | Just Planted | `review_count = 0` |
| 🔄 | Still Growing | `review_count > 0` and `easiness_factor < 2.0` |
| 💪 | Almost There | `review_count > 0` and `easiness_factor` between 2.0–2.49 |
| ⭐ | Mastered | `easiness_factor >= 2.5` and `review_count >= 5` |

---

## 9. Learning Engine — SM-2

### Algorithm

Every word has an **Easiness Factor (EF)** starting at 2.5 and an **interval** (days until next review).

After every exercise a quality score **q** (0–5) is derived from performance.

**EF update:**
```
EF = EF + (0.1 - (5 - q) × (0.08 + (5 - q) × 0.02))
EF minimum = 1.3
```

**EF change per score:**

| q | EF change |
|---|---|
| 5 | +0.10 |
| 4 | +0.00 |
| 3 | −0.14 |
| 2 | −0.32 |
| 1 | −0.54 |
| 0 | −0.80 |

**Interval update:**
- q ≥ 3 → new interval = previous interval × EF
- q < 3 → interval resets to 1 day

### Scoring per exercise type

**Typing (translation, reverse translation):**
- Correct → 5
- Minor variation (client-side fuzzy match — Levenshtein distance) → 3
- Wrong → 1

**Choice (single choice, multiple choice, matching):**
- Correct → 4 (recognition easier than active recall — ceiling intentionally lower)
- Wrong → 1

**Multiple choice partial — Jaccard similarity:**
```
jaccard = |correct ∩ selected| / |correct ∪ selected|
1.0       → q = 4
≥ 0.6     → q = 3
≥ 0.3     → q = 2
< 0.3     → q = 1
```

**Flashcards:** No SM-2 update. Review mode only, never affects scoring.

**Time:** Not used in scoring.

### Study session queue

**Automatic:**
1. Words where `next_review_date <= today` → due queue
2. Prioritize lowest EF within due queue
3. Mix in new words (max 5–10 per session)
4. Nothing due → surface lowest EF regardless of date

**Exercise type per word (automatic):**
- Never seen → single/multiple choice first
- Seen 1–2 times → multiple choice or matching
- Seen several times → translation or reverse translation
- High EF, just due → single choice sufficient

**Session generation:** One Gemini batch call before session starts. All questions, wrong answer options (plausible distractors), matching pairs generated upfront. Session runs entirely from local JSON. No mid-session AI calls.

---

## 10. Exercise Types

| Type | Answer format | Max q |
|---|---|---|
| Single choice | Tap one option | 4 |
| Multiple choice | Tap all correct (Jaccard scored) | 4 |
| Translation | German → type Indonesian | 5 |
| Reverse translation | Indonesian → type German | 5 |
| Matching | Connect 4 word-translation pairs | 4 per pair |

### Session results framing
- Always show: "18 correct" — positive frame
- Never show: "2 wrong"
- Companion message matches energy — celebrates wins, gently encourages after hard sessions

---

## 11. Study Configure Modes (bookmark tabs)

| Mode | Description |
|---|---|
| Auto | SM-2 queue. Just start. Primary default. |
| By tag | Select tags. Session built from matching words. |
| Ask companion | Describe what to study. AI maps intent to words. |

---

## 12. Word Library

### Views (sliding thumb toggle — not a pill toggle)
- **List** — dense, one row per word: stage dot · word · gender · type · translation · tags · due
- **Cards** — responsive grid: stage color strip · word · type+gender row · translation · tag · due

### Desktop detail
Split panel — left: narrowed list or card grid with selected word highlighted. Right: full word detail. Toggle preserved.

### Mobile detail
Full page navigation with back button.

### Word detail content
Gender + type + stage chips → word large → translation → alt translations → example sentences → grammar section → tags → learning stats (reviews, correct rate, next review, EF)

### Search & filtering
- Full-text search via PostgreSQL `tsvector` — German and Indonesian simultaneously
- Filters: stage, word type, tags, verification source
- Sort: A→Z, date added, stage, last reviewed, next review date

---

## 13. Dashboard

### Desktop layout
- **Sidebar (fixed):** nav + streak + total words. Visible on all pages.
- **Top bar:** greeting + "+ Add words" button
- **Hero (~42% height):** companion (left, open canvas, wanders and nudges board) + stats board (right: due today CTA + word stage breakdown)
- **Quick actions:** 4 cards — Add words, Study, Read, Documents
- **Bottom row:** Word of Day (flex:2) + Last Session + Weekly bar chart — all same height

### Mobile layout
Companion + bubble → stat cards (streak, study time, words) → stage breakdown → due today CTA → quick actions → word of day

---

## 14. Reading Module

### Library screen
- Text history as cards (title, date, word count, words added badge)
- Paste/Upload + Generate buttons
- Generate: no required params. Optional prompt. Defaults to user level + weak words if empty.

### Reader
- Single scrollable text — no pagination
- Words already in library: dotted underline
- **Tap word** → popup: translation, type, gender, stage, "Add to buffer"
- **Tap sentence** → popup: German + Indonesian translation, "Add distinct words to buffer"
- Buffer badge always visible in reader topbar
- Never interrupts reading — all adds go to buffer silently

### Desktop layout
Full main area for text. Right panel (240px) slides in for word/sentence popups.

### Mobile layout
Full screen text. Bottom sheet slides up for popups.

---

## 15. Documents

### Types

| Type | Creation | Editing |
|---|---|---|
| PDF | Upload file | View only — annotate on top |
| Rich text | Type, paste, insert images | Tiptap editor with toolbar |

Rich text: **Edit** mode (full Tiptap editor) and **Read** mode (clean, same as PDF viewer). Toggle in topbar.

Tiptap JSON stored in `documents.content` column — not in storage. Images inside rich text go to Supabase Storage, URL stored in Tiptap JSON.

### Annotations
- Highlights and bookmarks persist across sessions
- Work identically on PDF and rich text in read mode

### Desktop layout
Full main area for document. Collapsible right panel (220px) for annotations.

### Mobile layout
Full screen. Annotations via bottom sheet.

### Vocabulary mining
- **Select single word** → popup with translation + add to buffer
- **Select sentence/chunk** → AI extracts distinct meaningful words, filters articles/prepositions/already-in-library, shows list to pick from

---

## 16. Settings, Profile & Sustainability

### Settings (3 controls only)
- Target language (Indonesian default)
- Companion name (editable)
- Daily goal (5 / 10 / 20)

### Profile (3 items only)
- Email — read-only + "Change" link
- Password — `••••••••` + "Change" link
- Logout — muted red destructive button

### Sustainability
Non-intrusive section in profile only. Never in popups.

> "Running this app costs about the price of a portion of tofu per person per month. If GermanLern has helped you learn even one word, consider helping keep it alive 🥣"

Progress bar in IDR. Ko-fi link. 100% of contributions go to server and domain costs.

---

## 17. Full Database Schema

All tables use UUID primary keys. RLS on every table. `user_id = auth.uid()` on all policies.

---

### Auth & Users

```sql
-- auth.users managed by Supabase automatically

-- Extended profile — created via trigger on auth.users insert
profiles (
  id                    uuid primary key references auth.users on delete cascade,
  email                 text not null,
  created_at            timestamptz default now(),
  updated_at            timestamptz default now()
)

-- User preferences and onboarding state
settings (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid references profiles unique not null,
  companion_name        text default 'Lumi',
  target_language       text default 'Indonesian',
  daily_goal            int default 10,
  onboarding_completed  boolean default false,
  tour_completed        boolean default false,
  created_at            timestamptz default now(),
  updated_at            timestamptz default now()
)
```

---

### Words & Vocabulary

```sql
words (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid references profiles not null,

  -- Core
  german_word           text not null,
  word_type             text,             -- noun | verb | adjective | adverb | other
  translation           text,
  alt_translations      jsonb,            -- string[]
  example_sentences     jsonb,            -- [{german, translation}]

  -- Grammar (per word_type)
  gender                text,             -- der | die | das (nouns)
  plural_form           text,             -- nouns
  conjugations          jsonb,            -- {ich, du, er, wir, ihr, sie} (verbs)
  conjugation_type      text,             -- weak | strong | irregular (verbs)
  is_separable          boolean,          -- verbs
  takes_case            text,             -- akkusativ | dativ (verbs)
  comparative           text,             -- adjectives
  superlative           text,             -- adjectives

  -- Tags
  ai_tags               text[],

  -- Verification
  verification_source   text default 'pending',  -- dwds | wiktionary | ai_only | unverified | pending
  verified_at           timestamptz,

  -- Origin
  source                text default 'manual',   -- manual | paste | scan | reading | document
  source_ref_id         uuid,                    -- reading_texts.id or documents.id

  -- SM-2 engine
  easiness_factor       numeric default 2.5,
  interval_days         int default 1,
  next_review_date      date,
  last_reviewed         timestamptz,
  review_count          int default 0,

  -- Full-text search
  search_vector         tsvector generated always as (
                          to_tsvector('simple', coalesce(german_word, '')) ||
                          to_tsvector('simple', coalesce(translation, '')) ||
                          to_tsvector('simple', coalesce(array_to_string(ai_tags, ' '), ''))
                        ) stored,

  date_added            timestamptz default now(),
  updated_at            timestamptz default now()
)

-- User-created custom tags
user_tags (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid references profiles not null,
  name                  text not null,
  created_at            timestamptz default now(),
  unique (user_id, name)
)

-- Words ↔ user tags (many-to-many)
word_user_tags (
  word_id               uuid references words on delete cascade not null,
  tag_id                uuid references user_tags on delete cascade not null,
  primary key (word_id, tag_id)
)

-- Words added but not yet verified
word_buffer (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid references profiles not null,
  german_word           text not null,
  translation           text,
  notes                 text,
  custom_sentence       text,
  raw_user_tags         text[],
  created_at            timestamptz default now()
)
```

---

### Study Sessions

```sql
-- One row per study session
study_sessions (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid references profiles not null,
  mode                  text not null,    -- auto | by_tag | companion
  tag_filter            text[],
  companion_prompt      text,
  words_reviewed        int default 0,
  correct_count         int default 0,
  started_at            timestamptz default now(),
  ended_at              timestamptz,
  completed             boolean default false
)

-- One row per word per session
study_results (
  id                    uuid primary key default gen_random_uuid(),
  session_id            uuid references study_sessions on delete cascade not null,
  word_id               uuid references words on delete cascade not null,
  exercise_type         text not null,    -- single_choice | multi_choice | translation | reverse_translation | matching
  quality_score         int not null,     -- 0–5 SM-2 score
  was_correct           boolean not null,
  created_at            timestamptz default now()
)
```

---

### Streaks

```sql
streaks (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid references profiles unique not null,
  current_streak        int default 0,
  longest_streak        int default 0,
  last_activity_date    date,
  updated_at            timestamptz default now()
)
```

---

### Reading Module

```sql
reading_texts (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid references profiles not null,
  title                 text not null,
  content               text not null,
  source                text not null,    -- paste | upload | generated
  ai_prompt             text,
  word_count            int,
  created_at            timestamptz default now(),
  last_opened_at        timestamptz
)

reading_word_events (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid references profiles not null,
  reading_text_id       uuid references reading_texts on delete cascade not null,
  german_word           text not null,
  action                text not null,    -- tapped | added_to_buffer
  created_at            timestamptz default now()
)
```

---

### Documents

```sql
documents (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid references profiles not null,
  title                 text not null,
  type                  text not null,    -- pdf | rich
  content               jsonb,            -- Tiptap JSON (rich only)
  file_path             text,             -- Storage path (pdf only)
  file_size_bytes       int,
  page_count            int,
  created_at            timestamptz default now(),
  updated_at            timestamptz default now(),
  last_opened_at        timestamptz
)

document_images (
  id                    uuid primary key default gen_random_uuid(),
  document_id           uuid references documents on delete cascade not null,
  user_id               uuid references profiles not null,
  storage_path          text not null,
  mime_type             text not null,
  size_bytes            int,
  created_at            timestamptz default now()
)

annotations (
  id                    uuid primary key default gen_random_uuid(),
  document_id           uuid references documents on delete cascade not null,
  user_id               uuid references profiles not null,
  type                  text not null,    -- highlight | bookmark
  page                  int,
  start_offset          int,
  end_offset            int,
  selected_text         text,
  note                  text,
  color                 text default '#ffe890',
  created_at            timestamptz default now()
)

document_word_events (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid references profiles not null,
  document_id           uuid references documents on delete cascade not null,
  german_word           text not null,
  action                text not null,    -- tapped | added_to_buffer
  created_at            timestamptz default now()
)
```

---

### Analytics & Feedback

```sql
-- Feature-level event tracking. No PII, no click tracking.
feature_events (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid references profiles not null,
  event                 text not null,
  -- study_session_started | study_session_completed
  -- reading_text_opened | reading_text_generated
  -- document_created | document_opened
  -- companion_chat_opened | companion_chat_message_sent
  -- word_added | words_verified
  -- feedback_submitted
  metadata              jsonb,
  created_at            timestamptz default now()
)

-- User feedback and bug reports
feedback (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid references profiles,   -- nullable
  type                  text not null,              -- bug | suggestion
  message               text not null,
  page_path             text,
  telegram_sent         boolean default false,
  created_at            timestamptz default now()
)
```

---

### Views (derived — no sync required)

```sql
-- Powers dashboard weekly chart and session history
create view user_daily_stats as
select
  ss.user_id,
  ss.started_at::date                                                    as activity_date,
  count(distinct ss.id)                                                  as sessions_count,
  coalesce(sum(ss.words_reviewed), 0)                                    as words_reviewed,
  coalesce(sum(ss.correct_count), 0)                                     as correct_count,
  coalesce(sum(extract(epoch from (ss.ended_at - ss.started_at)))::int, 0) as study_time_seconds,
  count(distinct w.id)                                                   as words_added
from study_sessions ss
left join words w
  on  w.user_id = ss.user_id
  and w.date_added::date = ss.started_at::date
where ss.completed = true
group by ss.user_id, ss.started_at::date;

-- Powers dashboard stat cards
create view user_total_stats as
select
  p.id                                                                   as user_id,
  count(distinct w.id)                                                   as total_words,
  count(distinct w.id) filter (
    where w.easiness_factor >= 2.5 and w.review_count >= 5
  )                                                                      as mastered_words,
  coalesce(sum(extract(epoch from (ss.ended_at - ss.started_at)))::int, 0) as total_study_seconds,
  coalesce(sum(ss.words_reviewed), 0)                                    as total_words_reviewed,
  coalesce(sum(ss.correct_count), 0)                                     as total_correct,
  count(distinct ss.id)                                                  as total_sessions
from profiles p
left join words w on w.user_id = p.id
left join study_sessions ss on ss.user_id = p.id and ss.completed = true
group by p.id;

-- Powers "24 words due" dashboard CTA
create view words_due_today as
select
  user_id,
  count(*) as due_count
from words
where next_review_date <= current_date
  and verification_source not in ('pending', 'unverified')
group by user_id;

-- Powers stage breakdown bar on dashboard
create view word_stage_breakdown as
select
  user_id,
  count(*) filter (where review_count = 0)                               as planted,
  count(*) filter (where review_count > 0 and easiness_factor < 2.0)    as growing,
  count(*) filter (
    where review_count > 0
    and easiness_factor >= 2.0
    and not (easiness_factor >= 2.5 and review_count >= 5)
  )                                                                      as almost,
  count(*) filter (
    where easiness_factor >= 2.5 and review_count >= 5
  )                                                                      as mastered
from words
where verification_source not in ('pending', 'unverified')
group by user_id;
```

---

### RLS Policy Pattern

```sql
alter table {table} enable row level security;

create policy "users access own data"
  on {table} for all
  using (user_id = auth.uid());

-- feedback: allow insert from any authenticated user
create policy "authenticated users can submit feedback"
  on feedback for insert
  with check (auth.uid() is not null);
```

---

### Indexes

```sql
-- Words
create index on words using gin(search_vector);
create index on words (user_id, next_review_date);
create index on words (user_id, date_added desc);
create index on words (user_id, verification_source);

-- Study
create index on study_sessions (user_id, started_at desc);
create index on study_sessions (user_id, completed, started_at desc);
create index on study_results (session_id);
create index on study_results (word_id);

-- Documents & reading
create index on documents (user_id, last_opened_at desc);
create index on reading_texts (user_id, last_opened_at desc);
create index on annotations (document_id, type);

-- Buffer & tags
create index on word_buffer (user_id, created_at);
create index on user_tags (user_id, name);
create index on word_user_tags (word_id);
create index on word_user_tags (tag_id);

-- Analytics
create index on feature_events (user_id, event, created_at desc);
create index on reading_word_events (user_id, reading_text_id);
create index on document_word_events (user_id, document_id);
```

---

## 18. Page & Route Structure

```
/login                → Login
/register             → Register
/onboarding           → Companion Introduction (once)
/                     → Dashboard
/words                → Word Library
/words/$id            → Word Detail
/study                → Study Configure
/study/session        → Active Study Session
/read                 → Reading Library
/read/$id             → Reading Text
/documents            → Document Library
/documents/$id        → Document Reader / Editor
/settings             → Settings
/profile              → Profile
```

---

## 19. AI Integration Points

| Feature | Server function | Notes |
|---|---|---|
| Word batch verification | `verifyWords` | Duplicate check → DWDS → Wiktionary → Gemini |
| Study session generation | `generateStudySession` | Full session upfront, no mid-session calls |
| Companion chat | `companionMessage` | Full context payload, per-session memory |
| Study configure (companion mode) | `companionMessage` | Maps natural language to word set |
| Reading word translation | `translateWord` | Single-turn |
| Reading sentence translation | `translateSentence` | Single-turn |
| AI reading text generation | `generateReadingText` | Optional prompt, defaults to user level |
| Document vocabulary mining | `mineVocabulary` | Filters articles, prepositions, known words |

---

## 20. Component Inventory

### shadcn/ui — `npx shadcn@latest add [name]`

`button` `input` `textarea` `label` `form` `select` `native-select` `dialog` `drawer` `sheet` `popover` `tabs` `badge` `card` `separator` `progress` `avatar` `skeleton` `sonner` `toast` `tooltip` `command` `combobox` `dropdown-menu` `scroll-area` `switch` `alert` `collapsible` `checkbox` `toggle-group` `input-otp` `sidebar` `spinner` `empty` `breadcrumb` `pagination` `kbd`

### Supabase shadcn blocks — via their CLI

`client` `password-based-auth` `social-auth` `dropzone`

### Component usage rules

| Use case | Component |
|---|---|
| Desktop modals | `Dialog` |
| Mobile bottom sheets | `Drawer` |
| Desktop side panels | `Sheet` |
| Desktop word/sentence tap | `Popover` |
| Fuzzy search | `Command` |
| Tag selection | `Combobox` |
| All notifications | `Sonner` |
| All loading states | `Skeleton` |
| Multiple choice | `Checkbox` |
| List/grid toggle | `Toggle Group` |
| Scrollable panels | `Scroll Area` |
| Empty states | `Empty` |
| OTP input | `Input OTP` |
| Desktop nav | `Sidebar` |
| Bookmark tabs | `Tabs` |
| All chips/pills/badges | `Badge` (wrapped) |

---

## 21. Phased Rollout

### Phase 1 — v1 (current scope)
- Auth (login, register, Google OAuth, OTP, password reset)
- Onboarding (companion introduction + in-app tour)
- Dashboard (companion full size, hero board, stats, quick actions)
- Add word (type + paste, buffer, verify flow, DWDS + Wiktionary + Gemini)
- Word library (list + card views, detail, search, filter)
- Study session (all 5 exercise types, SM-2, configure modes, end screen)
- Reading module (library, reader, word/sentence tap, AI generation)
- Documents (PDF reader, rich text editor + reader, annotations, vocabulary mining)
- Companion (3D model, dashboard full size, mini mode, chat)
- Settings + Profile + Sustainability section
- Feedback button + Sentry error tracking

### Phase 2 — Enrichment
- Camera / OCR (Scan mode — Tesseract.js)
- Grammar engine (separate study mode, per-word drills)
- Offline support (local word cache, delayed verification queue, sync)

### Phase 3 — Delight
- Voice companion (ElevenLabs voice cloning)
- Floral decorative UI layer on top of pastel base
- Multi-user support (friends can join)
- Custom domain + Resend SMTP for proper email

---

## 22. Infrastructure & Scaling

### Current (free tiers — handles up to ~15 active users comfortably)
- Vercel free — 100GB bandwidth/month
- Supabase free — 500MB DB, 5GB bandwidth, Singapore region
- Gemini AI Studio free — 1,500 requests/day, 15 req/min
- Sentry free — 5,000 errors/month

### When scaling to 60 people
- Buy `germanlern.app` domain via Cloudflare (~€14/year)
- Set up Resend free tier for proper email
- Monitor Gemini daily request limit — 60 active users pushing limits on busy days

### When needing more
- Supabase Pro ($25/month) — removes pause, adds read replicas (Frankfurt for European dev performance)
- Gemini paid tier if free limits exceeded

---

## 23. Sustainability

Non-intrusive. Profile section only. Ko-fi link. Progress bar in IDR.

Monthly costs at scale: ~€39/month (Supabase Pro + domain + Resend)
Per person across 60 users: ~10,000 IDR (~€0.57)

100% of contributions go to server and domain costs only.