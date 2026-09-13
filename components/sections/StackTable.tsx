"use client";

import { Reveal } from "@/components/motion/Reveal";
import { TechBadge } from "@/components/tech/TechBadge";
import { stackGroups, usageCount } from "@/content/stack";
import { ui } from "@/content/ui";
import { useLocale } from "@/lib/i18n";

/**
 * The stack as information rather than texture.
 *
 * /about used to re-run the home page's marquee and services rows, so three of
 * its five sections were already on the page a visitor came from. This is the
 * replacement for the marquee specifically: the same names, grouped by what
 * they are for, with the number of shipped projects each appears in.
 *
 * That count is the whole point of the section. A "skills" list is a claim;
 * "PostgreSQL, in 8 of 11 projects" is checkable against the work index two
 * clicks away.
 */
export function StackTable() {
  const { t } = useLocale();

  return (
    <section className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <Reveal>
            <p className="label mb-4 flex items-center gap-2">
              <span className="inline-block h-px w-8 bg-accent" aria-hidden="true" />
              {t(ui.sections.stackLabel)}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="display-lg text-fg">{t(ui.sections.stackTitle)}</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 text-base leading-relaxed text-muted">
              {t(ui.sections.stackBody)}
            </p>
          </Reveal>
        </div>

        <dl className="border-t border-border">
          {stackGroups.map((group, i) => (
            <Reveal
              key={group.label.en}
              delay={i * 0.05}
              className="grid grid-cols-1 gap-x-10 gap-y-4 border-b border-border py-7 md:grid-cols-12"
            >
              <dt className="label md:col-span-3 md:pt-1">{t(group.label)}</dt>

              <dd className="md:col-span-9">
                <ul className="flex flex-wrap items-center gap-x-6 gap-y-3.5">
                  {group.items.map((tech) => (
                    <li key={tech} className="flex items-baseline gap-1.5">
                      <TechBadge name={tech} />
                      <span
                        className="font-mono text-[10px] tabular-nums text-faint"
                        // The badge already names the technology; this number
                        // needs its own label or it reads as a version.
                        aria-label={`${t(ui.sections.stackUsedIn)} ${usageCount[tech]}`}
                      >
                        {usageCount[tech]}
                      </span>
                    </li>
                  ))}
                </ul>
              </dd>
            </Reveal>
          ))}
        </dl>

        <Reveal delay={0.1}>
          <p className="mt-6 font-mono text-xs text-faint">
            {t(ui.sections.stackFootnote)}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
