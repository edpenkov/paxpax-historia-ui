/** Inset hover fill for icon controls (keeps panel bg + blur visible). */
export const settingsIconControlHoverClass =
  "transition-[box-shadow] hover:shadow-[inset_0_0_0_9999px_rgb(0_0_0/0.1)] dark:hover:shadow-[inset_0_0_0_9999px_rgb(255_255_255/0.1)]";

/** Icon opacity inside a named group — 75% light, 90% dark, 100% on group hover. */
export const settingsIconControlIconClass =
  "opacity-75 transition-opacity group-hover/control:opacity-100 dark:opacity-90";

/** Closed gear trigger panel shell (34×34). */
export const settingsTriggerHoverClass = settingsIconControlHoverClass;
