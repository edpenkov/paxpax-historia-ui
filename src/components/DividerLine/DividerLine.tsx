import { cn } from "@/lib/cn";

type DividerLineProps = {
  className?: string;
  orientation?: "horizontal" | "vertical";
};

export function DividerLine({ className, orientation = "horizontal" }: DividerLineProps) {
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
