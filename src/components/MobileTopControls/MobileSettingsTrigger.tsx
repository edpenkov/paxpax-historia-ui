"use client";

import { mobileControlSurfaceRightClass } from "@/components/MobileTopControls/mobileControlStyles";
import { SettingsGearIcon } from "@/components/SettingsMenu/SettingsGearIcon";
import { cn } from "@/lib/cn";

type MobileSettingsTriggerProps = {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
};

export function MobileSettingsTrigger({
  isOpen,
  onClick,
  className,
}: MobileSettingsTriggerProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(mobileControlSurfaceRightClass, className)}
      aria-label="Settings"
      aria-expanded={isOpen}
      aria-haspopup="dialog"
    >
      <SettingsGearIcon />
    </button>
  );
}
