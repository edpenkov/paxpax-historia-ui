"use client";

import { createContext, useContext } from "react";

export type ProminenceCoordinates = "viewport" | "layer";

export type ProminenceLayerValue = {
  layer: HTMLDivElement | null;
  /** `viewport` = fixed layer (game screen); `layer` = absolute within shell (UI Kit previews). */
  coordinates: ProminenceCoordinates;
};

const defaultValue: ProminenceLayerValue = {
  layer: null,
  coordinates: "viewport",
};

export const ProminenceLayerContext = createContext<ProminenceLayerValue>(defaultValue);

export function useProminenceLayer() {
  return useContext(ProminenceLayerContext);
}
