"use client";

import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectImage } from "@/components/project/ProjectImage";
import { StatusChip } from "@/components/project/Badges";
import { TechStrip } from "@/components/tech/TechBadge";
import { featuredProjects } from "@/content/projects";
import { ui } from "@/content/ui";
import { useLocale } from "@/lib/i18n";
import { usePinned } from "@/lib/hooks";

/**
 * Viewport-heights of scroll each slide gets while the section is pinned.
 *
 * The track is this times the slide count PLUS one viewport, because a
 * sticky element stops moving one viewport before its track ends — that last
 * viewport is consumed by the release, not by any slide. Without it the
 * figure below would silently be a fifth smaller than it claims.
 */
const VH_PER_SLIDE = 85;

/**
 * The featured projects, advanced by scroll while the section is pinned.
 *
 * Replaces a static grid: a grid lets you scroll past five projects in two
 * seconds, whereas pinning forces each one to hold the viewport long enough
 * to actually be read. That is the entire point — it is a reading-pace
 * decision, not a visual effect.
 *
 * Pin, layout and fallback are all in CSS (see `.pin-*` in globals.css), so
 * this component's only job is tracking which slide is active. Below `lg`,
 * and under reduced-motion, the CSS leaves every slide in normal flow and the
 * state below simply stops mattering.
 */
export function PinnedWork() {
  const { t, path } = useLocale();
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = featuredProjects.length;

  // Only used to manage focus containment, never layout — so a wrong value
  // for one frame costs nothing visible.
  const pinned = usePinned();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const next = Math.min(count - 1, Math.max(0, Math.floor(progress * count)));
    // React bails out when the value is unchanged, so this runs ~5 times
    // across the whole scroll rather than on every frame.
    setActive(next);
  });

  return (
    <section id="work" className="scroll-mt-24 px-5 sm:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading sits above the track so it scrolls away normally */}
        <div className="flex flex-col gap-6 py-24 sm:py-32 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <p className="label mb-4 flex items-center gap-2">
                <span className="inline-block h-px w-8 bg-accent" aria-hidden="true" />
                {t(ui.sections.selectedWorkLabel)}
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="display-lg text-fg">{t(ui.sections.selectedWorkTitle)}</h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
                {t(ui.sections.selectedWorkBody)}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.18} className="shrink-0">
            <Link
              href={path("/work")}
              className="group inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 font-mono text-xs text-fg transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              {t(ui.sections.viewAll)}
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                &#8594;
              </span>
            </Link>
          </Reveal>
        </div>

        <div
          ref={trackRef}
          className="pin-track"
          style={{
            ["--pin-track-height" as string]: `calc(${count * VH_PER_SLIDE}vh + 100svh)`,
          }}
        >
          <div className="pin-viewport">
            <div className="w-full">
              <div className="pin-scrub mb-8 items-center gap-5">
                <p className="label tabular-nums">
                  <span className="text-accent">
                    {String(active + 1).padStart(2, "0")}
                  </span>
                  <span className="text-faint"> / {String(count).padStart(2, "0")}</span>
                </p>
                <div className="relative h-px flex-1 bg-border">
                  <motion.span
                    className="absolute inset-0 origin-left bg-accent"
                    style={{ scaleX: scrollYProgress }}
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div className="pin-stage">
                {featuredProjects.map((project, i) => {
                  const isActive = i === active;

                  return (
                    <article
                      key={project.slug}
                      className="pin-slide"
                      data-active={isActive}
                      // Keeps keyboard focus out of a slide that is faded out.
                      // Only applied once we know the pin is engaged, since
                      // every slide is visible in the flow fallback.
                      inert={pinned && !isActive}
                      style={{
                        ["--slide-opacity" as string]: isActive ? 1 : 0,
                        ["--accent" as string]: project.accent,
                      }}
                    >
                      <div className="grid w-full grid-cols-1 items-center gap-x-12 gap-y-8 lg:grid-cols-12">
                        <div className="lg:col-span-5">
                          <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-3">
                            <span
                              className="font-mono text-sm font-semibold tabular-nums"
                              style={{ color: project.accent }}
                            >
                              {String(project.index).padStart(2, "0")}
                            </span>
                            <span className="h-px w-10 bg-border-bright" aria-hidden="true" />
                            <span className="font-mono text-xs text-muted">
                              {t(project.domain)}
                            </span>
                            <StatusChip status={project.status} />
                          </div>

                          <h3 className="display-md text-fg">{project.name}</h3>

                          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
                            {t(project.tagline)}
                          </p>

                          {/* Facts band. `context` says who the work was
                              actually for, which is the first thing anyone
                              assessing it wants to know — and only one of the
                              five has a metric, so a metric-only band would
                              leave four slides with a hole in the column.
                              Both values come straight from the content
                              files; nothing here is inferred. */}
                          {(project.context || project.metric) && (
                            <div className="mt-6 flex flex-wrap items-end gap-x-8 gap-y-4 border-t border-border pt-5">
                              {project.context && (
                                <p className="max-w-xs font-mono text-xs leading-relaxed text-muted">
                                  {t(project.context)}
                                </p>
                              )}

                              {project.metric && (
                                <p className="flex items-baseline gap-2">
                                  <span
                                    className="font-display text-3xl font-bold leading-none tracking-tight"
                                    style={{ color: project.accent }}
                                  >
                                    {project.metric.value}
                                  </span>
                                  <span className="label">{t(project.metric.label)}</span>
                                </p>
                              )}
                            </div>
                          )}

                          <TechStrip names={project.stack} max={6} className="mt-7" />

                          <Link
                            href={path(`/work/${project.slug}`)}
                            className="group mt-8 inline-flex items-center gap-2 font-mono text-sm text-fg transition-colors duration-300 hover:text-[var(--accent)]"
                          >
                            {t(ui.project.caseStudy)}
                            <span className="transition-transform duration-300 group-hover:translate-x-1">
                              &#8594;
                            </span>
                          </Link>
                        </div>

                        <Link
                          href={path(`/work/${project.slug}`)}
                          className="group relative block aspect-[2/1] w-full overflow-hidden rounded-sm border border-border bg-surface-2 transition-colors duration-500 hover:border-border-bright lg:col-span-7"
                          tabIndex={-1}
                          aria-hidden="true"
                        >
                          <ProjectImage
                            src={project.image}
                            alt=""
                            accent={project.accent}
                            name={project.name}
                            stack={project.stack}
                            priority={i === 0}
                            sizes="(min-width: 1024px) 60vw, 100vw"
                          />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
