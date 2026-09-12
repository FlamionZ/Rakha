"use client";

import { useEffect, useState } from "react";
import type { LocalizedText } from "@/content/types";
import { ui } from "@/content/ui";
import { useLocale } from "@/lib/i18n";

interface RailSection {
  id: string;
  label: LocalizedText;
}

/**
 * Home-page sections, in document order. Every id here must exist on the
 * page or that dot simply never activates.
 */
const SECTIONS: RailSection[] = [
  { id: "overview", label: ui.rail.overview },
  { id: "work", label: ui.nav.work },
  { id: "services", label: ui.sections.servicesLabel },
  { id: "contact", label: ui.contact.label },
];

/**
 * Fixed progress rail on the right edge.
 *
 * Real navigation rather than decoration — each dot is an anchor, and Lenis
 * is configured with `anchors: true`, so clicking one scrolls smoothly with
 * no extra JS here.
 *
 * Hidden below `lg`: there is no spare gutter on a phone, and a floating rail
 * over content would sit on top of the thing you are trying to read.
 */
export function SectionRail() {
  const { t } = useLocale();
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const targets = SECTIONS.map((section) => document.getElementById(section.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (targets.length === 0) return;

    // A band across the middle of the viewport: a section counts as current
    // once it reaches the middle, which matches where the eye actually is
    // far better than "any part is visible".
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label={t(ui.rail.label)}
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <ul className="flex flex-col items-end gap-5">
        {SECTIONS.map((section) => {
          const isActive = section.id === activeId;

          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={isActive ? "true" : undefined}
                className="group flex items-center justify-end gap-3 py-1"
              >
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.18em] transition-all duration-300 ${
                    isActive
                      ? "text-accent opacity-100"
                      : "text-muted opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {t(section.label)}
                </span>
                <span
                  aria-hidden="true"
                  className={`block h-px transition-all duration-300 ${
                    isActive
                      ? "w-6 bg-accent"
                      : "w-3 bg-border-bright group-hover:w-5 group-hover:bg-muted"
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
