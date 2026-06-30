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
  kind: "component" | "utility" | "dev";
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
    id: "surface-panel-class",
    name: "surfacePanelClass",
    importPath: "src/lib/surface.ts",
    category: "general",
    kind: "utility",
    description: "Shared Tailwind class string for primary UI panels (settings, modals, etc.).",
    values: [
      {
        label: "Classes",
        light: "rounded-[6px] backdrop-blur-[20px] bg-background-primary",
        dark: "same (theme via CSS variable)",
      },
    ],
  },
  {
    id: "game-screen",
    name: "GameScreen",
    importPath: "src/components/GameScreen/GameScreen.tsx",
    category: "components",
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
    kind: "component",
    description:
      "Settings entry trigger. 34×34 primary background panel with gear icon; will expand into a panel later.",
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
    ],
    values: [
      { label: "Trigger size", light: "34×34", dark: "34×34" },
      { label: "Border radius", light: "6px", dark: "6px" },
      { label: "Icon size", light: "18×18", dark: "18×18" },
      {
        label: "Game placement",
        light: "left-5 top-[68px] (20px below header)",
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
    id: "prominence-anchor",
    name: "ProminenceAnchor",
    importPath: "src/components/ProminenceAnchor/ProminenceAnchor.tsx",
    category: "components",
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
    id: "dev-theme-toggle",
    name: "DevThemeToggle",
    importPath: "src/components/dev/DevThemeToggle.tsx",
    category: "dev",
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
