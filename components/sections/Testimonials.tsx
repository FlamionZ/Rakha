"use client";

import { Reveal } from "@/components/motion/Reveal";
import { testimonials } from "@/content/testimonials";
import { ui } from "@/content/ui";
import { useLocale } from "@/lib/i18n";

/**
 * References, when there are any.
 *
 * Returns null on an empty list rather than rendering a placeholder, so the
 * page has no gap to explain and nothing invented ever ships. See the note in
 * content/testimonials.ts.
 */
export function Testimonials() {
  const { t } = useLocale();
  if (testimonials.length === 0) return null;

  return (
    <section className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="label mb-10 flex items-center gap-2">
            <span className="inline-block h-px w-8 bg-accent" aria-hidden="true" />
            {t(ui.sections.referencesLabel)}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2">
          {testimonials.map((entry, i) => (
            <Reveal key={entry.author} delay={i * 0.06}>
              <figure className="border-t border-border pt-7">
                <blockquote className="text-lg leading-relaxed text-fg">
                  {t(entry.quote)}
                </blockquote>
                <figcaption className="mt-5 font-mono text-xs text-muted">
                  {entry.url ? (
                    <a
                      href={entry.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-fg transition-colors duration-300 hover:text-accent"
                    >
                      {entry.author}
                    </a>
                  ) : (
                    <span className="text-fg">{entry.author}</span>
                  )}
                  <span className="mt-1 block text-faint">{t(entry.role)}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
