"use client";

import { GameSettingsSectionContent } from "@/components/SettingsMenu/GameSettingsSectionContent";
import { SettingsNestedSectionBody } from "@/components/SettingsMenu/SettingsNestedSectionBody";
import {
  parseSettingsSection,
  SETTINGS_SUB_SECTION_LABELS,
  type SettingsMenuNestedSection,
  type SettingsMenuSection,
} from "@/components/SettingsMenu/settingsMenuSection";
import { cn } from "@/lib/cn";

type SettingsMenuSectionBodyProps = {
  section: SettingsMenuSection;
  isMobileLayout: boolean;
  onOpenNested: (nested: SettingsMenuNestedSection) => void;
  className?: string;
};

export function SettingsMenuSectionBody({
  section,
  isMobileLayout,
  onOpenNested,
  className,
}: SettingsMenuSectionBodyProps) {
  const parsed = parseSettingsSection(section);

  if (parsed.view === "nested") {
    return <SettingsNestedSectionBody nested={parsed.nested} className={className} />;
  }

  if (parsed.view === "sub" && parsed.sub === "game-settings") {
    return (
      <GameSettingsSectionContent
        isMobileLayout={isMobileLayout}
        onOpenNested={onOpenNested}
        className={className}
      />
    );
  }

  if (parsed.view === "sub") {
    return (
      <div
        className={cn("min-h-[80px] pl-4 pr-1 pt-3 pb-5", className)}
        aria-label={SETTINGS_SUB_SECTION_LABELS[parsed.sub]}
      />
    );
  }

  return null;
}
