import { motionRevealTransition, uiTransition } from "@/lib/transitions";

export const settingsMenuReveal = {
  initial: { opacity: 0, x: -uiTransition.revealOffsetPx },
  animate: { opacity: 1, x: 0 },
  transition: motionRevealTransition,
} as const;
