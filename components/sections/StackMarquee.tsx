import { Marquee } from "@/components/motion/Marquee";
import { marqueeRows } from "@/content/site";

/**
 * Two counter-scrolling ticker rows. Purely decorative — the same technologies
 * are listed as real text on every project card and detail page.
 */
export function StackMarquee() {
  return (
    <section
      className="border-y border-border bg-surface/30 py-6"
      aria-label="Technology stack"
    >
      <div className="flex flex-col gap-3">
        <Marquee items={marqueeRows[0]} duration={46} />
        <Marquee items={marqueeRows[1]} duration={58} reverse />
      </div>
    </section>
  );
}
