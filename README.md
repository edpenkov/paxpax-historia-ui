# PaxPax Historia UI

Standalone UI reference for [Pax Historia](https://www.paxhistoria.co/). Built with Next.js, TypeScript, Tailwind CSS, and Motion. Intended for handoff to the client team via GitHub — they integrate components into their main app using Cursor agents.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS v4
- [motion](https://motion.dev/) — animations
- [next-themes](https://github.com/pacocoursey/next-themes) — light/dark (provider wired; color tokens added per screen)
- Poppins (`next/font`)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project layout

```
src/
  app/           Routes and layouts
  components/    Custom components (add as you build)
  lib/cn.ts      Tailwind class merge helper
  hooks/         Shared hooks
docs/reference/  Design screenshots
public/assets/   SVGs and images
```

## Conventions

- **Desktop-first** responsive design
- **Props-first** React components — see [AGENTS.md](./AGENTS.md)
- **Hard-code early**, extract shared patterns when they repeat
- Cursor rules in `.cursor/rules/component-conventions.mdc`

## Handoff

For the client team:

- [AGENTS.md](./AGENTS.md) — repo map and conventions for Cursor agents
- [HANDOFF.md](./HANDOFF.md) — integration checklist

## Design reference

Place design screenshots in `docs/reference/`. No Figma pipeline — visual reference only.
