import { cn } from "@/lib/cn";

type SettingsCloseIconProps = {
  className?: string;
};

export function SettingsCloseIcon({ className }: SettingsCloseIconProps) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={cn("h-[14px] w-[14px] shrink-0 text-icon-primary", className)}
    >
      <path
        d="M6.99805 5.63574L12.5742 0.000976562L13.9961 1.40723L8.46191 7.00195L13.9961 12.5957L12.5742 14.002L6.99707 8.36523L1.42188 14.001L0 12.5947L5.53418 7L0 1.40625L1.42188 0L6.99805 5.63574Z"
        fill="currentColor"
      />
    </svg>
  );
}
