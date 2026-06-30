export const uiKitTabs = [
  { id: "general", label: "General" },
  { id: "icons", label: "Icons" },
  { id: "components", label: "Components" },
  { id: "variables", label: "Variables" },
  { id: "dev", label: "Dev" },
] as const;

export type UiKitTabId = (typeof uiKitTabs)[number]["id"];

export type UiKitCategory = Exclude<UiKitTabId, "variables">;
