/** Menu row icon — hover on desktop, active (touch) on mobile. */
export const settingsMenuRowIconClass =
  "opacity-50 transition-opacity group-hover:opacity-100 max-md:group-active:opacity-100";

/** Menu row label — opacity on hover / mobile active (200ms). */
export const settingsMenuRowLabelClass =
  "text-base font-normal text-text-primary opacity-90 transition-opacity duration-[200ms] ease-[var(--ease-ui)] group-hover:opacity-100 max-md:group-active:opacity-100";

/** Button row chevron — visible on hover / mobile active. */
export const settingsMenuRowChevronClass =
  "pointer-events-none absolute top-1/2 right-4 shrink-0 -translate-y-1/2 opacity-0 transition-opacity duration-[200ms] ease-[var(--ease-ui)] group-hover:opacity-40 max-md:group-active:opacity-40";

/** Link row external arrow — hover / mobile active. */
export const settingsMenuRowExternalLinkClass =
  "pointer-events-none absolute top-1/2 right-4 shrink-0 -translate-y-1/2 opacity-40 transition-opacity group-hover:opacity-100 max-md:group-active:opacity-100";
