import { HamburgerIcon } from "@/components/DesktopHeader/HamburgerIcon";
import { ProminenceAnchor } from "@/components/ProminenceAnchor/ProminenceAnchor";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

const SHADOW = "drop-shadow-[0_0_4px_rgba(0,0,0,0.25)]";

/** Backdrop expand for header logo cluster — half of initial design spec. */
const HEADER_LOGO_EXPAND = {
  top: 62,
  right: 202,
  bottom: 62,
  left: 202,
} as const;

type DesktopHeaderProps = {
  children?: ReactNode;
  className?: string;
};

export function DesktopHeader({ children, className }: DesktopHeaderProps) {
  return (
    <header
      className={cn(
        "absolute top-0 left-0 z-10 hidden h-12 w-full border-b border-white/10 md:flex md:items-center",
        className,
      )}
    >
      <div className="pl-5">
        <ProminenceAnchor expand={HEADER_LOGO_EXPAND}>
          <div className="flex items-center gap-3">
            <HamburgerIcon />
            <span className={cn("text-base font-medium text-white", SHADOW)}>PaxHistoria</span>
          </div>
        </ProminenceAnchor>
      </div>
      {children}
    </header>
  );
}
