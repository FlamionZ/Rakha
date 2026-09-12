import type { CSSProperties, ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const OFFSET: Record<Direction, { x: string; y: string }> = {
  up: { x: "0px", y: "1.75rem" },
  down: { x: "0px", y: "-1.75rem" },
  left: { x: "1.75rem", y: "0px" },
  right: { x: "-1.75rem", y: "0px" },
  none: { x: "0px", y: "0px" },
};

/** A stagger beyond this just reads as "broken", so clamp rather than trust callers. */
const MAX_DELAY_SECONDS = 0.4;

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger in seconds, kept from the previous motion-based API. */
  delay?: number;
  direction?: Direction;
}

/**
 * Scroll-triggered reveal, driven entirely by CSS (`.reveal` in globals.css).
 *
 * The previous implementation was a `motion.div` with `initial={{ opacity: 0 }}`.
 * React serialises that into the server HTML, so all 36 call sites shipped
 * `style="opacity:0"` — fine once the bundle hydrates and resolves it, but with
 * JS disabled or a bundle that never arrives the content stayed permanently
 * transparent. /about shipped 22 invisible blocks, which is the entire page.
 *
 * Now the visible state is the default and the animation is layered on only
 * where the browser supports scroll-driven timelines. That also takes this off
 * the client bundle: no motion import, no IntersectionObserver, no hook.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: RevealProps) {
  const offset = OFFSET[direction];

  return (
    <div
      className={className ? `reveal ${className}` : "reveal"}
      style={
        {
          "--reveal-x": offset.x,
          "--reveal-y": offset.y,
          // Progress comes from scroll position, not elapsed time, so
          // `animation-delay` is inert. A stagger has to shift the range.
          "--reveal-step": `${Math.min(Math.max(delay, 0), MAX_DELAY_SECONDS) * 100}%`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
