/** Shared panel surface — blur + primary background (triggers and expanded panels). */
export const surfacePanelBaseClass = "backdrop-blur-[20px] bg-background-primary";

export const surfacePanelClass = `${surfacePanelBaseClass} rounded-[6px]`;

/** Alias — same chrome for collapsed controls and open panels. */
export const surfaceTriggerClass = surfacePanelClass;

/** Expanded settings panel — larger corner radius. */
export const surfacePanelOpenClass = `${surfacePanelBaseClass} rounded-[12px]`;
