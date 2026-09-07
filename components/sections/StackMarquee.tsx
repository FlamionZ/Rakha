"use client";

import { Marquee } from "@/components/motion/Marquee";
import { TechIcon, techBrandColor } from "@/components/tech/TechIcon";
import { marqueeRows } from "@/content/site";

const CONCEPT_ACCENT = "#4de8ff";

/**
 * Two counter-scrolling ticker rows carrying real brand marks.
 *
 * Each item sits muted until hovered, then takes its brand colour — so the
 * strip reads as one restrained band at a glance and rewards a closer look,
 * rather than firing twenty brand colours at the viewer permanently.
 */
function TechTicker(name: string) {
  return (
    <span
      className="group/tech inline-flex items-center gap-2.5"
      style={{ ["--brand" as string]: techBrandColor(name) ?? CONCEPT_ACCENT }}
    >
      <TechIcon
        name={name}
        className="h-[18px] w-[18px] shrink-0 text-faint transition-colors duration-300 group-hover/tech:text-[var(--brand)]"
      />
      <span className="font-mono text-xs tracking-tight text-muted transition-colors duration-300 group-hover/tech:text-fg">
        {name}
      </span>
    </span>
  );
}

export function StackMarquee() {
  return (
    <section
      className="overflow-hidden border-y border-border bg-surface/20 py-5"
      aria-label="Technology stack"
    >
      <div className="flex flex-col gap-4">
        <Marquee items={marqueeRows[0]} renderItem={TechTicker} duration={52} />
        <Marquee items={marqueeRows[1]} renderItem={TechTicker} duration={64} reverse />
      </div>
    </section>
  );
}
