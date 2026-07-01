"use client";

import { SettingsMenuHeader } from "@/components/SettingsMenu/SettingsMenuHeader";
import { SettingsMenuPanelBody } from "@/components/SettingsMenu/SettingsMenuPanelBody";
import { SettingsMenuRevealProvider } from "@/components/SettingsMenu/SettingsMenuRevealContext";
import {
  getPageNavTransitionAxis,
  isSubSection,
  nestedSectionPath,
  type SettingsMenuNestedSection,
  type SettingsMenuSection,
  type SettingsMenuSubSection,
} from "@/components/SettingsMenu/settingsMenuSection";
import { usePanelNavigation } from "@/lib/panelNavigation";
import { SETTINGS_MENU_PANEL_WIDTH_PX } from "@/components/SettingsMenu/useSettingsMenuPanel";
import { cn } from "@/lib/cn";
import { type RefObject, useCallback, useEffect } from "react";

type SettingsMenuPanelContentProps = {
  contentRef: RefObject<HTMLDivElement | null>;
  gameName?: string;
  playAs?: string;
  onClose: () => void;
  isVisible: boolean;
  fullWidth?: boolean;
  onSectionChange?: (section: SettingsMenuSection) => void;
  className?: string;
};

export function SettingsMenuPanelContent({
  contentRef,
  gameName,
  playAs,
  onClose,
  isVisible,
  fullWidth = false,
  onSectionChange,
  className,
}: SettingsMenuPanelContentProps) {
  const isMobileLayout = fullWidth;

  const { route: section, direction, navigate, reset, isRoot } = usePanelNavigation<
    SettingsMenuSection,
    { isMobileLayout: boolean }
  >({
    root: "main",
    getDepth: (route) => {
      if (route === "main") return 0;
      if (route.includes("/")) return 2;
      return 1;
    },
    resolveAxis: (from, to, ctx) => getPageNavTransitionAxis(from, to, ctx.isMobileLayout),
    context: { isMobileLayout },
    onRouteChange: onSectionChange,
  });

  useEffect(() => {
    if (!isVisible) reset();
  }, [isVisible, reset]);

  const openSection = useCallback(
    (next: SettingsMenuSubSection) => {
      navigate(next);
    },
    [navigate],
  );

  const openNested = useCallback(
    (nested: SettingsMenuNestedSection) => {
      if (!isSubSection(section)) return;
      navigate(nestedSectionPath(section, nested));
    },
    [section, navigate],
  );

  return (
    <SettingsMenuRevealProvider isMobile={isMobileLayout} direction={direction}>
      <div
        ref={contentRef}
        className={cn(
          "flex flex-col",
          !isRoot ? "h-full min-h-0" : "shrink-0",
          !isVisible && "invisible",
          className,
        )}
        style={fullWidth ? undefined : { width: SETTINGS_MENU_PANEL_WIDTH_PX }}
        aria-hidden={!isVisible}
      >
        <SettingsMenuHeader
          section={section}
          navDirection={direction}
          isMobileLayout={isMobileLayout}
          onNavigate={navigate}
          gameName={gameName}
          playAs={playAs}
          onClose={onClose}
        />
        <SettingsMenuPanelBody
          section={section}
          navDirection={direction}
          isMobileLayout={isMobileLayout}
          isViewportFill={!isRoot}
          onOpenSection={openSection}
          onOpenNested={openNested}
        />
      </div>
    </SettingsMenuRevealProvider>
  );
}
