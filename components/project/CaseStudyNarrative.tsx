"use client";

import { Reveal } from "@/components/motion/Reveal";
import type { CaseStudy } from "@/content/types";
import { ui } from "@/content/ui";
import { useLocale } from "@/lib/i18n";

/**
 * The four questions that let a reader judge the engineering rather than the
 * feature list: why it existed, how it is built, what was genuinely hard, and
 * what changed as a result.
 *
 * Laid out as wide prose with the label set in the margin, so it reads as a
 * written argument rather than another card grid — the highlight list below it
 * already covers the scannable feature treatment.
 */
export function CaseStudyNarrative({ caseStudy }: { caseStudy: CaseStudy }) {
  const { t } = useLocale();

  const sections = [
    { label: ui.project.problem, body: caseStudy.problem },
    { label: ui.project.architecture, body: caseStudy.architecture },
    { label: ui.project.challenge, body: caseStudy.challenge },
    { label: ui.project.outcome, body: caseStudy.outcome },
  ];

  return (
    <div className="border-t border-border">
      {sections.map((section, i) => (
        <Reveal key={section.label.en} delay={i * 0.05}>
          <section className="grid grid-cols-1 gap-x-10 gap-y-3 border-b border-border py-8 md:grid-cols-12">
            <h3 className="label md:col-span-3">{t(section.label)}</h3>
            <p className="text-base leading-relaxed text-fg/85 md:col-span-9">
              {t(section.body)}
            </p>
          </section>
        </Reveal>
      ))}
    </div>
  );
}
