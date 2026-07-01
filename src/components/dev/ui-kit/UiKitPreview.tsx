"use client";

import { ViewportFrame, type UiKitViewport } from "@/components/dev/ui-kit/previewFrames";
import { GeneralPreview } from "@/components/dev/ui-kit/previews/generalPreviews";
import {
  HeaderIconPreview,
  HeaderPreview,
} from "@/components/dev/ui-kit/previews/headerPreviews";
import {
  SettingsIconPreview,
  SettingsPreview,
  SettingsStylePreview,
} from "@/components/dev/ui-kit/previews/settingsPreviews";
import { DevPreview, StylesPreview } from "@/components/dev/ui-kit/previews/stylesPreviews";

export type { UiKitViewport } from "@/components/dev/ui-kit/previewFrames";

type UiKitPreviewProps = {
  entryId: string;
  viewport?: UiKitViewport;
};

function resolvePreview(entryId: string, viewport?: UiKitViewport) {
  return (
    GeneralPreview({ entryId }) ??
    HeaderPreview({ entryId, viewport }) ??
    HeaderIconPreview({ entryId }) ??
    SettingsPreview({ entryId, viewport }) ??
    SettingsIconPreview({ entryId }) ??
    SettingsStylePreview({ entryId, viewport }) ??
    StylesPreview({ entryId }) ??
    DevPreview({ entryId })
  );
}

export function UiKitPreview({ entryId, viewport }: UiKitPreviewProps) {
  const preview = resolvePreview(entryId, viewport);

  return <ViewportFrame viewport={viewport}>{preview}</ViewportFrame>;
}
