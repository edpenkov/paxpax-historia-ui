import { DividerLine } from "@/components/DividerLine/DividerLine";
import {
  mobileControlSurfaceLeftClass,
  mobileControlSurfaceRightClass,
} from "@/components/MobileTopControls/mobileControlStyles";
import { PreviewFrame, PreviewLabel } from "@/components/dev/ui-kit/previewFrames";
import { cn } from "@/lib/cn";

export function DividerLinePreview() {
  return (
    <PreviewFrame className="w-full max-w-sm flex-col items-stretch gap-0 bg-background-primary p-4">
      <PreviewLabel>Horizontal (variant=line)</PreviewLabel>
      <DividerLine className="w-full" />

      <PreviewLabel className="mt-6">Vertical (variant=line)</PreviewLabel>
      <div className="flex h-11 w-fit items-stretch">
        <div aria-hidden className={cn(mobileControlSurfaceLeftClass, "pointer-events-none")} />
        <DividerLine orientation="vertical" />
        <div aria-hidden className={cn(mobileControlSurfaceRightClass, "pointer-events-none")} />
      </div>

      <PreviewLabel className="mt-6">Bridge (variant=bridge, mobile top bar)</PreviewLabel>
      <div className="flex h-11 w-fit items-stretch">
        <div aria-hidden className={cn(mobileControlSurfaceLeftClass, "pointer-events-none")} />
        <DividerLine variant="bridge" />
        <div aria-hidden className={cn(mobileControlSurfaceRightClass, "pointer-events-none")} />
      </div>
    </PreviewFrame>
  );
}

export function GeneralPreview({ entryId }: { entryId: string }) {
  switch (entryId) {
    case "divider-line":
      return <DividerLinePreview />;
    default:
      return null;
  }
}
