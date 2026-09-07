"use client";

import Image from "next/image";
import Link from "next/link";
import { WordsPullUp } from "@/components/motion/WordsPullUp";
import { projects } from "@/content/projects";
import { site, summary } from "@/content/site";
import { ui } from "@/content/ui";
import { useLocale } from "@/lib/i18n";

/**
 * Optional backdrop film.
 *
 * Drop a file in /public (e.g. "/hero/backdrop.mp4") and set it here to use
 * footage instead of the screenshot montage below — nothing else changes.
 *
 * The layout this came from pointed at a video on someone else's CloudFront
 * bucket. That is not ours to hotlink: it spends their bandwidth, and the hero
 * breaks the day they delete it.
 */
const HERO_VIDEO: string | null = null;

/**
 * Fallback backdrop: his own product screenshots, cross-fading.
 *
 * Chosen by slug rather than "the first three", because it has to be the
 * dark-UI ones. A light dashboard at low opacity becomes a grey wash and
 * stays legible enough to compete with the name; dark product screens read
 * as ambient glow, which is what a backdrop should do.
 */
const BACKDROP_SLUGS = ["aron", "focaron", "astheron-portal"];
const BACKDROP = BACKDROP_SLUGS.map((slug) =>
  projects.find((p) => p.slug === slug),
).filter((p): p is NonNullable<typeof p> => Boolean(p?.image));

/** Entrance delay for the `rise-in` class, in seconds. */
function riseDelay(seconds: number) {
  return { "--rise-delay": `${seconds}s` } as React.CSSProperties;
}

export function Hero() {
  const { t } = useLocale();

  return (
    <section className="px-3 pt-19 sm:px-5 sm:pt-20">
      <div className="relative h-[calc(100svh-5.5rem)] min-h-[560px] w-full overflow-hidden rounded-sm border border-border bg-surface-2">
        {/* Backdrop */}
        <div aria-hidden="true" className="absolute inset-0">
          {HERO_VIDEO ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              // Decorative: keep it out of assistive tech and the tab order.
              tabIndex={-1}
              className="absolute inset-0 h-full w-full object-cover opacity-40 saturate-[0.6]"
              src={HERO_VIDEO}
            />
          ) : (
            BACKDROP.map((project, i) => (
              <div
                key={project.slug}
                className="hero-slide absolute inset-0"
                style={{ animationDelay: `${-i * 7}s` }}
              >
                <Image
                  src={project.image as string}
                  alt=""
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover object-top opacity-[0.28] saturate-[0.45]"
                />
              </div>
            ))
          )}
        </div>

        {/* Scrims — the name has to stay legible over any frame */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_18%,transparent,rgba(5,6,10,0.88))]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-bg from-15% via-bg/85 via-45% to-transparent"
        />

        {/* Content, anchored to the foot of the frame */}
        <div className="absolute inset-x-0 bottom-0 px-4 pb-3 sm:px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-12 items-end gap-y-6 lg:gap-x-8">
            <div className="col-span-12 lg:col-span-8">
              <p
                style={riseDelay(0.05)}
                className="rise-in mb-5 inline-flex items-center gap-2 rounded-sm border border-border bg-bg/50 px-3 py-1.5 backdrop-blur-md"
              >
                <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                <span className="font-mono text-[11px] tracking-wide text-muted">
                  {t(ui.hero.available)}
                </span>
              </p>

              {/*
                Set light, title-case and very large. At this scale a bold
                weight becomes a wall; 500 keeps the counters open and lets the
                word read as a mark rather than a shout.
              */}
              <h1 className="font-display text-[26vw] font-medium leading-[0.82] tracking-[-0.06em] text-fg sm:text-[24vw] md:text-[22vw] lg:text-[19vw] 2xl:text-[17rem]">
                <WordsPullUp
                  text={site.shortName}
                  splitBy="char"
                  stagger={0.07}
                  delay={0.15}
                  showAsterisk
                />
              </h1>
            </div>

            <div className="col-span-12 flex flex-col gap-5 pb-4 lg:col-span-4 lg:pb-10">
              {/* The referent for the asterisk on the name */}
              <p
                style={riseDelay(0.5)}
                className="rise-in font-mono text-xs leading-snug text-fg sm:text-sm"
              >
                <span className="mr-1.5 text-accent" aria-hidden="true">
                  *
                </span>
                {t(site.role)}
              </p>

              <p
                style={riseDelay(0.58)}
                className="rise-in max-w-md text-xs leading-snug text-muted sm:text-sm md:text-base"
              >
                {t(summary)}
              </p>

              <Link
                href="/work"
                style={riseDelay(0.66)}
                className="rise-in group inline-flex items-center gap-2 self-start rounded-full bg-accent py-1 pl-5 pr-1 font-mono text-sm font-semibold text-bg transition-all duration-300 hover:gap-3"
              >
                {t(ui.hero.viewWork)}
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-bg text-accent transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
