"use client";

import { getPanelNavigateTransition } from "@/lib/panelNavigation/panelNavigateTransition";
import type { PanelNavigateAxis, PanelNavigateDirection } from "@/lib/panelNavigation/types";
import type { MotionTransitionSpeed } from "@/lib/transitions";
import { cn } from "@/lib/cn";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";

type PanelNavigateViewProps = {
  routeKey: string;
  direction: PanelNavigateDirection;
  axis: PanelNavigateAxis;
  speed: MotionTransitionSpeed;
  children: ReactNode;
  className?: string;
};

/** Style wrapper — swaps children with forward/back slide. Does not affect shell size. */
export function PanelNavigateView({
  routeKey,
  direction,
  axis,
  speed,
  children,
  className,
}: PanelNavigateViewProps) {
  const transition = getPanelNavigateTransition({ axis, direction, speed });

  return (
    <div className={cn("overflow-hidden", className)}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={routeKey} {...transition}>
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
