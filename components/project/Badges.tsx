"use client";

import type { ProjectStatus } from "@/content/types";
import { statusLabel } from "@/content/ui";
import { useLocale } from "@/lib/i18n";

const STATUS_STYLE: Record<ProjectStatus, string> = {
  live: "border-accent/40 bg-accent/10 text-accent",
  local: "border-accent-2/40 bg-accent-2/10 text-accent-2",
  inactive: "border-border-bright bg-surface-2 text-muted",
  completed: "border-border-bright bg-surface-2 text-muted",
};

/**
 * Demo availability. Two projects have permanently dead demos — showing them
 * as a plain chip is more honest than linking somewhere that will not load.
 */
export function StatusChip({ status }: { status: ProjectStatus }) {
  const { t } = useLocale();

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-widest ${STATUS_STYLE[status]}`}
    >
      {status === "live" && (
        <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
      )}
      {t(statusLabel[status])}
    </span>
  );
}

/**
 * Technology pill. AI infrastructure gets the accent treatment so a reader
 * scanning the grid can spot the AI-heavy projects without reading a word.
 */
export function StackBadge({ label, isAi = false }: { label: string; isAi?: boolean }) {
  return (
    <span
      className={`rounded-full border px-2 py-0.5 font-mono text-[10px] tracking-tight transition-colors ${
        isAi
          ? "border-accent-2/35 bg-accent-2/10 text-accent-2"
          : "border-border bg-surface-2/70 text-muted"
      }`}
    >
      {label}
    </span>
  );
}
