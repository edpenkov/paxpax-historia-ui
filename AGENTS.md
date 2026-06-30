# AGENTS.md — PaxPax Historia UI

Standalone UI reference for [Pax Historia](https://www.paxhistoria.co/). Not integrated with backend, auth, or data layers.

Parts of this repo are **placeholders** (static map image, mock data, etc.) — visual stand-ins for production dynamic content. See [HANDOFF.md](./HANDOFF.md#placeholders-vs-production).

## Repo structure

```
src/
  app/              Next.js App Router — routes and root layout
  components/       Custom React components
  lib/cn.ts         Class name utility (clsx + tailwind-merge)
  hooks/            Shared hooks (add as needed)
docs/reference/     Design screenshots — not imported by app code
public/assets/      Static files served at /assets/*
```

## Dependencies in this repo

Listed in `package.json`. Runtime deps used in code today: `next-themes`, `clsx`, `tailwind-merge`. `motion` is installed but not yet imported by any component.

## Component organization

1. **One file = one component** in its own folder when non-trivial: `components/SettingRow/SettingRow.tsx`
2. **Props-first:** put anything that can change into props (label, icon, onClick, variant, isActive)
3. **Composition:** compose screens from small components; avoid monolith JSX
4. **Hard-code first, extract later:** extract shared colors/tokens only after 3+ repeats
5. **Theme:** Tailwind `dark:` + CSS variables when colors stabilize
6. **Responsive — desktop-first:** base = desktop; use `max-lg:`, `max-md:` for smaller viewports
7. **Custom components only** — no third-party UI libraries from this repo
8. **Build in any order** — no required design-system phases

## Conventions

- TypeScript
- `'use client'` for components using `motion` or browser APIs
- Font: Poppins via `next/font` (already in root layout)
- `next-themes` with `attribute="class"` (provider wired; color tokens added per screen)
- Use `cn()` from `@/lib/cn`

## Repo-only files

| Path | Role |
|------|------|
| `docs/reference/` | Design screenshots — not imported by app code |
| `.cursor/` | Cursor agent rules for this repo |

See [HANDOFF.md](./HANDOFF.md) for full project structure, component inventory, dependencies, and import graph.
