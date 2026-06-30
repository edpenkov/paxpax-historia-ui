"use client";

import { SettingsMenuContent } from "@/components/SettingsMenu/SettingsMenuContent";
import { SettingsMenuHeader } from "@/components/SettingsMenu/SettingsMenuHeader";
import { SettingsMenuRevealProvider } from "@/components/SettingsMenu/SettingsMenuRevealContext";
import type { SettingsMenuRevealAxis } from "@/components/SettingsMenu/settingsMenuReveal";
import { SETTINGS_MENU_PANEL_WIDTH_PX } from "@/components/SettingsMenu/useSettingsMenuPanel";
import { cn } from "@/lib/cn";
import type { RefObject } from "react";

type SettingsMenuPanelContentProps = {
  contentRef: RefObject<HTMLDivElement | null>;
  gameName?: string;
  playAs?: string;
  onClose: () => void;
  isVisible: boolean;
  fullWidth?: boolean;
  /** Mobile panel opens downward — use vertical reveal. Desktop defaults to horizontal. */
  revealAxis?: SettingsMenuRevealAxis;
  className?: string;
};

export function SettingsMenuPanelContent({
  contentRef,
  gameName,
  playAs,
  onClose,
  isVisible,
  fullWidth = false,
  revealAxis = "x",
  className,
}: SettingsMenuPanelContentProps) {
  return (
    <SettingsMenuRevealProvider axis={revealAxis}>
      <div
        ref={contentRef}
        className={cn("flex shrink-0 flex-col", !isVisible && "invisible", className)}
        style={fullWidth ? undefined : { width: SETTINGS_MENU_PANEL_WIDTH_PX }}
        aria-hidden={!isVisible}
      >
        <SettingsMenuHeader gameName={gameName} playAs={playAs} onClose={onClose} />
        <SettingsMenuContent />
      </div>
    </SettingsMenuRevealProvider>
  );
}
