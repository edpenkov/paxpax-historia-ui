"use client";

import { globalCssVariables, globalTransitionVariables } from "@/lib/ui-kit/variables";
import { surfacePanelClass } from "@/lib/surface";
import { SettingsPanelIcon } from "@/components/SettingsMenu/SettingsPanelIcon";
import { cn } from "@/lib/cn";

function VariableSwatch({ previewClass, cssVar }: { previewClass?: string; cssVar: string }) {
  if (previewClass) {
    return (
      <div
        className={cn(
          "flex h-14 w-14 shrink-0 items-center justify-center rounded-md border border-black/10 dark:border-white/10",
          previewClass,
        )}
      >
        {cssVar === "--icon-primary" && <SettingsPanelIcon variant="gear" />}
        {cssVar === "--text-primary" && (
          <span className="text-xs font-medium text-text-primary">Aa</span>
        )}
      </div>
    );
  }

  return (
    <div
      className="h-14 w-14 shrink-0 rounded-md border border-black/10 dark:border-white/10"
      style={{ background: `var(${cssVar})` }}
    />
  );
}

export function UiKitVariablesPanel() {
  return (
    <div className="space-y-8">
      <section className="rounded-lg border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-neutral-950">
        <h2 className="mb-4 text-lg font-semibold text-text-primary">Global CSS variables</h2>
        <p className="mb-6 text-sm text-black/65 dark:text-white/65">
          Defined in{" "}
          <code className="rounded bg-black/5 px-1 py-0.5 text-xs dark:bg-white/10">
            src/app/globals.css
          </code>
          . Swatches reflect the active theme.
        </p>

        <div className="space-y-4">
          {globalCssVariables.map((variable) => (
            <div
              key={variable.cssVar}
              className="flex flex-wrap items-center gap-4 rounded-md border border-black/10 p-4 dark:border-white/10"
            >
              <VariableSwatch
                cssVar={variable.cssVar}
                previewClass={
                  variable.cssVar === "--background-primary"
                    ? cn(surfacePanelClass, "backdrop-blur-[20px]")
                    : variable.cssVar === "--icon-primary"
                      ? "bg-neutral-200 dark:bg-neutral-800"
                      : variable.cssVar === "--text-primary"
                        ? "bg-neutral-100 dark:bg-neutral-900"
                        : undefined
                }
              />
              <div className="min-w-0 flex-1">
                <p className="font-medium text-text-primary">{variable.label}</p>
                <p className="font-mono text-xs text-black/50 dark:text-white/50">
                  {variable.cssVar}
                </p>
                {variable.tailwind && (
                  <p className="mt-1 font-mono text-xs text-black/60 dark:text-white/60">
                    {variable.tailwind}
                  </p>
                )}
              </div>
              <div className="grid gap-1 text-xs font-mono text-black/65 dark:text-white/65">
                <span>Light: {variable.light}</span>
                <span>Dark: {variable.dark}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-neutral-950">
        <h2 className="mb-4 text-lg font-semibold text-text-primary">Transitions</h2>
        <p className="mb-6 text-sm text-black/65 dark:text-white/65">
          Defined in{" "}
          <code className="rounded bg-black/5 px-1 py-0.5 text-xs dark:bg-white/10">
            src/app/globals.css
          </code>{" "}
          and{" "}
          <code className="rounded bg-black/5 px-1 py-0.5 text-xs dark:bg-white/10">
            src/lib/transitions.ts
          </code>
          .
        </p>

        <div className="space-y-4">
          {globalTransitionVariables.map((variable) => (
            <div
              key={variable.cssVar}
              className="flex flex-wrap items-start gap-4 rounded-md border border-black/10 p-4 dark:border-white/10"
            >
              <div className="min-w-0 flex-1">
                <p className="font-medium text-text-primary">{variable.label}</p>
                <p className="font-mono text-xs text-black/50 dark:text-white/50">
                  {variable.cssVar}
                </p>
                {variable.notes && (
                  <p className="mt-1 text-sm text-black/60 dark:text-white/60">
                    {variable.notes}
                  </p>
                )}
              </div>
              <p className="font-mono text-xs text-black/65 dark:text-white/65">
                {variable.value}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
