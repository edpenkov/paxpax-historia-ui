"use client";

import { SettingsMenuBreadcrumbs } from "@/components/SettingsMenu/SettingsMenuBreadcrumbs";
import { SettingsPanelIcon } from "@/components/SettingsMenu/SettingsPanelIcon";
import { DividerLine } from "@/components/DividerLine/DividerLine";
import type { SettingsMenuSection } from "@/components/SettingsMenu/settingsMenuSection";
import {
  settingsIconControlHoverClass,
  settingsIconControlIconClass,
} from "@/components/SettingsMenu/settingsIconControlStyles";
import { getMainMenuRevealMotion } from "@/components/SettingsMenu/settingsMenuReveal";
import { getPanelNavigateTransition } from "@/lib/panelNavigation";
import type { PanelNavigateDirection } from "@/lib/panelNavigation";
import { ICON_HITBOX_CLASS } from "@/lib/icon-hitbox";
import { cn } from "@/lib/cn";
import { AnimatePresence, motion } from "motion/react";

type SettingsMenuHeaderProps = {
  onClose: () => void;
  section: SettingsMenuSection;
  navDirection: PanelNavigateDirection;
  isMobileLayout: boolean;
  onNavigate: (section: SettingsMenuSection) => void;
  /** Placeholder — production: current game name from game state. */
  gameName?: string;
  /** Placeholder — production: e.g. `Playing as ${countryName}`. */
  playAs?: string;
  className?: string;
};

export function SettingsMenuHeader({
  onClose,
  section,
  navDirection,
  isMobileLayout,
  onNavigate,
  gameName = "World War II",
  playAs = "Playing as USA",
  className,
}: SettingsMenuHeaderProps) {
  const isMain = section === "main";

  const mainReveal = getMainMenuRevealMotion(isMobileLayout, navDirection);

  const mainLeave = getPanelNavigateTransition({
    axis: "x",
    direction: "forward",
    speed: "fast",
  });

  const subHeaderTransition = getPanelNavigateTransition({
    axis: "x",
    direction: navDirection,
    speed: "fast",
  });

  return (
    <div className={cn("shrink-0", className)}>
      <header className="flex items-center gap-3.5 px-4 pt-4">
        <div className="flex min-w-0 flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {isMain ? (
              <motion.div
                key="main-title"
                className="flex min-w-0 flex-1 items-baseline gap-3.5"
                initial={mainReveal.initial}
                animate={mainReveal.animate}
                exit={mainLeave.exit}
                transition={mainReveal.transition}
              >
                <span className="text-base text-text-primary">{gameName}</span>
                <span className="text-sm text-text-primary opacity-50">{playAs}</span>
              </motion.div>
            ) : (
              <motion.div
                key={section}
                className="flex min-w-0 flex-1 items-center"
                {...subHeaderTransition}
              >
                <SettingsMenuBreadcrumbs section={section} onNavigate={onNavigate} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close settings"
          className={cn(
            ICON_HITBOX_CLASS,
            "group/control shrink-0 rounded-[6px] text-icon-primary",
            settingsIconControlHoverClass,
          )}
        >
          <SettingsPanelIcon variant="close" className={settingsIconControlIconClass} />
        </button>
      </header>

      <div className="pt-3">
        <DividerLine />
      </div>
    </div>
  );
}
