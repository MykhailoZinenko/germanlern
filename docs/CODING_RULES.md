# GermanLern — Claude Code Rules

## Context
Read the architecture document and wireframe explorer before making any decisions. Every feature, flow, and design decision is already defined there. Do not invent or assume.

---

## Project Setup
- Framework: TanStack Start (built on Vite/Vinxi)
- Routing: TanStack Router (file-based, built into TanStack Start)
- Auth blocks and Dropzone from Supabase shadcn library are compatible and should be used directly

- TypeScript everywhere — no plain JS files
- Functional components only — no class components
- Named exports for components, default export for pages
- No inline styles — Tailwind classes only
- Keep components small and focused — split when a component exceeds ~100 lines
- Co-locate component files with their styles and logic — no deep folder nesting
- DRY always — if something is written twice, extract it
- Never hardcode values — constants go in a dedicated constants file, config values in environment variables
- Never write TODOs, placeholders, or incomplete implementations — every piece of code must be production-ready and fully functional
- Never leave empty catch blocks — always handle errors meaningfully

---

## Project Structure

```
src/
  components/       # Shared reusable components
  pages/            # One file per route/page
  features/         # Feature-specific components and logic
    words/
    study/
    reading/
    documents/
    companion/
  hooks/            # Custom React hooks
  store/            # Zustand stores
  lib/              # Supabase client, helpers, utilities
  routes/           # TanStack Router route definitions
supabase/
  functions/        # Edge functions (Deno)
  migrations/       # SQL migration files
```

---

## Stack Rules

- **Routing** — TanStack Router only. File-based routing as TanStack Start provides. No React Router.
- **Styling** — Tailwind + shadcn/ui only. No inline styles. No CSS modules.
- **Forms** — React Hook Form + Zod for all forms. No uncontrolled inputs.
- **State** — Zustand for global state. React state for local component state. No prop drilling beyond 2 levels.
- **Database** — always go through the Supabase client. Never construct raw SQL in the frontend.
- **AI calls** — always through Supabase Edge Functions. Never call Gemini or any AI API directly from the client.
- **File uploads** — always to Supabase Storage. Never store binary data in the database.
- **Rich text** — Tiptap JSON stored in database `content` column. Images inside documents go to Supabase Storage, URL reference stored in Tiptap JSON.
- **Animations** — Framer Motion for all meaningful animations. CSS transitions only for simple hover/focus states.
- **Icons** — Lucide only.
- **3D** — Three.js for companion rendering only.

---

## Supabase Rules

- Always use Row Level Security (RLS). Every table must have policies.
- User can only read and write their own data — `user_id = auth.uid()` on all policies.
- Storage buckets must be private — access via signed URLs only.
- Edge functions receive the user's JWT from the client and verify it server-side before processing.
- Never expose the Gemini API key or any secret to the client.

---

## Component Rules

- Every shadcn/ui component must use the project's existing token set — no overriding with arbitrary colors
- The `Chip` component is the single source of truth for all badges, pills, tags, and labels — same height, same border radius, only color varies
- The `VToggle` (list/grid view toggle) uses a sliding thumb animation — never a standard checkbox or select
- The bookmark tab pattern (active tab sits higher, connects flush to the panel below) is used for: Add Word modes, Study configure modes
- Companion is always a circle placeholder until the Three.js model is integrated — never use an image or emoji as a substitute in production code

---

## AI / Edge Function Rules

- All edge functions are in `supabase/functions/{function-name}/index.ts`
- Every function validates the Authorization header before processing
- All AI prompts request structured JSON output — never parse free text
- Every AI call has a try/catch with a meaningful fallback — never let an AI failure crash the UI
- Batch what can be batched — word verification sends all buffer words in one call, never one word at a time
- Study session questions are generated in one upfront batch call before the session starts — no mid-session AI calls

---

## UX Rules

- Never block the user waiting on AI — all AI runs async or in batch after user action
- Never use the word "wrong" in any UI copy — frame everything positively
- The buffer badge is always visible inside the add word drawer/modal regardless of active tab
- Verify flow is the only gate before accessing library/study — never gate word adding itself
- Study mode hides the companion completely — no distractions
- Results always show correct count first — never lead with errors

---

## What Not to Do

- Do not add libraries not in the stack without asking
- Do not create new design tokens — use only what shadcn/create generated
- Do not add features not in the architecture document
- Do not use `any` — every value must be properly typed, use `unknown` and narrow instead
- Do not put business logic in components — extract to hooks or utility functions
- Do not skip RLS policies — every new table needs them before it's used