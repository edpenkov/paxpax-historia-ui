"use client";

import { SettingsGearIcon } from "@/components/SettingsMenu/SettingsGearIcon";
import { surfacePanelClass } from "@/lib/surface";
import { cn } from "@/lib/cn";
import type { CSSProperties } from "react";

type SettingsMenuProps = {
  className?: string;
  style?: CSSProperties;
};

/**
 * Settings entry point. Trigger is a 34×34 surface; this root will expand into
 * a larger panel with menu content (next iteration).
 */
export function SettingsMenu({ className, style }: SettingsMenuProps) {
  return (
    <div className={cn("relative w-fit", className)} style={style}>
      <button
        type="button"
        className={cn(
          surfacePanelClass,
          "flex h-[34px] w-[34px] items-center justify-center",
        )}
        aria-label="Settings"
        aria-expanded={false}
        aria-haspopup="dialog"
      >
        <SettingsGearIcon />
      </button>
    </div>
  );
}
