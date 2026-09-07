"use client";

import { Reveal } from "@/components/motion/Reveal";
import { TechBadge } from "@/components/tech/TechBadge";
import { capabilities } from "@/content/site";
import { ui } from "@/content/ui";
import { useLocale } from "@/lib/i18n";
import { SectionHeading } from "./SectionHeading";

/**
 * Three capability pillars as editorial rows.
 *
 * These used to be three identical numbered cards side by side — the most
 * template-looking pattern on the site. Laying them out as full-width rules
 * with the number set large in the margin gives them the weight of a
 * manifesto, and makes the section structurally unlike every grid around it.
 */
export function Capabilities() {
  const { t } = useLocale();

  return (
    <section className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label={ui.sections.capabilitiesLabel}
          title={ui.sections.capabilitiesTitle}
        />

        <div className="border-t border-border">
          {capabilities.map((capability, i) => (
            <Reveal key={capability.id} delay={i * 0.06}>
              <article
                className="group grid grid-cols-1 gap-x-10 gap-y-5 border-b border-border py-10 md:grid-cols-12 md:py-14"
                style={{ ["--accent" as string]: capability.accent }}
              >
                {/* Oversized numeral in the margin */}
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
                    {t(capability.title)}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="mt-5 block h-0.5 w-14 origin-left transition-transform duration-500 group-hover:scale-x-[2.2]"
                    style={{ background: capability.accent }}
                  />
                </div>

                <div className="md:col-span-6">
                  <p className="text-base leading-relaxed text-muted">{t(capability.body)}</p>

                  <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                    {capability.keywords.map((keyword) => (
                      <TechBadge key={keyword} name={keyword} />
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
