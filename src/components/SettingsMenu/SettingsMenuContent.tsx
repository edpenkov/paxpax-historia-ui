import { DividerLine } from "@/components/DividerLine/DividerLine";
import { SettingsMenuItem } from "@/components/SettingsMenu/SettingsMenuItem";
import { cn } from "@/lib/cn";

const MENU_ITEMS = [
  { icon: "Game settings", label: "Game settings" },
  { icon: "User settings", label: "User settings" },
  { icon: "Tutorial", label: "Tutorial" },
  { icon: "Events", label: "Events" },
  { icon: "Report bug", label: "Report bug" },
] as const;

const LINK_ITEMS = [
  {
    icon: "Discord",
    label: "Discord",
    href: "https://discord.com/invite/paxhistoria",
  },
  {
    icon: "Wikipedia",
    label: "Wikipedia",
    href: "https://wiki.paxhistoria.co/wiki/Main_Page",
  },
] as const;

type SettingsMenuContentProps = {
  className?: string;
};

export function SettingsMenuContent({ className }: SettingsMenuContentProps) {
  return (
    <nav
      aria-label="Settings"
      className={cn("flex flex-col gap-4 pl-4 pr-1 pt-3 pb-5", className)}
    >
      {MENU_ITEMS.map((item) => (
        <SettingsMenuItem key={item.label} icon={item.icon} label={item.label} />
      ))}

      <DividerLine />
      {LINK_ITEMS.map((item) => (
        <SettingsMenuItem
          key={item.label}
          icon={item.icon}
          label={item.label}
          href={item.href}
        />
      ))}
    </nav>
  );
}
