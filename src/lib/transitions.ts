/**
 * UI transition tokens. CSS mirror: `src/app/globals.css` (`--duration-ui-*`, `--ease-ui`, `--reveal-offset`).
 * UI Kit catalog: `src/lib/ui-kit/variables.ts` → `globalTransitionVariables`.
 */
export const uiTransition = {
  durationMs: {
    fast: 100,
    medium: 200,
  },
  cssEase: "ease",
  motionEase: "easeInOut" as const,
  revealOffsetPx: 10,
  iconHitboxPx: 24,
} as const;

/** Panel width + height + corner radius — height must be a px value (not `auto`) to animate. */
export const panelSizeTransitionClass =
  "transition-[width,height,border-radius] duration-[var(--duration-ui)] ease-[var(--ease-ui)]";

export const motionTransition = {
  fast: {
    duration: uiTransition.durationMs.fast / 1000,
    ease: uiTransition.motionEase,
  },
  medium: {
    duration: uiTransition.durationMs.medium / 1000,
    ease: uiTransition.motionEase,
  },
} as const;

export type MotionTransitionSpeed = keyof typeof motionTransition;
