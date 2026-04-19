# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Summary

GermanLern is a personal German vocabulary learning web app for an Indonesian native. It uses spaced repetition (SM-2), AI-assisted word verification, a 3D companion character (Lumi), and modules for studying, reading, and document management.

**Authoritative docs** — read before making any decisions:
- `docs/ADD.md` — full architecture, features, database schema, routes
- `docs/CODING_RULES.md` — all coding standards and stack rules
- `docs/DD.md` — complete design system (colors, spacing, radii, shadows, animation tokens)

Do not invent features, flows, colors, or design decisions not defined in these documents.

## Commands

- **Dev server:** `npm run dev` (port 3000)
- **Build:** `npm run build`
- **Preview:** `npm run preview`
- **Test:** `npm run test` (vitest)
- **Lint:** `npm run lint`
- **Add shadcn component:** `npx shadcn@latest add [name]`

## Architecture

**Framework:** TanStack Start (full-stack React on Vite + Nitro). SSR enabled, deploys to Vercel.

**Routing:** TanStack Router, file-based. Routes in `src/routes/`. `routeTree.gen.ts` is auto-generated — never edit it.

**Server logic:** All AI calls, sensitive Supabase operations, and file handling use `createServerFn` from `@tanstack/react-start`. NOT Supabase Edge Functions (those are only for database-triggered webhooks).

**State split:**
- **Zustand** — client-only state: UI modals, companion animation, buffer count, tour step
- **TanStack Query** — server state: all Supabase data fetching, caching, loading/error
- Never store server data in Zustand. Never use TanStack Query for UI state.

**Auth:** Supabase Auth with `@supabase/ssr`. Browser client at `src/lib/supabase/client.ts`, server client at `src/lib/supabase/server.ts`. Protected routes use TanStack Router `beforeLoad` with pathless layout (`_authed.tsx`).

**3D Companion:** Full fur-shell rendering system at `src/features/companion/`. Uses Three.js + R3F with custom vertex/fragment shaders. Animations baked into `.glb` model, driven by `AnimationMixer`.

**Styling:** Tailwind v4 + shadcn/ui (preset `b7W7uXIuG`, Luma style, Taupe base). Design tokens defined in `docs/DD.md`, implemented as CSS variables in `src/styles.css`. Cottagecore palette — warm taupes, lavender (Lumi), muted organics. No dark mode in v1.

## Project Structure

```
src/
  routes/           # TanStack Router file-based routes
    __root.tsx      # Root layout (HTML shell)
  components/       # Shared reusable components
    ui/             # shadcn/ui components (installed via CLI)
  features/         # Feature-specific components
    companion/      # 3D character (shaders, hooks, animation)
  hooks/            # Custom React hooks
  store/            # Zustand stores
  lib/              # Supabase clients, utilities
    supabase/       # client.ts (browser), server.ts (SSR)
  constants/        # All constant values
  types/            # Shared TypeScript types
  sandbox/          # WireframeExplorer (legacy mockups)
```

## Strict Rules

- **TypeScript only** — no `.js`, no `any`, no type assertions without justification
- **No inline styles** — Tailwind classes only
- **Components installed via CLI** — `npx shadcn@latest add [name]`, never hand-written
- **Named exports** for components, default export only for route pages
- **No hardcoded colors, radii, or spacing** — always use design tokens from DD.md
- **Border radius** uses shadcn tokens (`--radius-sm/md/lg/xl/2xl/full`) — never pixel values
- **All semantic colors** from DD.md — never invent new ones
- **Drawer** for mobile, **Dialog** for desktop — never mix
- **Badge** is the base for all chips — wrap it, never duplicate
- **No libraries outside the approved stack** without asking
- **No features outside ADD.md** without asking
