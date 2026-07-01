import type { PanelNavigateTransitionOptions } from "@/lib/panelNavigation/types";
import { motionTransition, uiTransition } from "@/lib/transitions";

/** Style: +axis forward enter, −axis forward exit; reversed for back. */
export function getPanelNavigateTransition({
  axis,
  direction,
  speed,
}: PanelNavigateTransitionOptions) {
  const offset = uiTransition.revealOffsetPx;
  const transition = motionTransition[speed];
  const isForward = direction === "forward";

  if (axis === "y") {
    return {
      initial: { opacity: 0, y: isForward ? -offset : offset },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: isForward ? offset : -offset },
      transition,
    } as const;
  }

  return {
    initial: { opacity: 0, x: isForward ? offset : -offset },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: isForward ? -offset : offset },
    transition,
  } as const;
}
