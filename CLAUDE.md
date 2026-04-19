# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Summary

GermanLern is a personal German vocabulary learning web app for an Indonesian native. It uses spaced repetition (SM-2), AI-assisted word verification, a 3D companion character, and modules for studying, reading, and document management. Full architecture is in `docs/ADD.md`. All coding standards are in `docs/CODING_RULES.md`. Both are authoritative — do not invent features or flows not defined there.

## Commands

- **Dev server:** `npm run dev`
- **Build:** `npm run build` (runs `tsc -b && vite build`)
- **Lint:** `npm run lint`
- **Preview prod build:** `npm run preview`

## Current State

The app is currently a **wireframe explorer** — a single `src/App.jsx` file (~430 lines) rendering all screen mockups with inline styles. No actual app logic, routing, or backend integration exists yet. This file needs to be converted to TypeScript and eventually decomposed into the proper project structure.

## Architecture Rules (from CODING_RULES.md)

### Strict Requirements
- **TypeScript only** — no `.js`/`.jsx` files
- **Functional components only** — named exports for components, default export for pages
- **No inline styles** — Tailwind classes only
- **No `any`** — use `unknown` and narrow
- **No TODOs or placeholders** — every piece of code must be production-ready
- **No empty catch blocks** — always handle errors meaningfully
- **Components under ~100 lines** — split when exceeded
- **DRY** — extract if written twice
- **No hardcoded values** — constants file or env vars
- **No prop drilling beyond 2 levels** — use Zustand
- **No business logic in components** — extract to hooks or utility functions

### Stack Constraints
- **Routing:** TanStack Router (not React Router)
- **Styling:** Tailwind + shadcn/ui (no CSS modules, no inline styles)
- **Forms:** React Hook Form + Zod
- **State:** Zustand for global, React state for local
- **Database:** Supabase client only (no raw SQL in frontend)
- **AI calls:** Supabase Edge Functions only (never direct from client)
- **Animations:** Framer Motion (CSS transitions only for simple hover/focus)
- **Icons:** Lucide only
- **3D:** Three.js for companion only
- **Do not add libraries not in the stack without asking**

### Target Project Structure
```
src/
  components/       # Shared reusable components
  pages/            # One file per route/page
  features/         # Feature-specific components (words/, study/, reading/, documents/, companion/)
  hooks/            # Custom React hooks
  store/            # Zustand stores
  lib/              # Supabase client, helpers, utilities
  routes/           # TanStack Router route definitions
supabase/
  functions/        # Edge functions (Deno)
  migrations/       # SQL migration files
```

### Key Design Patterns
- The `Chip` component is the single source for all badges, pills, tags, labels — same height, same border radius, only color varies
- Bookmark tab pattern (active tab sits higher, connects flush to panel) used for: Add Word modes, Study configure modes
- Companion is always a circle placeholder until Three.js model is integrated
- shadcn/ui components must use the project's existing token set — no arbitrary colors
- All AI runs async or in batch — never block the user
- Never use the word "wrong" in UI copy — frame everything positively
