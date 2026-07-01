"use client";

import { SettingsMenuRowTrailingIcon } from "@/components/SettingsMenu/SettingsMenuRowTrailingIcon";
import { SettingsMenuItemIcon } from "@/components/SettingsMenu/SettingsMenuItemIcon";
import {
  settingsMenuRowChevronClass,
  settingsMenuRowExternalLinkClass,
  settingsMenuRowIconClass,
  settingsMenuRowLabelClass,
} from "@/components/SettingsMenu/settingsMenuRowStyles";
import { useSettingsMenuReveal, useSettingsMenuRevealDirection } from "@/components/SettingsMenu/SettingsMenuRevealContext";
import { cn } from "@/lib/cn";
import { motion } from "motion/react";

type SettingsMenuItemBase = {
  icon: string;
  label: string;
  className?: string;
};

type SettingsMenuItemButtonProps = SettingsMenuItemBase & {
  href?: undefined;
  onClick?: () => void;
};

type SettingsMenuItemLinkProps = SettingsMenuItemBase & {
  href: string;
  onClick?: never;
};

export type SettingsMenuItemProps = SettingsMenuItemButtonProps | SettingsMenuItemLinkProps;

const rowClassName = "group relative flex w-full cursor-pointer items-center text-left transition-opacity";

function SettingsMenuRowContent({ icon, label }: Pick<SettingsMenuItemProps, "icon" | "label">) {
  const settingsMenuReveal = useSettingsMenuReveal();
  const direction = useSettingsMenuRevealDirection();

  return (
    <motion.div
      key={`${label}-${direction}`}
      className="flex min-w-0 flex-1 items-center gap-6"
      {...settingsMenuReveal}
    >
      <SettingsMenuItemIcon name={icon} className={settingsMenuRowIconClass} />
      <span className={cn("min-w-0", settingsMenuRowLabelClass)}>{label}</span>
    </motion.div>
  );
}

export function SettingsMenuItem(props: SettingsMenuItemProps) {
  const { icon, label, className } = props;

  if (props.href) {
    return (
      <motion.a
        href={props.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(rowClassName, className)}
      >
        <SettingsMenuRowContent icon={icon} label={label} />
        <SettingsMenuRowTrailingIcon
          variant="external-link"
          className={settingsMenuRowExternalLinkClass}
        />
      </motion.a>
    );
  }

  return (
    <motion.button type="button" onClick={props.onClick} className={cn(rowClassName, className)}>
      <SettingsMenuRowContent icon={icon} label={label} />
      <SettingsMenuRowTrailingIcon variant="chevron" className={settingsMenuRowChevronClass} />
    </motion.button>
  );
}
