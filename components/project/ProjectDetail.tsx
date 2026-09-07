"use client";

import Link from "next/link";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import type { Project } from "@/content/types";
import { ui } from "@/content/ui";
import { useLocale } from "@/lib/i18n";
import { StackBadge, StatusChip } from "./Badges";
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
    <article className="px-5 pb-24 pt-28 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Reveal direction="none">
          <Link
            href="/work"
            className="group mb-10 inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-accent"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              &#8592;
            </span>
            {t(ui.project.backToWork)}
          </Link>
        </Reveal>

        {/* Title block */}
        <header className="mb-12">
          <Reveal>
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span
                className="font-mono text-sm font-semibold"
                style={{ color: project.accent }}
              >
                {String(project.index).padStart(2, "0")}
              </span>
              <span className="h-px w-8 bg-border-bright" aria-hidden="true" />
              <span className="label !normal-case !tracking-normal">
                {t(project.domain)}
              </span>
              <StatusChip status={project.status} />
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="display-lg text-fg">{project.name}</h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
              {t(project.tagline)}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {project.demo.href ? (
                <Magnetic strength={0.25}>
                  <a
                    href={project.demo.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-sm font-semibold text-bg transition-shadow duration-300"
                    style={{
                      background: project.accent,
                      boxShadow: `0 0 0 rgba(0,0,0,0)`,
                    }}
                  >
                    {t(project.demo.label)}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      &#8599;
                    </span>
                  </a>
                </Magnetic>
              ) : (
                // Dead demo: state the fact, never link to a page that will not load.
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 px-5 py-2.5 font-mono text-sm text-muted">
                  {t(project.demo.label)}
                </span>
              )}

              {project.repos.map((repo) => (
                <a
                  key={repo.href}
                  href={repo.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-mono text-sm text-fg transition-colors duration-300 hover:border-accent hover:text-accent"
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

        {/* Screenshot */}
        <Reveal delay={0.1}>
          <div className="group relative mb-16 aspect-[2/1] w-full overflow-hidden rounded-2xl border border-border bg-surface-2">
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

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Value engineering */}
          <div className="lg:col-span-2">
            <Reveal>
              <h2 className="label mb-8 flex items-center gap-2">
                <span className="inline-block h-px w-8 bg-accent" aria-hidden="true" />
                {t(ui.project.highlights)}
              </h2>
            </Reveal>

            <ul className="flex flex-col gap-8">
              {project.highlights.map((highlight, i) => (
                <li key={highlight.title.en}>
                  <Reveal delay={i * 0.07}>
                    <div className="border-l-2 pl-5" style={{ borderColor: project.accent }}>
                      <h3 className="mb-2 font-display text-lg font-bold tracking-tight text-fg">
                        {t(highlight.title)}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted">
                        {t(highlight.body)}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>

          {/* Stack sidebar */}
          <aside className="lg:col-span-1">
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-border bg-surface p-6">
                <h2 className="label mb-4">{t(ui.project.stack)}</h2>
                <div className="mb-6 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <StackBadge
                      key={tech}
                      label={tech}
                      isAi={project.aiPipeline.includes(tech)}
                    />
                  ))}
                </div>

                {project.aiPipeline.length > 0 && (
                  <>
                    <h2 className="label mb-3">{t(ui.project.aiPipeline)}</h2>
                    <ul className="flex flex-col gap-1.5">
                      {project.aiPipeline.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 font-mono text-xs text-accent-2"
                        >
                          <span className="text-accent-2/60">&#9656;</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </Reveal>
          </aside>
        </div>

        <div className="mt-20">
          <ProjectNav prev={prev} next={next} />
        </div>
      </div>
    </article>
  );
}
