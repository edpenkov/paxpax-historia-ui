export type GlobalCssVariable = {
  cssVar: string;
  label: string;
  light: string;
  dark: string;
  tailwind?: string;
};

/** Global CSS variables — update when adding tokens to `globals.css`. */
export const globalCssVariables: GlobalCssVariable[] = [
  {
    cssVar: "--background-primary",
    label: "Background",
    light: "rgba(221, 234, 243, 0.8)",
    dark: "rgba(0, 0, 0, 0.86)",
    tailwind: "bg-background-primary",
  },
  {
    cssVar: "--icon-primary",
    label: "Icon",
    light: "#00021E",
    dark: "#ffffff",
    tailwind: "text-icon-primary / bg-icon-primary",
  },
  {
    cssVar: "--text-primary",
    label: "Text",
    light: "#00021E",
    dark: "#ffffff",
    tailwind: "text-text-primary",
  },
];

export type GlobalTransitionVariable = {
  cssVar: string;
  label: string;
  value: string;
  notes?: string;
};

/** Transition tokens — sync with `src/lib/transitions.ts` and `globals.css`. */
export const globalTransitionVariables: GlobalTransitionVariable[] = [
  {
    cssVar: "--duration-ui",
    label: "UI duration",
    value: "200ms",
    notes: "Panel size, general UI transitions",
  },
  {
    cssVar: "--ease-ui",
    label: "UI easing",
    value: "ease",
    notes: "CSS easing for width/height etc.",
  },
  {
    cssVar: "--reveal-offset",
    label: "Reveal offset",
    value: "10px",
    notes: "Header text/icon slide-in (motion uses px from transitions.ts)",
  },
];
