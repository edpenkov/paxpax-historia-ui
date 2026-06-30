import { motionRevealTransition, uiTransition } from "@/lib/transitions";

export type SettingsMenuRevealAxis = "x" | "y";

export const settingsMenuReveal = {
  initial: { opacity: 0, x: -uiTransition.revealOffsetPx },
  animate: { opacity: 1, x: 0 },
  transition: motionRevealTransition,
} as const;

export const settingsMenuRevealY = {
  initial: { opacity: 0, y: -uiTransition.revealOffsetPx },
  animate: { opacity: 1, y: 0 },
  transition: motionRevealTransition,
} as const;

export function getSettingsMenuReveal(axis: SettingsMenuRevealAxis = "x") {
  return axis === "y" ? settingsMenuRevealY : settingsMenuReveal;
}

export function getSettingsMenuRevealMotion(axis: SettingsMenuRevealAxis = "x") {
  const offset = uiTransition.revealOffsetPx;

  if (axis === "y") {
    return {
      initial: { opacity: 0, y: -offset },
      animate: { opacity: 1, y: 0 },
      transition: motionRevealTransition,
    };
  }

  return {
    initial: { opacity: 0, x: -offset },
    animate: { opacity: 1, x: 0 },
    transition: motionRevealTransition,
  };
}
