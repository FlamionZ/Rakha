"use client";

import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { stats } from "@/content/site";
import { useLocale } from "@/lib/i18n";

/**
 * Headline numbers, as a strip under the hero.
 *
 * These used to sit inside the hero. With the hero now a full-height frame
 * there is no room for them there, and they read better as their own beat
 * anyway — the first thing you meet after the name, before any project.
 */
export function StatsBar() {
  const { t } = useLocale();

  return (
    <section id="overview" className="scroll-mt-24 px-5 py-12 sm:px-8 sm:py-14">
      <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
        {stats.map((stat, i) => (
          // `dt` precedes `dd` because the spec requires that order inside a
          // `dl > div` group; `flex-col-reverse` puts the number back on top
          // visually. The old markup nested the pair two divs deep, which
          // detached them from the <dl> for assistive tech.
          <Reveal
            key={stat.label.en}
            delay={i * 0.06}
            className="flex flex-col-reverse border-t border-border pt-4"
          >
            <dt className="label mt-1.5">{t(stat.label)}</dt>
            <dd className="font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl">
              <CountUp value={stat.value} />
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
