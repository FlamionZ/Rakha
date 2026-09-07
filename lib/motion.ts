import type { Transition, Variants } from "motion/react";

/** Shared easing curves — mirrors the tokens in globals.css. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;
export const EASE_SPRING = [0.34, 1.4, 0.64, 1] as const;

export const transition: Transition = {
  duration: 0.7,
  ease: EASE_OUT_EXPO,
};

export const fastTransition: Transition = {
  duration: 0.4,
  ease: EASE_OUT_QUINT,
};

/** Fade + rise. The workhorse reveal. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition },
};

/**
 * Parent wrapper that cascades its children. Pair with `fadeUp` on each child
 * and drive both from a single `whileInView` on the parent.
 */
export function stagger(childDelay = 0.08, initialDelay = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: childDelay,
        delayChildren: initialDelay,
      },
    },
  };
}

/** Shared viewport config so every reveal triggers at the same point. */
export const viewportOnce = { once: true, amount: 0.25 } as const;
