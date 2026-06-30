import { surfacePanelBaseClass } from "@/lib/surface";
import { cn } from "@/lib/cn";

type MobileControlDividerProps = {
  className?: string;
};

/** 1px bridge between mobile top controls — panel surface with a 10% divider line on top. */
export function MobileControlDivider({ className }: MobileControlDividerProps) {
  return (
    <div
      aria-hidden
      className={cn(
        surfacePanelBaseClass,
        "relative w-px shrink-0 self-stretch rounded-none",
        className,
      )}
    >
      <div aria-hidden className="absolute inset-0 bg-text-primary/10" />
    </div>
  );
}
