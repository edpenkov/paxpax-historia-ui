# Handoff checklist

Use this when integrating Pax Historia UI into the main Next.js codebase.

## Prerequisites

- Client repo uses Next.js App Router, TypeScript, Tailwind CSS
- Read [AGENTS.md](./AGENTS.md) for conventions

## Steps

- [ ] Clone this repo or add as reference
- [ ] Install deps: `motion`, `next-themes`, `clsx`, `tailwind-merge`
- [ ] Copy `src/lib/cn.ts` → client `src/lib/cn.ts` (or merge if `cn` already exists)
- [ ] Copy `src/components/providers/ThemeProvider.tsx` if client does not have theme setup
- [ ] Copy needed folders from `src/components/` into client components directory
- [ ] Copy relevant route folders from `src/app/` → client `src/app/`
- [ ] Merge Poppins font setup from `src/app/layout.tsx` if not already present
- [ ] Merge `globals.css` additions (Tailwind dark variant, theme CSS variables when added)
- [ ] Replace mock data and placeholder handlers with real auth: auth, API, Supabase, etc.
- [ ] Verify desktop layout first, then responsive breakpoints (`max-lg:`, `max-md:`)
- [ ] Verify light/dark theme if screen uses `dark:` classes

## Notes

- Early components may use hard-coded colors and spacing — extract shared tokens only when duplicating
- Design reference screenshots live in `docs/reference/` — not copied to production
- No backend, env vars, or API routes in this repo

## Screens integrated

<!-- Add entries as screens are built, e.g.:
- [ ] Settings — `src/app/settings/` + `src/components/SettingsSidebar/`
-->
