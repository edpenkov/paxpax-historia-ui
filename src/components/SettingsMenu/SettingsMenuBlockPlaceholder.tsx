import { cn } from "@/lib/cn";

type SettingsMenuBlockPlaceholderProps = {
  className?: string;
};

export function SettingsMenuBlockPlaceholder({ className }: SettingsMenuBlockPlaceholderProps) {
  return (
    <div
      aria-hidden
      className={cn("h-[104px] w-full bg-text-primary/15 dark:bg-white/15", className)}
    />
  );
}
