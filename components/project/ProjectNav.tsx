"use client";

import Link from "next/link";
import type { Project } from "@/content/types";
import { ui } from "@/content/ui";
import { useLocale } from "@/lib/i18n";

/**
 * Previous / next pager. Wraps around the full list, so the first and last
 * project both still offer two ways onward.
 *
 * Ruled rows rather than two filled panels — the detail page already carries a
 * large framed screenshot, and another pair of boxes underneath it made the
 * footer of every case study feel bottom-heavy.
 */
export function ProjectNav({ prev, next }: { prev?: Project; next?: Project }) {
  const { t, path } = useLocale();

  return (
    <nav className="grid grid-cols-1 border-t border-border sm:grid-cols-2">
      {prev && (
        <Link
          href={path(`/work/${prev.slug}`)}
          className="group flex flex-col gap-1.5 border-b border-border py-7 pr-6 sm:border-r"
          style={{ ["--accent" as string]: prev.accent }}
        >
          <span className="label flex items-center gap-2">
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              &#8592;
            </span>
            {t(ui.project.prev)}
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-fg transition-colors duration-300 group-hover:text-[var(--accent)]">
            {prev.name}
          </span>
          <span className="font-mono text-xs text-muted">{t(prev.domain)}</span>
        </Link>
      )}

      {next && (
        <Link
          href={path(`/work/${next.slug}`)}
          className="group flex flex-col items-start gap-1.5 border-b border-border py-7 sm:items-end sm:pl-6 sm:text-right"
          style={{ ["--accent" as string]: next.accent }}
        >
          <span className="label flex items-center gap-2">
            {t(ui.project.next)}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              &#8594;
            </span>
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-fg transition-colors duration-300 group-hover:text-[var(--accent)]">
            {next.name}
          </span>
          <span className="font-mono text-xs text-muted">{t(next.domain)}</span>
        </Link>
      )}
    </nav>
  );
}
