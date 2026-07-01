import type { PanelNavigateTransitionOptions } from "@/lib/panelNavigation/types";
import { motionTransition, uiTransition } from "@/lib/transitions";

/** Style: forward enter +X (left→right), forward exit +X (off right). Back — reversed. */
export function getPanelNavigateTransition({
  axis,
  direction,
  speed,
  fade = true,
}: PanelNavigateTransitionOptions) {
  const offset = uiTransition.revealOffsetPx;
  const transition = motionTransition[speed];
  const isForward = direction === "forward";
  const hidden = fade ? { opacity: 0 } : { opacity: 1 };
  const visible = { opacity: 1 };

  if (axis === "y") {
    return {
      initial: { ...hidden, y: isForward ? -offset : offset },
      animate: { ...visible, y: 0 },
      exit: { ...hidden, y: isForward ? offset : -offset },
      transition,
    } as const;
  }

  return {
    initial: { ...hidden, x: isForward ? -offset : offset },
    animate: { ...visible, x: 0 },
    exit: { ...hidden, x: isForward ? offset : -offset },
    transition,
  } as const;
}
