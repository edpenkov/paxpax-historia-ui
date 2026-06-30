/** Inset fill for icon controls — hover (desktop), active (touch), aria-expanded (mobile open). */
export const settingsIconControlHoverClass =
  "transition-[box-shadow] hover:shadow-[inset_0_0_0_9999px_rgb(0_0_0/0.1)] dark:hover:shadow-[inset_0_0_0_9999px_rgb(255_255_255/0.1)] active:shadow-[inset_0_0_0_9999px_rgb(0_0_0/0.1)] dark:active:shadow-[inset_0_0_0_9999px_rgb(255_255_255/0.1)] aria-expanded:shadow-[inset_0_0_0_9999px_rgb(0_0_0/0.1)] dark:aria-expanded:shadow-[inset_0_0_0_9999px_rgb(255_255_255/0.1)]";

/** Icon opacity inside a named group — hover, touch active, or aria-expanded on control. */
export const settingsIconControlIconClass =
  "opacity-75 transition-opacity group-hover/control:opacity-100 group-active/control:opacity-100 group-aria-expanded/control:opacity-100 dark:opacity-90 dark:group-hover/control:opacity-100 dark:group-active/control:opacity-100 dark:group-aria-expanded/control:opacity-100";

/** Closed gear trigger panel shell (34×34). */
export const settingsTriggerHoverClass = settingsIconControlHoverClass;
