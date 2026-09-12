"use client";

import { usePathname } from "next/navigation";
import { ui } from "@/content/ui";
import type { Locale } from "@/content/types";
import { useLocale } from "@/lib/i18n";
import { localePath, LOCALES, stripLocale } from "@/lib/locale";

/**
 * ID / EN switch — now navigation rather than state.
 *
 * It used to flip a localStorage value in place, which is why English had no
 * URL and could not be indexed or linked. Each option is a real anchor to the
 * same page in the other language, so the switch is shareable and a crawler
 * can follow it.
 *
 * These are plain anchors, not <Link>: crossing the `[lang]` root parameter
 * changes the document's language, font subset and `<html lang>`, so a full
 * document load is the honest thing to do and avoids relying on client
 * navigation to re-resolve a root param.
 */
export function LocaleToggle() {
  const { locale, t } = useLocale();
  const pathname = usePathname();
  const basePath = stripLocale(pathname);

  return (
    <div
      role="group"
      aria-label={t(ui.a11y.switchLanguage)}
      className="flex items-center gap-0.5 rounded-lg border border-border bg-surface/70 p-0.5 backdrop-blur-md"
    >
      {LOCALES.map((option: Locale) => {
        const isActive = option === locale;

        return (
          <a
            key={option}
            href={localePath(option, basePath)}
            hrefLang={option}
            aria-current={isActive ? "true" : undefined}
            className={`relative rounded-md px-3 py-2 font-mono text-[11px] font-medium tracking-widest transition-colors duration-200 ${
              isActive
                ? "bg-accent text-bg"
                : "text-muted hover:text-fg"
            }`}
          >
            {option.toUpperCase()}
          </a>
        );
      })}
    </div>
  );
}
