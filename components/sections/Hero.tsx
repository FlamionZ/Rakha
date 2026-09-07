"use client";

import Image from "next/image";
import Link from "next/link";
import { WordsPullUp } from "@/components/motion/WordsPullUp";
import { projects } from "@/content/projects";
import { site, summary } from "@/content/site";
import { ui } from "@/content/ui";
import { useLocale } from "@/lib/i18n";

/**
 * Backdrop frames.
 *
 * The reference this layout came from used a hosted stock video. That URL
 * points at someone else's CDN bucket, so it is not ours to hotlink and would
 * break the hero the day it is removed. His own product screenshots are
 * already in the repo, cost no new assets, and say something specific — behind
 * a heavy scrim they read as texture rather than as content competing with the
 * headline.
 */
const BACKDROP = projects.filter((p) => p.image).slice(0, 3);

/** Entrance delay for the `rise-in` class, in seconds. */
function riseDelay(seconds: number) {
  return { "--rise-delay": `${seconds}s` } as React.CSSProperties;
}

export function Hero() {
  const { t } = useLocale();

  return (
    <section className="px-3 pt-19 sm:px-5 sm:pt-20">
      <div className="relative h-[calc(100svh-5.5rem)] min-h-[560px] w-full overflow-hidden rounded-sm border border-border bg-surface-2">
        {/* Cross-fading backdrop */}
        <div aria-hidden="true" className="absolute inset-0">
          {BACKDROP.map((project, i) => (
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
                className="object-cover object-top opacity-30 saturate-[0.55]"
              />
            </div>
          ))}
        </div>

        {/* Scrims: keep the headline legible whatever frame is showing */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-bg via-bg/75 to-bg/40"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,transparent,rgba(5,6,10,0.85))]"
        />

        {/* Content, anchored to the foot of the frame */}
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 lg:p-10">
          <div className="grid grid-cols-12 items-end gap-x-8 gap-y-8">
            <div className="col-span-12 lg:col-span-8">
              <p
                style={riseDelay(0.05)}
                className="rise-in mb-6 inline-flex items-center gap-2 rounded-sm border border-border bg-bg/60 px-3 py-1.5 backdrop-blur-md"
              >
                <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                <span className="font-mono text-[11px] tracking-wide text-muted">
                  {t(ui.hero.available)}
                </span>
              </p>

              <h1 className="font-display font-bold leading-[0.82] tracking-[-0.05em] text-fg text-[22vw] sm:text-[19vw] lg:text-[15vw] 2xl:text-[12rem]">
                <WordsPullUp
                  text={site.shortName.toUpperCase()}
                  splitBy="char"
                  stagger={0.07}
                  delay={0.15}
                  showAsterisk
                />
              </h1>
            </div>

            <div className="col-span-12 flex flex-col gap-5 lg:col-span-4 lg:pb-4">
              {/* The referent for the asterisk on the name */}
              <p style={riseDelay(0.5)} className="rise-in font-mono text-xs text-fg sm:text-sm">
                <span className="mr-1.5 text-accent" aria-hidden="true">
                  *
                </span>
                {t(site.role)}
              </p>

              <p
                style={riseDelay(0.58)}
                className="rise-in max-w-md text-sm leading-relaxed text-muted sm:text-base"
              >
                {t(summary)}
              </p>

              <div style={riseDelay(0.66)} className="rise-in">
                <Link
                  href="/work"
                  className="group inline-flex items-center gap-3 rounded-sm bg-accent py-1.5 pl-5 pr-1.5 font-mono text-sm font-semibold text-bg transition-shadow duration-300 hover:shadow-[0_0_32px_rgba(198,255,61,0.4)]"
                >
                  {t(ui.hero.viewWork)}
                  <span className="flex h-8 w-8 items-center justify-center rounded-xs bg-bg text-accent transition-transform duration-300 group-hover:translate-x-0.5">
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
      </div>
    </section>
  );
}
