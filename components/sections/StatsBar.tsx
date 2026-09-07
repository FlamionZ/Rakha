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
    <section className="px-5 py-12 sm:px-8 sm:py-14">
      <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal key={stat.label.en} delay={i * 0.06}>
            <div className="border-t border-border pt-4">
              <dd className="font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl">
                <CountUp value={stat.value} />
              </dd>
              <dt className="label mt-1.5">{t(stat.label)}</dt>
            </div>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
