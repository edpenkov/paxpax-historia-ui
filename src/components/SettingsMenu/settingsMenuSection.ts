import { getNavigateDirection } from "@/lib/panelNavigation";

/** Settings panel navigation — main list vs drill-down sections. */
export type SettingsMenuSection = "main" | SettingsMenuSubSection | SettingsMenuNestedPath;

export type SettingsMenuSubSection = "game-settings" | "user-settings";

export type SettingsMenuNestedSection = "advisor-ui" | "maps-and-display";

export type SettingsMenuNestedPath = `${SettingsMenuSubSection}/${SettingsMenuNestedSection}`;

export const SETTINGS_SUB_SECTION_LABELS: Record<SettingsMenuSubSection, string> = {
  "game-settings": "Game settings",
  "user-settings": "User settings",
};

export const SETTINGS_NESTED_SECTION_LABELS: Record<SettingsMenuNestedSection, string> = {
  "advisor-ui": "Advisor UI",
  "maps-and-display": "Maps and Display",
};

export const GAME_SETTINGS_NESTED_SECTIONS: SettingsMenuNestedSection[] = [
  "advisor-ui",
  "maps-and-display",
];

const MENU_LABEL_TO_SUB_SECTION: Record<string, SettingsMenuSubSection> = {
  [SETTINGS_SUB_SECTION_LABELS["game-settings"]]: "game-settings",
  [SETTINGS_SUB_SECTION_LABELS["user-settings"]]: "user-settings",
};

export function subSectionFromLabel(label: string): SettingsMenuSubSection | undefined {
  return MENU_LABEL_TO_SUB_SECTION[label];
}

export function nestedSectionPath(
  sub: SettingsMenuSubSection,
  nested: SettingsMenuNestedSection,
): SettingsMenuNestedPath {
  return `${sub}/${nested}`;
}

export function parseSettingsSection(section: SettingsMenuSection) {
  if (section === "main") {
    return { view: "main" as const };
  }

  if (section.includes("/")) {
    const [sub, nested] = section.split("/") as [SettingsMenuSubSection, SettingsMenuNestedSection];
    return { view: "nested" as const, sub, nested };
  }

  return { view: "sub" as const, sub: section as SettingsMenuSubSection };
}

export function isSubSection(section: SettingsMenuSection): section is SettingsMenuSubSection {
  return section === "game-settings" || section === "user-settings";
}

/** Navigation stack depth — used for forward/back transition direction. */
export function getSettingsSectionDepth(section: SettingsMenuSection): number {
  if (section === "main") return 0;
  if (section.includes("/")) return 2;
  return 1;
}

export function getSettingsNavigateDirection(
  from: SettingsMenuSection,
  to: SettingsMenuSection,
): "forward" | "back" {
  return getNavigateDirection(getSettingsSectionDepth(from), getSettingsSectionDepth(to));
}

/** In-panel page slides always use X. Y is reserved for main-menu reveal on mobile. */
export function getPageNavTransitionAxis(
  _from: SettingsMenuSection,
  _to: SettingsMenuSection,
  _isMobileLayout: boolean,
): "x" | "y" {
  return "x";
}
