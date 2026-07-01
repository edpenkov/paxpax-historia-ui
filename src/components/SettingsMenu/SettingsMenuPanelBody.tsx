"use client";

import { SettingsMenuContent } from "@/components/SettingsMenu/SettingsMenuContent";
import { SettingsMenuSectionBody } from "@/components/SettingsMenu/SettingsMenuSectionBody";
import type {
  SettingsMenuNestedSection,
  SettingsMenuSection,
  SettingsMenuSubSection,
} from "@/components/SettingsMenu/settingsMenuSection";
import { getPanelNavigateTransition } from "@/lib/panelNavigation";
import type { PanelNavigateDirection } from "@/lib/panelNavigation";
import { cn } from "@/lib/cn";
import { AnimatePresence, motion } from "motion/react";

type SettingsMenuPanelBodyProps = {
  section: SettingsMenuSection;
  navDirection: PanelNavigateDirection;
  isMobileLayout: boolean;
  isViewportFill: boolean;
  onOpenSection: (section: SettingsMenuSubSection) => void;
  onOpenNested: (nested: SettingsMenuNestedSection) => void;
  className?: string;
};

export function SettingsMenuPanelBody({
  section,
  navDirection,
  isMobileLayout,
  isViewportFill,
  onOpenSection,
  onOpenNested,
  className,
}: SettingsMenuPanelBodyProps) {
  const isMain = section === "main";

  const pageTransition = getPanelNavigateTransition({
    axis: "x",
    direction: navDirection,
    speed: "fast",
  });

  const mainLeave = getPanelNavigateTransition({
    axis: "x",
    direction: "forward",
    speed: "fast",
  });

  return (
    <div
      className={cn(
        "overflow-hidden",
        isViewportFill && "min-h-0 flex-1 overflow-y-auto",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isMain ? (
          <motion.div
            key="main"
            initial={false}
            animate={{ opacity: 1 }}
            exit={mainLeave.exit}
            transition={mainLeave.transition}
          >
            <SettingsMenuContent onOpenSection={onOpenSection} />
          </motion.div>
        ) : (
          <motion.div key={section} {...pageTransition}>
            <SettingsMenuSectionBody
              section={section}
              isMobileLayout={isMobileLayout}
              onOpenNested={onOpenNested}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
