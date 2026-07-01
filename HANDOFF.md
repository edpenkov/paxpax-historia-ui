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
| `/ui-kit` | `src/app/ui-kit/page.tsx` | Component catalog (dev inspection) |

No API routes, no middleware.

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

:root {
  --background-primary: rgba(221, 234, 243, 0.8);
  --icon-primary: #00021e;
  --text-primary: #00021e;
}
.dark {
  --background-primary: rgba(0, 0, 0, 0.86);
  --icon-primary: #ffffff;
  --text-primary: #ffffff;
}

@theme inline {
  --font-sans: var(--font-poppins);
  --color-background-primary: var(--background-primary);
  --color-icon-primary: var(--icon-primary);
  --color-text-primary: var(--text-primary);
}
```

**Primary UI tokens** (light / dark via `.dark`):

| Token | Tailwind | Light | Dark |
|-------|----------|-------|------|
| Background | `bg-background-primary` | `rgba(221,234,243,0.8)` | `rgba(0,0,0,0.86)` |
| Icon | `bg-icon-primary`, `text-icon-primary` | `#00021E` | `#fff` |
| Text | `text-text-primary` | `#00021E` | `#fff` |

Panel chrome: `backdrop-blur-[20px]` + `rounded-[6px]` + `bg-background-primary` — see `src/lib/surface.ts` (`surfacePanelClass`). Used on triggers **and** expanded panels.

**Prominence layer:** `fixed inset-0 z-[1]` with viewport-coordinate backdrops. UI layer uses `isolate` at z-10.

**Transition tokens** (`src/lib/transitions.ts` + CSS vars): `--duration-ui` (200ms), `--ease-ui` (ease), `--reveal-offset` (10px). UI Kit → Variables tab.

Full color variable list: `/ui-kit` → Variables tab (`src/lib/ui-kit/variables.ts`).

- **Tailwind v4** entry via `@import`
- **`dark` variant** — `next-themes` `attribute="class"`
- **`overflow: hidden`** on `html`/`body` — full-viewport game screen

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

Main game UI shell. Client component (`"use client"`) — prominence layer uses `useState`.

- Full viewport: `h-dvh w-full overflow-hidden`
- **Map layer (placeholder):** native `<img>` → `/assets/background.png`
  - Stand-in only — production uses a live interactive map; this repo uses a static image for simplicity
  - Uses `<img>` intentionally — not `next/image` — to avoid Next.js re-encoding
  - `object-cover object-center` fills the screen
  - Integrators: skip this `<img>` or swap for the real map component; keep the shell layout if useful

**Static asset dependency (placeholder):** `public/assets/background.png` (4092×2032 PNG). Not required in production if the real map replaces it.

Accepts `children` for UI overlays (header, panels, etc.) rendered above the map layer.

### `DesktopHeader/DesktopHeader.tsx`

Desktop-only top bar. Server component. Hidden below `md` — mobile uses `MobileTopControls`.

- **Position:** `absolute top-0`, full width, `z-10` (above map)
- **Size:** `h-12` (48px)
- **Bottom border:** 1px `border-white/10` (`rgba(255, 255, 255, 0.1)`) — same in light and dark for now
- **`children`:** slot for additional header content (center/right areas)
- Left cluster (built-in): hamburger icon (20×12) + 12px gap + “PaxHistoria” (16px medium white); 20px left padding; both use `drop-shadow(0 0 4px rgba(0,0,0,0.25))`
- No click handlers yet — interactions added later

Subcomponents: `HamburgerIcon.tsx` (SVG only).

Used in `page.tsx` as a child of `GameScreen`.

### `ProminenceAnchor/` + `ProminenceBackdropPlaced.tsx`

Reusable blurred dark region to darken/blur the map under UI. Portaled into z-[1] prominence layer (above map, below UI). Game screen: `fixed inset-0` + viewport coords. UI Kit previews: `containProminence` on `GameScreen` for an absolute in-shell layer.

**Two-layer effect** (separate elements — do not combine on one node):

| Layer | CSS | Role |
|-------|-----|------|
| Map blur | `backdrop-filter: blur(20.5px)` + elliptical mask | Blurs map under region |
| Dark shape | Radial gradient sized to **logical rect** + `filter: blur(60px)` | Stain footprint = `expand` + anchor box |
| Clip pad | ~66px around rect | Invisible; stops blur from clipping — does not scale stain |

**Size:** controlled by `expand` on `ProminenceAnchor` (extends beyond anchored UI). Blur radii are fixed.

**API:** `ProminenceAnchor` wraps UI; `expand: { top, right, bottom, left }` in px. Client component (measures anchor, portals backdrop).

**First use:** `DesktopHeader` logo cluster — `expand: { top: 62, right: 202, bottom: 62, left: 202 }`.

`GameScreen` (client) owns map layer, prominence layer, and UI layer stacking.

### `SettingsMenu/` (+ `MobileTopControls/`, panel content subtree)

Settings panel (`src/components/SettingsMenu/`). Client components. Shared panel content for desktop and mobile.

**Desktop** (`SettingsMenu.tsx`, `md+`): gear trigger morphs in place (34×34 → 420px wide). **Mobile** (`MobileTopControls.tsx`, below `md`): top-bar buttons + panel drops below.

**Panel shell (behavior):** `useSettingsMenuPanel` → `useAnimatedPanelShell`. Main menu = content-driven height; sub-pages = viewport-locked height. Shell resizes on open/close, height mode, window resize — independent of slide direction.

**In-panel navigation (style):** `usePanelNavigation` + `getPanelNavigateTransition` on body (step 2+, always X, `fast`). Step 2↔3 uses the same forward/back page slide as main↔sub.

**Step-1 reveal:** `getMainMenuRevealMotion` on title + rows (`medium`; mobile Y, desktop X). **Breadcrumbs:** `getSubPageRevealMotion` (always X, reveal not page transition).

**Desktop accordion:** `settingsMenuAccordionTransition` — in-place Y/height only; excluded from page navigation.

**Registry / UI Kit:** `SettingsMenu`, related icons, and **Panel patterns** utilities in `registry.ts`.

### `DividerLine/`

1px `bg-text-primary/10` horizontal rule.

### `providers/ThemeProvider.tsx`

Client component (`"use client"`). Thin wrapper around `next-themes`:

- `attribute="class"`
- `defaultTheme="system"`
- `enableSystem`

Used in root layout together with `DevThemeToggle` (dev-only theme switch, not game UI).

### Dev tools (`src/components/dev/`)

Not part of game UI — for local inspection only.

| Component | Role |
|-----------|------|
| `DevThemeToggle` | Fixed bottom-center dev bar: Light/Dark + Game/UI Kit navigation. Rendered in root layout. |
| `UiKitView` | UI Kit page — tabbed catalog (General, Icons, Components, Styles, Variables, Dev) with previews. |
| `UiKitPreview` | Live preview per registry entry id; supports Desktop/Mobile viewport. |
| `UiKitVariablesPanel` | Variables tab — global CSS tokens with live swatches. |

**Registry:** `src/lib/ui-kit/registry.ts` — update when adding/changing components or utilities.
**Variables:** `src/lib/ui-kit/variables.ts` — update when adding CSS tokens to `globals.css`.
**Tabs:** `src/lib/ui-kit/categories.ts`.

---

## Utilities (`src/lib/`)

### `cn.ts`

```ts
twMerge(clsx(...inputs))
```

Used for conditional Tailwind class composition. Import: `@/lib/cn`.

### `surface.ts`

```ts
export const surfacePanelClass =
  "rounded-[6px] backdrop-blur-[20px] bg-background-primary";
```

Shared primary panel chrome — settings trigger, future modals/panels.

### `transitions.ts`

Motion and CSS transition tokens: `--duration-ui`, `--ease-ui`, `--reveal-offset`, `motionTransition`, `panelSizeTransitionClass`. UI Kit → Variables + Styles tabs.

### `panelShell/` — panel size **behavior**

`useAnimatedPanelShell` animates shell width/height when layout context changes: open/close, `content` vs `viewport` height mode, window resize, content remeasure (`ResizeObserver`).

Independent of in-panel slide direction. Consumer example: `SettingsMenu/useSettingsMenuPanel.ts` (thin wrapper).

### `panelNavigation/` — in-panel slide **style**

`usePanelNavigation`, `getPanelNavigateTransition`, `PanelBreadcrumbs` — forward/back **X** page slides when the route stack changes (step 2+). Step 1 uses `settingsMenuReveal.ts` instead (mobile Y on main menu only).

Does not resize the shell. Consumer example: `SettingsMenu/SettingsMenuPanelContent.tsx`.

**Do not couple** shell height timing to navigation direction — see [AGENTS.md](./AGENTS.md#panel-patterns-drill-down-panels).

---

## Static assets (`public/assets/`)

| File | URL | Used by |
|------|-----|---------|
| `background.png` | `/assets/background.png` | `GameScreen` |
| `settings-gear.svg` | `/settings-gear.svg` | Source reference for `SettingsPanelIcon` gear (inlined in component) |

Menu icons: `public/icons/menu/*.svg` → served at `/icons/menu/` (used by `SettingsMenuItemIcon`).

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
| `motion` | Settings menu panel/navigation, prominence-free UI motion |
| `next/font/google` | `layout.tsx` (Poppins) |

Full list: `package.json`.

---

## Client vs server components

| File | Type |
|------|------|
| `src/app/layout.tsx` | Server |
| `src/app/page.tsx` | Server |
| `src/app/ui-kit/page.tsx` | Server |
| `src/app/ui-kit/layout.tsx` | Server |
| `src/components/GameScreen/GameScreen.tsx` | Client |
| `src/components/DesktopHeader/DesktopHeader.tsx` | Server |
| `src/components/ProminenceAnchor/ProminenceAnchor.tsx` | Client |
| `src/components/ProminenceAnchor/ProminenceBackdropPlaced.tsx` | Server (portaled) |
| `src/components/providers/ThemeProvider.tsx` | Client |
| `src/components/dev/DevThemeToggle.tsx` | Client |
| `src/components/dev/UiKitView.tsx` | Client |
| `src/components/dev/UiKitPreview.tsx` | Client |
| `src/components/dev/UiKitVariablesPanel.tsx` | Client |

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
| Mobile top controls | `src/components/MobileTopControls/` | Below `md`: `MobileTopBarButton` (left/right) + dropdown settings panel |
| Settings menu | `src/components/SettingsMenu/` | Desktop morph + shared panel content; drill-down via `panelNavigation` |
| Panel shell lib | `src/lib/panelShell/` | Animated panel width/height (behavior) |
| Panel navigation lib | `src/lib/panelNavigation/` | Forward/back page slides (style) |
| Divider line | `src/components/DividerLine/` | `text-primary` at 10% opacity |
| Dev theme toggle | `src/components/dev/DevThemeToggle.tsx` | Bottom-center Light/Dark (not game UI) |
| UI Kit | `/ui-kit` + `src/lib/ui-kit/registry.ts` | Living component catalog for inspection |

Mark new entries with **Placeholder** when the implementation is a stand-in for dynamic/production behavior.

---

## Import graph (current)

```
layout.tsx
  ├── ThemeProvider.tsx  → next-themes
  ├── DevThemeToggle.tsx
  ├── globals.css
  └── Poppins (next/font)

page.tsx
  └── GameScreen.tsx
        ├── /assets/background.png (placeholder — static map stand-in)
        ├── DesktopHeader.tsx (md+)
        ├── SettingsMenu.tsx (md+ desktop morph)
        │     └── SettingsMenuPanelContent.tsx → panelShell + panelNavigation
        └── MobileTopControls.tsx (below md)
              └── SettingsMenuPanelContent.tsx (shared)

ui-kit/page.tsx
  └── UiKitView.tsx → registry.ts, src/components/dev/ui-kit/
```

---

## Changelog

| Date | Change |
|------|--------|
| 2026-06-29 | Initial foundation + GameScreen with `background.png` |
| 2026-06-29 | Dev theme toggle, `/ui-kit` catalog, primary tokens, SettingsMenu |
| 2026-06-29 | Settings drill-down, `panelShell` + `panelNavigation` libs, mobile settings panel |
