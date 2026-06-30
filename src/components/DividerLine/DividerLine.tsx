import { cn } from "@/lib/cn";

type DividerLineProps = {
  className?: string;
};

export function DividerLine({ className }: DividerLineProps) {
  return (
    <hr
      aria-hidden
      className={cn("mx-0 my-1 h-px border-0 bg-text-primary/10", className)}
    />
  );
}
