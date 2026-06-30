"use client";

import { SettingsExternalLinkIcon } from "@/components/SettingsMenu/SettingsExternalLinkIcon";
import { SettingsMenuItemIcon } from "@/components/SettingsMenu/SettingsMenuItemIcon";
import { settingsMenuReveal } from "@/components/SettingsMenu/settingsMenuReveal";
import { cn } from "@/lib/cn";
import { motion } from "motion/react";

type SettingsMenuLinkItemProps = {
  icon: string;
  label: string;
  href: string;
  className?: string;
};

export function SettingsMenuLinkItem({
  icon,
  label,
  href,
  className,
}: SettingsMenuLinkItemProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative flex w-full cursor-pointer items-center text-left transition-opacity",
        className,
      )}
    >
      <motion.div
        className="flex min-w-0 flex-1 items-center gap-6"
        {...settingsMenuReveal}
      >
        <SettingsMenuItemIcon
          name={icon}
          className="opacity-50 transition-opacity group-hover:opacity-100"
        />
        <span className="min-w-0 text-base font-normal text-text-primary opacity-90 transition-opacity group-hover:opacity-100">
          {label}
        </span>
      </motion.div>
      <SettingsExternalLinkIcon className="pointer-events-none absolute top-1/2 right-4 shrink-0 -translate-y-1/2 opacity-40 transition-opacity group-hover:opacity-100" />
    </motion.a>
  );
}
