"use client";

import { SettingsMenuChevronIcon } from "@/components/SettingsMenu/SettingsMenuChevronIcon";
import { SettingsMenuItemIcon } from "@/components/SettingsMenu/SettingsMenuItemIcon";
import { settingsMenuRowLabelClass } from "@/components/SettingsMenu/settingsMenuRowStyles";
import { settingsMenuReveal } from "@/components/SettingsMenu/settingsMenuReveal";
import { cn } from "@/lib/cn";
import { motion } from "motion/react";

type SettingsMenuItemProps = {
  icon: string;
  label: string;
  onClick?: () => void;
  className?: string;
};

export function SettingsMenuItem({ icon, label, onClick, className }: SettingsMenuItemProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
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
        <span className={cn("min-w-0", settingsMenuRowLabelClass)}>{label}</span>
      </motion.div>
      <SettingsMenuChevronIcon className="pointer-events-none absolute top-1/2 right-4 shrink-0 -translate-y-1/2 opacity-0 transition-opacity duration-[200ms] ease-[var(--ease-ui)] group-hover:opacity-40" />
    </motion.button>
  );
}
