"use client";

import { ProminenceLayerContext } from "@/components/ProminenceAnchor/ProminenceLayerContext";
import { cn } from "@/lib/cn";
import { useState, type ReactNode } from "react";

const BACKGROUND_SRC = "/assets/background.png";

type GameScreenShellProps = {
  children?: ReactNode;
  className?: string;
  mapClassName?: string;
};

export function GameScreenShell({ children, className, mapClassName }: GameScreenShellProps) {
  const [prominenceLayer, setProminenceLayer] = useState<HTMLDivElement | null>(null);

  return (
    <ProminenceLayerContext.Provider value={prominenceLayer}>
      <div className={cn("relative isolate h-dvh w-full overflow-visible", className)}>
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={BACKGROUND_SRC}
            alt=""
            fetchPriority="high"
            decoding="async"
            draggable={false}
            className={cn(
              "absolute inset-0 h-full w-full object-cover object-center",
              mapClassName,
            )}
          />
        </div>
        {/* z-[1]: prominence backdrops — above map, below all UI */}
        <div
          ref={setProminenceLayer}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] overflow-visible"
        />
        {/* z-10: all interactive / visible UI */}
        <div className="absolute inset-0 z-10 overflow-visible">{children}</div>
      </div>
    </ProminenceLayerContext.Provider>
  );
}
