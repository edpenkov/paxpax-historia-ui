import { cn } from "@/lib/cn";

type SettingsExternalLinkIconProps = {
  className?: string;
};

export function SettingsExternalLinkIcon({ className }: SettingsExternalLinkIconProps) {
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
