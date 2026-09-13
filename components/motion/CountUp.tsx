"use client";

import { animate } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

interface CountUpProps {
  value: number;
  duration?: number;
  className?: string;
}

/**
 * Counts up to `value` when it scrolls into view — but only ever renders the
 * truth.
 *
 * The previous version initialised its state to 0, so the server HTML said
 * "0 Produk Dikirim" and only became correct once the bundle hydrated and the
 * element scrolled into view. That is worse than the invisible-content bug the
 * Reveal component had: an invisible figure is missing, a zero is wrong, and a
 * crawler or a reader without JS was being told the site had shipped nothing.
 *
 * So `value` is the initial state, which makes the server markup, the first
 * paint, the no-JS case and reduced-motion all correct by default. The
 * animation is layered on top and only for the case it actually improves:
 * a figure scrolled into view from off screen. A number already on screen at
 * load is being read right now, and resetting it to 0 to count it back up
 * would flash the wrong value at someone looking straight at it.
 */
export function CountUp({ value, duration = 1.4, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    const box = el.getBoundingClientRect();
    const onScreenAlready = box.top < window.innerHeight && box.bottom > 0;
    if (onScreenAlready) return;

    let stop = () => {};
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();
        const controls = animate(0, value, {
          duration,
          ease: [0.16, 1, 0.3, 1],
          onUpdate: (latest) => setDisplay(Math.round(latest)),
        });
        stop = () => controls.stop();
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      stop();
    };
  }, [value, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
