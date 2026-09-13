"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useMemo, useState } from "react";
import { TechStrip } from "@/components/tech/TechBadge";
import { projects } from "@/content/projects";
import type { Project, ProjectTag } from "@/content/types";
import { statusLabel, tagLabel, tagOrder, ui } from "@/content/ui";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/hooks";
import { useLocale } from "@/lib/i18n";

/**
 * "case" is not a tag — it is depth. Five of the eleven carry a full case
 * study, and those are the ones worth an employer's time first; without a way
 * to ask for them, the six thinner entries dilute the five strong ones.
 */
type Filter = ProjectTag | "all" | "case";

const STATUS_TONE: Record<Project["status"], string> = {
  live: "text-accent",
  local: "text-accent-2",
  inactive: "text-muted",
  completed: "text-muted",
};

/** Below `sm` the status word does not fit, so it becomes a dot on the thumb. */
const STATUS_DOT: Record<Project["status"], string> = {
  live: "bg-accent",
  local: "bg-accent-2",
  inactive: "bg-faint",
  completed: "bg-faint",
};

/**
 * The archive, as an index rather than a second card gallery.
 *
 * Eleven projects in a grid is a wall; eleven projects as numbered rules is a
 * table of contents you can scan in seconds. The screenshot still matters, so
 * it rides the cursor instead of occupying permanent layout — which also means
 * the row itself stays typographic.
 */
export function ProjectIndex() {
  const { t, path } = useLocale();
  const reduced = usePrefersReducedMotion();
  const fine = useFinePointer();
  const [active, setActive] = useState<Filter>("all");
  const [hovered, setHovered] = useState<Project | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 380, damping: 34, mass: 0.5 });
  const py = useSpring(my, { stiffness: 380, damping: 34, mass: 0.5 });

  const showPreview = fine && !reduced;

  const filters = useMemo(() => {
    const tags = tagOrder.filter((tag) => projects.some((p) => p.tags.includes(tag)));
    return [
      { key: "all" as Filter, label: ui.filter.all, count: projects.length },
      {
        key: "case" as Filter,
        label: ui.filter.deepDive,
        count: projects.filter((p) => p.caseStudy).length,
      },
      ...tags.map((tag) => ({
        key: tag as Filter,
        label: tagLabel[tag],
        count: projects.filter((p) => p.tags.includes(tag)).length,
      })),
    ];
  }, []);

  const visible = useMemo(() => {
    if (active === "all") return projects;
    if (active === "case") return projects.filter((p) => p.caseStudy);
    return projects.filter((p) => p.tags.includes(active));
  }, [active]);

  function trackPointer(event: React.PointerEvent) {
    mx.set(event.clientX);
    my.set(event.clientY);
  }

  /**
   * Snap the preview to the cursor before it becomes visible.
   *
   * The springs sit at 0,0 until the first pointermove, so without this a row
   * entered quickly flashes the preview in the top-left corner and then flies
   * it across the screen. `jump` sets value and target together, skipping the
   * animation entirely for this one frame.
   */
  function beginHover(project: Project, event: React.PointerEvent) {
    mx.jump(event.clientX);
    my.jump(event.clientY);
    px.jump(event.clientX);
    py.jump(event.clientY);
    setHovered(project);
  }

  return (
    <div>
      {/* Filters as a typographic list, not a row of pills */}
      <div className="mb-2 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-b border-border pb-5">
        <span className="label">{t(ui.filter.label)}</span>
        {filters.map((filter) => {
          const isActive = filter.key === active;
          return (
            <button
              key={filter.key}
              type="button"
              onClick={() => setActive(filter.key)}
              aria-pressed={isActive}
              className={`group/f -my-3 py-3 font-mono text-xs tracking-wide transition-colors duration-200 ${
                isActive ? "text-accent" : "text-muted hover:text-fg"
              }`}
            >
              {t(filter.label)}
              <sup className="ml-1 text-[10px] tabular-nums text-muted">{filter.count}</sup>
              <span
                className={`mt-1 block h-px origin-left bg-accent transition-transform duration-300 ${
                  isActive ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          );
        })}
      </div>

      <ul onPointerLeave={() => setHovered(null)}>
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((project) => (
            <motion.li
              key={project.slug}
              layout={!reduced}
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduced ? undefined : { opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="border-b border-border"
            >
              <Link
                href={path(`/work/${project.slug}`)}
                onPointerEnter={(event) => beginHover(project, event)}
                onPointerMove={showPreview ? trackPointer : undefined}
                className="group relative flex items-center gap-4 py-5 transition-colors duration-300 sm:gap-6 sm:py-6 lg:grid lg:grid-cols-[2.5rem_15rem_minmax(0,1fr)_auto_9.5rem_1rem] lg:items-center lg:gap-x-6"
                style={{ ["--accent" as string]: project.accent }}
              >
                {/* Accent wash that wipes in from the left on hover */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 -left-4 -right-4 origin-left scale-x-0 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(to right, color-mix(in srgb, var(--accent) 9%, transparent), transparent 70%)",
                  }}
                />

                {/* Index */}
                <span
                  className="relative w-7 shrink-0 font-mono text-xs tabular-nums text-muted transition-colors duration-300 group-hover:text-[var(--accent)] sm:w-10 sm:text-sm lg:w-auto"
                  aria-hidden="true"
                >
                  {String(project.index).padStart(2, "0")}
                </span>

                {/* Thumbnail — only on small screens, where no cursor preview exists */}
                <span className="relative h-11 w-16 shrink-0 overflow-hidden rounded-xs border border-border bg-surface-2 lg:hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover object-top"
                    />
                  ) : (
                    <span
                      className="block h-full w-full"
                      style={{
                        background: `radial-gradient(120% 100% at 50% 0%, ${project.accent}33, transparent 70%)`,
                      }}
                    />
                  )}
                  <span
                    className={`absolute right-1 top-1 h-1.5 w-1.5 rounded-full ring-2 ring-bg/80 sm:hidden ${STATUS_DOT[project.status]}`}
                    title={t(statusLabel[project.status])}
                  />
                </span>

                {/* Name + domain */}
                <span className="relative min-w-0 flex-1 lg:contents">
                  <span className="block truncate font-display text-lg font-bold tracking-tight text-fg transition-colors duration-300 group-hover:text-[var(--accent)] sm:text-xl">
                    {project.name}
                  </span>
                  <span className="mt-0.5 flex items-center gap-2 truncate font-mono text-[11px] text-muted lg:mt-0 lg:text-xs">
                    <span className="truncate">{t(project.domain)}</span>
                    {/* Depth, visible while scanning rather than only after a click */}
                    {project.caseStudy && (
                      <span
                        title={t(ui.filter.hasCaseStudy)}
                        className="shrink-0 rounded-xs border border-border-bright px-1.5 py-px text-[9px] uppercase tracking-[0.14em] text-faint transition-colors duration-300 group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]"
                      >
                        {t(ui.project.caseStudy)}
                      </span>
                    )}
                  </span>
                </span>

                {/* Stack marks */}
                <span className="relative hidden lg:block">
                  <TechStrip names={project.stack} max={5} />
                </span>

                {/* Status */}
                <span
                  className={`relative hidden w-32 shrink-0 text-right font-mono text-[10px] uppercase leading-tight tracking-widest sm:block lg:w-auto ${STATUS_TONE[project.status]}`}
                >
                  {t(statusLabel[project.status])}
                </span>

                {/* Arrow */}
                <span
                  aria-hidden="true"
                  className="relative shrink-0 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--accent)]"
                >
                  &#8594;
                </span>
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {visible.length === 0 && (
        <p className="py-16 text-center font-mono text-sm text-muted">{t(ui.filter.empty)}</p>
      )}

      {/* Cursor-following preview */}
      {showPreview && (
        <AnimatePresence>
          {hovered && (
            <motion.div
              key={hovered.slug}
              className="pointer-events-none fixed left-0 top-0 z-40 hidden lg:block"
              style={{ x: px, y: py }}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="relative h-[190px] w-[330px] -translate-x-1/2 -translate-y-[115%] overflow-hidden rounded-sm border bg-surface-2 shadow-2xl"
                style={{ borderColor: `${hovered.accent}55` }}
              >
                {hovered.image ? (
                  <Image
                    src={hovered.image}
                    alt=""
                    fill
                    sizes="330px"
                    className="object-cover object-top"
                  />
                ) : (
                  <span
                    className="flex h-full w-full items-center justify-center font-display text-2xl font-bold"
                    style={{
                      color: hovered.accent,
                      background: `radial-gradient(120% 100% at 50% 0%, ${hovered.accent}22, transparent 70%)`,
                    }}
                  >
                    {hovered.name}
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
