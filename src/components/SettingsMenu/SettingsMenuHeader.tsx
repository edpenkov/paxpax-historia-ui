"use client";

import { SettingsPanelIcon } from "@/components/SettingsMenu/SettingsPanelIcon";
import { DividerLine } from "@/components/DividerLine/DividerLine";
import { ICON_HITBOX_CLASS } from "@/lib/icon-hitbox";
import { useSettingsMenuRevealMotion } from "@/components/SettingsMenu/SettingsMenuRevealContext";
import {
  settingsIconControlHoverClass,
  settingsIconControlIconClass,
} from "@/components/SettingsMenu/settingsIconControlStyles";
import { cn } from "@/lib/cn";
import { motion } from "motion/react";
import type { ReactNode } from "react";

type SettingsMenuHeaderProps = {
  onClose: () => void;
  /** Placeholder — production: current game name from game state. */
  gameName?: string;
  /** Placeholder — production: e.g. `Playing as ${countryName}`. */
  playAs?: string;
  /** Overrides `gameName` / `playAs` for other menu states. */
  title?: ReactNode;
  className?: string;
};

export function SettingsMenuHeader({
  onClose,
  gameName = "World War II",
  playAs = "Playing as USA",
  title,
  className,
}: SettingsMenuHeaderProps) {
  const revealMotion = useSettingsMenuRevealMotion();

  return (
    <div className={cn("shrink-0", className)}>
      <header className="flex items-center gap-3.5 px-4 pt-4">
        <motion.div
          className="flex min-w-0 flex-1 items-baseline gap-3.5"
          {...revealMotion}
        >
          {title ?? (
            <>
              <span className="text-base text-text-primary">{gameName}</span>
              <span className="text-sm text-text-primary opacity-50">{playAs}</span>
            </>
          )}
        </motion.div>

        <motion.button
          type="button"
          onClick={onClose}
          aria-label="Close settings"
          className={cn(
            ICON_HITBOX_CLASS,
            "group/control rounded-[6px] text-icon-primary",
            settingsIconControlHoverClass,
          )}
          {...revealMotion}
        >
          <SettingsPanelIcon variant="close" className={settingsIconControlIconClass} />
        </motion.button>
      </header>

      <div className="pt-3">
        <DividerLine />
      </div>
    </div>
  );
}
