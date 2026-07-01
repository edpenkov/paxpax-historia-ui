import { SettingsPanelIcon } from "@/components/SettingsMenu/SettingsPanelIcon";
import { SettingsMenuRowTrailingIcon } from "@/components/SettingsMenu/SettingsMenuRowTrailingIcon";
import { SettingsMenuContent } from "@/components/SettingsMenu/SettingsMenuContent";
import { SettingsMenuHeader } from "@/components/SettingsMenu/SettingsMenuHeader";
import { SettingsMenuItem } from "@/components/SettingsMenu/SettingsMenuItem";
import { SettingsMenuItemIcon } from "@/components/SettingsMenu/SettingsMenuItemIcon";
import { SettingsMenuRevealProvider } from "@/components/SettingsMenu/SettingsMenuRevealContext";
import { MobileTopControls } from "@/components/MobileTopControls/MobileTopControls";
import { SettingsMenu } from "@/components/SettingsMenu/SettingsMenu";
import { ProminenceAnchor } from "@/components/ProminenceAnchor/ProminenceAnchor";
import {
  PreviewFrame,
  PreviewLabel,
  ReplayOnHover,
  type UiKitViewport,
} from "@/components/dev/ui-kit/previewFrames";

const MENU_ICON_NAMES = [
  "Game settings",
  "User settings",
  "Tutorial",
  "Events",
  "Report bug",
  "Discord",
  "Wikipedia",
] as const;

export function SettingsPreview({ entryId, viewport }: { entryId: string; viewport?: UiKitViewport }) {
  switch (entryId) {
    case "settings-menu":
      return (
        <PreviewFrame mapContext mapClassName="object-left-top" frameClassName="min-h-48">
          {viewport === "mobile" ? (
            <MobileTopControls className="absolute top-1 left-1" defaultOpen />
          ) : (
            <SettingsMenu className="absolute left-[14px] top-5" defaultOpen />
          )}
        </PreviewFrame>
      );

    case "settings-menu-header":
      return (
        <PreviewFrame className="w-full max-w-[420px] flex-col gap-6 bg-background-primary p-0">
          <SettingsMenuHeader
            section="main"
            navDirection="forward"
            isMobileLayout={false}
            onNavigate={() => undefined}
            onClose={() => undefined}
          />
          <SettingsMenuHeader
            section="game-settings"
            navDirection="forward"
            isMobileLayout={false}
            onNavigate={() => undefined}
            onClose={() => undefined}
          />
          <SettingsMenuHeader
            section="game-settings/advisor-ui"
            navDirection="forward"
            isMobileLayout={false}
            onNavigate={() => undefined}
            onClose={() => undefined}
          />
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
        <PreviewFrame className="w-full max-w-[420px] flex-col gap-4 bg-background-primary p-4">
          <SettingsMenuItem icon="Events" label="Events (button row)" />
          <SettingsMenuItem
            icon="Wikipedia"
            label="Wikipedia (link row)"
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

    default:
      return null;
  }
}

export function SettingsIconPreview({ entryId }: { entryId: string }) {
  switch (entryId) {
    case "settings-panel-icon":
      return (
        <PreviewFrame className="flex-col gap-6 bg-background-primary">
          <div className="flex flex-col items-center gap-2">
            <PreviewLabel>variant=&quot;gear&quot;</PreviewLabel>
            <div className="group/control">
              <SettingsPanelIcon variant="gear" />
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <PreviewLabel>variant=&quot;close&quot;</PreviewLabel>
            <div className="group/control">
              <SettingsPanelIcon variant="close" />
            </div>
          </div>
        </PreviewFrame>
      );

    case "settings-menu-row-trailing-icon":
      return (
        <PreviewFrame className="flex gap-8 bg-background-primary">
          <SettingsMenuRowTrailingIcon variant="chevron" className="opacity-40" />
          <SettingsMenuRowTrailingIcon variant="external-link" className="opacity-40" />
        </PreviewFrame>
      );

    case "settings-menu-item-icon":
      return (
        <PreviewFrame className="w-full max-w-md flex-col gap-4 bg-background-primary p-4">
          <div className="flex flex-wrap gap-4">
            {MENU_ICON_NAMES.map((name) => (
              <div key={name} className="flex flex-col items-center gap-1.5">
                <SettingsMenuItemIcon name={name} className="opacity-50" />
                <span className="max-w-[4.5rem] text-center text-[10px] text-text-primary/60">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </PreviewFrame>
      );

    case "settings-chevron-icon":
    case "settings-external-link-icon":
      return (
        <PreviewFrame className="flex gap-8 bg-background-primary">
          <SettingsMenuRowTrailingIcon variant="chevron" className="opacity-40" />
          <SettingsMenuRowTrailingIcon variant="external-link" className="opacity-40" />
        </PreviewFrame>
      );

    case "settings-gear-icon":
    case "settings-close-icon":
      return (
        <PreviewFrame className="group/control flex gap-8 bg-background-primary">
          <SettingsPanelIcon variant="gear" />
          <SettingsPanelIcon variant="close" />
        </PreviewFrame>
      );

    default:
      return null;
  }
}

export function SettingsStylePreview({
  entryId,
  viewport,
}: {
  entryId: string;
  viewport?: UiKitViewport;
}) {
  switch (entryId) {
    case "settings-menu-row-styles":
      return (
        <PreviewFrame className="w-full max-w-[420px] flex-col gap-4 bg-background-primary p-4">
          <SettingsMenuItem icon="Game settings" label="Menu row (50% / 90%)" />
          <SettingsMenuItem
            icon="Discord"
            label="Link row + arrow (40%)"
            href="https://discord.com/invite/paxhistoria"
          />
          <p className="text-xs text-black/55 dark:text-white/55">
            Desktop: hover. Mobile (&lt;md): tap active state mirrors hover.
          </p>
        </PreviewFrame>
      );

    case "settings-menu-reveal":
      return (
        <PreviewFrame className="w-full max-w-[420px] bg-background-primary p-4">
          <ReplayOnHover
            hint={
              viewport === "mobile"
                ? "Hover to replay — forward: y −10px, back: y +10px"
                : "Hover to replay — forward: slides +X, back: slides −X"
            }
          >
            <SettingsMenuRevealProvider
              isMobile={viewport === "mobile"}
              direction="forward"
            >
              <SettingsMenuItem icon="Tutorial" label="Slide-in reveal" />
            </SettingsMenuRevealProvider>
          </ReplayOnHover>
        </PreviewFrame>
      );

    default:
      return null;
  }
}
