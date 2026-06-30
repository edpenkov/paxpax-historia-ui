"use client";

import { cn } from "@/lib/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function PillButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-2.5 py-0.5 font-medium transition-colors",
        active
          ? "bg-white text-black shadow-sm dark:bg-white/15 dark:text-white"
          : "text-black/55 hover:text-black dark:text-white/55 dark:hover:text-white",
      )}
    >
      {children}
    </button>
  );
}

function PillLink({
  active,
  href,
  children,
}: {
  active: boolean;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-full px-2.5 py-0.5 font-medium transition-colors",
        active
          ? "bg-white text-black shadow-sm dark:bg-white/15 dark:text-white"
          : "text-black/55 hover:text-black dark:text-white/55 dark:hover:text-white",
      )}
    >
      {children}
    </Link>
  );
}

export function DevThemeToggle() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";
  const isGame = pathname === "/";
  const isUiKit = pathname === "/ui-kit";

  return (
    <div
      className="pointer-events-auto fixed bottom-4 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-2 rounded-full border border-black/15 bg-white/90 px-2 py-1 text-[11px] shadow-lg backdrop-blur-sm dark:border-white/15 dark:bg-black/85"
      aria-label="Developer controls"
    >
      <span className="px-1 font-medium text-black/45 dark:text-white/45">Dev</span>

      <div className="flex rounded-full bg-black/5 p-0.5 dark:bg-white/10" role="group" aria-label="Theme">
        <PillButton active={!isDark} onClick={() => setTheme("light")}>
          Light
        </PillButton>
        <PillButton active={isDark} onClick={() => setTheme("dark")}>
          Dark
        </PillButton>
      </div>

      <div className="flex rounded-full bg-black/5 p-0.5 dark:bg-white/10" role="group" aria-label="Screen">
        <PillLink active={isGame} href="/">
          Game
        </PillLink>
        <PillLink active={isUiKit} href="/ui-kit">
          UI Kit
        </PillLink>
      </div>
    </div>
  );
}
