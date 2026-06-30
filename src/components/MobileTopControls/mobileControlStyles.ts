import { settingsTriggerHoverClass } from "@/components/SettingsMenu/settingsIconControlStyles";
import { surfacePanelBaseClass } from "@/lib/surface";
import { cn } from "@/lib/cn";

const mobileControlSurfaceBaseClass = cn(
  surfacePanelBaseClass,
  "group/control flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center",
  settingsTriggerHoverClass,
);

/** Left half of the mobile top bar — 8px radius on outer left only. */
export const mobileControlSurfaceLeftClass = cn(
  mobileControlSurfaceBaseClass,
  "rounded-l-[8px] rounded-r-none",
);

/** Right half of the mobile top bar — 8px radius on outer right only. */
export const mobileControlSurfaceRightClass = cn(
  mobileControlSurfaceBaseClass,
  "rounded-l-none rounded-r-[8px]",
);
