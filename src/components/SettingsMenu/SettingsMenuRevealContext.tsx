"use client";

import {
  getSettingsMenuReveal,
  getSettingsMenuRevealMotion,
  type SettingsMenuRevealAxis,
} from "@/components/SettingsMenu/settingsMenuReveal";
import { createContext, useContext, type ReactNode } from "react";

const SettingsMenuRevealContext = createContext<SettingsMenuRevealAxis>("x");

type SettingsMenuRevealProviderProps = {
  axis?: SettingsMenuRevealAxis;
  children: ReactNode;
};

export function SettingsMenuRevealProvider({
  axis = "x",
  children,
}: SettingsMenuRevealProviderProps) {
  return (
    <SettingsMenuRevealContext.Provider value={axis}>{children}</SettingsMenuRevealContext.Provider>
  );
}

export function useSettingsMenuRevealAxis() {
  return useContext(SettingsMenuRevealContext);
}

export function useSettingsMenuReveal() {
  return getSettingsMenuReveal(useSettingsMenuRevealAxis());
}

export function useSettingsMenuRevealMotion() {
  return getSettingsMenuRevealMotion(useSettingsMenuRevealAxis());
}
