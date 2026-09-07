"use client";

import Link from "next/link";
import { TiltCard } from "@/components/motion/TiltCard";
import { TechStrip } from "@/components/tech/TechBadge";
import type { Project } from "@/content/types";
import { useLocale } from "@/lib/i18n";
import { StatusChip } from "./Badges";
import { ProjectImage } from "./ProjectImage";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
  /** Featured cards get a wider image and a larger title. */
  featured?: boolean;
}

/**
 * A framed screenshot with type beneath it — not a card.
 *
 * The earlier version wrapped everything in a bordered, filled, 16px-rounded
 * box, so a page of them read as a stack of identical containers. Dropping the
 * outer box lets the image do the framing and the type sit on the page.
 */
export function ProjectCard({ project, priority = false, featured = false }: ProjectCardProps) {
  const { t } = useLocale();

  return (
    <TiltCard glow={project.accent} max={featured ? 3 : 5} className="h-full">
      <Link
        href={`/work/${project.slug}`}
        className="group flex h-full flex-col"
        style={{ ["--accent" as string]: project.accent }}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-border bg-surface-2 transition-colors duration-500 group-hover:border-border-bright">
          <ProjectImage
            src={project.image}
            alt={`${project.name} — ${t(project.tagline)}`}
            accent={project.accent}
            name={project.name}
            stack={project.stack}
            priority={priority}
            sizes={
              featured
                ? "(min-width: 1024px) 62vw, 100vw"
                : "(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw"
            }
          />

          {/* Cursor-following bloom, tinted per project */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(420px circle at var(--glow-x, 50%) var(--glow-y, 0%), color-mix(in srgb, var(--accent) 16%, transparent), transparent 65%)",
            }}
          />

          <div className="absolute right-3 top-3 z-30">
            <StatusChip status={project.status} />
          </div>
        </div>

        {/* Type sits on the page, with a rule instead of a container */}
        <div className="relative flex flex-1 flex-col pt-5">
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 h-px w-full origin-left bg-border"
          />
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
            style={{ background: project.accent }}
          />

          <div className="flex items-baseline gap-3">
            <span
              className="font-mono text-xs tabular-nums text-muted transition-colors duration-300 group-hover:text-[var(--accent)]"
              aria-hidden="true"
            >
              {String(project.index).padStart(2, "0")}
            </span>
            <h3
              className={`flex-1 font-display font-bold leading-tight tracking-tight text-fg transition-colors duration-300 group-hover:text-[var(--accent)] ${
                featured ? "text-2xl sm:text-3xl" : "text-xl"
              }`}
            >
              {project.name}
            </h3>
            <span
              className="text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
              aria-hidden="true"
            >
              &#8599;
            </span>
          </div>

          <p className="mt-2 font-mono text-[11px] text-muted">{t(project.domain)}</p>

          <p
            className={`mt-3 leading-relaxed text-muted ${featured ? "text-base" : "text-sm"}`}
          >
            {t(project.tagline)}
          </p>

          <TechStrip
            names={project.stack}
            max={featured ? 8 : 6}
            size={featured ? "md" : "sm"}
            className="mt-auto pt-5"
          />
        </div>
      </Link>
    </TiltCard>
  );
}
