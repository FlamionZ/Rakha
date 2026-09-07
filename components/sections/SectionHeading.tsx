"use client";

import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import type { LocalizedText } from "@/content/types";
import { useLocale } from "@/lib/i18n";

interface SectionHeadingProps {
  label: LocalizedText;
  title: LocalizedText;
  body?: LocalizedText;
  /** Rendered on the right on wide screens — usually a "view all" link. */
  aside?: ReactNode;
  align?: "left" | "center";
  /**
   * Heading level. Pages whose main title IS this heading must pass "h1" —
   * /work and /about previously started their outline at h2, leaving both
   * without a top-level heading for search engines and screen readers.
   */
  as?: "h1" | "h2";
}

/**
 * Takes LocalizedText rather than resolved strings, so server components can
 * render it directly without needing the locale themselves.
 */
export function SectionHeading({
  label,
  title,
  body,
  aside,
  align = "left",
  as: Heading = "h2",
}: SectionHeadingProps) {
  const { t } = useLocale();
  const centered = align === "center";

  return (
    <div
      className={`mb-12 flex flex-col gap-6 ${
        centered ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"
      }`}
    >
      <div className={centered ? "max-w-2xl" : "max-w-2xl"}>
        <Reveal>
          <p className={`label mb-4 flex items-center gap-2 ${centered ? "justify-center" : ""}`}>
            <span className="inline-block h-px w-8 bg-accent" aria-hidden="true" />
            {t(label)}
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <Heading className="display-lg text-fg">{t(title)}</Heading>
        </Reveal>
        {body && (
          <Reveal delay={0.12}>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">{t(body)}</p>
          </Reveal>
        )}
      </div>
      {aside && (
        <Reveal delay={0.18} className="shrink-0">
          {aside}
        </Reveal>
      )}
    </div>
  );
}
