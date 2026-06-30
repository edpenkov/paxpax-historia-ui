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

type BackdropRect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

function rectsEqual(a: BackdropRect | null, b: BackdropRect) {
  return (
    a !== null &&
    a.top === b.top &&
    a.left === b.left &&
    a.width === b.width &&
    a.height === b.height
  );
}

export function ProminenceAnchor({ children, expand, className }: ProminenceAnchorProps) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const { layer: prominenceLayer, coordinates } = useProminenceLayer();
  const [backdropRect, setBackdropRect] = useState<BackdropRect | null>(null);

  useLayoutEffect(() => {
    const anchor = anchorRef.current;
    if (!anchor || !prominenceLayer) return;

    const update = () => {
      const anchorBox = anchor.getBoundingClientRect();
      const layerBox =
        coordinates === "layer" ? prominenceLayer.getBoundingClientRect() : null;

      const next: BackdropRect = {
        top: anchorBox.top - (layerBox?.top ?? 0) - expand.top,
        left: anchorBox.left - (layerBox?.left ?? 0) - expand.left,
        width: anchorBox.width + expand.left + expand.right,
        height: anchorBox.height + expand.top + expand.bottom,
      };

      setBackdropRect((prev) => (rectsEqual(prev, next) ? prev : next));
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(anchor);
    if (coordinates === "layer") observer.observe(prominenceLayer);
    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [
    prominenceLayer,
    coordinates,
    expand.top,
    expand.right,
    expand.bottom,
    expand.left,
  ]);

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
