"use client";

import { SettingsMenuChevronIcon } from "@/components/SettingsMenu/SettingsMenuChevronIcon";
import { SettingsMenuItemIcon } from "@/components/SettingsMenu/SettingsMenuItemIcon";
import { settingsMenuRowChevronClass, settingsMenuRowIconClass, settingsMenuRowLabelClass } from "@/components/SettingsMenu/settingsMenuRowStyles";
import { useSettingsMenuReveal } from "@/components/SettingsMenu/SettingsMenuRevealContext";
import { cn } from "@/lib/cn";
import { motion } from "motion/react";

type SettingsMenuItemProps = {
  icon: string;
  label: string;
  onClick?: () => void;
  className?: string;
};

export function SettingsMenuItem({ icon, label, onClick, className }: SettingsMenuItemProps) {
  const settingsMenuReveal = useSettingsMenuReveal();

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
        <SettingsMenuItemIcon name={icon} className={settingsMenuRowIconClass} />
        <span className={cn("min-w-0", settingsMenuRowLabelClass)}>{label}</span>
      </motion.div>
      <SettingsMenuChevronIcon className={settingsMenuRowChevronClass} />
    </motion.button>
  );
}
