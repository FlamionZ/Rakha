"use client";

import { motion } from "motion/react";
import { ui } from "@/content/ui";
import type { Locale } from "@/content/types";
import { useLocale } from "@/lib/i18n";

const OPTIONS: Locale[] = ["id", "en"];

/**
 * ID / EN switch. The active pill is a shared `layoutId`, so switching slides
 * the highlight between the two options rather than cutting.
 */
export function LocaleToggle() {
  const { locale, setLocale, t } = useLocale();

  return (
    <div
      role="group"
      aria-label={t(ui.a11y.switchLanguage)}
      className="flex items-center gap-0.5 rounded-sm border border-border bg-surface/70 p-0.5 backdrop-blur-md"
    >
      {OPTIONS.map((option) => {
        const isActive = option === locale;
        return (
          <button
            key={option}
            type="button"
            onClick={() => setLocale(option)}
            aria-pressed={isActive}
            className={`relative rounded-sm px-2.5 py-1 font-mono text-[11px] font-medium tracking-widest transition-colors duration-200 ${
              isActive ? "text-bg" : "text-muted hover:text-fg"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="locale-pill"
                className="absolute inset-0 rounded-sm bg-accent"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative z-10">{option.toUpperCase()}</span>
          </button>
        );
      })}
    </div>
  );
}
