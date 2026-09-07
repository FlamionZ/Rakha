"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/hooks";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees at the card's edge. */
  max?: number;
  /** Colour of the radial glow that tracks the cursor. */
  glow?: string;
}

/**
 * 3D tilt driven by pointer position, plus a radial glow that follows the
 * cursor. The glow is published as CSS custom properties so the consuming
 * card can decide how to paint it.
 */
export function TiltCard({ children, className, max = 6, glow }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const fine = useFinePointer();
  const enabled = fine && !reduced;

  // Normalised pointer position within the card, -0.5 to 0.5 on both axes.
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const spring = { stiffness: 260, damping: 22, mass: 0.5 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), spring);

  // Percentages for the radial-gradient centre.
  const glowX = useTransform(px, (v) => `${(v + 0.5) * 100}%`);
  const glowY = useTransform(py, (v) => `${(v + 0.5) * 100}%`);

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function reset() {
    px.set(0);
    py.set(0);
  }

  if (!enabled) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={
        {
          rotateX,
          rotateY,
          transformPerspective: 1000,
          transformStyle: "preserve-3d",
          "--glow-x": glowX,
          "--glow-y": glowY,
          "--glow-color": glow ?? "var(--color-accent)",
        } as React.CSSProperties
      }
    >
      {children}
    </motion.div>
  );
}
