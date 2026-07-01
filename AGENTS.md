# AGENTS.md — PaxPax Historia UI

Standalone UI reference for [Pax Historia](https://www.paxhistoria.co/). Not integrated with backend, auth, or data layers.

Parts of this repo are **placeholders** (static map image, mock data, etc.) — visual stand-ins for production dynamic content. See [HANDOFF.md](./HANDOFF.md#placeholders-vs-production).

## Repo structure

```
src/
  app/              Next.js App Router — routes and root layout
  components/       Custom React components
  hooks/            Shared hooks (add as needed)
  lib/              Utilities (cn, transitions, panelNavigation, panelShell, …)
docs/reference/     Design screenshots — not imported by app code
public/assets/      Static files served at /assets/*
```

## Dependencies in this repo

Listed in `package.json`. Runtime deps used in code today: `next-themes`, `clsx`, `tailwind-merge`, `motion`.

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

## Panel patterns (drill-down panels)

Expanding panels use **two independent libs** — do not merge their lifecycle or timing.

| Lib | Role | Triggers |
|-----|------|----------|
| `@/lib/panelShell` | **Behavior** — shell width/height | open/close, `content` ↔ `viewport` height mode, window resize, content remeasure |
| `@/lib/panelNavigation` | **Style** — forward/back page slide | route changes only (step 2+ body; always X) |

**Animation tiers in Settings (reference consumer):**

| Tier | What moves | Token / API | When |
|------|------------|-------------|------|
| Shell | Panel width/height, radius | `panelSizeTransitionClass` + `useAnimatedPanelShell` | Gear open, main↔sub height mode, resize — **not** slide direction |
| Page slide | Sub-page body content | `getPanelNavigateTransition` (`fast`, X) | Step 2↔3, main↔sub body; forward enter +X, forward exit off right |
| Step-1 reveal | Main title + menu rows | `getMainMenuRevealMotion` (`medium`) | Panel open / back to main; mobile Y, desktop X |
| Sub-header reveal | Breadcrumbs | `getSubPageRevealMotion` (`medium`, always X) | Entering step 2+; keyed by `navDirection` only |
| Accordion | Desktop nested rows only | `settingsMenuAccordionTransition` | Expand/collapse in place — **not** page navigation |

**Rules:**

1. Shell size uses `useAnimatedPanelShell` + measured px height + `panelSizeTransitionClass`. Never drive height from slide direction.
2. Page swaps use `usePanelNavigation` + `getPanelNavigateTransition` on body (`AnimatePresence` or `PanelNavigateView`). Breadcrumbs use reveal helpers — **not** page transitions (`AnimatePresence` sync/wait caused glitches).
3. Consumer-specific routes/labels stay in the feature folder (e.g. `settingsMenuSection.ts`).
4. First reference: `SettingsMenu` (desktop morph) + `MobileTopControls` (mobile dropdown).

UI Kit → **Styles → Panel patterns**. Full reference: [HANDOFF.md](./HANDOFF.md#utilities-srclib).

## Repo-only files

| Path | Role |
|------|------|
| `docs/reference/` | Design screenshots — not imported by app code |
| `.cursor/` | Cursor agent rules for this repo |

See [HANDOFF.md](./HANDOFF.md) for full project structure, component inventory, dependencies, and import graph.
