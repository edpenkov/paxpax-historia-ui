"use client";

import { SettingsGearIcon } from "@/components/SettingsMenu/SettingsGearIcon";
import { SettingsMenuHeader } from "@/components/SettingsMenu/SettingsMenuHeader";
import { SettingsMenuContent } from "@/components/SettingsMenu/SettingsMenuContent";
import { surfacePanelClass } from "@/lib/surface";
import { ICON_HITBOX_CLASS } from "@/lib/icon-hitbox";
import { panelSizeTransitionClass, uiTransition } from "@/lib/transitions";
import { cn } from "@/lib/cn";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

const PANEL_WIDTH_PX = 420;
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

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

export function SettingsMenu({
  className,
  style,
  gameName,
  playAs,
  defaultOpen = false,
}: SettingsMenuProps) {
  const isDesktop = useIsDesktop();
  const contentRef = useRef<HTMLDivElement>(null);
  const [showPanel, setShowPanel] = useState(defaultOpen);
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [animatedHeight, setAnimatedHeight] = useState(TRIGGER_SIZE_PX);

  const measurePanelHeight = useCallback(() => {
    const content = contentRef.current;
    if (!content) return TRIGGER_SIZE_PX;
    // offsetHeight at fixed inner width — scrollHeight can over-measure; width must not follow outer clip.
    return content.offsetHeight;
  }, []);

  useLayoutEffect(() => {
    if (!showPanel || !isOpen) return;

    // Wait one frame so height stays at TRIGGER_SIZE_PX before expanding (CSS can't animate `auto`).
    const frame = requestAnimationFrame(() => {
      setAnimatedHeight(measurePanelHeight());
    });

    return () => cancelAnimationFrame(frame);
  }, [showPanel, isOpen, gameName, playAs, measurePanelHeight]);

  useEffect(() => {
    if (!isDesktop && isOpen) {
      setIsOpen(false);
      setAnimatedHeight(TRIGGER_SIZE_PX);
      setShowPanel(false);
    }
  }, [isDesktop, isOpen]);

  const open = useCallback(() => {
    if (!isDesktop) return;
    setShowPanel(true);
    setAnimatedHeight(TRIGGER_SIZE_PX);
    setIsOpen(true);
  }, [isDesktop]);

  const close = useCallback(() => {
    setAnimatedHeight(TRIGGER_SIZE_PX);
    setIsOpen(false);
    window.setTimeout(() => setShowPanel(false), uiTransition.durationMs);
  }, []);

  const panelWidth = isOpen ? PANEL_WIDTH_PX : TRIGGER_SIZE_PX;

  return (
    <div className={cn("relative w-fit", className)} style={style}>
      <div
        role={isOpen ? "dialog" : undefined}
        aria-label={isOpen ? "Settings" : undefined}
        className={cn(surfacePanelClass, panelSizeTransitionClass, "overflow-hidden")}
        style={{
          width: panelWidth,
          height: showPanel ? animatedHeight : TRIGGER_SIZE_PX,
        }}
      >
        {showPanel ? (
          <div
            ref={contentRef}
            className={cn(
              "flex shrink-0 flex-col",
              !isOpen && "invisible",
            )}
            style={{ width: PANEL_WIDTH_PX }}
            aria-hidden={!isOpen}
          >
            <SettingsMenuHeader
              gameName={gameName}
              playAs={playAs}
              onClose={close}
            />
            <SettingsMenuContent />
          </div>
        ) : (
          <button
            type="button"
            onClick={open}
            className={cn(
              ICON_HITBOX_CLASS,
              "h-[34px] w-[34px] cursor-pointer",
            )}
            aria-label="Settings"
            aria-expanded={false}
            aria-haspopup="dialog"
          >
            <SettingsGearIcon />
          </button>
        )}
      </div>
    </div>
  );
}
