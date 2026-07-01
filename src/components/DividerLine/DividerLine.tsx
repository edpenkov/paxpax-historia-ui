import { surfacePanelBaseClass } from "@/lib/surface";
import { cn } from "@/lib/cn";

type DividerLineProps = {
  className?: string;
  orientation?: "horizontal" | "vertical";
  /** line: 1px hr. bridge: panel surface + overlay (mobile top bar seam). */
  variant?: "line" | "bridge";
};

export function DividerLine({
  className,
  orientation = "horizontal",
  variant = "line",
}: DividerLineProps) {
  if (variant === "bridge") {
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

  if (orientation === "vertical") {
    return (
      <hr
        aria-hidden
        className={cn("w-px shrink-0 self-stretch border-0 bg-text-primary/10", className)}
      />
    );
  }

  return (
    <hr
      aria-hidden
      className={cn("mx-0 my-1 h-px border-0 bg-text-primary/10", className)}
    />
  );
}
