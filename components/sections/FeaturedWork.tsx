"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectCard } from "@/components/project/ProjectCard";
import { featuredProjects } from "@/content/projects";
import { ui } from "@/content/ui";
import { useLocale } from "@/lib/i18n";
import { SectionHeading } from "./SectionHeading";

/**
 * Asymmetric grid over a 6-column track: the lead project takes four columns,
 * the rest take two. Breaks the monotony of an even grid without needing a
 * separate "hero project" component.
 */
const SPANS = ["lg:col-span-4", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2"];

export function FeaturedWork() {
  const { t } = useLocale();

  return (
    <section className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label={ui.sections.selectedWorkLabel}
          title={ui.sections.selectedWorkTitle}
          body={ui.sections.selectedWorkBody}
          aside={
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-mono text-xs text-fg transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              {t(ui.sections.viewAll)}
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                &#8594;
              </span>
            </Link>
          }
        />

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {featuredProjects.map((project, i) => (
            <li key={project.slug} className={SPANS[i] ?? "lg:col-span-2"}>
              <Reveal delay={Math.min(i, 3) * 0.06} className="h-full">
                <ProjectCard project={project} featured={i === 0} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
