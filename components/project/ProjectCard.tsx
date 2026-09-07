"use client";

import Link from "next/link";
import type { Project } from "@/content/types";
import { TiltCard } from "@/components/motion/TiltCard";
import { useLocale } from "@/lib/i18n";
import { ProjectImage } from "./ProjectImage";
import { StackBadge, StatusChip } from "./Badges";

interface ProjectCardProps {
  project: Project;
  /** Eager-load the first couple of cards; the rest stay lazy. */
  priority?: boolean;
  /** Featured cards get a wider image and show more copy. */
  featured?: boolean;
}

export function ProjectCard({ project, priority = false, featured = false }: ProjectCardProps) {
  const { t } = useLocale();

  return (
    <TiltCard glow={project.accent} max={featured ? 4 : 6} className="h-full">
      <Link
        href={`/work/${project.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-500 hover:border-border-bright"
      >
        {/* Cursor-following bloom, tinted per project. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(420px circle at var(--glow-x, 50%) var(--glow-y, 0%), color-mix(in srgb, var(--glow-color, #c6ff3d) 14%, transparent), transparent 65%)",
          }}
        />

        <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-2">
          <ProjectImage
            src={project.image}
            alt={`${project.name} — ${t(project.tagline)}`}
            accent={project.accent}
            name={project.name}
            stack={project.stack}
            priority={priority}
            sizes={
              featured
                ? "(min-width: 1024px) 60vw, 100vw"
                : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            }
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent" />

          <span
            className="absolute left-4 top-4 font-mono text-xs font-semibold"
            style={{ color: project.accent }}
          >
            {String(project.index).padStart(2, "0")}
          </span>

          <div className="absolute right-4 top-4">
            <StatusChip status={project.status} />
          </div>
        </div>

        <div className="relative z-10 flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-xl font-bold tracking-tight text-fg transition-colors duration-300 group-hover:text-accent sm:text-2xl">
              {project.name}
            </h3>
            <span
              className="mt-1 shrink-0 text-lg text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
              aria-hidden="true"
            >
              &#8599;
            </span>
          </div>

          <p className="label !normal-case !tracking-normal">{t(project.domain)}</p>

          <p className="text-sm leading-relaxed text-muted">{t(project.tagline)}</p>

          <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {project.stack.slice(0, featured ? 7 : 5).map((tech) => (
              <StackBadge
                key={tech}
                label={tech}
                isAi={project.aiPipeline.includes(tech)}
              />
            ))}
            {project.stack.length > (featured ? 7 : 5) && (
              <span className="font-mono text-[10px] text-muted/70">
                +{project.stack.length - (featured ? 7 : 5)}
              </span>
            )}
          </div>
        </div>

        {/* Accent underline that draws in on hover. */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
          style={{ background: project.accent }}
        />
      </Link>
    </TiltCard>
  );
}
