"use client";

import { Reveal } from "@/components/motion/Reveal";
import { education, experience } from "@/content/experience";
import { ui } from "@/content/ui";
import { useLocale } from "@/lib/i18n";

/**
 * Experience and education.
 *
 * The single biggest credibility gap the site had: recruiters look for this
 * first and it was simply absent. Laid out as a ruled timeline with the period
 * set in the margin, which stays scannable and matches the editorial rhythm
 * the rest of the site uses — no cards.
 */
export function Experience() {
  const { t } = useLocale();

  return (
    <section className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <Reveal>
            <p className="label mb-4 flex items-center gap-2">
              <span className="inline-block h-px w-8 bg-accent" aria-hidden="true" />
              {t(ui.sections.experienceLabel)}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="display-lg text-fg">{t(ui.sections.experienceTitle)}</h2>
          </Reveal>
        </div>

        <ol className="border-t border-border">
          {experience.map((entry, i) => (
            <li key={entry.org} className="border-b border-border">
              <Reveal delay={i * 0.06}>
                <article className="grid grid-cols-1 gap-x-10 gap-y-4 py-9 md:grid-cols-12 md:py-11">
                  <p className="label md:col-span-3">{t(entry.period)}</p>

                  <div className="md:col-span-9">
                    <h3 className="font-display text-xl font-bold tracking-tight text-fg sm:text-2xl">
                      {t(entry.role)}
                    </h3>

                    <p className="mt-1 font-mono text-xs text-accent">
                      {entry.url ? (
                        <a
                          href={entry.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="transition-colors duration-300 hover:text-fg"
                        >
                          {entry.org}
                        </a>
                      ) : (
                        entry.org
                      )}
                    </p>

                    <ul className="mt-5 flex flex-col gap-2.5">
                      {entry.points.map((point) => (
                        <li key={point.en} className="flex gap-3">
                          <span
                            className="mt-2 h-px w-3 shrink-0 bg-border-bright"
                            aria-hidden="true"
                          />
                          <span className="text-sm leading-relaxed text-muted">{t(point)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>

        {/* Education */}
        <div className="mt-20 mb-10 max-w-2xl">
          <Reveal>
            <p className="label flex items-center gap-2">
              <span className="inline-block h-px w-8 bg-accent-2" aria-hidden="true" />
              {t(ui.sections.educationLabel)}
            </p>
          </Reveal>
        </div>

        <ol className="border-t border-border">
          {education.map((entry, i) => (
            <li key={entry.org} className="border-b border-border">
              <Reveal delay={i * 0.06}>
                <article className="grid grid-cols-1 gap-x-10 gap-y-2 py-7 md:grid-cols-12">
                  <p className="label md:col-span-3">{entry.period}</p>
                  <div className="md:col-span-9">
                    <h3 className="font-display text-lg font-bold tracking-tight text-fg">
                      {entry.org}
                    </h3>
                    <p className="mt-1 flex flex-wrap items-baseline gap-x-3 font-mono text-xs text-muted">
                      <span>{t(entry.qualification)}</span>
                      {entry.note && <span className="text-accent-2">{t(entry.note)}</span>}
                    </p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
