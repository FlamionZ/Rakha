"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

interface CountUpProps {
  value: number;
  duration?: number;
  className?: string;
}

/**
 * Counts from zero to `value` the first time it scrolls into view.
 * Under reduced-motion it renders the final number immediately.
 */
export function CountUp({ value, duration = 1.4, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = usePrefersReducedMotion();
  const [animated, setAnimated] = useState(0);

  // Derived, not stored: reduced-motion users get the final number with no
  // effect involved at all.
  const display = reduced ? value : animated;

  useEffect(() => {
    if (reduced || !inView) return;

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setAnimated(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, value, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
