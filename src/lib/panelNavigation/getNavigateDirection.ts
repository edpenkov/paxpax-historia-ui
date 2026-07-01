import type { PanelNavigateDirection } from "@/lib/panelNavigation/types";

export function getNavigateDirection(
  fromDepth: number,
  toDepth: number,
): PanelNavigateDirection {
  return toDepth >= fromDepth ? "forward" : "back";
}
