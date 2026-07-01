"use client";

import { HamburgerIcon } from "@/components/DesktopHeader/HamburgerIcon";
import {
  mobileControlSurfaceLeftClass,
  mobileControlSurfaceRightClass,
} from "@/components/MobileTopControls/mobileControlStyles";
import { SettingsPanelIcon } from "@/components/SettingsMenu/SettingsPanelIcon";
import { cn } from "@/lib/cn";

type MobileTopBarButtonProps = {
  /** Left: menu (hamburger). Right: settings (gear). */
  position: "left" | "right";
  className?: string;
  onClick?: () => void;
  /** Right button only — reflects open settings panel state. */
  isOpen?: boolean;
};

export function MobileTopBarButton({
  position,
  className,
  onClick,
  isOpen = false,
}: MobileTopBarButtonProps) {
  const surfaceClass =
    position === "left" ? mobileControlSurfaceLeftClass : mobileControlSurfaceRightClass;

  if (position === "left") {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(surfaceClass, className)}
        aria-label="Menu"
      >
        <HamburgerIcon variant="control" className="drop-shadow-none" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(surfaceClass, className)}
      aria-label="Settings"
      aria-expanded={isOpen}
      aria-haspopup="dialog"
    >
      <SettingsPanelIcon variant="gear" />
    </button>
  );
}
