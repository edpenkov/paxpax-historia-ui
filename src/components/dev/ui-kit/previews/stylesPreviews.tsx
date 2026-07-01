import { SettingsPanelIcon } from "@/components/SettingsMenu/SettingsPanelIcon";
import { surfacePanelClass } from "@/lib/surface";
import { ICON_HITBOX_CLASS } from "@/lib/icon-hitbox";
import { panelSizeTransitionClass } from "@/lib/transitions";
import { cn } from "@/lib/cn";
import { useState } from "react";
import { PreviewFrame } from "@/components/dev/ui-kit/previewFrames";

function PanelTransitionHoverPreview() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="flex flex-col items-center gap-3"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div
        className={cn(surfacePanelClass, panelSizeTransitionClass, "overflow-hidden")}
        style={{
          width: expanded ? 160 : 34,
          height: expanded ? 80 : 34,
        }}
      />
      <p className="text-xs text-black/55 dark:text-white/55">Hover to expand / collapse</p>
    </div>
  );
}

export function StylesPreview({ entryId }: { entryId: string }) {
  switch (entryId) {
    case "surface-panel-class":
      return (
        <PreviewFrame>
          <div className={cn(surfacePanelClass, "px-6 py-4 text-sm font-medium text-text-primary")}>
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
            <SettingsPanelIcon variant="gear" />
          </button>
        </PreviewFrame>
      );

    default:
      return null;
  }
}

export function DevPreview({ entryId }: { entryId: string }) {
  switch (entryId) {
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
}
