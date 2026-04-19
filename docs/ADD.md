# GermanLern — Full Architecture Document

> A personal German vocabulary learning web app built as a surprise gift.
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
| Auth | Email + password |
| Database | Supabase (PostgreSQL) |

---

## 2. Core Principles

- **AI assists, never blocks** — all AI runs async or in batch. The user is never waiting on AI to continue her flow.
- **Never punish** — all results framed positively. Show what she got right. Never emphasize wrong.
- **Single source of truth** — everything related to German learning lives here. Words, documents, reading texts, study history, progress.
- **Warm and personal** — the companion is the emotional center of the app. It has a name, it reacts, it encourages.
- **Hidden complexity** — the scoring engine runs silently. She never sees raw numbers like EF or interval.

---

## 3. Tech Stack

### Frontend

| Layer | Technology | Reason |
|---|---|---|
| Framework | TanStack Start | Built on Vite/Vinxi. Much lighter than Next.js (300-600MB dev RAM vs 1-3GB). File-based routing, server functions (`createServerFn`) built in, full Vercel support. No separate backend needed. |
| Routing | TanStack Router | Built into TanStack Start. File-based routing, type-safe, already familiar. |
| Styling | Tailwind CSS | Utility-first, pairs with shadcn |
| Component library | shadcn/ui | Flexible, unstyled base. Initialized via `npx shadcn@latest init --preset b7W7uXIuG --template vite` to bake in the pastel token set from day one. Supabase shadcn blocks used for auth and file uploads — compatible with TanStack Start. |
| Animations | Framer Motion | Companion animations, layout transitions, onboarding spotlight tour |
| 3D Companion | Three.js | Renders custom 3D model. Model asset produced externally (sketch → Tripo3D → Blender), integrated into canvas. |
| Rich text editor | Tiptap | Handles text + inline images in documents. Built on ProseMirror, well maintained, clean React integration. |
| Forms | React Hook Form + Zod | Form state management + schema validation. Used for login, register, add word, settings, profile. |
| State management | Zustand | Client state only — companion animation state, buffer word count, tour step, UI modals. No server data. |
| Server state | TanStack Query | Server state only — fetching, caching, loading/error states, refetching from Supabase. Complements Zustand, does not replace it. |
| Icons | Lucide | Standard for shadcn, large selection, well maintained. |

### Backend

| Layer | Technology | Reason |
|---|---|---|
| Database | Supabase (PostgreSQL) | Free tier, built-in auth, built-in storage, simple migration path |
| File storage | Supabase Storage (S3-compatible) | All files stored here. Database stores metadata and references only. |
| AI | Gemini 2.0 Flash via Google AI Studio | Free tier, fast, capable for all AI tasks in this app |
| Server functions | TanStack Start `createServerFn` | All AI calls and sensitive operations. Ships with frontend to Vercel as serverless functions. Full TypeScript end-to-end. Gemini key stored as environment variable, never exposed to client. |
| Server state | TanStack Query | Data fetching, caching, loading/error states for all Supabase reads |
| Hosting | Vercel | Free tier, instant deploys, custom domain when ready |
| Error tracking | Sentry | Free tier, 5,000 errors/month, Telegram alerts |
| Feedback | Telegram bot | User feedback and Sentry alerts via Telegram bot API |

### Edge Functions (created as needed, not upfront)

| Function | Purpose |
|---|---|
| `verify-words` | Batch word verification, translation, tagging, grammar detection |
| `generate-study-session` | Build all exercise questions and distractors upfront before session |
| `companion-message` | Companion chat responses with full app context |
| `translate-word` | Reading module word/sentence tap translations |
| `generate-reading-text` | AI text generation for reading module |
| `mine-vocabulary` | Extract distinct meaningful words from document selections |

New edge functions are added as new features require them. No need to plan all upfront.

### Storage Structure

```
{user_id}/
  documents/
    {document_id}/
      file.pdf              ← PDF uploads
      images/
        {image_id}.jpg      ← Images embedded in rich text documents
  reading/
    {text_id}/
      file.txt              ← Uploaded reading texts (if applicable)
```

Rich text document content (Tiptap JSON) is stored directly in the database `content` column — not in storage. Documents are study-sized (not large), so the database read is faster and simpler than a storage fetch. Images inside rich text go to storage; the Tiptap JSON stores only the URL reference.

### Phase 2 additions
- Tesseract.js — OCR for camera/photo word capture (Scan mode)

### Phase 3 additions
- ElevenLabs API — voice cloning for companion voice messages

### Visual Theme
Pastel, calm aesthetic. Baked in via shadcn preset from day one. No dark/light toggle in v1. Floral decorative layer added in v2 on top of the already-consistent base — avoids development overhead in v1 while keeping a clean, consistent look.

---

## 4. Authentication

### Login methods

| Method | Status | Notes |
|---|---|---|
| Google OAuth | Primary | One click, no password, covers most users. Configured via Supabase OAuth providers. |
| Email + password | Fallback | For users without Google. |
| OTP via email | Passwordless option | 6-digit code sent to email. Also used for email verification on register. |
| Password reset | Forgot password flow | `supabase.auth.resetPasswordForEmail()` — sends reset link via email. |

### Auth flows

- New user → Register screen → Companion Introduction → In-app tour → Dashboard
- Returning user → Login screen → Dashboard
- No landing page — straight to Register on first visit
- Session persists. Once logged in, stays logged in.

### Email infrastructure

**Current (development + early testing):**
- Supabase built-in email (3 emails/hour limit)
- Fine for 2-3 testers
- Google OAuth recommended as primary to avoid email dependency

**When scaling to 60 people:**
- Buy domain (recommended: `germanlern.app` via Cloudflare Registrar, ~$14/year)
- Set up Resend (free tier: 3,000 emails/month, 100/day) connected to Supabase SMTP
- Sending address: `noreply@germanlern.app`
- Point domain to Vercel, configure DNS for Resend — ~1 hour total setup

### Security

- **Row Level Security (RLS)** — every table has policies. Users can only read and write their own data via `user_id = auth.uid()`.
- **Rate limiting** — all edge functions rate limited to prevent AI quota abuse. Supabase native rate limiting.
- **Input sanitization** — all user text sanitized before database storage.
- **Account deletion** — users can delete their account and all associated data. GDPR compliance.
- **Email domain restriction** — optional future addition if the tool needs to be restricted to a specific university domain.
- **Storage buckets** — private, access via signed URLs only.

### Feedback and error reporting

- **Sentry** — automatic error and crash tracking. Free tier covers 5,000 errors/month. Alerts sent to Telegram.
- **Feedback button** — unobtrusive button on every page. Opens a small modal: bug report or suggestion, free text input, submit. Posts to a private Telegram chat via Telegram bot API through an edge function.
- **Telegram bot** — receives both Sentry alerts and user feedback. Feedback messages include user email, current page, message, and timestamp.

```
🐛 Bug Report
User: hana@email.com
Page: /study/session
Message: "Matching exercise froze after first pair"
Time: Apr 19, 2026 14:32
```

When adding user auth is added to Supabase, all `user_id` foreign keys are already in the schema — no refactoring needed.

---

## 5. The Companion

The emotional and visual core of the app.

### What it is
- A custom 3D fluffy/furry character built by us, rendered via Three.js
- Asset produced externally (sketch → AI image → Blender model)
- She only names it — design, animations, and behavior are fully defined by us

### Behavior by page

| Page | Companion state |
|---|---|
| Dashboard | Full size, center stage in hero section. Wanders freely, nudges the stats board left and right. |
| All other pages (except study) | Small 80×80px fixed overlay, bottom right corner, 20px from edges. Wanders within the small square. Pulsing dot indicator shows it's alive. |
| Study session | Completely hidden. No distractions during study. |

### Mini companion interaction
- Tap the mini companion → Framer Motion animation: companion walks from bottom right to center screen, card expands around it, scrim fades in
- Expanded state: chat history above, text input below, close button
- On close: reverse animation — companion walks back to bottom right, card shrinks

### Companion states

| State | Trigger |
|---|---|
| Happy / celebrating | After a good study session |
| Cheering | Mid-session encouragement |
| Consoling gently | After a hard session |
| Sleeping | No activity for 2+ days |
| Idle / wandering | Default dashboard state |
| Excited | New words added, streak milestone |

### Companion intelligence
- Fully context-aware: knows her word library, learning stages, weak words, session history, streak, current page, due words
- Maintains conversation memory within a session. Resets on app close.
- Text bubbles only in v1. Messages AI-generated, warm, varied, never repetitive.
- She can ask it anything in the expanded chat: "what are my weakest words", "explain dative case", "give me 5 food words" — it answers using her actual data.

### Context payload sent with every companion message
- Current page
- Word count by stage
- Weak words (lowest EF)
- Words due today
- Current streak
- Today's activity
- Last session result
- Conversation history this session

---

## 6. Onboarding

### Companion Introduction (full screen, once after register)

Three steps, progress dots at top. Companion is present and animated throughout.

| Step | Content |
|---|---|
| 1 | Companion appears. "Hi! What would you like to call me?" → text input for name |
| 2 | "Nice to meet you, [name]! What language should I translate German words into?" → language pills, Indonesian pre-selected |
| 3 | "How many new words do you want to learn each day?" → 5 / 10 / 20 pills, 10 pre-selected → "Let's go!" |

On completion: saves companion name, target language, daily goal → navigates to dashboard → triggers in-app tour.

### In-app Tour (spotlight overlay, once after companion introduction)

Built from scratch. A `TourOverlay` component rendered via React portal at root level. Darkens screen with `rgba(0,0,0,0.55)`. Cutout highlights the target element using `box-shadow: 0 0 0 9999px rgba(0,0,0,0.55)`. Tooltip card near target has companion avatar, title, body, step counter, prev/next.

| Step | Target | Title | Body |
|---|---|---|---|
| 1 | `nav-dashboard` | Your home base | This is where your companion lives and your daily summary waits. |
| 2 | `nav-library` | Your word library | Every word you add lives here. Search, filter, and review anytime. |
| 3 | `btn-add-words` | Adding words | Tap here to add new German words. Type, scan, or paste a list. |
| 4 | `nav-study` | Study sessions | The app decides what you need most, or you choose. |
| 5 | `nav-read` | Reading module | Read German texts and tap any word for instant translation. |
| 6 | `nav-documents` | Your documents | Store textbooks, notes, and PDFs. Annotate and highlight freely. |
| 7 | `companion-area` | Your companion | This is [name]. They'll cheer you on and answer your questions. |

`tourCompleted` saved to localStorage. Never repeats.

---

## 7. Word Adding Flow

### 7.1 Input modes

Three modes, accessed via bookmark-style tabs (active tab sits higher, connects flush to the drawer/modal body):

| Mode | Description |
|---|---|
| Type | Manual word-by-word input |
| Scan | Camera or photo upload, OCR extracts words (Phase 2) |
| Paste | Paste a list of words, one per line |

### 7.2 The buffer

Words never go directly to the library. They land in a **buffer** — a staging area.

Rules:
- Adding words is always free and unblocked
- She can add as many words as she wants at any time
- When she tries to navigate away with unverified words in the buffer → a prompt appears asking her to verify or add more
- She is **never interrupted mid-add**. The prompt only appears when she closes the add drawer/modal.
- The buffer badge (persistent, always visible inside the drawer/modal) shows word count at all times regardless of which tab is active

### 7.3 Add UI

**Mobile:** Bottom drawer, slides up from bottom. No bottom rounding (flat against screen edge). Top-right corner of drawer rounded. Bookmark tabs protrude from the top edge of the drawer. All three tabs render same fixed height — never resizes on tab switch.

**Desktop:** Centered modal with scrim. Same bookmark tab pattern. Fixed modal dimensions regardless of active tab.

### 7.4 Verify flow

Triggered when she navigates away with buffer words pending.

**Stage 1 — Loading**
Centered overlay card. Sends all buffered words to AI in one batch call. Progress shown per word (pill indicators).

**Stage 2 — Word by word review**
Same overlay transitions. For each word, a form shows all fields with AI suggestions as a highlighted row below each input. She can accept each suggestion individually or tap "Accept All". After all words reviewed → library updated → overlay closes → she lands back where she was.

**Stage 3 — Finishing**
Brief 1-2 second "All done" state before closing. Not skippable — gives her a moment of satisfaction.

### 7.5 Duplicate detection (runs client-side before AI batch)

Before sending any word to AI verification, check it against the user's existing library:

- **Word does not exist** → proceed to AI verification as normal, create new entry
- **Word exists with same translation** → skip silently, already in library, do not add
- **Word exists with different translation** → do not create new entry, instead add the new translation to `alt_translations[]` of the existing word, notify user: *"[word] already in your library — added a new translation"*

This check happens entirely client-side against the locally cached library. Only genuinely new words or translation merges proceed to the AI batch call.

### 7.6 Verification pipeline (runs once per batch)

Three layers in order:

**Layer 1 — Dictionary verification (authoritative)**

Check each word against real German dictionaries before AI:

1. **DWDS** (Digitales Wörterbuch der deutschen Sprache) — primary source. Authoritative, academic, free API. Returns word existence, gender, word type.
2. **Wiktionary API** — fallback if DWDS has no result. Free, no key needed, broad coverage.

Outcomes:
- Found in DWDS or Wiktionary → word confirmed real, use dictionary gender and word type as ground truth
- Not found in either → flag as unverified, show warning: *"Couldn't confirm this word in any dictionary — add anyway?"* User can proceed or discard.

**Layer 2 — AI enrichment (runs after dictionary confirms word)**

For each confirmed word:
1. Suggest spelling correction if needed (rejectable)
2. Suggest translation in target language (editable)
3. Generate 1–2 example sentences with translation
4. Auto-assign AI tags (e.g. `animals`, `food`, `travel`, `daily life`, `academic`)

AI does not determine gender or word type — dictionary data is used as ground truth for those fields.

**Layer 3 — User review**

User reviews all fields with AI suggestions highlighted. Can accept, edit, or reject every suggestion individually. "Accept All" accepts everything for that word.

### 7.7 Failure handling

**Dictionary API failure:**
- Fall back to AI-only verification
- Show subtle warning: *"Dictionary unavailable — verified by AI only"*
- Word gets an `ai_only_verified` flag in database

**AI batch failure:**
- Show error state in loading card
- Offer retry or "Skip verification — add anyway"
- Words added without AI enrichment get an `unverified` flag in library and can be enriched later

### Edge functions updated

| Function | Purpose |
|---|---|
| `verify-words` | Duplicate check → DWDS lookup → Wiktionary fallback → AI enrichment batch |

---

## 8. Word Database Structure

```sql
words (
  id                  uuid primary key,
  user_id             uuid references users,
  german_word         text not null,
  word_type           text,           -- noun | verb | adjective | adverb | other
  translation         text,
  alt_translations    jsonb,          -- string[]
  example_sentences   jsonb,          -- [{german, translation}]
  ai_tags             text[],
  user_tags           text[],

  -- Grammar fields (populated based on word_type)
  gender              text,           -- der | die | das | null (nouns only)
  plural_form         text,           -- (nouns only)
  conjugations        jsonb,          -- {ich, du, er, wir, ihr, sie} (verbs only)
  conjugation_type    text,           -- weak | strong | irregular (verbs only)
  is_separable        boolean,        -- (verbs only)
  takes_case          text,           -- akkusativ | dativ | null (verbs only)
  comparative         text,           -- (adjectives only)
  superlative         text,           -- (adjectives only)

  -- Learning engine fields (never shown raw to user)
  learning_score      int default 0,
  easiness_factor     numeric default 2.5,
  interval_days       int default 1,
  next_review_date    date,
  last_reviewed       timestamptz,
  review_count        int default 0,
  date_added          timestamptz default now(),
  verification_source text default 'pending', -- 'dwds' | 'wiktionary' | 'ai_only' | 'unverified'
  verified_at         timestamptz
)
```

### Vocabulary stages (derived from learning score, shown to user)

| Label | Meaning |
|---|---|
| 🌱 Just Planted | New, never studied |
| 🔄 Still Growing | Seen but inconsistent |
| 💪 Almost There | Usually correct |
| ⭐ Mastered | Consistently correct over time |

---

## 9. Learning Engine

### 9.1 Algorithm — SM-2

Every word has an **Easiness Factor (EF)** starting at 2.5 and an **interval** (days until next review).

After every exercise, a quality score **q** (0–5) is derived from performance.

**EF update formula:**
```
EF = EF + (0.1 - (5 - q) × (0.08 + (5 - q) × 0.02))
EF minimum = 1.3
```

**What each score produces:**

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

### 9.2 Scoring per exercise type

**Typing exercises (Translation, Reverse Translation):**
- Correct → 5
- Minor variation (fuzzy match) → 3
- Wrong → 1

Fuzzy matching is client-side only (Levenshtein distance). No AI mid-session. Minor variation covers: typos, missing umlaut (Strasse/Straße), single character slip.

**Choice exercises (Single choice, Multiple choice, Matching):**
- Correct → 4 (not 5 — recognition is easier than active recall)
- Wrong → 1

**Multiple choice partial credit — Jaccard similarity:**
```
jaccard = |correct ∩ selected| / |correct ∪ selected|

jaccard = 1.0      → q = 4
jaccard ≥ 0.6      → q = 3
jaccard ≥ 0.3      → q = 2
jaccard < 0.3      → q = 1
```
Selecting wrong answers actively penalizes the score. Guessing everything is punished.

**Time:** Not used in scoring. Unreliable — she might put the phone down mid-question.

**Flashcards:** No SM-2 update. Separate review mode only. Never affects scoring.

### 9.3 Study session queue logic

**Automatic session (default):**
1. All words where `next_review_date <= today` → due queue
2. Prioritize lowest EF within due queue
3. Mix in new words (max 5–10 per session)
4. If nothing due → surface lowest EF words regardless of date

**Exercise type selection per word (automatic):**
- Never seen → single/multiple choice first (recognition before active recall)
- Seen 1–2 times → multiple choice or matching
- Seen several times → translation or reverse translation
- High EF, just due → single choice is sufficient

**Session questions generated upfront:** One AI batch call before the session starts. AI generates all questions, wrong answer options (plausible distractors, not random), and matching pairs. Session runs entirely from local JSON. No AI calls mid-session.

### 9.4 Study configure modes

Three modes with bookmark tabs:

| Mode | Description |
|---|---|
| Auto | SM-2 queue, just start. Primary default path. |
| By tag | Select one or more tags. Session built from matching words. |
| Ask companion | Describe what to study in natural language. AI maps intent to words. |

---

## 10. Exercise Types

| Type | Answer format | Max score |
|---|---|---|
| Single choice | Tap one option | 4 |
| Multiple choice | Tap all correct options | 4 (Jaccard mapped) |
| Translation | German → type Indonesian | 5 |
| Reverse translation | Indonesian → type German | 5 |
| Matching | Connect 4 word pairs | 4 per pair |

Fill-in-the-sentence was explicitly removed — even without grammar, it begins to test grammatical forms which belongs in the v2 grammar engine.

### Session results framing
- Always show: "18 correct" — positive frame
- Never show: "2 wrong" — no punishment
- Companion message after session matches energy: celebrates wins, gently encourages after hard sessions

---

## 11. Word Library

### Views
Two views toggled by a sliding thumb toggle (not a pill toggle):
- **List** — dense, one row per word
- **Cards** — responsive grid, more breathing room per word

### List row content
Stage dot · German word · gender pill · type chip · translation · tags (max 2) · due badge

### Card content
Colored stage strip at top (3px) · word · type chip + gender pill (same row, consistent height always) · translation · tag · due badge

### Desktop detail
Split panel: left shows narrowed list or card grid with selected word highlighted, right shows full word detail. Toggle between list/card view preserved in left panel.

### Mobile detail
Full page navigation with back button.

### Word detail content
Gender + type + stage chips (all same Chip component, same size) → word large → translation → alt translations → example sentences → grammar section (content depends on word type) → tags → learning stats (reviews, correct rate, next review, EF)

### Search and filtering
- Fuzzy dual-language search (German and Indonesian simultaneously)
- Filters: stage, word type, tags, sort (A→Z, date added, stage, last reviewed, next review)

---

## 12. Dashboard

### Desktop layout
- **Sidebar (fixed):** navigation + streak + total words. Always visible on all pages.
- **Top bar:** greeting + "+ Add words" CTA
- **Hero (~42% height):** companion left (wanders, nudges board) + stats board right (due today CTA + word stages breakdown). Companion and board share the same open canvas — companion physically nudges the board.
- **Quick actions:** 4 cards (Add words, Study, Read, Documents) with contextual hints
- **Bottom row:** Word of the Day (flex:2) + Last Session + This Week bar chart — all same height via `alignItems: stretch`

### Mobile layout
- Companion + speech bubble area at top
- Three stat cards (streak, study time, words)
- Word stages breakdown card
- Due today card with Study now CTA
- Three quick action cards
- Word of the day

---

## 13. Reading Module

### Library screen
- History of previously read texts as cards (title, date, word count, words added badge)
- Two action buttons: Paste/Upload + Generate
- AI generation: no required parameters. Optional prompt input. If she hits generate with no input → AI picks topic, medium length, matches her level, includes weak words.

### Reader
- Single continuous scrollable text (no pagination)
- Words already in her library: dotted underline indicator
- **Tap any word** → popup with translation, type, gender, stage, "Add to buffer" button
- **Tap any sentence** → popup with German text, Indonesian translation, "Add distinct words to buffer" button (AI extracts meaningful words from selection, filters out articles/prepositions/words already in library)
- Buffer badge always visible in reader topbar
- Adding words from reading **never interrupts reading**. Words go to buffer silently. She verifies later by normal rules.

### Desktop reader layout
Full main area for text, right panel slides in for word/sentence popups (240px).

### Mobile reader layout
Full screen text, bottom sheet slides up for word/sentence popups.

---

## 14. Documents

### Document types

| Type | Creation | Editing |
|---|---|---|
| PDF | Upload file | View only |
| Rich text | Type, paste, or insert images | Full editor (Tiptap) |

Rich text has two modes: **Edit** (full Tiptap editor with toolbar, inline images) and **Read** (clean reading view, same as PDF viewer visually). Toggle in topbar.

Pasting text into the add flow creates a rich text document automatically.

### Annotation layer
Works identically on both PDF and rich text in read mode:
- **Highlights** — select text, highlight saved with color and position
- **Bookmarks** — mark a page/position with optional note

Annotations persist across sessions in database.

### Desktop layout
Full main area for document, collapsible right panel (220px) for annotations (bookmarks list + highlights list).

### Mobile layout
Full screen document, annotations accessible via bottom sheet triggered by toolbar button.

### Vocabulary mining from documents
- **Select a single word** → popup with translation + add to buffer
- **Select a sentence or larger chunk** → AI identifies all distinct meaningful words, shows as list, she picks which to add to buffer

---

## 15. Settings

Three controls only:

| Setting | Options |
|---|---|
| Target language | Indonesian (default), others |
| Companion name | Text input, editable |
| Daily goal | 5 / 10 / 20 words per day |

Full page on both desktop and mobile. No dark/light theme in v1.

---

## 16. Profile

Three items only:

- Email — read-only field with "Change" link
- Password — displayed as `••••••••` with "Change" link
- Logout — full width button, muted red styling

No stats (covered by dashboard). No avatar.

---

## 17. Full Database Schema

```sql
users (
  id                uuid primary key,
  email             text unique not null,
  password_hash     text not null,
  created_at        timestamptz default now()
)

settings (
  id                uuid primary key,
  user_id           uuid references users unique,
  companion_name    text default 'Lumi',  target_language   text default 'Indonesian',
  daily_goal        int default 10,
  created_at        timestamptz default now()
)

words (
  id                uuid primary key,
  user_id           uuid references users,
  german_word       text not null,
  word_type         text,
  translation       text,
  alt_translations  jsonb,
  example_sentences jsonb,
  ai_tags           text[],
  user_tags         text[],
  gender            text,
  plural_form       text,
  conjugations      jsonb,
  conjugation_type  text,
  is_separable      boolean,
  takes_case        text,
  comparative       text,
  superlative       text,
  learning_score    int default 0,
  easiness_factor   numeric default 2.5,
  interval_days     int default 1,
  next_review_date  date,
  last_reviewed     timestamptz,
  review_count      int default 0,
  date_added        timestamptz default now()
)

word_buffer (
  id                uuid primary key,
  user_id           uuid references users,
  german_word       text not null,
  translation       text,
  created_at        timestamptz default now()
)

review_sessions (
  id                uuid primary key,
  user_id           uuid references users,
  started_at        timestamptz,
  ended_at          timestamptz,
  mode              text,
  words_reviewed    int,
  correct_count     int,
  tag_filter        text
)

review_results (
  id                uuid primary key,
  session_id        uuid references review_sessions,
  word_id           uuid references words,
  exercise_type     text,
  quality_score     int,
  was_correct       boolean,
  time_taken_ms     int
)

reading_texts (
  id                uuid primary key,
  user_id           uuid references users,
  title             text,
  content           text,
  source            text,       -- 'paste' | 'upload' | 'generated'
  created_at        timestamptz default now(),
  last_opened       timestamptz
)

documents (
  id                uuid primary key,
  user_id           uuid references users,
  title             text,
  type              text,       -- 'pdf' | 'rich'
  content           text,       -- rich text JSON or null for PDF
  file_url          text,       -- PDF storage URL or null
  created_at        timestamptz default now()
)

annotations (
  id                uuid primary key,
  document_id       uuid references documents,
  user_id           uuid references users,
  type              text,       -- 'highlight' | 'bookmark'
  page              int,        -- PDF page or null
  start_offset      int,
  end_offset        int,
  note              text,
  color             text,
  created_at        timestamptz default now()
)

streaks (
  id                uuid primary key,
  user_id           uuid references users unique,
  current_streak    int default 0,
  longest_streak    int default 0,
  last_activity     date
)
```

---

## 18. Page & Route Structure

```
/login                → Login
/register             → Register
/onboarding           → Companion Introduction (once after register)
/                     → Dashboard
/words                → Word Library
/words/[id]           → Word Detail
/study                → Study Configure
/study/session        → Active Study Session
/read                 → Reading Library
/read/[id]            → Reading Text
/documents            → Document Library
/documents/[id]       → Document Reader / Editor
/settings             → Settings
/profile              → Profile
```

---

## 19. AI Integration Points

| Feature | When | Type | Notes |
|---|---|---|---|
| Word batch verification | On verify tap | Batch async | All buffer words in one call |
| Translation suggestion | Part of verify batch | Batch | |
| Grammar detection | Part of verify batch | Batch | |
| Auto-tagging | Part of verify batch | Batch | |
| Example sentence generation | Part of verify batch | Batch | |
| Study session generation | Before session starts | Batch | Full session questions + distractors upfront |
| Companion messages | After sessions, dashboard load | Single-turn, context-aware | |
| Companion chat | On user message in chat | Single-turn, context-aware, with history | |
| Ask companion (study) | On configure | Single-turn | Maps description to word set |
| Reading word translation | On tap | Single-turn | |
| Reading sentence translation | On tap | Single-turn | |
| AI text generation (reading) | On generate tap | Single-turn | |
| Document vocabulary mining | On text selection | Single-turn | |

---

## 21. Sustainability

GermanLern is free and will always stay free. A non-intrusive contribution section lives in the user profile only — never in popups or on other pages.

**Framing:**
> "Running this app costs about the price of a portion of tofu per person per month. If GermanLern has helped you learn even one word, consider helping keep it alive 🥣"

**Monthly cost transparency:**
- Current (free tiers): €0
- At scale (Supabase Pro + domain + Resend): ~€39/month
- Per person across 60 users: ~10,000 IDR (~€0.57)

**Progress bar** — shown in IDR, updates as contributions come in:
```
This month: Rp 80.000 / Rp 390.000
████░░░░░░░░░░░░ 20%
```

**Payment:** Ko-fi link. No custom payment infrastructure. Ko-fi handles transactions, shows progress toward monthly goal automatically.

**Promise to users:** 100% of contributions go to server and domain costs. Zero to developer. Stated explicitly in the profile section.

---

## 22. Phased Feature Additions

| Feature | Decision |
|---|---|
| Offline support | Phase 2. Too complex for v1 — requires local word cache, delayed verification queue, sync logic. |
| Push notifications | Not planned. |
| Anki import | Not planned. |
| Companion default name | Lumi |
| Privacy policy / terms | Simple one-pager before sharing with 60 people. |

### Phase 1 — Core (v1)
- Auth (login, register, onboarding, companion introduction, in-app tour)
- Dashboard (companion full size, hero board, stats, quick actions)
- Add word (type + paste modes, buffer, verify flow)
- Word library (list + card views, detail panel, search, filter)
- Study session (all 5 exercise types, SM-2 engine, configure modes, end screen)
- Reading module (library, reader, word/sentence tap, AI generation)
- Documents (PDF reader, rich text editor + reader, annotations, vocabulary mining)
- Companion (3D model, full dashboard presence, mini mode on other pages, chat)
- Settings + Profile

### Phase 2 — Enrichment
- Camera / OCR word capture (Scan mode)
- Grammar engine (separate mode, per-word grammar drills)
- Companion voice messages (ElevenLabs voice cloning)

### Phase 3 — Delight
- Floral / decorative UI layer on top of pastel base
- Multi-user support (friends can join)
- Leveled text generation in reading module
- Advanced analytics and progress visualization