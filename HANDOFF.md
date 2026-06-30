# HANDOFF.md — PaxPax Historia UI

Reference document describing **what exists in this repo**, how it is organized, and how pieces relate to each other. Intended for Cursor agents and developers integrating UI from this repository into another codebase.

This file does **not** prescribe how to modify the target project. Integration decisions belong to the receiving team.

For coding conventions used while building this repo, see [AGENTS.md](./AGENTS.md).

---

## Purpose

Standalone UI reference for [Pax Historia](https://www.paxhistoria.co/). Contains React components and Next.js routes only — no backend, auth, database, env config, or API routes.

Many parts of this repo are **UI placeholders**: static or simplified stand-ins for layout and visual design. In the production Pax Historia app, the same UI regions are typically **dynamic** (live map, game state, API-driven content). Integrators should treat placeholder implementations as optional reference — either skip them and wire real systems directly, or replace them while keeping layout/styling from this repo.

---

## Stack

| Layer | Version / package |
|-------|-------------------|
| Next.js | 16.x (App Router) |
| React | 19.x |
| TypeScript | 5.x |
| Tailwind CSS | v4 (`@import "tailwindcss"`) |
| motion | ^12.x |
| next-themes | ^0.4.x |
| clsx + tailwind-merge | via `src/lib/cn.ts` |

Path alias: `@/*` → `./src/*` (see `tsconfig.json`).

---

## Repository layout

```
paxpax-historia-ui/
├── AGENTS.md                 Conventions for building in this repo
├── HANDOFF.md                This file — factual project reference
├── README.md                 Local dev instructions
├── .cursor/rules/            Cursor rules for this repo only (not part of UI handoff)
├── docs/reference/           Design screenshots (reference material)
├── public/assets/            Static files served at /assets/*
└── src/
    ├── app/                  Next.js App Router (routes + root layout)
    ├── components/           React components
    ├── hooks/                Shared hooks (empty — add as needed)
    └── lib/                  Utilities
```

---

## Routes (`src/app/`)

| Route | File | Renders |
|-------|------|---------|
| `/` | `src/app/page.tsx` | `<GameScreen />` |

No other routes yet. No API routes, no middleware.

---

## Root layout (`src/app/layout.tsx`)

Server component. Responsibilities in this repo:

- Loads **Poppins** via `next/font/google` (weights 400, 500, 600, 700)
- Exposes CSS variable `--font-poppins` on `<html>`
- Imports `./globals.css`
- Wraps `{children}` in `<ThemeProvider>` from `@/components/providers/ThemeProvider`
- Sets `suppressHydrationWarning` on `<html>` (required by `next-themes`)

---

## Global styles (`src/app/globals.css`)

Current contents and meaning:

```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
@theme inline {
  --font-sans: var(--font-poppins);
}
html, body { height: 100%; overflow: hidden; }
body { font-family: var(--font-poppins), sans-serif; }
```

- **Tailwind v4** entry via `@import`, not a legacy `tailwind.config` theme file
- **`dark` variant** expects a `.dark` class on an ancestor (matches `next-themes` `attribute="class"`)
- **`--font-sans`** maps Tailwind `font-sans` to Poppins
- **`overflow: hidden`** on `html`/`body` — full-viewport game screen, no page scroll
- No color CSS variables or semantic tokens yet — colors are hard-coded in components where used

---

## Placeholders vs production

This repo prioritizes **visual mockup and structure** over production behavior. Not every implementation here should be copied as-is.

| In this repo | In production (typical) |
|--------------|-------------------------|
| Static `<img>` for the map | Interactive map (e.g. canvas, Leaflet, game engine) |
| Hard-coded text and labels | Data from game state / API |
| Mock handlers or no handlers | Real auth, Supabase, Firestore, etc. |
| Static assets in `public/assets/` | Generated or fetched assets |

**For integrators:** a placeholder marks *where* UI lives and *how* it looks — not *how* data is loaded. When transferring:

- **Ignore** the placeholder implementation if the target project already has the real feature (e.g. keep their map, adopt only overlay chrome from this repo).
- **Replace** the placeholder with the real system while preserving layout, spacing, and component boundaries where useful.
- **Do not assume** static files, fake data, or simplified markup are required in production.

Individual components note placeholder status in the inventory below when relevant.

---

## Components (`src/components/`)

### `GameScreen/GameScreen.tsx`

Main game UI shell. Server component (no `"use client"`).

- Full viewport: `h-dvh w-full overflow-hidden`
- **Map layer (placeholder):** native `<img>` → `/assets/background.png`
  - Stand-in only — production uses a live interactive map; this repo uses a static image for simplicity
  - Uses `<img>` intentionally — not `next/image` — to avoid Next.js re-encoding
  - `object-cover object-center` fills the screen
  - Integrators: skip this `<img>` or swap for the real map component; keep the shell layout if useful

**Static asset dependency (placeholder):** `public/assets/background.png` (4092×2032 PNG). Not required in production if the real map replaces it.

Accepts `children` for UI overlays (header, panels, etc.) rendered above the map layer.

### `DesktopHeader/DesktopHeader.tsx`

Desktop-only top bar. Server component. Hidden below `md` breakpoint — mobile header will be a separate component later.

- **Position:** `absolute top-0`, full width, `z-10` (above map)
- **Size:** `h-12` (48px)
- **Bottom border:** 1px `border-white/10` (`rgba(255, 255, 255, 0.1)`) — same in light and dark for now
- **`children`:** slot for additional header content (center/right areas)
- Left cluster (built-in): hamburger icon (20×12) + 12px gap + “PaxHistoria” (16px medium white); 20px left padding; both use `drop-shadow(0 0 4px rgba(0,0,0,0.25))`
- No click handlers yet — interactions added later

Subcomponents: `HamburgerIcon.tsx` (SVG only).

Used in `page.tsx` as a child of `GameScreen`.

### `ProminenceAnchor/` + `ProminenceBackdropPlaced.tsx`

Reusable blurred dark region to darken/blur the map under UI. Rendered in a **dedicated layer** (`z-[1]`) — above the map, **below all UI** (`z-10`, including header border). Backdrops are portaled from `ProminenceAnchor` so they never paint over sibling UI.

**Two-layer effect** (separate elements — do not combine on one node):

| Layer | CSS | Role |
|-------|-----|------|
| Map blur | `backdrop-filter: blur(20.5px)` + elliptical mask | Blurs map under region |
| Dark shape | Radial gradient sized to **logical rect** + `filter: blur(60px)` | Stain footprint = `expand` + anchor box |
| Clip pad | ~66px around rect | Invisible; stops blur from clipping — does not scale stain |

**Size:** controlled by `expand` on `ProminenceAnchor` (extends beyond anchored UI). Blur radii are fixed.

**API:** `ProminenceAnchor` wraps UI; `expand: { top, right, bottom, left }` in px. Client component (measures anchor, portals backdrop).

**First use:** `DesktopHeader` logo cluster — `expand: { top: 62, right: 202, bottom: 62, left: 202 }`.

`GameScreenShell` (client) owns map layer, prominence layer, and UI layer stacking.

### `providers/ThemeProvider.tsx`

Client component (`"use client"`). Thin wrapper around `next-themes`:

- `attribute="class"`
- `defaultTheme="system"`
- `enableSystem`

Used only in root layout. No theme toggle UI in this repo yet.

---

## Utilities (`src/lib/`)

### `cn.ts`

```ts
twMerge(clsx(...inputs))
```

Used for conditional Tailwind class composition. Import: `@/lib/cn`.

---

## Static assets (`public/assets/`)

| File | URL | Used by |
|------|-----|---------|
| `background.png` | `/assets/background.png` | `GameScreen` |

Files in `public/` are served as-is from the site root. Any component referencing `/assets/...` requires the corresponding file in the target project's public/static serving setup.

---

## Design reference (`docs/reference/`)

Screenshots and visual reference only. Mirror of some assets (e.g. `background.png`). Not imported by application code.

---

## Dependencies used in code

| Package | Where used |
|---------|------------|
| `next-themes` | `ThemeProvider.tsx` |
| `clsx`, `tailwind-merge` | `cn.ts` |
| `motion` | Installed; not yet used in any component |
| `next/font/google` | `layout.tsx` (Poppins) |

Full list: `package.json`.

---

## Client vs server components

| File | Type |
|------|------|
| `src/app/layout.tsx` | Server |
| `src/app/page.tsx` | Server |
| `src/components/GameScreen/GameScreen.tsx` | Server |
| `src/components/GameScreen/GameScreenShell.tsx` | Client |
| `src/components/DesktopHeader/DesktopHeader.tsx` | Server |
| `src/components/ProminenceAnchor/ProminenceAnchor.tsx` | Client |
| `src/components/ProminenceAnchor/ProminenceBackdropPlaced.tsx` | Server (portaled) |
| `src/components/providers/ThemeProvider.tsx` | Client |

Components that use `motion` or browser-only APIs will be marked `"use client"` when added.

---

## Conventions in this repo

- **Desktop-first** responsive Tailwind (base styles target desktop; smaller breakpoints via `max-*:` when added)
- **Props-first** React components
- **Hard-coded styles** acceptable early stage; no token layer yet
- **Custom components only** — no HeroUI, shadcn, or other UI libraries
- **Poppins** as the only font

Details: [AGENTS.md](./AGENTS.md), `.cursor/rules/component-conventions.mdc`.

---

## Explicitly out of scope

- Backend, Supabase, Firestore, auth
- Environment variables (`.env`)
- API routes, server actions with data
- Tests, CI, deployment config
- npm package publish — this is a reference repo, not a library

---

## Current UI inventory

<!-- Update this section as screens and components are added -->

| Name | Location | Notes |
|------|----------|-------|
| Game screen shell | `src/components/GameScreen/` + route `/` | Layout wrapper; accepts overlay `children` |
| Map background | inside `GameScreen` | **Placeholder** — static `<img>`; production = live map |
| Desktop header | `src/components/DesktopHeader/` | Desktop only (`md+`); 48px; logo cluster + `ProminenceAnchor` |
| Prominence backdrop | `src/components/ProminenceAnchor/` | Reusable map darkening/highlight under UI; configurable `expand` |

Mark new entries with **Placeholder** when the implementation is a stand-in for dynamic/production behavior.

---

## Import graph (current)

```
layout.tsx
  ├── ThemeProvider.tsx  → next-themes
  ├── globals.css
  └── Poppins (next/font)

page.tsx
  └── GameScreen.tsx
        ├── /assets/background.png (placeholder — static map stand-in)
        └── DesktopHeader.tsx
```

---

## Changelog

| Date | Change |
|------|--------|
| 2026-06-29 | Initial foundation + GameScreen with `background.png` |
