"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { TechBadge } from "@/components/tech/TechBadge";
import { getProject } from "@/content/projects";
import { services } from "@/content/site";
import { ui } from "@/content/ui";
import { useLocale } from "@/lib/i18n";

/**
 * What he can be hired to build, as editorial rows.
 *
 * The important change from the old "capability pillars" is the proof line:
 * every claim links to a real case study on this site that demonstrates it.
 * A skills list asks to be believed; a claim with evidence attached does not.
 */
export function Services() {
  const { t } = useLocale();

  return (
    <section className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeadingInline />

        <div className="border-t border-border">
          {services.map((service, i) => {
            const proofProject = getProject(service.proof.slug);

            return (
              <Reveal key={service.id} delay={i * 0.06}>
                <article
                  className="group grid grid-cols-1 gap-x-10 gap-y-5 border-b border-border py-10 md:grid-cols-12 md:py-14"
                  style={{ ["--accent" as string]: service.accent }}
                >
                  <div className="md:col-span-2">
                    <span
                      className="font-display text-5xl font-bold leading-none tracking-tight text-faint transition-colors duration-500 group-hover:text-[var(--accent)] md:text-7xl"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="md:col-span-4">
                    <h3 className="font-display text-2xl font-bold leading-tight tracking-tight text-fg md:text-3xl">
                      {t(service.title)}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="mt-5 block h-0.5 w-14 origin-left transition-transform duration-500 group-hover:scale-x-[2.2]"
                      style={{ background: service.accent }}
                    />
                  </div>

                  <div className="md:col-span-6">
                    <p className="text-base leading-relaxed text-muted">{t(service.body)}</p>

                    <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                      {service.keywords.map((keyword) => (
                        <TechBadge key={keyword} name={keyword} />
                      ))}
                    </div>

                    {/* The claim, with evidence attached */}
                    {proofProject && (
                      <Link
                        href={`/work/${proofProject.slug}`}
                        className="group/proof mt-7 flex items-start gap-3 border-l-2 pl-4 transition-colors duration-300"
                        style={{ borderColor: service.accent }}
                      >
                        <span className="label shrink-0 pt-0.5">
                          {t(ui.sections.servicesProof)}
                        </span>
                        <span className="min-w-0">
                          <span className="block font-mono text-xs text-fg transition-colors duration-300 group-hover/proof:text-[var(--accent)]">
                            {proofProject.name}
                            <span className="ml-1.5 inline-block transition-transform duration-300 group-hover/proof:translate-x-0.5">
                              &#8594;
                            </span>
                          </span>
                          <span className="mt-1 block text-sm leading-snug text-muted">
                            {t(service.proof.note)}
                          </span>
                        </span>
                      </Link>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Kept inline so the section owns its own heading copy. */
function SectionHeadingInline() {
  const { t } = useLocale();

  return (
    <div className="mb-12 max-w-2xl">
      <Reveal>
        <p className="label mb-4 flex items-center gap-2">
          <span className="inline-block h-px w-8 bg-accent" aria-hidden="true" />
          {t(ui.sections.servicesLabel)}
        </p>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="display-lg text-fg">{t(ui.sections.servicesTitle)}</h2>
      </Reveal>
    </div>
  );
}
