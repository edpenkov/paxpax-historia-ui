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
  /** Links to related catalog entries (shown on the card). */
  relatedEntries?: { id: string; label: string }[];
  /** Lock preview to one viewport width (no Desktop / Mobile toggle). */
  previewViewport?: "desktop" | "mobile";
  /** Show Desktop / Mobile preview toggle. Ignored when previewViewport is set. */
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
    description: "1px rule using text-primary at 10% opacity. variant=bridge for mobile top-bar seam.",
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional classes on the element.",
      },
      {
        name: "orientation",
        type: '"horizontal" | "vertical"',
        defaultValue: '"horizontal"',
        description: "line variant only. Vertical: 1px wide, stretches to container height.",
      },
      {
        name: "variant",
        type: '"line" | "bridge"',
        defaultValue: '"line"',
        description: "bridge: panel surface + 10% overlay (mobile top bar between buttons).",
      },
    ],
    values: [
      { label: "Height", light: "1px", dark: "1px" },
      { label: "Color", light: "text-primary / 10%", dark: "same" },
      { label: "Vertical margin", light: "4px (my-1) horizontal line only", dark: "same" },
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
      {
        name: "className",
        type: "string",
        description: "Classes on the root viewport wrapper.",
      },
      {
        name: "mapClassName",
        type: "string",
        description: "Classes on the map image (e.g. object position).",
      },
      {
        name: "containProminence",
        type: "boolean",
        defaultValue: "false",
        description: "UI Kit previews: keep prominence backdrops inside this shell.",
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
    group: "Header — desktop",
    kind: "component",
    description:
      "48px desktop header (md+). Hamburger + PaxHistoria title with prominence backdrop. Not shown on mobile.",
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
    previewViewport: "desktop",
    relatedEntries: [{ id: "mobile-top-controls", label: "Mobile header equivalent" }],
    notes: ["Hidden below md. Mobile layout uses MobileTopControls."],
  },
  {
    id: "hamburger-icon",
    name: "HamburgerIcon",
    importPath: "src/components/DesktopHeader/HamburgerIcon.tsx",
    category: "icons",
    group: "Header — desktop",
    kind: "component",
    description: "20×12 menu icon. Header variant: white + shadow. Control variant: matches settings gear.",
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional classes on the SVG.",
      },
      {
        name: "variant",
        type: '"header" | "control"',
        defaultValue: '"header"',
        description: "Control: currentColor + icon opacity (mobile top bar).",
      },
    ],
    values: [
      { label: "Size", light: "20×12", dark: "20×12" },
      { label: "Fill (header)", light: "white + drop shadow", dark: "same" },
      { label: "Fill (control)", light: "currentColor (text-icon-primary)", dark: "same" },
    ],
    notes: ["Preview shows both variants. Control variant is used in MobileTopBarButton (left)."],
  },
  {
    id: "mobile-top-controls",
    name: "MobileTopControls",
    importPath: "src/components/MobileTopControls/MobileTopControls.tsx",
    category: "components",
    group: "Header — mobile",
    kind: "component",
    description:
      "Mobile top-left controls: 44×44 menu + 1px divider + 44×44 settings (89px row). Settings panel drops below with 4px gap.",
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
        description: "Placeholder game name in settings panel header.",
      },
      {
        name: "playAs",
        type: "string",
        defaultValue: '"Playing as USA"',
        description: "Placeholder country line in settings panel header.",
      },
      {
        name: "defaultOpen",
        type: "boolean",
        defaultValue: "false",
        description: "Start with settings panel open (UI Kit / inspection).",
      },
    ],
    values: [
      { label: "Position", light: "top-1 left-1 (4px)", dark: "same" },
      { label: "Row size", light: "89×44 (44 + 1 divider + 44)", dark: "same" },
      { label: "Corner radius", light: "8px outer left (menu) + outer right (settings)", dark: "same" },
      { label: "Divider", light: "DividerLine variant=bridge", dark: "same" },
      { label: "Panel gap", light: "4px (mt-1) below row", dark: "same" },
      { label: "Panel width", light: "calc(100vw − 8px)", dark: "same" },
      { label: "Panel radius (open)", light: "12px", dark: "same" },
      { label: "Visibility", light: "md:hidden", dark: "md:hidden" },
    ],
    previewViewport: "mobile",
    relatedEntries: [
      { id: "desktop-header", label: "Desktop header (md+)" },
      { id: "settings-menu", label: "Settings panel (toggle preview)" },
    ],
  },
  {
    id: "mobile-top-bar-button",
    name: "MobileTopBarButton",
    importPath: "src/components/MobileTopControls/MobileTopBarButton.tsx",
    category: "components",
    group: "Header — mobile",
    kind: "component",
    description:
      "44×44 mobile top-bar button. position=left: hamburger menu. position=right: settings gear with aria-expanded.",
    props: [
      {
        name: "position",
        type: '"left" | "right"',
        description: "Left: menu trigger. Right: settings trigger (rounded outer edge).",
      },
      {
        name: "className",
        type: "string",
        description: "Additional classes on the button.",
      },
      {
        name: "onClick",
        type: "() => void",
        description: "Click handler (required for settings; optional for menu placeholder).",
      },
      {
        name: "isOpen",
        type: "boolean",
        defaultValue: "false",
        description: "Right button only — settings panel open state (aria-expanded).",
      },
    ],
    values: [
      { label: "Size", light: "44×44 (h-11 w-11)", dark: "same" },
      {
        label: "Surface (left)",
        light: "mobileControlSurfaceLeftClass (rounded-l-[8px])",
        dark: "same",
      },
      {
        label: "Surface (right)",
        light: "mobileControlSurfaceRightClass (rounded-r-[8px])",
        dark: "same",
      },
    ],
    previewViewport: "mobile",
  },
  {
    id: "settings-menu",
    name: "SettingsMenu",
    importPath: "src/components/SettingsMenu/SettingsMenu.tsx",
    category: "components",
    group: "Settings menu",
    kind: "component",
    description:
      "Settings panel (desktop). 34×34 gear trigger morphs to 420px wide, content-driven height. Mobile: use MobileTopControls.",
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
      {
        label: "Trigger hover",
        light: "10% black inset fill",
        dark: "10% white inset fill",
      },
      { label: "Panel width (desktop)", light: "420px", dark: "420px" },
      { label: "Panel height (desktop)", light: "content-driven (px animated)", dark: "same" },
      {
        label: "Open transition",
        light: "width + height + border-radius, var(--duration-ui) var(--ease-ui)",
        dark: "same",
      },
      { label: "Border radius (closed)", light: "6px", dark: "6px" },
      { label: "Border radius (open)", light: "12px", dark: "12px" },
      { label: "Gear icon size", light: "18×18", dark: "18×18" },
      {
        label: "Game placement",
        light: "left-[14px] top-[68px] (20px below header, 14px from left)",
        dark: "same",
      },
    ],
    viewportToggle: true,
    relatedEntries: [{ id: "mobile-top-controls", label: "Mobile settings entry point" }],
  },
  {
    id: "settings-panel-icon",
    name: "SettingsPanelIcon",
    importPath: "src/components/SettingsMenu/SettingsPanelIcon.tsx",
    category: "icons",
    group: "Settings panel",
    kind: "component",
    description: "Settings panel SVG icons. gear: 18×18 trigger. close: 14×14 header X.",
    props: [
      {
        name: "variant",
        type: '"gear" | "close"',
        description: "Which panel icon to render.",
      },
      {
        name: "className",
        type: "string",
        description: "Additional classes on the SVG.",
      },
    ],
    values: [
      { label: "Gear size", light: "18×18", dark: "18×18" },
      { label: "Close size", light: "14×14", dark: "14×14" },
      { label: "Gear opacity", light: "75% / 90% dark, 100% on group hover", dark: "same" },
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
      { label: "Size", light: "16×16", dark: "16×16" },
      {
        label: "Asset names",
        light:
          "Game settings, User settings, Tutorial, Events, Report bug, Discord, Wikipedia",
        dark: "same",
      },
    ],
  },
  {
    id: "settings-menu-row-trailing-icon",
    name: "SettingsMenuRowTrailingIcon",
    importPath: "src/components/SettingsMenu/SettingsMenuRowTrailingIcon.tsx",
    category: "icons",
    group: "Settings menu",
    kind: "component",
    description:
      "Trailing arrow on menu rows. chevron: button rows (hover). external-link: link rows.",
    props: [
      {
        name: "variant",
        type: '"chevron" | "external-link"',
        description: "Which trailing icon to render.",
      },
      {
        name: "className",
        type: "string",
        description: "Additional classes on the SVG (position, opacity).",
      },
    ],
    values: [
      { label: "Chevron size", light: "7×11", dark: "7×11" },
      { label: "External size", light: "9×9", dark: "9×9" },
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
      { label: "Padding", light: "pl-4 pr-1 pt-3 pb-5", dark: "same" },
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
    description:
      "Settings menu row — button (chevron on hover) or external link (href + arrow). Same layout and reveal.",
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
        description: "When set, renders as external link (target=_blank) with arrow icon.",
      },
      {
        name: "onClick",
        type: "() => void",
        description: "Button row only — optional click handler (sub-views later).",
      },
      {
        name: "className",
        type: "string",
        description: "Additional classes on the row.",
      },
    ],
    notes: [
      "Row opacity values documented under Styles → settings menu rows.",
      "Button: chevron at right-4, hidden until hover/active, opacity-40.",
      "Link: external arrow always visible at opacity-40 → 100% on hover/active.",
    ],
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
    notes: ["Requires GameScreen prominence layer context."],
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
    description: "Width + height + border-radius transition for expanding panels. Height must be a px value to animate.",
    values: [
      {
        label: "Classes",
        light:
          "transition-[width,height,border-radius] duration-[var(--duration-ui)] ease-[var(--ease-ui)]",
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
      "Visual patterns for settings menu rows. Hover on desktop; max-md group-active mirrors hover on touch.",
    values: [
      {
        label: "Row icon",
        light: "opacity-50 → 100% on hover / mobile active",
        dark: "same",
        tailwind: "settingsMenuRowIconClass",
      },
      {
        label: "Row label",
        light: "16px, opacity-90 → 100% on hover / mobile active (200ms)",
        dark: "same",
        tailwind: "settingsMenuRowLabelClass",
      },
      {
        label: "Button chevron",
        light: "hidden → opacity-40 on hover / mobile active",
        dark: "same",
        tailwind: "settingsMenuRowChevronClass",
      },
      {
        label: "Header play-as",
        light: "14px, opacity-50",
        dark: "same",
        tailwind: "text-sm opacity-50",
      },
      {
        label: "External arrow",
        light: "opacity-40 → 100% on hover / mobile active",
        dark: "same",
        tailwind: "settingsMenuRowExternalLinkClass",
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
      "See SettingsMenuItem, SettingsMenuHeader.",
    ],
  },
  {
    id: "settings-menu-reveal",
    name: "settingsMenuReveal",
    importPath: "src/components/SettingsMenu/settingsMenuReveal.ts",
    category: "styles",
    group: "Animations",
    kind: "style",
    description:
      "Motion slide-in for settings menu rows and header. Desktop: opacity + x. Mobile: opacity + y.",
    values: [
      {
        label: "Initial (desktop)",
        light: "opacity 0, x −10px",
        dark: "same",
      },
      {
        label: "Initial (mobile)",
        light: "opacity 0, y −10px",
        dark: "same",
      },
      {
        label: "Animate",
        light: "opacity 1, x/y 0",
        dark: "same",
      },
      {
        label: "Duration / ease",
        light: "var(--duration-ui), easeInOut",
        dark: "same",
      },
    ],
    viewportToggle: true,
    notes: [
      "Use Desktop / Mobile toggle. Mobile uses y-axis slide-in via SettingsMenuRevealProvider.",
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
