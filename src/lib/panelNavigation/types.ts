import type { MotionTransitionSpeed } from "@/lib/transitions";

/** Drill-down slide direction — forward exits +axis, back exits −axis. */
export type PanelNavigateDirection = "forward" | "back";

export type PanelNavigateAxis = "x" | "y";

export type PanelNavigateTransitionOptions = {
  axis: PanelNavigateAxis;
  direction: PanelNavigateDirection;
  speed: MotionTransitionSpeed;
  /** Body pages fade+slide; header breadcrumbs slide only (avoids blink). Default true. */
  fade?: boolean;
};
