"use client";

import Link from "next/link";
import type { Project } from "@/content/types";
import { ui } from "@/content/ui";
import { useLocale } from "@/lib/i18n";

/**
 * Previous / next pager. Wraps around the full list, so the first and last
 * project both still offer two ways onward.
 */
export function ProjectNav({ prev, next }: { prev?: Project; next?: Project }) {
  const { t } = useLocale();

  return (
    <nav className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
      {prev && (
        <Link
          href={`/work/${prev.slug}`}
          className="group flex flex-col gap-1 bg-surface p-6 transition-colors hover:bg-surface-2"
        >
          <span className="label flex items-center gap-2">
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              &#8592;
            </span>
            {t(ui.project.prev)}
          </span>
          <span className="font-display text-xl font-bold text-fg transition-colors group-hover:text-accent">
            {prev.name}
          </span>
          <span className="font-mono text-xs text-muted">{t(prev.domain)}</span>
        </Link>
      )}

      {next && (
        <Link
          href={`/work/${next.slug}`}
          className="group flex flex-col items-end gap-1 bg-surface p-6 text-right transition-colors hover:bg-surface-2"
        >
          <span className="label flex items-center gap-2">
            {t(ui.project.next)}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              &#8594;
            </span>
          </span>
          <span className="font-display text-xl font-bold text-fg transition-colors group-hover:text-accent">
            {next.name}
          </span>
          <span className="font-mono text-xs text-muted">{t(next.domain)}</span>
        </Link>
      )}
    </nav>
  );
}
