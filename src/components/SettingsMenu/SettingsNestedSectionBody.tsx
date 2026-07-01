"use client";

import { SettingsMenuBlockPlaceholder } from "@/components/SettingsMenu/SettingsMenuBlockPlaceholder";
import {
  SETTINGS_NESTED_SECTION_LABELS,
  type SettingsMenuNestedSection,
} from "@/components/SettingsMenu/settingsMenuSection";
import { cn } from "@/lib/cn";

type SettingsNestedSectionBodyProps = {
  nested: SettingsMenuNestedSection;
  className?: string;
};

export function SettingsNestedSectionBody({ nested, className }: SettingsNestedSectionBodyProps) {
  return (
    <div
      className={cn("px-4 py-[18px]", className)}
      aria-label={SETTINGS_NESTED_SECTION_LABELS[nested]}
    >
      <SettingsMenuBlockPlaceholder />
    </div>
  );
}
