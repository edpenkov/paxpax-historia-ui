import { motionTransition, uiTransition } from "@/lib/transitions";

const offset = uiTransition.revealOffsetPx;

/** Desktop accordion expand/collapse — height + vertical slide (medium). */
export const settingsMenuAccordionTransition = {
  initial: { height: 0, opacity: 0, y: -offset },
  animate: { height: "auto", opacity: 1, y: 0 },
  exit: { height: 0, opacity: 0, y: -offset },
  transition: motionTransition.medium,
} as const;
