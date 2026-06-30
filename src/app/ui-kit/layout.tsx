import type { ReactNode } from "react";

export default function UiKitLayout({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-40 overflow-y-auto bg-neutral-50 dark:bg-neutral-950">
      {children}
    </div>
  );
}
