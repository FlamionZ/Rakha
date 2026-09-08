"use client";

import Link from "next/link";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { TechBadge } from "@/components/tech/TechBadge";
import { TechIcon, hasTechIcon } from "@/components/tech/TechIcon";
import type { Project } from "@/content/types";
import { ui } from "@/content/ui";
import { useLocale } from "@/lib/i18n";
import { StatusChip } from "./Badges";
import { ProjectImage } from "./ProjectImage";
import { ProjectNav } from "./ProjectNav";

interface ProjectDetailProps {
  project: Project;
  prev?: Project;
  next?: Project;
}

export function ProjectDetail({ project, prev, next }: ProjectDetailProps) {
  const { t } = useLocale();

  return (
    <article
      className="px-5 pb-24 pt-28 sm:px-8"
      style={{ ["--accent" as string]: project.accent }}
    >
      <div className="mx-auto max-w-5xl">
        <Reveal direction="none">
          <Link
            href="/work"
            className="group mb-12 inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-accent"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              &#8592;
            </span>
            {t(ui.project.backToWork)}
          </Link>
        </Reveal>

        <header className="mb-14">
          <Reveal>
            <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-3">
              <span
                className="font-mono text-sm font-semibold tabular-nums"
                style={{ color: project.accent }}
              >
                {String(project.index).padStart(2, "0")}
              </span>
              <span className="h-px w-10 bg-border-bright" aria-hidden="true" />
              <span className="font-mono text-xs text-muted">{t(project.domain)}</span>
              <StatusChip status={project.status} />
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="display-lg text-fg">{project.name}</h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              {t(project.tagline)}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              {project.demo.href ? (
                <Magnetic strength={0.25}>
                  <a
                    href={project.demo.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-2 rounded-lg px-5 py-2.5 font-mono text-sm font-semibold text-bg"
                    style={{ background: project.accent }}
                  >
                    {t(project.demo.label)}
                    <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                      &#8599;
                    </span>
                  </a>
                </Magnetic>
              ) : (
                // Dead demo: state the fact, never link to a page that will not load.
                <span className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 font-mono text-sm text-muted">
                  {t(project.demo.label)}
                </span>
              )}

              {project.repos.map((repo) => (
                <a
                  key={repo.href}
                  href={repo.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 font-mono text-sm text-fg transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  {repo.label}
                  <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    &#8599;
                  </span>
                </a>
              ))}
            </div>
          </Reveal>
        </header>

        <Reveal delay={0.1}>
          <div className="relative mb-20 aspect-[2/1] w-full overflow-hidden rounded-sm border border-border bg-surface-2">
            <ProjectImage
              src={project.image}
              alt={`${project.name} — ${t(project.tagline)}`}
              accent={project.accent}
              name={project.name}
              stack={project.stack}
              priority
              fit="contain"
              sizes="(min-width: 1024px) 1024px, 100vw"
            />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-3">
          {/* Value engineering */}
          <div className="lg:col-span-2">
            <Reveal>
              <h2 className="label mb-10 flex items-center gap-3">
                <span className="inline-block h-px w-8 bg-accent" aria-hidden="true" />
                {t(ui.project.highlights)}
              </h2>
            </Reveal>

            <ul className="border-t border-border">
              {project.highlights.map((highlight, i) => (
                <li key={highlight.title.en} className="border-b border-border">
                  <Reveal delay={i * 0.07}>
                    <div className="group flex gap-5 py-7">
                      <span
                        className="shrink-0 font-mono text-xs tabular-nums text-muted transition-colors duration-300 group-hover:text-[var(--accent)]"
                        aria-hidden="true"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <h3 className="mb-2 font-display text-lg font-bold tracking-tight text-fg">
                          {t(highlight.title)}
                        </h3>
                        <p className="text-sm leading-relaxed text-muted">{t(highlight.body)}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>

          {/* Stack — a spec sheet, not a floating panel */}
          <aside className="lg:col-span-1">
            <Reveal delay={0.1}>
              <h2 className="label mb-6 border-b border-border pb-3">{t(ui.project.stack)}</h2>
              <ul className="flex flex-col gap-3">
                {project.stack.map((tech) => (
                  <li key={tech}>
                    <TechBadge name={tech} />
                  </li>
                ))}
              </ul>

              {project.aiPipeline.length > 0 && (
                <>
                  <h2 className="label mb-4 mt-10 border-b border-border pb-3">
                    {t(ui.project.aiPipeline)}
                  </h2>
                  <ul className="flex flex-col gap-2.5">
                    {project.aiPipeline.map((item) => (
                      <li key={item} className="flex items-center gap-2 font-mono text-xs text-accent-2">
                        {hasTechIcon(item) ? (
                          <TechIcon name={item} className="h-3.5 w-3.5 shrink-0" />
                        ) : (
                          <span className="text-accent-2/60" aria-hidden="true">
                            &#9656;
                          </span>
                        )}
                        {item}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </Reveal>
          </aside>
        </div>

        <div className="mt-24">
          <ProjectNav prev={prev} next={next} />
        </div>
      </div>
    </article>
  );
}
