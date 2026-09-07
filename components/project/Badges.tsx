"use client";

import type { ProjectStatus } from "@/content/types";
import { statusLabel } from "@/content/ui";
import { useLocale } from "@/lib/i18n";

const STATUS_STYLE: Record<ProjectStatus, string> = {
  live: "border-accent/35 bg-accent/10 text-accent",
  local: "border-accent-2/30 bg-accent-2/10 text-accent-2",
  inactive: "border-border-bright bg-bg/70 text-faint",
  completed: "border-border-bright bg-bg/70 text-faint",
};

/**
 * Demo availability. Two projects have permanently dead demos — showing them
 * as a plain chip is more honest than linking somewhere that will not load.
 *
 * Squared off rather than a lozenge: the previous build turned every small
 * element into a pill, which flattened the difference between a status, a
 * filter and a button.
 */
export function StatusChip({ status }: { status: ProjectStatus }) {
  const { t } = useLocale();

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-xs border px-2 py-1 font-mono text-[10px] font-medium uppercase leading-none tracking-widest backdrop-blur-sm ${STATUS_STYLE[status]}`}
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
