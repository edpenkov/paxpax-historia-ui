# AGENTS.md — Pax Historia UI

Standalone UI reference for [Pax Historia](https://www.paxhistoria.co/). Not integrated with backend, auth, or data layers. The client team copies components and routes into their Next.js app using Cursor agents.

## Repo structure

```
src/
  app/              Next.js routes — copy relevant routes to client app
  components/       Custom React components — primary handoff target
  lib/cn.ts         Class name utility (clsx + tailwind-merge)
  hooks/            Shared hooks (add as needed)
docs/reference/     Design screenshots — do NOT copy to client repo
public/assets/      SVGs and images
```

## Dependencies to add in client repo

```bash
npm install motion next-themes clsx tailwind-merge
```

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

## What to copy

| Copy | Skip |
|------|------|
| `src/components/**` | `docs/reference/` |
| Relevant `src/app/**` routes | `.cursor/` |
| `src/lib/cn.ts` | Dev-only files |
| Theme-related CSS from `globals.css` when defined | Mock data (replace with real API) |

## What to wire on the client side

- Replace placeholder handlers and mock data with real auth/API
- Merge `globals.css` theme variables when they exist
- Ensure `ThemeProvider` wraps the app (same pattern as `src/components/providers/ThemeProvider.tsx`)

See [HANDOFF.md](./HANDOFF.md) for a step-by-step checklist.
