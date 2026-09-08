"use client";

import Image from "next/image";
import Link from "next/link";
import { BlurText } from "@/components/motion/BlurText";
import { site, tagline } from "@/content/site";
import { ui } from "@/content/ui";
import { useLocale } from "@/lib/i18n";

/** Real photo, dark charcoal background, face centred horizontally — an
 * object-cover crop at the pill's narrow ratio trims the sides and keeps the
 * full head-to-chest height, so the default centre position needs no
 * adjustment. */
const PORTRAIT: string | null = "/me.webp";

const MONOGRAM = "MRA";

const NAME_LINES = ["RAKHA", "ABIMANYU"];

/**
 * Scale each line so both occupy the same width.
 *
 * The reference stacks two four-letter words, so its block is naturally a
 * rectangle. "RAKHA" and "ABIMANYU" are five and eight, which would centre as
 * a ragged pyramid. Because the face is monospace, advance width is exactly
 * proportional to character count — so sizing each line by longest/own length
 * justifies the block flush with no measuring. Tracking is in `em`, so it
 * scales along with it.
 *
 * The base size is set for the LONGEST line, since that is the one that can
 * overflow: eight characters at 0.56em advance fill about 90vw at 18vw type.
 */
const LONGEST = Math.max(...NAME_LINES.map((line) => line.length));

export function Hero() {
  const { t } = useLocale();

  return (
    <section className="relative flex min-h-[100svh] flex-col px-4 pb-24 pt-24">
      {/* The name centres in whatever space the tagline leaves.
          The reference pins both absolutely, which would collide on a
          landscape phone — short viewport, but vw-based type stays large. */}
      <div className="flex flex-1 flex-col items-center justify-center">
        {/* Answers "who is this and what do they do" before the name lands —
            a name-only hero looks like a designer's, not an engineer's. */}
        <p className="mb-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-muted sm:text-xs">
          <span>{t(site.role)}</span>
          <span className="text-faint" aria-hidden="true">
            &middot;
          </span>
          <a
            href={site.company.url}
            target="_blank"
            rel="noreferrer noopener"
            className="text-fg transition-colors duration-300 hover:text-accent"
          >
            {site.company.name}
          </a>
        </p>

        <div className="relative">
          <h1 className="text-center font-mono text-[18vw] font-bold uppercase leading-[0.78] tracking-[-0.04em] text-accent 2xl:text-[13rem]">
            {NAME_LINES.map((line, lineIndex) => (
              <span
                key={line}
                className="block whitespace-nowrap"
                style={{ fontSize: `${LONGEST / line.length}em` }}
              >
                <BlurText
                  text={line}
                  animateBy="letters"
                  delay={0.1 + lineIndex * 0.3}
                  stagger={0.07}
                />
              </span>
            ))}
          </h1>

          {/* Portrait, over the join between the two lines */}
          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <div className="h-[95px] w-[56px] overflow-hidden rounded-full border border-border-bright bg-surface-2 shadow-2xl transition-transform duration-300 hover:scale-110 sm:h-[152px] sm:w-[90px] md:h-[185px] md:w-[110px] lg:h-[218px] lg:w-[129px]">
              {PORTRAIT ? (
                <Image
                  src={PORTRAIT}
                  alt={site.name}
                  width={258}
                  height={436}
                  priority
                  className="h-full w-full object-cover"
                />
              ) : (
                <span
                  className="flex h-full w-full items-center justify-center font-mono text-sm font-bold tracking-widest text-muted sm:text-base lg:text-lg"
                  aria-hidden="true"
                >
                  {MONOGRAM}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tagline sits low, above the scroll cue */}
      <p className="mx-auto mt-10 max-w-2xl text-center text-[15px] leading-snug text-muted transition-colors duration-300 hover:text-fg sm:text-lg lg:text-xl">
        <BlurText text={t(tagline)} animateBy="words" delay={0.9} stagger={0.05} />
      </p>

      <Link
        href="#overview"
        aria-label={t(ui.hero.scrollDown)}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 p-3 text-muted transition-colors duration-300 hover:text-accent md:bottom-6"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6 animate-bounce md:h-8 md:w-8"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </Link>
    </section>
  );
}
