"use client";

import type { ReactNode } from "react";

interface MarqueeProps {
  items: string[];
  /** Renders one item. Defaults to plain text. */
  renderItem?: (item: string) => ReactNode;
  /** Seconds for one full pass. Larger is slower. */
  duration?: number;
  reverse?: boolean;
  /**
   * How many times the list is repeated. The track shifts by exactly one copy,
   * so the remaining `copies - 1` must be wide enough to fill the viewport —
   * otherwise the strip runs out of content and shows a gap before it loops.
   * Four is enough for an ultrawide display at our row widths.
   */
  copies?: number;
  className?: string;
}

/**
 * Endless horizontal ticker. Never pauses and has no loop point you can catch:
 * the shift lands on an identical frame every cycle.
 */
export function Marquee({
  items,
  renderItem,
  duration = 40,
  reverse = false,
  copies = 4,
  className,
}: MarqueeProps) {
  const row = (
    <ul className="flex shrink-0 items-center" aria-hidden="true">
      {items.map((item, i) => (
        <li key={`${item}-${i}`} className="flex items-center whitespace-nowrap">
          <span className="px-7 sm:px-9">{renderItem ? renderItem(item) : item}</span>
          <span className="h-5 w-px bg-border" />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={`marquee-host relative flex overflow-hidden ${className ?? ""}`}
      role="presentation"
    >
      <div
        className="marquee-track flex"
        data-dir={reverse ? "reverse" : undefined}
        style={{
          ["--marquee-duration" as string]: `${duration}s`,
          ["--marquee-copies" as string]: copies,
        }}
      >
        {Array.from({ length: copies }, (_, i) => (
          <div key={i} className="flex shrink-0">
            {row}
          </div>
        ))}
      </div>

      {/* Edge fades so items dissolve into the page rather than clipping */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-bg to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-bg to-transparent sm:w-28" />
    </div>
  );
}
