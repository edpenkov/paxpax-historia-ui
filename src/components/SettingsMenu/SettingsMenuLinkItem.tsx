"use client";

import { SettingsExternalLinkIcon } from "@/components/SettingsMenu/SettingsExternalLinkIcon";
import { SettingsMenuItemIcon } from "@/components/SettingsMenu/SettingsMenuItemIcon";
import { settingsMenuRowExternalLinkClass, settingsMenuRowIconClass, settingsMenuRowLabelClass } from "@/components/SettingsMenu/settingsMenuRowStyles";
import { useSettingsMenuReveal } from "@/components/SettingsMenu/SettingsMenuRevealContext";
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
  const settingsMenuReveal = useSettingsMenuReveal();

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
        <SettingsMenuItemIcon name={icon} className={settingsMenuRowIconClass} />
        <span className={cn("min-w-0", settingsMenuRowLabelClass)}>{label}</span>
      </motion.div>
      <SettingsExternalLinkIcon className={settingsMenuRowExternalLinkClass} />
    </motion.a>
  );
}
