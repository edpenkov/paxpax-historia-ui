import { cn } from "@/lib/cn";

type SettingsMenuRowTrailingIconProps = {
  /** chevron: button rows (hover). external-link: link rows. */
  variant: "chevron" | "external-link";
  className?: string;
};

export function SettingsMenuRowTrailingIcon({
  variant,
  className,
}: SettingsMenuRowTrailingIconProps) {
  if (variant === "external-link") {
    return (
      <svg
        width="9"
        height="9"
        viewBox="0 0 9 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        className={cn("h-[9px] w-[9px] shrink-0 text-icon-primary", className)}
      >
        <path
          d="M0.353516 8.5L8.35352 0.5M8.35352 6.5V0.5H2.35352"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
    );
  }

  return (
    <svg
      width="7"
      height="11"
      viewBox="0 0 7 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={cn("h-[11px] w-[7px] shrink-0 text-icon-primary", className)}
    >
      <path
        d="M0.353516 10.3555L5.35352 5.35547L0.353515 0.355469"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}
