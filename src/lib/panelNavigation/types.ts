import type { MotionTransitionSpeed } from "@/lib/transitions";

/** Drill-down slide direction — forward exits +axis, back exits −axis. */
export type PanelNavigateDirection = "forward" | "back";

export type PanelNavigateAxis = "x" | "y";

export type PanelNavigateTransitionOptions = {
  axis: PanelNavigateAxis;
  direction: PanelNavigateDirection;
  speed: MotionTransitionSpeed;
};
