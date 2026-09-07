"use client";

import { Reveal } from "@/components/motion/Reveal";
import { site, summary, summaryLong } from "@/content/site";
import type { LocalizedText } from "@/content/types";
import { ui } from "@/content/ui";
import { useLocale } from "@/lib/i18n";
import { SectionHeading } from "./SectionHeading";

interface Detail {
  label: LocalizedText;
  /** Plain strings are locale-independent (email, handles); the rest are bilingual. */
  value: string | LocalizedText;
  href?: string;
}

const DETAILS: Detail[] = [
  { label: { id: "Nama", en: "Name" }, value: site.name },
  { label: { id: "Peran", en: "Role" }, value: site.role },
  { label: { id: "Lokasi", en: "Location" }, value: site.location },
  { label: { id: "Email", en: "Email" }, value: site.email, href: `mailto:${site.email}` },
  { label: { id: "Telepon", en: "Phone" }, value: site.phone, href: `https://wa.me/${site.whatsapp}` },
  { label: { id: "GitHub", en: "GitHub" }, value: "github.com/FlamionZ", href: site.github },
  { label: { id: "LinkedIn", en: "LinkedIn" }, value: "in/muhrakabi", href: site.linkedin },
];

export function AboutIntro() {
  const { t } = useLocale();
  const resolve = (value: string | LocalizedText) =>
    typeof value === "string" ? value : t(value);

  return (
    <section className="px-5 pb-8 pt-32 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading label={ui.sections.aboutLabel} title={ui.sections.aboutTitle} />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Reveal>
              <p className="text-lg leading-relaxed text-fg sm:text-xl">{t(summary)}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 text-base leading-relaxed text-muted">{t(summaryLong)}</p>
            </Reveal>
          </div>

          <Reveal delay={0.14} className="lg:col-span-1">
            <dl className="border-t border-border">
              {DETAILS.map((detail) => (
                <div
                  key={detail.label.en}
                  className="flex items-baseline justify-between gap-4 border-b border-border py-3.5"
                >
                  <dt className="label shrink-0">{t(detail.label)}</dt>
                  <dd className="text-right font-mono text-xs text-fg">
                    {detail.href ? (
                      <a
                        href={detail.href}
                        target={detail.href.startsWith("mailto:") ? undefined : "_blank"}
                        rel="noreferrer noopener"
                        className="transition-colors hover:text-accent"
                      >
                        {resolve(detail.value)}
                      </a>
                    ) : (
                      resolve(detail.value)
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
