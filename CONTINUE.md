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

## Current State

- App shell is minimal: Header with "GermanLern" branding + nav links, simple Footer
- Index page is a placeholder ("Dashboard coming soon")
- Auth routes exist from Supabase blocks (login, sign-up, forgot-password, update-password, protected)
- No database tables created yet
- No app shell layout (sidebar/bottom nav) yet
- Companion renders at `/companion` (legacy route from earlier setup)

## Next Up — Phase 1: Database & Auth

See `docs/ROADMAP.md` for full v1 roadmap (9 phases).

**Phase 1a — Database schema:**
- All tables from ADD.md section 17 as Supabase migrations
- RLS policies on every table
- Supabase Storage bucket

**Phase 1b — Auth flow:**
- Wire existing Supabase auth blocks
- Google OAuth
- Protected route guard (`_authed.tsx`)
- Redirect logic

**Phase 1c — App shell:**
- Sidebar (desktop) + bottom nav (mobile) layout
- All route stubs per ADD.md section 18
- Companion mini placeholder
- Feedback button
