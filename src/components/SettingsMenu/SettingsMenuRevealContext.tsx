"use client";

import { getMainMenuRevealMotion } from "@/components/SettingsMenu/settingsMenuReveal";
import type { PanelNavigateDirection } from "@/lib/panelNavigation/types";
import { createContext, useContext, type ReactNode } from "react";

type SettingsMenuRevealContextValue = {
  isMobile: boolean;
  direction: PanelNavigateDirection;
};

const SettingsMenuRevealContext = createContext<SettingsMenuRevealContextValue>({
  isMobile: false,
  direction: "forward",
});

type SettingsMenuRevealProviderProps = {
  isMobile: boolean;
  direction: PanelNavigateDirection;
  children: ReactNode;
};

export function SettingsMenuRevealProvider({
  isMobile,
  direction,
  children,
}: SettingsMenuRevealProviderProps) {
  return (
    <SettingsMenuRevealContext.Provider value={{ isMobile, direction }}>
      {children}
    </SettingsMenuRevealContext.Provider>
  );
}

export function useSettingsMenuReveal() {
  const { isMobile, direction } = useContext(SettingsMenuRevealContext);
  return getMainMenuRevealMotion(isMobile, direction);
}

export function useSettingsMenuRevealDirection() {
  return useContext(SettingsMenuRevealContext).direction;
}
