import type { UiKitCategory } from "@/lib/ui-kit/categories";

export type UiKitPropDoc = {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
};

export type UiKitValueDoc = {
  label: string;
  light: string;
  dark: string;
  tailwind?: string;
};

export type UiKitEntry = {
  id: string;
  name: string;
  importPath: string;
  category: UiKitCategory;
  /** Section heading within the tab (see `src/lib/ui-kit/groups.ts`). */
  group?: string;
  kind: "component" | "utility" | "style" | "dev";
  description: string;
  props?: UiKitPropDoc[];
  values?: UiKitValueDoc[];
  notes?: string[];
  /** Show Desktop / Mobile preview toggle (responsive components). */
  viewportToggle?: boolean;
};

/** Single source of truth for `/ui-kit` — update when adding components or utilities. */
export const uiKitEntries: UiKitEntry[] = [
  {
    id: "divider-line",
    name: "DividerLine",
    importPath: "src/components/DividerLine/DividerLine.tsx",
    category: "general",
    group: "Primitives",
    kind: "component",
    description: "1px horizontal rule using text-primary at 10% opacity.",
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional classes on the hr element.",
      },
    ],
    values: [
      { label: "Height", light: "1px", dark: "1px" },
      { label: "Color", light: "text-primary / 10%", dark: "same" },
      { label: "Vertical margin", light: "4px (my-1)", dark: "same" },
    ],
  },
  {
    id: "game-screen",
    name: "GameScreen",
    importPath: "src/components/GameScreen/GameScreen.tsx",
    category: "components",
    group: "Screen shell",
    kind: "component",
    description:
      "Full-viewport game shell. Map layer (placeholder static img) + prominence layer + UI layer.",
    props: [
      {
        name: "children",
        type: "ReactNode",
        description: "Screen UI rendered in the z-10 layer above the map.",
      },
    ],
    notes: ["Placeholder: map is a static PNG, not interactive."],
    viewportToggle: true,
  },
  {
    id: "desktop-header",
    name: "DesktopHeader",
    importPath: "src/components/DesktopHeader/DesktopHeader.tsx",
    category: "components",
    group: "Header",
    kind: "component",
    description: "48px desktop header with hamburger + PaxHistoria title and prominence backdrop.",
    props: [
      {
        name: "children",
        type: "ReactNode",
        description: "Optional slot for extra header content (right side).",
      },
      {
        name: "className",
        type: "string",
        description: "Additional classes on the header element.",
      },
    ],
    values: [
      { label: "Height", light: "48px (h-12)", dark: "48px (h-12)" },
      { label: "Visibility", light: "hidden below md", dark: "hidden below md" },
      {
        label: "Logo expand",
        light: "{ top: 62, right: 202, bottom: 62, left: 202 }",
        dark: "same",
      },
    ],
    viewportToggle: true,
  },
  {
    id: "hamburger-icon",
    name: "HamburgerIcon",
    importPath: "src/components/DesktopHeader/HamburgerIcon.tsx",
    category: "icons",
    group: "Header",
    kind: "component",
    description: "20×12 inline SVG menu icon with drop shadow.",
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional classes on the SVG.",
      },
    ],
    values: [
      { label: "Size", light: "20×12", dark: "20×12" },
      { label: "Fill", light: "white", dark: "white" },
    ],
  },
  {
    id: "settings-menu",
    name: "SettingsMenu",
    importPath: "src/components/SettingsMenu/SettingsMenu.tsx",
    category: "components",
    group: "Settings menu",
    kind: "component",
    description:
      "Settings panel. Desktop: 34×34 gear trigger expands to 420px wide, content-driven height.",
    props: [
      {
        name: "className",
        type: "string",
        description: "Classes on the root wrapper (positioning, etc.).",
      },
      {
        name: "style",
        type: "CSSProperties",
        description: "Inline styles on the root wrapper.",
      },
      {
        name: "gameName",
        type: "string",
        defaultValue: '"World War II"',
        description: "Placeholder game name in header (production: from game state).",
      },
      {
        name: "playAs",
        type: "string",
        defaultValue: '"Playing as USA"',
        description: "Placeholder country line in header (production: from game state).",
      },
      {
        name: "defaultOpen",
        type: "boolean",
        defaultValue: "false",
        description: "Start expanded (UI Kit / inspection).",
      },
    ],
    values: [
      { label: "Trigger size", light: "34×34", dark: "34×34" },
      { label: "Panel width (desktop)", light: "420px", dark: "420px" },
      { label: "Panel height (desktop)", light: "content-driven (px animated)", dark: "same" },
      {
        label: "Open transition",
        light: "width + height, var(--duration-ui) var(--ease-ui)",
        dark: "same",
      },
      { label: "Border radius", light: "6px", dark: "6px" },
      { label: "Gear icon size", light: "18×18", dark: "18×18" },
      {
        label: "Game placement",
        light: "left-[14px] top-[68px] (20px below header, 14px from left)",
        dark: "same",
      },
    ],
    viewportToggle: true,
  },
  {
    id: "settings-gear-icon",
    name: "SettingsGearIcon",
    importPath: "src/components/SettingsMenu/SettingsGearIcon.tsx",
    category: "icons",
    group: "Settings panel",
    kind: "component",
    description: "18×18 gear SVG. Uses currentColor via text-icon-primary.",
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional classes on the SVG.",
      },
    ],
    values: [
      { label: "Size", light: "18×18", dark: "18×18" },
      { label: "Source", light: "public/settings-gear.svg", dark: "same" },
    ],
  },
  {
    id: "settings-close-icon",
    name: "SettingsCloseIcon",
    importPath: "src/components/SettingsMenu/SettingsCloseIcon.tsx",
    category: "icons",
    group: "Settings panel",
    kind: "component",
    description: "14×14 close X for settings panel header.",
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional classes on the SVG.",
      },
    ],
    values: [
      { label: "Size", light: "14×14", dark: "14×14" },
    ],
  },
  {
    id: "settings-menu-item-icon",
    name: "SettingsMenuItemIcon",
    importPath: "src/components/SettingsMenu/SettingsMenuItemIcon.tsx",
    category: "icons",
    group: "Settings menu",
    kind: "component",
    description:
      "Masked menu icon from `public/icons/menu/{name}.svg`. Uses bg-icon-primary + CSS mask.",
    props: [
      {
        name: "name",
        type: "string",
        description: "File name without extension in public/icons/menu/.",
      },
      {
        name: "className",
        type: "string",
        description: "Additional classes (e.g. opacity, hover).",
      },
    ],
    values: [
      { label: "Size", light: "18×18", dark: "18×18" },
      {
        label: "Asset names",
        light:
          "Game settings, User settings, Tutorial, Events, Report bug, Discord, Wikipedia",
        dark: "same",
      },
    ],
  },
  {
    id: "settings-external-link-icon",
    name: "SettingsExternalLinkIcon",
    importPath: "src/components/SettingsMenu/SettingsExternalLinkIcon.tsx",
    category: "icons",
    group: "Settings menu",
    kind: "component",
    description: "9×9 external-link arrow for settings menu link rows.",
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional classes on the SVG.",
      },
    ],
    values: [
      { label: "Size", light: "9×9", dark: "9×9" },
      { label: "Stroke", light: "currentColor (text-icon-primary)", dark: "same" },
    ],
  },
  {
    id: "settings-menu-header",
    name: "SettingsMenuHeader",
    importPath: "src/components/SettingsMenu/SettingsMenuHeader.tsx",
    category: "components",
    group: "Settings menu",
    kind: "component",
    description:
      "Settings panel header: game name + play-as line, close button, divider. Title slot changes per menu state; close stays.",
    props: [
      {
        name: "onClose",
        type: "() => void",
        description: "Close handler (always wired to panel close).",
      },
      {
        name: "gameName",
        type: "string",
        defaultValue: '"World War II"',
        description: "Placeholder game name.",
      },
      {
        name: "playAs",
        type: "string",
        defaultValue: '"Playing as USA"',
        description: "Placeholder play-as line.",
      },
      {
        name: "title",
        type: "ReactNode",
        description: "Overrides gameName/playAs for other menu states.",
      },
    ],
    values: [
      { label: "Title", light: "16px text-text-primary", dark: "same" },
      { label: "Play-as", light: "14px, opacity-50", dark: "same" },
      { label: "Padding", light: "px-4 pt-4, divider pt-3", dark: "same" },
    ],
  },
  {
    id: "settings-menu-content",
    name: "SettingsMenuContent",
    importPath: "src/components/SettingsMenu/SettingsMenuContent.tsx",
    category: "components",
    group: "Settings menu",
    kind: "component",
    description: "Settings nav list: menu rows, divider, Discord + Wikipedia links.",
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional classes on the nav element.",
      },
    ],
    values: [
      { label: "Padding", light: "pl-4 pr-1 pt-5 pb-5", dark: "same" },
      { label: "Row gap", light: "16px (gap-4)", dark: "same" },
      { label: "Menu rows", light: "5 (button)", dark: "same" },
      { label: "Link rows", light: "2 (external)", dark: "same" },
    ],
  },
  {
    id: "settings-menu-item",
    name: "SettingsMenuItem",
    importPath: "src/components/SettingsMenu/SettingsMenuItem.tsx",
    category: "components",
    group: "Settings menu",
    kind: "component",
    description: "Settings menu button row — icon + label with slide-in reveal.",
    props: [
      {
        name: "icon",
        type: "string",
        description: "Icon file name in public/icons/menu/.",
      },
      {
        name: "label",
        type: "string",
        description: "Row label text.",
      },
      {
        name: "onClick",
        type: "() => void",
        description: "Optional click handler (sub-views later).",
      },
      {
        name: "className",
        type: "string",
        description: "Additional classes on the button.",
      },
    ],
    notes: ["Row opacity values documented under Styles → settings menu rows."],
  },
  {
    id: "settings-menu-link-item",
    name: "SettingsMenuLinkItem",
    importPath: "src/components/SettingsMenu/SettingsMenuLinkItem.tsx",
    category: "components",
    group: "Settings menu",
    kind: "component",
    description: "Settings menu external link row — icon + label + arrow, opens in new tab.",
    props: [
      {
        name: "icon",
        type: "string",
        description: "Icon file name in public/icons/menu/.",
      },
      {
        name: "label",
        type: "string",
        description: "Row label text.",
      },
      {
        name: "href",
        type: "string",
        description: "External URL (target=_blank).",
      },
      {
        name: "className",
        type: "string",
        description: "Additional classes on the anchor.",
      },
    ],
    values: [
      {
        label: "Arrow position",
        light: "absolute right-4 top-1/2 (20px from panel right)",
        dark: "same",
      },
    ],
    notes: ["Row opacity values documented under Styles → settings menu rows."],
  },
  {
    id: "prominence-anchor",
    name: "ProminenceAnchor",
    importPath: "src/components/ProminenceAnchor/ProminenceAnchor.tsx",
    category: "components",
    group: "Map overlay",
    kind: "component",
    description:
      "Wraps UI that should read over the map. Portals a blurred dark backdrop into the prominence layer.",
    props: [
      {
        name: "children",
        type: "ReactNode",
        description: "Anchored UI content.",
      },
      {
        name: "expand",
        type: "ProminenceExpand",
        description: "Px extension beyond anchor on each side { top, right, bottom, left }.",
      },
      {
        name: "className",
        type: "string",
        description: "Classes on the anchor wrapper.",
      },
    ],
    notes: ["Requires GameScreenShell prominence layer context."],
  },
  {
    id: "surface-panel-class",
    name: "surfacePanelClass",
    importPath: "src/lib/surface.ts",
    category: "styles",
    group: "Surfaces",
    kind: "style",
    description: "Shared Tailwind class string for primary UI panels (settings trigger, open panels).",
    values: [
      {
        label: "Classes",
        light: "rounded-[6px] backdrop-blur-[20px] bg-background-primary",
        dark: "same",
        tailwind: "surfacePanelClass",
      },
    ],
  },
  {
    id: "panel-size-transition-class",
    name: "panelSizeTransitionClass",
    importPath: "src/lib/transitions.ts",
    category: "styles",
    group: "Animations",
    kind: "style",
    description: "Width + height transition for expanding panels. Height must be a px value to animate.",
    values: [
      {
        label: "Classes",
        light: "transition-[width,height] duration-[var(--duration-ui)] ease-[var(--ease-ui)]",
        dark: "same",
        tailwind: "panelSizeTransitionClass",
      },
    ],
    notes: ["Pair with measured px height — CSS cannot transition to height: auto."],
  },
  {
    id: "icon-hitbox-class",
    name: "ICON_HITBOX_CLASS",
    importPath: "src/lib/icon-hitbox.ts",
    category: "styles",
    group: "Interaction",
    kind: "style",
    description: "Minimum 24×24 click target for icon-only controls. Icon graphic stays centered.",
    values: [
      {
        label: "Classes",
        light: "flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center",
        dark: "same",
        tailwind: "ICON_HITBOX_CLASS",
      },
      { label: "Size", light: "24×24", dark: "24×24" },
    ],
  },
  {
    id: "settings-menu-row-styles",
    name: "Settings menu rows",
    importPath: "src/components/SettingsMenu/SettingsMenuItem.tsx",
    category: "styles",
    group: "Hover states",
    kind: "style",
    description:
      "Visual patterns for settings menu rows. Defined inline on components — not extracted to shared utilities yet.",
    values: [
      {
        label: "Row icon",
        light: "opacity-50 → 100% on hover",
        dark: "same",
        tailwind: "opacity-50 group-hover:opacity-100",
      },
      {
        label: "Row label",
        light: "16px, opacity-90 → 100% on hover",
        dark: "same",
        tailwind: "text-base opacity-90 group-hover:opacity-100",
      },
      {
        label: "Header play-as",
        light: "14px, opacity-50",
        dark: "same",
        tailwind: "text-sm opacity-50",
      },
      {
        label: "External arrow",
        light: "opacity-40 → 100% on hover",
        dark: "same",
        tailwind: "opacity-40 group-hover:opacity-100",
      },
      {
        label: "Icon ↔ label gap",
        light: "24px",
        dark: "same",
        tailwind: "gap-6",
      },
    ],
    notes: [
      "Extract to shared classes only when the same pattern appears outside SettingsMenu.",
      "See SettingsMenuItem, SettingsMenuLinkItem, SettingsMenuHeader.",
    ],
  },
  {
    id: "settings-menu-reveal",
    name: "settingsMenuReveal",
    importPath: "src/components/SettingsMenu/settingsMenuReveal.ts",
    category: "styles",
    group: "Animations",
    kind: "style",
    description: "Motion slide-in for settings menu rows and header text (opacity + x offset).",
    values: [
      {
        label: "Initial",
        light: "opacity 0, x −10px",
        dark: "same",
      },
      {
        label: "Animate",
        light: "opacity 1, x 0",
        dark: "same",
      },
      {
        label: "Duration / ease",
        light: "var(--duration-ui), easeInOut",
        dark: "same",
      },
    ],
  },
  {
    id: "dev-theme-toggle",
    name: "DevThemeToggle",
    importPath: "src/components/dev/DevThemeToggle.tsx",
    category: "dev",
    group: "Dev tools",
    kind: "dev",
    description:
      "Fixed bottom-center dev bar: Light/Dark theme + Game/UI Kit navigation. Not part of game UI.",
    values: [
      { label: "Position", light: "bottom-4 center", dark: "bottom-4 center" },
      { label: "z-index", light: "100", dark: "100" },
    ],
  },
];

export function getUiKitEntriesByCategory(category: UiKitCategory) {
  return uiKitEntries.filter((entry) => entry.category === category);
}
