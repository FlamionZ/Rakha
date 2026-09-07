"use client";

interface MarqueeProps {
  items: string[];
  /** Seconds for one full pass. Larger is slower. */
  duration?: number;
  reverse?: boolean;
  className?: string;
}

/**
 * Infinite horizontal ticker. The item list is rendered twice and the track
 * translates by exactly -50%, so the seam lands on an identical frame and the
 * loop is invisible. Pausing on hover lets people actually read it.
 */
export function Marquee({ items, duration = 40, reverse = false, className }: MarqueeProps) {
  const row = (
    <ul className="flex shrink-0 items-center gap-8 pr-8" aria-hidden="true">
      {items.map((item, i) => (
        <li key={`${item}-${i}`} className="flex items-center gap-8 whitespace-nowrap">
          <span className="font-mono text-sm tracking-tight text-muted transition-colors duration-300 hover:text-accent">
            {item}
          </span>
          <span className="text-accent/40" aria-hidden="true">
            &#9679;
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={`marquee-host group relative flex overflow-hidden ${className ?? ""}`}
      // The list is decorative repetition; expose it once as plain text instead.
      role="presentation"
    >
      <div
        className="marquee-track flex"
        data-dir={reverse ? "reverse" : undefined}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {row}
        {row}
      </div>

      {/* Edge fades so items dissolve rather than clip at the viewport edge. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent" />
    </div>
  );
}
