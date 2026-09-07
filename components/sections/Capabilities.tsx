"use client";

import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { capabilities } from "@/content/site";
import { ui } from "@/content/ui";
import { useLocale } from "@/lib/i18n";
import { SectionHeading } from "./SectionHeading";

export function Capabilities() {
  const { t } = useLocale();

  return (
    <section className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label={ui.sections.capabilitiesLabel}
          title={ui.sections.capabilitiesTitle}
        />

        <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {capabilities.map((capability, i) => (
            <li key={capability.id}>
              <Reveal delay={i * 0.08} className="h-full">
                <TiltCard glow={capability.accent} max={5} className="h-full">
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-colors duration-500 hover:border-border-bright">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background:
                          "radial-gradient(360px circle at var(--glow-x, 50%) var(--glow-y, 0%), color-mix(in srgb, var(--glow-color, #c6ff3d) 12%, transparent), transparent 65%)",
                      }}
                    />

                    <span
                      className="relative mb-6 inline-flex h-9 w-9 items-center justify-center rounded-lg border font-mono text-xs font-semibold"
                      style={{
                        color: capability.accent,
                        borderColor: `${capability.accent}44`,
                        background: `${capability.accent}14`,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <h3 className="relative mb-3 font-display text-xl font-bold tracking-tight text-fg">
                      {t(capability.title)}
                    </h3>

                    <p className="relative mb-6 text-sm leading-relaxed text-muted">
                      {t(capability.body)}
                    </p>

                    <div className="relative mt-auto flex flex-wrap gap-1.5">
                      {capability.keywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="rounded-full border border-border bg-surface-2/70 px-2 py-0.5 font-mono text-[10px] text-muted"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </article>
                </TiltCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
