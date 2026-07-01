"use client";

import { DividerLine } from "@/components/DividerLine/DividerLine";
import { MobileTopBarButton } from "@/components/MobileTopControls/MobileTopBarButton";
import { SettingsMenuPanelContent } from "@/components/SettingsMenu/SettingsMenuPanelContent";
import { useSettingsMenuPanel } from "@/components/SettingsMenu/useSettingsMenuPanel";
import { surfacePanelBaseClass } from "@/lib/surface";
import { panelSizeTransitionClass } from "@/lib/transitions";
import { cn } from "@/lib/cn";
import type { CSSProperties } from "react";

type MobileTopControlsProps = {
  className?: string;
  style?: CSSProperties;
  /** Placeholder — production: current game name from game state. */
  gameName?: string;
  /** Placeholder — production: e.g. `Playing as ${countryName}`. */
  playAs?: string;
  /** UI Kit / inspection — start with settings panel open. */
  defaultOpen?: boolean;
};

export function MobileTopControls({
  className,
  style,
  gameName,
  playAs,
  defaultOpen = false,
}: MobileTopControlsProps) {
  const { contentRef, showPanel, isOpen, animatedHeight, toggle, close } =
    useSettingsMenuPanel(defaultOpen, "mobile");

  return (
    <div className={cn("w-[calc(100vw-8px)]", className)} style={style}>
      <div className="flex h-11 w-fit items-stretch">
        <MobileTopBarButton position="left" />
        <DividerLine variant="bridge" />
        <MobileTopBarButton position="right" isOpen={isOpen} onClick={toggle} />
      </div>

      {showPanel ? (
        <div
          role={isOpen ? "dialog" : undefined}
          aria-label={isOpen ? "Settings" : undefined}
          className={cn(
            surfacePanelBaseClass,
            "mt-1 overflow-hidden rounded-[12px]",
            panelSizeTransitionClass,
          )}
          style={{ height: animatedHeight }}
        >
          <SettingsMenuPanelContent
            contentRef={contentRef}
            gameName={gameName}
            playAs={playAs}
            onClose={close}
            isVisible={isOpen}
            fullWidth
            revealAxis="y"
            className="w-full"
          />
        </div>
      ) : null}
    </div>
  );
}
