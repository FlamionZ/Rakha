"use client";

import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import { useCopyToClipboard } from "@/lib/hooks";
import { useLocale } from "@/lib/i18n";

/**
 * Contact block. This is a static site with no backend, so every path here is
 * a direct one — mailto, wa.me, clipboard. Nothing to expire, nothing to break.
 */
export function ContactCTA() {
  const { t } = useLocale();
  const { copied, copy } = useCopyToClipboard();

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden border-t border-border px-5 py-24 sm:px-8 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
      />

      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="label mb-6 flex items-center justify-center gap-2">
            <span className="inline-block h-px w-8 bg-accent" aria-hidden="true" />
            {t(ui.contact.label)}
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="display-lg text-fg">{t(ui.contact.title)}</h2>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted">
            {t(ui.contact.body)}
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
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
        </Reveal>

        <Reveal delay={0.24}>
          <button
            type="button"
            onClick={() => copy(site.email)}
            className="mt-8 inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-accent"
            aria-label={t(ui.contact.copy)}
          >
            <span className="underline decoration-border decoration-dashed underline-offset-4">
              {site.email}
            </span>
            <span className={copied ? "text-accent" : "text-muted"}>
              {copied ? `✓ ${t(ui.contact.copied)}` : "⧉"}
            </span>
          </button>
        </Reveal>
      </div>
    </section>
  );
}
