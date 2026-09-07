"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { CountUp } from "@/components/motion/CountUp";
import { Magnetic } from "@/components/motion/Magnetic";
import { ScrambleText } from "@/components/motion/ScrambleText";
import { site, stats, summary } from "@/content/site";
import { ui } from "@/content/ui";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { useLocale } from "@/lib/i18n";

/** The role, broken into display lines. Identical in both languages. */
const HEADLINE = ["FULLSTACK", "DEVELOPER &", "AI ENGINEER"];

export function Hero() {
  const { t } = useLocale();
  const reduced = usePrefersReducedMotion();

  // Each line rises out of a clipping mask. Skipped entirely when reduced.
  const lineIn = (index: number) =>
    reduced
      ? {}
      : {
          initial: { y: "110%" },
          animate: { y: "0%" },
          transition: {
            duration: 0.9,
            delay: 0.15 + index * 0.09,
            ease: [0.16, 1, 0.3, 1] as const,
          },
        };

  return (
    <section className="relative flex min-h-[92svh] flex-col justify-center px-5 pb-16 pt-28 sm:px-8">
      <div className="mx-auto w-full max-w-7xl">
        {/* Availability badge */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mb-8 inline-flex items-center gap-2 rounded-sm border border-border bg-surface/60 px-3 py-1.5 backdrop-blur-md"
        >
          <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-sm bg-accent opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-sm bg-accent" />
          </span>
          <span className="font-mono text-[11px] tracking-wide text-muted">
            {t(ui.hero.available)}
          </span>
        </motion.div>

        {/* Name */}
        <motion.p
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-5 font-mono text-xs tracking-[0.2em] text-muted sm:text-sm"
        >
          <span className="text-accent">&#10095;</span>{" "}
          <ScrambleText text={site.name.toUpperCase()} delay={300} speed={2.4} />
        </motion.p>

        {/* Headline */}
        <h1 className="display-xl text-fg">
          {HEADLINE.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <motion.span className="block" {...lineIn(i)}>
                {line === "AI ENGINEER" ? (
                  <>
                    <span className="text-accent">AI</span> ENGINEER
                    <span className="caret" aria-hidden="true" />
                  </>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Summary */}
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-8 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
        >
          {t(summary)}
        </motion.p>

        {/* Calls to action */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Magnetic strength={0.3}>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 rounded-sm bg-accent px-6 py-3 font-mono text-sm font-semibold text-bg transition-shadow duration-300 hover:shadow-[0_0_32px_rgba(198,255,61,0.45)]"
            >
              {t(ui.hero.viewWork)}
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                &#8594;
              </span>
            </Link>
          </Magnetic>

          <Magnetic strength={0.3}>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-sm border border-border px-6 py-3 font-mono text-sm text-fg transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              {t(ui.hero.getInTouch)}
            </a>
          </Magnetic>
        </motion.div>

        {/* Headline numbers */}
        <motion.dl
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-8 sm:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.label.en}>
              <dd className="font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl">
                <CountUp value={stat.value} />
              </dd>
              <dt className="label mt-1.5">{t(stat.label)}</dt>
            </div>
          ))}
        </motion.dl>
      </div>

    </section>
  );
}
