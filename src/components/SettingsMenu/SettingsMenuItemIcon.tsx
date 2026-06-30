import { cn } from "@/lib/cn";

type SettingsMenuItemIconProps = {
  /** File name without extension in `public/icons/menu/`. */
  name: string;
  className?: string;
};

export function SettingsMenuItemIcon({ name, className }: SettingsMenuItemIconProps) {
  const src = `/icons/menu/${encodeURIComponent(name)}.svg`;

  return (
    <span
      aria-hidden
      className={cn("inline-block h-[18px] w-[18px] shrink-0 bg-icon-primary", className)}
      style={{
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
      }}
    />
  );
}
