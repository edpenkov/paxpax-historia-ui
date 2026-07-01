"use client";

import type { SettingsMenuSection } from "@/components/SettingsMenu/settingsMenuSection";
import { useAnimatedPanelShell } from "@/lib/panelShell";
import type { PanelShellHeightMode, PanelShellLayout } from "@/lib/panelShell";

export type SettingsMenuLayout = PanelShellLayout;
export type SettingsMenuPanelHeightMode = PanelShellHeightMode;

/** Settings panel shell — wraps generic `useAnimatedPanelShell`. */
export function useSettingsMenuPanel(
  defaultOpen = false,
  layout: SettingsMenuLayout = "desktop",
  heightMode: SettingsMenuPanelHeightMode = "content",
  section: SettingsMenuSection = "main",
) {
  return useAnimatedPanelShell({
    defaultOpen,
    layout,
    heightMode,
    rootRoute: "main",
    currentRoute: section,
  });
}

export const SETTINGS_MENU_PANEL_WIDTH_PX = 420;
