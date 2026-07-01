"use client";

import { SettingsMenuBlockPlaceholder } from "@/components/SettingsMenu/SettingsMenuBlockPlaceholder";
import { SettingsMenuRowTrailingIcon } from "@/components/SettingsMenu/SettingsMenuRowTrailingIcon";
import { settingsMenuAccordionTransition } from "@/components/SettingsMenu/settingsMenuAccordionTransition";
import { settingsMenuRowLabelClass } from "@/components/SettingsMenu/settingsMenuRowStyles";
import { cn } from "@/lib/cn";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";

type SettingsSubSectionRowProps = {
  label: string;
  isOpen?: boolean;
  onPress: () => void;
  /** Mobile panel — chevron points right and navigates to a new page. Desktop — accordion. */
  isMobileLayout: boolean;
  children?: ReactNode;
  className?: string;
};

export function SettingsSubSectionRow({
  label,
  isOpen = false,
  onPress,
  isMobileLayout,
  children,
  className,
}: SettingsSubSectionRowProps) {
  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={onPress}
        aria-expanded={isMobileLayout ? undefined : isOpen}
        className="relative flex w-full cursor-pointer items-center text-left"
      >
        <span className={cn("min-w-0 pr-10", settingsMenuRowLabelClass)}>{label}</span>
        <SettingsMenuRowTrailingIcon
          variant="chevron"
          className={cn(
            "pointer-events-none absolute top-1/2 right-4 shrink-0 -translate-y-1/2 opacity-40 transition-transform duration-[var(--duration-ui-medium)] ease-[var(--ease-ui)]",
            !isMobileLayout && (isOpen ? "-rotate-90" : "rotate-90"),
          )}
        />
      </button>

      {!isMobileLayout ? (
        <AnimatePresence initial={false}>
          {isOpen ? (
            <motion.div
              key="accordion-panel"
              className="overflow-hidden"
              {...settingsMenuAccordionTransition}
            >
              {children}
            </motion.div>
          ) : null}
        </AnimatePresence>
      ) : null}
    </div>
  );
}

type SettingsSubSectionRowPanelProps = {
  className?: string;
};

export function SettingsSubSectionRowPanel({ className }: SettingsSubSectionRowPanelProps) {
  return (
    <div className={cn("py-[18px]", className)}>
      <SettingsMenuBlockPlaceholder />
    </div>
  );
}
