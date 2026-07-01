"use client";

import { GameScreen } from "@/components/GameScreen/GameScreen";
import { cn } from "@/lib/cn";
import { useState, type ReactNode } from "react";

export type UiKitViewport = "desktop" | "mobile";

export function ReplayOnHover({
  children,
  hint = "Hover to replay",
}: {
  children: ReactNode;
  hint?: string;
}) {
  const [key, setKey] = useState(0);

  return (
    <div className="w-full" onMouseEnter={() => setKey((value) => value + 1)}>
      <div key={key}>{children}</div>
      <p className="mt-3 text-xs text-black/55 dark:text-white/55">{hint}</p>
    </div>
  );
}

export function MapPreviewFrame({
  children,
  className,
  mapClassName,
  frameClassName,
}: {
  children: ReactNode;
  className?: string;
  mapClassName?: string;
  frameClassName?: string;
}) {
  return (
    <div
      className={cn(
        "relative h-48 overflow-hidden rounded-md border border-black/10 dark:border-white/10",
        frameClassName,
      )}
    >
      <GameScreen className="h-full" mapClassName={mapClassName} containProminence>
        <div className={cn("absolute inset-0", className)}>{children}</div>
      </GameScreen>
    </div>
  );
}

export function PreviewFrame({
  children,
  className,
  mapContext = false,
  mapClassName,
  frameClassName,
}: {
  children: ReactNode;
  className?: string;
  mapContext?: boolean;
  mapClassName?: string;
  frameClassName?: string;
}) {
  if (mapContext) {
    return (
      <MapPreviewFrame
        className={className}
        mapClassName={mapClassName}
        frameClassName={frameClassName}
      >
        {children}
      </MapPreviewFrame>
    );
  }

  return (
    <div
      className={cn(
        "flex min-h-24 items-center justify-center rounded-md border border-black/10 bg-neutral-100 p-6 dark:border-white/10 dark:bg-neutral-900",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function ViewportFrame({
  viewport,
  children,
}: {
  viewport?: UiKitViewport;
  children: ReactNode;
}) {
  if (!viewport) return <>{children}</>;

  return (
    <div
      className={cn(
        "mx-auto overflow-hidden rounded-md border border-dashed border-black/15 transition-[width] dark:border-white/15",
        viewport === "mobile" ? "w-[375px]" : "w-full",
      )}
    >
      {children}
    </div>
  );
}

export function PreviewLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mb-2 text-[11px] font-medium uppercase tracking-wide text-text-primary/45",
        className,
      )}
    >
      {children}
    </p>
  );
}
