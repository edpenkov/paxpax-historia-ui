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
