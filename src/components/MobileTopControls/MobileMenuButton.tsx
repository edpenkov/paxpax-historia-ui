"use client";

import { HamburgerIcon } from "@/components/DesktopHeader/HamburgerIcon";
import { mobileControlSurfaceLeftClass } from "@/components/MobileTopControls/mobileControlStyles";
import { cn } from "@/lib/cn";

type MobileMenuButtonProps = {
  className?: string;
  onClick?: () => void;
};

export function MobileMenuButton({ className, onClick }: MobileMenuButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(mobileControlSurfaceLeftClass, className)}
      aria-label="Menu"
    >
      <HamburgerIcon variant="control" className="drop-shadow-none" />
    </button>
  );
}
