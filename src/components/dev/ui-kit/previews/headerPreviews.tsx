import { DesktopHeader } from "@/components/DesktopHeader/DesktopHeader";
import { HamburgerIcon } from "@/components/DesktopHeader/HamburgerIcon";
import { MobileTopBarButton } from "@/components/MobileTopControls/MobileTopBarButton";
import { MobileTopControls } from "@/components/MobileTopControls/MobileTopControls";
import { SettingsMenu } from "@/components/SettingsMenu/SettingsMenu";
import {
  PreviewFrame,
  PreviewLabel,
  type UiKitViewport,
} from "@/components/dev/ui-kit/previewFrames";

export function HeaderPreview({ entryId, viewport }: { entryId: string; viewport?: UiKitViewport }) {
  switch (entryId) {
    case "game-screen":
      return (
        <PreviewFrame mapContext mapClassName="object-left-top" frameClassName="min-h-52">
          {viewport === "mobile" ? (
            <MobileTopControls className="absolute top-1 left-1" />
          ) : (
            <>
              <DesktopHeader />
              <SettingsMenu className="absolute left-[14px] top-[68px]" />
            </>
          )}
        </PreviewFrame>
      );

    case "desktop-header":
      return (
        <PreviewFrame mapContext mapClassName="object-left-top" className="overflow-visible">
          <DesktopHeader />
        </PreviewFrame>
      );

    case "mobile-top-controls":
      return (
        <PreviewFrame mapContext mapClassName="object-left-top" frameClassName="min-h-64">
          <MobileTopControls className="absolute top-1 left-1" defaultOpen />
        </PreviewFrame>
      );

    case "mobile-top-bar-button":
      return (
        <PreviewFrame mapContext mapClassName="object-left-top" className="flex-col gap-6">
          <div className="flex items-center gap-3">
            <MobileTopBarButton position="left" />
            <MobileTopBarButton position="right" isOpen={false} onClick={() => undefined} />
          </div>
          <div className="flex flex-col items-center gap-2">
            <PreviewLabel>Right — open (active)</PreviewLabel>
            <MobileTopBarButton position="right" isOpen onClick={() => undefined} />
          </div>
        </PreviewFrame>
      );

    default:
      return null;
  }
}

export function HeaderIconPreview({ entryId }: { entryId: string }) {
  switch (entryId) {
    case "hamburger-icon":
      return (
        <PreviewFrame className="flex-col gap-6 bg-background-primary">
          <div className="flex flex-col items-center gap-2">
            <PreviewLabel>variant=&quot;header&quot; (desktop bar)</PreviewLabel>
            <div className="rounded bg-neutral-800 px-4 py-3">
              <HamburgerIcon variant="header" />
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <PreviewLabel>variant=&quot;control&quot; (mobile top bar)</PreviewLabel>
            <MobileTopBarButton position="left" />
          </div>
        </PreviewFrame>
      );

    default:
      return null;
  }
}
