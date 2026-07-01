import type { PanelNavigateDirection } from "@/lib/panelNavigation/types";
import { motionTransition, uiTransition } from "@/lib/transitions";

export type SettingsMenuRevealAxis = "x" | "y";

/** Main menu reveal (step 1) — mobile Y, desktop X. */
export function getMainMenuRevealMotion(
  isMobile: boolean,
  direction: PanelNavigateDirection,
) {
  return getRevealMotion(isMobile ? "y" : "x", direction);
}

/** Breadcrumbs + step 2+ header chrome — always X (mobile and desktop). */
export function getSubPageRevealMotion(direction: PanelNavigateDirection) {
  return getRevealMotion("x", direction);
}

function getRevealMotion(axis: SettingsMenuRevealAxis, direction: PanelNavigateDirection) {
  const offset = uiTransition.revealOffsetPx;
  const transition = motionTransition.medium;
  const isForward = direction === "forward";

  if (axis === "y") {
    return {
      initial: { opacity: 0, y: isForward ? -offset : offset },
      animate: { opacity: 1, y: 0 },
      transition,
    } as const;
  }

  return {
    initial: { opacity: 0, x: isForward ? -offset : offset },
    animate: { opacity: 1, x: 0 },
    transition,
  } as const;
}

/** @deprecated Use getMainMenuRevealMotion — kept for UI Kit static docs. */
export function getSettingsMenuRevealMotion(
  axis: SettingsMenuRevealAxis = "x",
  direction: PanelNavigateDirection = "forward",
) {
  return getMainMenuRevealMotion(axis === "y", direction);
}
