"use client";

import { DesktopHeader } from "@/components/DesktopHeader/DesktopHeader";
import { HamburgerIcon } from "@/components/DesktopHeader/HamburgerIcon";
import { GameScreenShell } from "@/components/GameScreen/GameScreenShell";
import { ProminenceAnchor } from "@/components/ProminenceAnchor/ProminenceAnchor";
import { SettingsGearIcon } from "@/components/SettingsMenu/SettingsGearIcon";
import { MobileMenuButton } from "@/components/MobileTopControls/MobileMenuButton";
import { MobileSettingsTrigger } from "@/components/MobileTopControls/MobileSettingsTrigger";
import { MobileTopControls } from "@/components/MobileTopControls/MobileTopControls";
import { SettingsMenu } from "@/components/SettingsMenu/SettingsMenu";
import { SettingsCloseIcon } from "@/components/SettingsMenu/SettingsCloseIcon";
import { SettingsMenuHeader } from "@/components/SettingsMenu/SettingsMenuHeader";
import { SettingsMenuContent } from "@/components/SettingsMenu/SettingsMenuContent";
import { SettingsMenuItem } from "@/components/SettingsMenu/SettingsMenuItem";
import { SettingsMenuLinkItem } from "@/components/SettingsMenu/SettingsMenuLinkItem";
import { SettingsMenuItemIcon } from "@/components/SettingsMenu/SettingsMenuItemIcon";
import { SettingsExternalLinkIcon } from "@/components/SettingsMenu/SettingsExternalLinkIcon";
import { DividerLine } from "@/components/DividerLine/DividerLine";
import { surfacePanelClass } from "@/lib/surface";
import { ICON_HITBOX_CLASS } from "@/lib/icon-hitbox";
import { panelSizeTransitionClass } from "@/lib/transitions";
import { cn } from "@/lib/cn";
import { useState, type ReactNode } from "react";

const MENU_ICON_NAMES = [
  "Game settings",
  "User settings",
  "Tutorial",
  "Events",
  "Report bug",
  "Discord",
  "Wikipedia",
] as const;

function ReplayOnHover({
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

function PanelTransitionHoverPreview() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="flex flex-col items-center gap-3"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div
        className={cn(
          surfacePanelClass,
          panelSizeTransitionClass,
          "overflow-hidden",
        )}
        style={{
          width: expanded ? 160 : 34,
          height: expanded ? 80 : 34,
        }}
      />
      <p className="text-xs text-black/55 dark:text-white/55">
        Hover to expand / collapse
      </p>
    </div>
  );
}

export type UiKitViewport = "desktop" | "mobile";

type UiKitPreviewProps = {
  entryId: string;
  viewport?: UiKitViewport;
};

function MapPreviewFrame({
  children,
  className,
  mapClassName,
  frameClassName,
}: {
  children: React.ReactNode;
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
      <GameScreenShell className="h-full" mapClassName={mapClassName} containProminence>
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
  frameClassName,
}: {
  children: React.ReactNode;
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

      case "panel-size-transition-class":
        return (
          <PreviewFrame>
            <PanelTransitionHoverPreview />
          </PreviewFrame>
        );

      case "icon-hitbox-class":
        return (
          <PreviewFrame>
            <button
              type="button"
              className={cn(
                ICON_HITBOX_CLASS,
                "rounded border border-dashed border-black/25 dark:border-white/25",
              )}
              aria-label="Hitbox demo"
            >
              <SettingsGearIcon />
            </button>
          </PreviewFrame>
        );

      case "settings-menu-row-styles":
        return (
          <PreviewFrame className="w-full max-w-[420px] flex-col gap-4 bg-background-primary p-4">
            <SettingsMenuItem icon="Game settings" label="Menu row (50% / 90%)" />
            <SettingsMenuLinkItem
              icon="Discord"
              label="Link row + arrow (40%)"
              href="https://discord.com/invite/paxhistoria"
            />
            <p className="text-xs text-black/55 dark:text-white/55">
              Hover rows to see opacity → 100%. Values live inline on components.
            </p>
          </PreviewFrame>
        );

      case "settings-menu-reveal":
        return (
          <PreviewFrame className="w-full max-w-[420px] bg-background-primary p-4">
            <ReplayOnHover hint="Hover to replay slide-in">
              <SettingsMenuItem icon="Tutorial" label="Slide-in reveal" />
            </ReplayOnHover>
          </PreviewFrame>
        );

      case "game-screen":
        return (
          <PreviewFrame mapContext mapClassName="object-left-top">
            <DesktopHeader />
            <SettingsMenu className="absolute left-[14px] top-[68px]" />
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
          <PreviewFrame
            mapContext
            mapClassName="object-left-top"
            frameClassName="min-h-48"
          >
            {viewport === "mobile" ? (
              <MobileTopControls className="absolute top-1 left-1" defaultOpen />
            ) : (
              <SettingsMenu className="absolute left-[14px] top-5" defaultOpen />
            )}
          </PreviewFrame>
        );

      case "mobile-top-controls":
        return (
          <PreviewFrame
            mapContext
            mapClassName="object-left-top"
            frameClassName="min-h-64"
          >
            <MobileTopControls className="absolute top-1 left-1" defaultOpen />
          </PreviewFrame>
        );

      case "mobile-menu-button":
        return (
          <PreviewFrame mapContext mapClassName="object-left-top">
            <MobileMenuButton />
          </PreviewFrame>
        );

      case "mobile-settings-trigger":
        return (
          <PreviewFrame mapContext mapClassName="object-left-top">
            <MobileSettingsTrigger isOpen={false} onClick={() => undefined} />
          </PreviewFrame>
        );

      case "settings-close-icon":
        return (
          <PreviewFrame className="bg-neutral-800">
            <SettingsCloseIcon />
          </PreviewFrame>
        );

      case "divider-line":
        return (
          <PreviewFrame className="w-full max-w-xs bg-neutral-900">
            <div className="flex h-11 items-stretch gap-0">
              <div className="h-11 w-11 rounded bg-white/10" />
              <DividerLine orientation="vertical" />
              <div className="h-11 w-11 rounded bg-white/10" />
            </div>
            <DividerLine className="mt-4 w-full" />
          </PreviewFrame>
        );

      case "settings-menu-header":
        return (
          <PreviewFrame className="w-full max-w-[420px] bg-background-primary p-0">
            <SettingsMenuHeader onClose={() => undefined} />
          </PreviewFrame>
        );

      case "settings-gear-icon":
        return (
          <PreviewFrame className="group/control bg-background-primary">
            <SettingsGearIcon />
          </PreviewFrame>
        );

      case "settings-menu-item-icon":
        return (
          <PreviewFrame className="w-full max-w-md flex-col gap-4 bg-background-primary p-4">
            <div className="flex flex-wrap gap-4">
              {MENU_ICON_NAMES.map((name) => (
                <div key={name} className="flex flex-col items-center gap-1.5">
                  <SettingsMenuItemIcon
                    name={name}
                    className="opacity-50"
                  />
                  <span className="max-w-[4.5rem] text-center text-[10px] text-text-primary/60">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </PreviewFrame>
        );

      case "settings-external-link-icon":
        return (
          <PreviewFrame className="bg-background-primary">
            <SettingsExternalLinkIcon className="opacity-40" />
          </PreviewFrame>
        );

      case "settings-menu-content":
        return (
          <PreviewFrame className="w-full max-w-[420px] bg-background-primary p-0">
            <SettingsMenuContent />
          </PreviewFrame>
        );

      case "settings-menu-item":
        return (
          <PreviewFrame className="w-full max-w-[420px] bg-background-primary p-4">
            <SettingsMenuItem icon="Events" label="Events" />
          </PreviewFrame>
        );

      case "settings-menu-link-item":
        return (
          <PreviewFrame className="w-full max-w-[420px] bg-background-primary p-4">
            <SettingsMenuLinkItem
              icon="Wikipedia"
              label="Wikipedia"
              href="https://wiki.paxhistoria.co/wiki/Main_Page"
            />
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
