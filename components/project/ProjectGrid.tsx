"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { projects } from "@/content/projects";
import type { ProjectTag } from "@/content/types";
import { tagLabel, tagOrder, ui } from "@/content/ui";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { useLocale } from "@/lib/i18n";
import { ProjectCard } from "./ProjectCard";

type Filter = ProjectTag | "all";

export function ProjectGrid() {
  const { t } = useLocale();
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState<Filter>("all");

  // Only offer filters that would actually return something.
  const availableTags = useMemo(
    () => tagOrder.filter((tag) => projects.some((p) => p.tags.includes(tag))),
    [],
  );

  const visible = useMemo(
    () => (active === "all" ? projects : projects.filter((p) => p.tags.includes(active))),
    [active],
  );

  const filters: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: t(ui.filter.all), count: projects.length },
    ...availableTags.map((tag) => ({
      key: tag as Filter,
      label: t(tagLabel[tag]),
      count: projects.filter((p) => p.tags.includes(tag)).length,
    })),
  ];

  return (
    <div>
      <div className="mb-10 flex flex-wrap items-center gap-2">
        <span className="label mr-2">{t(ui.filter.label)}</span>
        {filters.map((filter) => {
          const isActive = filter.key === active;
          return (
            <button
              key={filter.key}
              type="button"
              onClick={() => setActive(filter.key)}
              aria-pressed={isActive}
              className={`relative rounded-full border px-3 py-1.5 font-mono text-xs transition-colors duration-200 ${
                isActive
                  ? "border-accent/50 text-bg"
                  : "border-border text-muted hover:border-border-bright hover:text-fg"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative z-10">
                {filter.label}
                <span className={isActive ? "text-bg/60" : "text-muted/60"}> {filter.count}</span>
              </span>
            </button>
          );
        })}
      </div>

      <motion.ul
        layout={!reduced}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((project, i) => (
            <motion.li
              key={project.slug}
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.35, delay: reduced ? 0 : i * 0.03 }}
            >
              <ProjectCard project={project} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {visible.length === 0 && (
        <p className="py-16 text-center font-mono text-sm text-muted">{t(ui.filter.empty)}</p>
      )}
    </div>
  );
}
