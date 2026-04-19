# CONTINUE.md

Progress tracking for GermanLern development.

---

## Completed

### 2026-04-19 — Initial Setup
- Explored full codebase: ADD.md, CODING_RULES.md, App.jsx
- Created CLAUDE.md with project rules and architecture
- Saved all rules to Claude memory
- Converted `App.jsx` → `App.tsx` with `@ts-nocheck`
- Set up tsconfig (relaxed, `strictNullChecks` for TanStack Router), eslint (flat config, `any` allowed)
- Installed all stack dependencies (TanStack Router, Tailwind, Framer Motion, Three.js + R3F, RHF + Zod, Zustand, Lucide, Supabase)
- Git init, pushed to GitHub

### 2026-04-19 — Project Structure + Routing
- Moved wireframe explorer to `src/sandbox/WireframeExplorer.tsx`
- Set up TanStack Router with code-based routes: `/`, `/companion`, `/sandbox/explorer`
- Moved architecture docs to `docs/`

### 2026-04-19 — Companion 3D Character
- Created `src/features/companion/` with full component structure
- Loaded creature.glb (18 meshes, 28 bones, 5 animations)
- Animation system: crossfade controller with auto-return for one-shot animations (wave)
- Shell texturing fur: dual-grid 3D hash strands, 64 shells body / 40 shells pompoms
- Fur physics: gravity droop, multi-frequency wind, velocity reaction
- Eye cutouts computed from actual sclera geometry positions
- Body fur shells parented to Body bone for animation tracking
- Pompom fur uses skinned mesh binding

### 2026-04-19 — shadcn/ui + Design System
- Initialized shadcn/ui with preset `b7W7uXIuG` (Luma style, Taupe, Inter font, Lucide, Large radius)
- Set up `@/` path alias in tsconfig + vite
- Added shadcn MCP server (`.mcp.json`)

## Current State

- Companion renders at `/companion` with fur + animations + physics
- Wireframe explorer at `/sandbox/explorer`
- shadcn/ui initialized with pastel Taupe token set
- shadcn MCP server configured
- No app pages built yet

## Next Steps

- Build app shell: sidebar (desktop) + bottom nav (mobile) layout
- Set up all route definitions from ADD.md
- Build auth pages (login, register)
- Build onboarding flow (companion intro, in-app tour)
- Build dashboard
