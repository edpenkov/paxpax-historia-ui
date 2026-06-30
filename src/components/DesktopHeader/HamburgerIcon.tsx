import { cn } from "@/lib/cn";

const SHADOW = "drop-shadow-[0_0_4px_rgba(0,0,0,0.25)]";

type HamburgerIconProps = {
  className?: string;
};

export function HamburgerIcon({ className }: HamburgerIconProps) {
  return (
    <svg
      width="20"
      height="12"
      viewBox="0 0 20 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={cn("shrink-0", SHADOW, className)}
    >
      <path
        d="M20 12.001H0V10.501H20V12.001ZM20 6.74707H0V5.24707H20V6.74707ZM20 1.5H0V0H20V1.5Z"
        fill="white"
      />
    </svg>
  );
}
