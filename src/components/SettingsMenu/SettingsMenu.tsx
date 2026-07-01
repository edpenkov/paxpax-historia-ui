"use client";

import { SettingsPanelIcon } from "@/components/SettingsMenu/SettingsPanelIcon";
import { SettingsMenuPanelContent } from "@/components/SettingsMenu/SettingsMenuPanelContent";
import { settingsTriggerHoverClass } from "@/components/SettingsMenu/settingsIconControlStyles";
import type { SettingsMenuSection } from "@/components/SettingsMenu/settingsMenuSection";
import {
  SETTINGS_MENU_PANEL_WIDTH_PX,
  useSettingsMenuPanel,
  type SettingsMenuPanelHeightMode,
} from "@/components/SettingsMenu/useSettingsMenuPanel";
import { surfacePanelBaseClass } from "@/lib/surface";
import { ICON_HITBOX_CLASS } from "@/lib/icon-hitbox";
import { panelSizeTransitionClass } from "@/lib/transitions";
import { cn } from "@/lib/cn";
import { useCallback, useEffect, useState, type CSSProperties } from "react";

const TRIGGER_SIZE_PX = 34;

type SettingsMenuProps = {
  className?: string;
  style?: CSSProperties;
  /** Placeholder — production: current game name from game state. */
  gameName?: string;
  /** Placeholder — production: e.g. `Playing as ${countryName}`. */
  playAs?: string;
  /** UI Kit / inspection — start expanded. */
  defaultOpen?: boolean;
};

export function SettingsMenu({
  className,
  style,
  gameName,
  playAs,
  defaultOpen = false,
}: SettingsMenuProps) {
  const [heightMode, setHeightMode] = useState<SettingsMenuPanelHeightMode>("content");
  const [section, setSection] = useState<SettingsMenuSection>("main");

  const handleSectionChange = useCallback((next: SettingsMenuSection) => {
    setSection(next);
    setHeightMode(next === "main" ? "content" : "viewport");
  }, []);

  const { contentRef, showPanel, isOpen, animatedHeight, open, close } = useSettingsMenuPanel(
    defaultOpen,
    "desktop",
    heightMode,
    section,
  );

  useEffect(() => {
    if (!isOpen) {
      setHeightMode("content");
      setSection("main");
    }
  }, [isOpen]);

  const panelWidth = isOpen ? SETTINGS_MENU_PANEL_WIDTH_PX : TRIGGER_SIZE_PX;

  return (
    <div className={cn("relative w-fit", className)} style={style}>
      <div
        role={isOpen ? "dialog" : undefined}
        aria-label={isOpen ? "Settings" : undefined}
        className={cn(
          surfacePanelBaseClass,
          isOpen ? "rounded-[12px]" : "rounded-[6px]",
          panelSizeTransitionClass,
          "overflow-hidden",
          !showPanel && "group/control",
          !showPanel && settingsTriggerHoverClass,
        )}
        style={{
          width: panelWidth,
          height: showPanel ? animatedHeight : TRIGGER_SIZE_PX,
        }}
      >
        {showPanel ? (
          <SettingsMenuPanelContent
            contentRef={contentRef}
            gameName={gameName}
            playAs={playAs}
            onClose={close}
            isVisible={isOpen}
            onSectionChange={handleSectionChange}
          />
        ) : (
          <button
            type="button"
            onClick={open}
            className={cn(ICON_HITBOX_CLASS, "h-[34px] w-[34px] cursor-pointer")}
            aria-label="Settings"
            aria-expanded={false}
            aria-haspopup="dialog"
          >
            <SettingsPanelIcon variant="gear" />
          </button>
        )}
      </div>
    </div>
  );
}
