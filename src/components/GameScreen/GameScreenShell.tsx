"use client";

import {
  ProminenceLayerContext,
  type ProminenceLayerValue,
} from "@/components/ProminenceAnchor/ProminenceLayerContext";
import { cn } from "@/lib/cn";
import { useMemo, useState, type ReactNode } from "react";

const BACKGROUND_SRC = "/assets/background.png";

type GameScreenShellProps = {
  children?: ReactNode;
  className?: string;
  mapClassName?: string;
  /**
   * Keep prominence backdrops inside this shell (UI Kit previews).
   * Default `false` uses a fixed viewport layer for the full game screen.
   */
  containProminence?: boolean;
};

export function GameScreenShell({
  children,
  className,
  mapClassName,
  containProminence = false,
}: GameScreenShellProps) {
  const [prominenceLayer, setProminenceLayer] = useState<HTMLDivElement | null>(null);

  const prominenceContext = useMemo<ProminenceLayerValue>(
    () => ({
      layer: prominenceLayer,
      coordinates: containProminence ? "layer" : "viewport",
    }),
    [prominenceLayer, containProminence],
  );

  return (
    <ProminenceLayerContext.Provider value={prominenceContext}>
      <div className={cn("relative h-dvh w-full overflow-visible", className)}>
        <div className="absolute inset-0 z-0 overflow-hidden">
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
        <div
          ref={setProminenceLayer}
          aria-hidden
          className={cn(
            "pointer-events-none z-[1] overflow-visible",
            containProminence ? "absolute inset-0" : "fixed inset-0",
          )}
        />
        <div className="absolute inset-0 z-10 isolate overflow-visible">{children}</div>
      </div>
    </ProminenceLayerContext.Provider>
  );
}
