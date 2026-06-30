"use client";

import { uiTransition } from "@/lib/transitions";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

export type SettingsMenuLayout = "desktop" | "mobile";

const DESKTOP_TRIGGER_PX = 34;

export function useSettingsMenuPanel(
  defaultOpen = false,
  layout: SettingsMenuLayout = "desktop",
) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [showPanel, setShowPanel] = useState(defaultOpen);
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const collapsedHeight = layout === "desktop" ? DESKTOP_TRIGGER_PX : 0;
  const [animatedHeight, setAnimatedHeight] = useState(collapsedHeight);

  const measurePanelHeight = useCallback(() => {
    const content = contentRef.current;
    if (!content) return collapsedHeight;
    return content.offsetHeight;
  }, [collapsedHeight]);

  useLayoutEffect(() => {
    if (!showPanel || !isOpen) return;

    const frame = requestAnimationFrame(() => {
      setAnimatedHeight(measurePanelHeight());
    });

    return () => cancelAnimationFrame(frame);
  }, [showPanel, isOpen, measurePanelHeight]);

  const open = useCallback(() => {
    setShowPanel(true);
    setAnimatedHeight(collapsedHeight);
    setIsOpen(true);
  }, [collapsedHeight]);

  const close = useCallback(() => {
    setAnimatedHeight(collapsedHeight);
    setIsOpen(false);
    window.setTimeout(() => setShowPanel(false), uiTransition.durationMs);
  }, [collapsedHeight]);

  const toggle = useCallback(() => {
    if (isOpen) close();
    else open();
  }, [isOpen, open, close]);

  return {
    contentRef,
    showPanel,
    isOpen,
    animatedHeight,
    open,
    close,
    toggle,
  };
}

export const SETTINGS_MENU_PANEL_WIDTH_PX = 420;
