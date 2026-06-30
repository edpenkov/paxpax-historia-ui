"use client";

import { createContext, useContext } from "react";

export const ProminenceLayerContext = createContext<HTMLDivElement | null>(null);

export function useProminenceLayer() {
  return useContext(ProminenceLayerContext);
}
