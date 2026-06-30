"use client";

import { DesktopHeader } from "@/components/DesktopHeader/DesktopHeader";
import { HamburgerIcon } from "@/components/DesktopHeader/HamburgerIcon";
import { GameScreenShell } from "@/components/GameScreen/GameScreenShell";
import { ProminenceAnchor } from "@/components/ProminenceAnchor/ProminenceAnchor";
import { SettingsGearIcon } from "@/components/SettingsMenu/SettingsGearIcon";
import { SettingsMenu } from "@/components/SettingsMenu/SettingsMenu";
import { surfacePanelClass } from "@/lib/surface";
import { cn } from "@/lib/cn";

export type UiKitViewport = "desktop" | "mobile";

type UiKitPreviewProps = {
  entryId: string;
  viewport?: UiKitViewport;
};

function MapPreviewFrame({
  children,
  className,
  mapClassName,
}: {
  children: React.ReactNode;
  className?: string;
  mapClassName?: string;
}) {
  return (
    <div className="relative h-48 overflow-hidden rounded-md border border-black/10 dark:border-white/10">
      <GameScreenShell className="h-full" mapClassName={mapClassName}>
        <div className={cn("absolute inset-0", className)}>{children}</div>
      </GameScreenShell>
    </div>
  );
}

function PreviewFrame({
  children,
  className,
  mapContext = false,
  mapClassName,
}: {
  children: React.ReactNode;
  className?: string;
  mapContext?: boolean;
  mapClassName?: string;
}) {
  if (mapContext) {
    return (
      <MapPreviewFrame className={className} mapClassName={mapClassName}>
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

function ViewportFrame({
  viewport,
  children,
}: {
  viewport?: UiKitViewport;
  children: React.ReactNode;
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

export function UiKitPreview({ entryId, viewport }: UiKitPreviewProps) {
  const preview = (() => {
    switch (entryId) {
      case "surface-panel-class":
        return (
          <PreviewFrame>
            <div
              className={cn(
                surfacePanelClass,
                "px-6 py-4 text-sm font-medium text-text-primary",
              )}
            >
              surfacePanelClass
            </div>
          </PreviewFrame>
        );

      case "game-screen":
        return (
          <PreviewFrame mapContext mapClassName="object-left-top">
            <DesktopHeader />
            <SettingsMenu className="absolute left-5 top-[68px]" />
          </PreviewFrame>
        );

      case "desktop-header":
        return (
          <PreviewFrame mapContext mapClassName="object-left-top" className="overflow-visible">
            <DesktopHeader />
          </PreviewFrame>
        );

      case "hamburger-icon":
        return (
          <PreviewFrame className="bg-neutral-800">
            <HamburgerIcon />
          </PreviewFrame>
        );

      case "settings-menu":
        return (
          <PreviewFrame mapContext mapClassName="object-left-top">
            <SettingsMenu className="absolute left-5 top-5" />
          </PreviewFrame>
        );

      case "settings-gear-icon":
        return (
          <PreviewFrame>
            <SettingsGearIcon />
          </PreviewFrame>
        );

      case "prominence-anchor":
        return (
          <PreviewFrame mapContext mapClassName="object-left-top" className="overflow-visible">
            <div className="absolute left-3 top-3">
              <ProminenceAnchor expand={{ top: 40, right: 80, bottom: 40, left: 40 }}>
                <span className="text-sm font-medium text-white drop-shadow-[0_0_4px_rgba(0,0,0,0.25)]">
                  Anchored content
                </span>
              </ProminenceAnchor>
            </div>
          </PreviewFrame>
        );

      case "dev-theme-toggle":
        return (
          <PreviewFrame className="min-h-16 bg-transparent">
            <p className="text-sm text-black/55 dark:text-white/55">
              Live control is fixed at the bottom of every page.
            </p>
          </PreviewFrame>
        );

      default:
        return null;
    }
  })();

  return <ViewportFrame viewport={viewport}>{preview}</ViewportFrame>;
}
