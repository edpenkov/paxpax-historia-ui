import type { UiKitCategory } from "@/lib/ui-kit/categories";
import { getUiKitEntriesByCategory, type UiKitEntry } from "@/lib/ui-kit/registry";

/** Display order for section headings within each tab. */
export const uiKitGroupOrder: Record<UiKitCategory, string[]> = {
  general: ["Primitives"],
  icons: ["Header", "Settings panel", "Settings menu"],
  components: ["Screen shell", "Header", "Settings menu", "Map overlay"],
  styles: ["Surfaces", "Animations", "Hover states", "Interaction"],
  dev: ["Dev tools"],
};

export type UiKitEntryGroup = {
  label: string;
  entries: UiKitEntry[];
};

export function getUiKitEntriesGrouped(category: UiKitCategory): UiKitEntryGroup[] {
  const entries = getUiKitEntriesByCategory(category);
  const grouped = new Map<string, UiKitEntry[]>();

  for (const entry of entries) {
    const label = entry.group ?? "Other";
    const list = grouped.get(label);
    if (list) list.push(entry);
    else grouped.set(label, [entry]);
  }

  const ordered = uiKitGroupOrder[category].filter((label) => grouped.has(label));
  const extras = [...grouped.keys()].filter((label) => !uiKitGroupOrder[category].includes(label));

  return [...ordered, ...extras].map((label) => ({
    label,
    entries: grouped.get(label)!,
  }));
}
