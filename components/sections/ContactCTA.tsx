"use client";

import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import { useCopyToClipboard } from "@/lib/hooks";
import { useLocale } from "@/lib/i18n";

/**
 * Closing contact block.
 *
 * This renders at the foot of every page, which is exactly why it must not be
 * a centred hero-style CTA: repeated four times, that pattern was the last
 * "identical section" left on the site and the most template-looking thing on
 * it. Laid out as an asymmetric split it reads as the end of the page rather
 * than another landing-page pitch, and it matches the left-aligned editorial
 * rhythm everything else uses.
 */
export function ContactCTA() {
  const { t } = useLocale();
  const { copied, copy } = useCopyToClipboard();

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-border px-5 py-20 sm:px-8 sm:py-24"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <Reveal>
            <p className="label mb-5 flex items-center gap-2">
              <span className="inline-block h-px w-8 bg-accent" aria-hidden="true" />
              {t(ui.contact.label)}
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="display-lg text-fg">{t(ui.contact.title)}</h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
              {t(ui.contact.body)}
            </p>
          </Reveal>
        </div>

        <div className="md:col-span-5 md:justify-self-end">
          <Reveal delay={0.16}>
            <div className="flex flex-wrap items-center gap-3">
              <Magnetic strength={0.3}>
                <a
                  href={`mailto:${site.email}`}
                  className="group inline-flex items-center gap-2 rounded-sm bg-accent px-6 py-3 font-mono text-sm font-semibold text-bg transition-shadow duration-300 hover:shadow-[0_0_32px_rgba(198,255,61,0.45)]"
                >
                  {t(ui.contact.email)}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    &#8594;
                  </span>
                </a>
              </Magnetic>

              <Magnetic strength={0.3}>
                <a
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-sm border border-border px-6 py-3 font-mono text-sm text-fg transition-colors duration-300 hover:border-accent hover:text-accent"
                >
                  {t(ui.contact.whatsapp)}
                </a>
              </Magnetic>
            </div>

            <button
              type="button"
              onClick={() => copy(site.email)}
              className="group mt-5 inline-flex items-center gap-2 py-1 font-mono text-sm text-muted transition-colors hover:text-accent"
              aria-label={t(ui.contact.copy)}
            >
              <span className="underline decoration-border decoration-dashed underline-offset-4 group-hover:decoration-accent">
                {site.email}
              </span>
              {copied ? (
                <span className="text-accent">{t(ui.contact.copied)}</span>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.7}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="9" y="9" width="12" height="12" rx="2" />
                  <path d="M5 15V5a2 2 0 0 1 2-2h10" />
                </svg>
              )}
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
