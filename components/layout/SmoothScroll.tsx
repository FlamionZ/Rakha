"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Global smooth-scroll driver.
 *
 * With `root`, ReactLenis renders its children directly rather than wrapping
 * them in scroll containers — so toggling the options below never remounts the
 * page tree. Under reduced-motion we hand scrolling back to the browser
 * instead of unmounting the provider.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();

  return (
    <ReactLenis
      root
      options={{
        lerp: reduced ? 1 : 0.09,
        duration: reduced ? 0 : 1.1,
        smoothWheel: !reduced,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
        // Lets plain `href="#contact"` links scroll smoothly with no extra JS.
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
