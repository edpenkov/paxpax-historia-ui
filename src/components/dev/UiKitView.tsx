"use client";

import { UiKitPreview, type UiKitViewport } from "@/components/dev/UiKitPreview";
import { UiKitVariablesPanel } from "@/components/dev/UiKitVariablesPanel";
import { uiKitTabs, type UiKitTabId } from "@/lib/ui-kit/categories";
import { getUiKitEntriesGrouped, uiKitGroupDescriptions, type UiKitEntryGroup } from "@/lib/ui-kit/groups";
import type { UiKitEntry } from "@/lib/ui-kit/registry";
import { cn } from "@/lib/cn";
import { useState } from "react";

const kindLabel: Record<UiKitEntry["kind"], string> = {
  component: "Component",
  utility: "Utility",
  style: "Style",
  dev: "Dev tool",
};

function PropsTable({ props }: { props: NonNullable<UiKitEntry["props"]> }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[480px] text-left text-sm">
        <thead>
          <tr className="border-b border-black/10 text-black/55 dark:border-white/10 dark:text-white/55">
            <th className="py-2 pr-4 font-medium">Prop</th>
            <th className="py-2 pr-4 font-medium">Type</th>
            <th className="py-2 pr-4 font-medium">Default</th>
            <th className="py-2 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr
              key={prop.name}
              className="border-b border-black/5 dark:border-white/5"
            >
              <td className="py-2 pr-4 font-mono text-xs">{prop.name}</td>
              <td className="py-2 pr-4 font-mono text-xs text-black/70 dark:text-white/70">
                {prop.type}
              </td>
              <td className="py-2 pr-4 font-mono text-xs text-black/50 dark:text-white/50">
                {prop.defaultValue ?? "—"}
              </td>
              <td className="py-2 text-black/75 dark:text-white/75">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ValuesTable({ values }: { values: NonNullable<UiKitEntry["values"]> }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[480px] text-left text-sm">
        <thead>
          <tr className="border-b border-black/10 text-black/55 dark:border-white/10 dark:text-white/55">
            <th className="py-2 pr-4 font-medium">Label</th>
            <th className="py-2 pr-4 font-medium">Light</th>
            <th className="py-2 pr-4 font-medium">Dark</th>
            <th className="py-2 font-medium">Tailwind</th>
          </tr>
        </thead>
        <tbody>
          {values.map((row) => (
            <tr key={row.label} className="border-b border-black/5 dark:border-white/5">
              <td className="py-2 pr-4 font-medium">{row.label}</td>
              <td className="py-2 pr-4 font-mono text-xs">{row.light}</td>
              <td className="py-2 pr-4 font-mono text-xs">{row.dark}</td>
              <td className="py-2 font-mono text-xs text-black/60 dark:text-white/60">
                {row.tailwind ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ViewportToggle({
  value,
  onChange,
}: {
  value: UiKitViewport;
  onChange: (value: UiKitViewport) => void;
}) {
  return (
    <div
      className="mb-3 flex w-fit rounded-full bg-black/5 p-0.5 text-[11px] dark:bg-white/10"
      role="group"
      aria-label="Preview viewport"
    >
      {(["desktop", "mobile"] as const).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={cn(
            "rounded-full px-2.5 py-0.5 font-medium capitalize transition-colors",
            value === option
              ? "bg-white text-black shadow-sm dark:bg-white/15 dark:text-white"
              : "text-black/55 hover:text-black dark:text-white/55 dark:hover:text-white",
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function UiKitEntryDetails({ entry }: { entry: UiKitEntry }) {
  const hasDetails =
    entry.description ||
    entry.props?.length ||
    entry.values?.length ||
    entry.notes?.length;

  if (!hasDetails) return null;

  return (
    <details className="group mt-4">
      <summary className="cursor-pointer list-none text-sm font-medium text-black/55 transition-colors hover:text-black dark:text-white/55 dark:hover:text-white [&::-webkit-details-marker]:hidden">
        <span className="inline-flex items-center gap-1.5">
          <span className="text-[10px] transition-transform group-open:rotate-90">▶</span>
          Details
        </span>
      </summary>

      <div className="mt-4 space-y-5 border-t border-black/10 pt-4 dark:border-white/10">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="rounded-full bg-black/5 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-black/55 dark:bg-white/10 dark:text-white/55">
            {kindLabel[entry.kind]}
          </span>
          <p className="font-mono text-xs text-black/50 dark:text-white/50">
            {entry.importPath}
          </p>
        </div>

        {entry.description && (
          <p className="text-sm text-black/75 dark:text-white/75">{entry.description}</p>
        )}

        {entry.props && entry.props.length > 0 && (
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-black/45 dark:text-white/45">
              Props
            </h3>
            <PropsTable props={entry.props} />
          </div>
        )}

        {entry.values && entry.values.length > 0 && (
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-black/45 dark:text-white/45">
              Values
            </h3>
            <ValuesTable values={entry.values} />
          </div>
        )}

        {entry.notes && entry.notes.length > 0 && (
          <ul className="list-disc space-y-1 pl-5 text-sm text-black/60 dark:text-white/60">
            {entry.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        )}
      </div>
    </details>
  );
}

function RelatedEntries({ entries }: { entries: NonNullable<UiKitEntry["relatedEntries"]> }) {
  return (
    <p className="mb-3 text-xs text-black/55 dark:text-white/55">
      Related:{" "}
      {entries.map((link, index) => (
        <span key={link.id}>
          {index > 0 ? ", " : null}
          <a href={`#${link.id}`} className="underline hover:text-black dark:hover:text-white">
            {link.label}
          </a>
        </span>
      ))}
    </p>
  );
}

function PreviewViewportHint({ viewport }: { viewport: NonNullable<UiKitEntry["previewViewport"]> }) {
  return (
    <p className="mb-3 text-xs text-black/55 dark:text-white/55">
      {viewport === "mobile"
        ? "Mobile-only preview (375px frame)"
        : "Desktop-only preview (full width frame)"}
    </p>
  );
}

function UiKitEntryCard({ entry }: { entry: UiKitEntry }) {
  const [toggleViewport, setToggleViewport] = useState<UiKitViewport>("desktop");
  const showToggle = Boolean(entry.viewportToggle && !entry.previewViewport);
  const previewViewport =
    entry.previewViewport ?? (showToggle ? toggleViewport : undefined);

  return (
    <section
      id={entry.id}
      className="scroll-mt-6 rounded-lg border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-neutral-950"
    >
      <h2 className="mb-4 text-lg font-semibold text-text-primary">{entry.name}</h2>
      {entry.relatedEntries && entry.relatedEntries.length > 0 ? (
        <RelatedEntries entries={entry.relatedEntries} />
      ) : null}
      {showToggle ? (
        <ViewportToggle value={toggleViewport} onChange={setToggleViewport} />
      ) : entry.previewViewport ? (
        <PreviewViewportHint viewport={entry.previewViewport} />
      ) : null}
      <UiKitPreview entryId={entry.id} viewport={previewViewport} />
      <UiKitEntryDetails entry={entry} />
    </section>
  );
}

function UiKitTabBar({
  activeTab,
  onChange,
}: {
  activeTab: UiKitTabId;
  onChange: (tab: UiKitTabId) => void;
}) {
  return (
    <div
      className="mb-8 flex flex-wrap gap-1 rounded-lg border border-black/10 bg-black/[0.02] p-1 dark:border-white/10 dark:bg-white/[0.03]"
      role="tablist"
      aria-label="UI Kit categories"
    >
      {uiKitTabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={activeTab === tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
            activeTab === tab.id
              ? "bg-white text-black shadow-sm dark:bg-neutral-800 dark:text-white"
              : "text-black/55 hover:text-black dark:text-white/55 dark:hover:text-white",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

function groupSectionId(label: string) {
  return `group-${label.toLowerCase().replace(/\s+/g, "-")}`;
}

function UiKitContentsNav({ groups }: { groups: UiKitEntryGroup[] }) {
  if (groups.length === 0) return null;

  return (
    <nav className="mb-8 rounded-lg border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.03]">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-black/45 dark:text-white/45">
        Contents
      </h2>
      <div className="space-y-4">
        {groups.map((group) => (
          <div key={group.label}>
            <a
              href={`#${groupSectionId(group.label)}`}
              className="text-xs font-semibold uppercase tracking-wide text-black/45 hover:text-black dark:text-white/45 dark:hover:text-white"
            >
              {group.label}
            </a>
            <ul className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm">
              {group.entries.map((entry) => (
                <li key={entry.id}>
                  <a href={`#${entry.id}`} className="hover:underline">
                    {entry.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}

export function UiKitView() {
  const [activeTab, setActiveTab] = useState<UiKitTabId>("general");
  const activeGroups =
    activeTab === "variables" ? [] : getUiKitEntriesGrouped(activeTab);

  return (
    <div className="mx-auto max-w-4xl px-6 py-10 pb-24 text-text-primary">
      <header className="mb-10">
        <h1 className="mb-3 text-2xl font-semibold">UI Kit</h1>
        <p className="max-w-2xl text-sm text-black/65 dark:text-white/65">
          Living catalog of components, icons, styles, tokens, and dev tools.
          Update{" "}
          <code className="rounded bg-black/5 px-1 py-0.5 text-xs dark:bg-white/10">
            src/lib/ui-kit/registry.ts
          </code>
          ,{" "}
          <code className="rounded bg-black/5 px-1 py-0.5 text-xs dark:bg-white/10">
            src/lib/ui-kit/variables.ts
          </code>
          , and previews in{" "}
          <code className="rounded bg-black/5 px-1 py-0.5 text-xs dark:bg-white/10">
            src/components/dev/ui-kit/
          </code>{" "}
          when adding UI.
        </p>
      </header>

      <UiKitTabBar activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "variables" ? (
        <UiKitVariablesPanel />
      ) : (
        <>
          <UiKitContentsNav groups={activeGroups} />
          <div className="space-y-12">
            {activeGroups.map((group) => (
              <section key={group.label} id={groupSectionId(group.label)} className="scroll-mt-6">
                <h2 className="mb-2 border-b border-black/10 pb-2 text-sm font-semibold uppercase tracking-wide text-black/45 dark:border-white/10 dark:text-white/45">
                  {group.label}
                </h2>
                {uiKitGroupDescriptions[group.label] ? (
                  <p className="mb-6 max-w-2xl text-sm text-black/60 dark:text-white/60">
                    {uiKitGroupDescriptions[group.label]}
                  </p>
                ) : (
                  <div className="mb-6" />
                )}
                <div className="space-y-8">
                  {group.entries.map((entry) => (
                    <UiKitEntryCard key={entry.id} entry={entry} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
