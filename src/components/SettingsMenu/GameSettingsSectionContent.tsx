"use client";

import { DividerLine } from "@/components/DividerLine/DividerLine";
import { SettingsMenuBlockPlaceholder } from "@/components/SettingsMenu/SettingsMenuBlockPlaceholder";
import {
  SettingsSubSectionRow,
  SettingsSubSectionRowPanel,
} from "@/components/SettingsMenu/SettingsSubSectionRow";
import {
  GAME_SETTINGS_NESTED_SECTIONS,
  SETTINGS_NESTED_SECTION_LABELS,
  type SettingsMenuNestedSection,
} from "@/components/SettingsMenu/settingsMenuSection";
import { cn } from "@/lib/cn";
import { Fragment, useState } from "react";

type GameSettingsSectionContentProps = {
  isMobileLayout: boolean;
  onOpenNested: (nested: SettingsMenuNestedSection) => void;
  className?: string;
};

export function GameSettingsSectionContent({
  isMobileLayout,
  onOpenNested,
  className,
}: GameSettingsSectionContentProps) {
  const [openAccordion, setOpenAccordion] = useState<SettingsMenuNestedSection | null>(null);

  const handlePress = (nested: SettingsMenuNestedSection) => {
    if (isMobileLayout) {
      onOpenNested(nested);
      return;
    }

    setOpenAccordion((current) => (current === nested ? null : nested));
  };

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="px-4 py-[18px]">
        <SettingsMenuBlockPlaceholder />
      </div>

      <DividerLine className="my-0" />

      <div className="px-4 py-[18px]">
        <SettingsMenuBlockPlaceholder />
      </div>

      <DividerLine className="my-0" />

      {GAME_SETTINGS_NESTED_SECTIONS.map((nested) => {
        const label = SETTINGS_NESTED_SECTION_LABELS[nested];
        const isOpen = openAccordion === nested;

        return (
          <Fragment key={nested}>
            <div className="px-4 py-[18px]">
              <SettingsSubSectionRow
                label={label}
                isOpen={isOpen}
                isMobileLayout={isMobileLayout}
                onPress={() => handlePress(nested)}
              >
                <SettingsSubSectionRowPanel />
              </SettingsSubSectionRow>
            </div>
            <DividerLine className="my-0" />
          </Fragment>
        );
      })}
    </div>
  );
}
