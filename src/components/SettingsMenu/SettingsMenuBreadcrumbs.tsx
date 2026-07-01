"use client";

import {
  parseSettingsSection,
  SETTINGS_NESTED_SECTION_LABELS,
  SETTINGS_SUB_SECTION_LABELS,
  type SettingsMenuSection,
} from "@/components/SettingsMenu/settingsMenuSection";
import { PanelBreadcrumbs, type PanelBreadcrumbItem } from "@/lib/panelNavigation";
import { cn } from "@/lib/cn";

type SettingsMenuBreadcrumbsProps = {
  section: SettingsMenuSection;
  onNavigate: (section: SettingsMenuSection) => void;
  className?: string;
};

function buildBreadcrumbItems(
  section: SettingsMenuSection,
  onNavigate: (section: SettingsMenuSection) => void,
): PanelBreadcrumbItem[] {
  const parsed = parseSettingsSection(section);

  if (parsed.view === "sub") {
    return [
      { label: "Settings", onClick: () => onNavigate("main") },
      { label: SETTINGS_SUB_SECTION_LABELS[parsed.sub] },
    ];
  }

  if (parsed.view === "nested") {
    return [
      { label: "Settings", onClick: () => onNavigate("main") },
      {
        label: SETTINGS_SUB_SECTION_LABELS[parsed.sub],
        onClick: () => onNavigate(parsed.sub),
      },
      { label: SETTINGS_NESTED_SECTION_LABELS[parsed.nested] },
    ];
  }

  return [];
}

export function SettingsMenuBreadcrumbs({
  section,
  onNavigate,
  className,
}: SettingsMenuBreadcrumbsProps) {
  const items = buildBreadcrumbItems(section, onNavigate);

  return (
    <PanelBreadcrumbs
      items={items}
      ariaLabel="Settings navigation"
      className={cn(className)}
    />
  );
}
