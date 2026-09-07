"use client";

import type { ReactNode } from "react";

interface MarqueeProps {
  items: string[];
  /** Renders one item. Defaults to plain text. */
  renderItem?: (item: string) => ReactNode;
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
export function Marquee({
  items,
  renderItem,
  duration = 40,
  reverse = false,
  className,
}: MarqueeProps) {
  const row = (
    <ul className="flex shrink-0 items-center" aria-hidden="true">
      {items.map((item, i) => (
        <li key={`${item}-${i}`} className="flex items-center whitespace-nowrap">
          <span className="px-6">{renderItem ? renderItem(item) : item}</span>
          <span className="h-3 w-px bg-border" />
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
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {row}
        {row}
      </div>

      {/* Edge fades so items dissolve rather than clip at the viewport edge */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-bg to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-bg to-transparent sm:w-32" />
    </div>
  );
}
