"use client";

import { SettingsMenuItemIcon } from "@/components/SettingsMenu/SettingsMenuItemIcon";
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
        "group flex w-full cursor-pointer items-center gap-6 text-left transition-opacity",
        className,
      )}
      {...settingsMenuReveal}
    >
      <SettingsMenuItemIcon
        name={icon}
        className="opacity-50 transition-opacity group-hover:opacity-100"
      />
      <span className="text-base font-normal text-text-primary opacity-90 transition-opacity group-hover:opacity-100">
        {label}
      </span>
    </motion.button>
  );
}
