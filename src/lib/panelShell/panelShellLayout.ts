import type { PanelShellLayout } from "@/lib/panelShell/types";

/** Matches `SettingsMenu` placement on the game screen (`top-[68px]`, `left-[14px]`). */
export const DESKTOP_PANEL_VIEWPORT_INSET = { top: 68, bottom: 14 } as const;

/** Mobile controls row + gap above the panel (`top-1`, `h-11`, `mt-1`). */
export const MOBILE_PANEL_VIEWPORT_INSET = { top: 56, bottom: 4 } as const;

export function getViewportPanelHeightPx(layout: PanelShellLayout): number {
  if (typeof window === "undefined") return 0;

  const inset =
    layout === "desktop" ? DESKTOP_PANEL_VIEWPORT_INSET : MOBILE_PANEL_VIEWPORT_INSET;

  return window.innerHeight - inset.top - inset.bottom;
}

export function getDefaultCollapsedHeight(layout: PanelShellLayout): number {
  return layout === "desktop" ? 34 : 0;
}
