import { cn } from "@/lib/cn";

type SettingsMenuChevronIconProps = {
  className?: string;
};

export function SettingsMenuChevronIcon({ className }: SettingsMenuChevronIconProps) {
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
