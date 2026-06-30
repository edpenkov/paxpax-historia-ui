"use client";

import { ProminenceBackdropPlaced } from "@/components/ProminenceAnchor/ProminenceBackdropPlaced";
import { useProminenceLayer } from "@/components/ProminenceAnchor/ProminenceLayerContext";
import type { ProminenceExpand } from "@/components/ProminenceAnchor/types";
import { cn } from "@/lib/cn";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

type ProminenceAnchorProps = {
  children: ReactNode;
  /** How far the backdrop extends beyond the anchored UI on each side (px). */
  expand: ProminenceExpand;
  className?: string;
};

/**
 * Wraps UI that should read prominently over the map. Backdrop is portaled into
 * the z-[1] prominence layer (above map, below all other UI).
 */
export function ProminenceAnchor({ children, expand, className }: ProminenceAnchorProps) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const prominenceLayer = useProminenceLayer();
  const [backdropRect, setBackdropRect] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);

  useLayoutEffect(() => {
    const anchor = anchorRef.current;
    if (!anchor || !prominenceLayer) return;

    const update = () => {
      const layer = prominenceLayer;
      const anchorBox = anchor.getBoundingClientRect();
      const layerBox = layer.getBoundingClientRect();

      setBackdropRect({
        top: anchorBox.top - layerBox.top - expand.top,
        left: anchorBox.left - layerBox.left - expand.left,
        width: anchorBox.width + expand.left + expand.right,
        height: anchorBox.height + expand.top + expand.bottom,
      });
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(anchor);
    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [prominenceLayer, expand.top, expand.right, expand.bottom, expand.left]);

  return (
    <>
      <div ref={anchorRef} className={cn("relative w-fit", className)}>
        {children}
      </div>
      {prominenceLayer &&
        backdropRect &&
        createPortal(
          <ProminenceBackdropPlaced rect={backdropRect} />,
          prominenceLayer,
        )}
    </>
  );
}
