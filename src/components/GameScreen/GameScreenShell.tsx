"use client";

import { ProminenceLayerContext } from "@/components/ProminenceAnchor/ProminenceLayerContext";
import { useState, type ReactNode } from "react";

const BACKGROUND_SRC = "/assets/background.png";

type GameScreenShellProps = {
  children?: ReactNode;
};

export function GameScreenShell({ children }: GameScreenShellProps) {
  const [prominenceLayer, setProminenceLayer] = useState<HTMLDivElement | null>(null);

  return (
    <ProminenceLayerContext.Provider value={prominenceLayer}>
      <div className="relative isolate h-dvh w-full overflow-visible">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={BACKGROUND_SRC}
            alt=""
            fetchPriority="high"
            decoding="async"
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover object-center"
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
