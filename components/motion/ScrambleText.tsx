"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_/[]{}=+*^?#$%";

interface ScrambleTextProps {
  text: string;
  className?: string;
  /** Milliseconds between frames. Lower is faster and noisier. */
  tick?: number;
  /** Characters locked in per frame. Higher resolves sooner. */
  speed?: number;
  /** Delay before the effect starts, in ms. */
  delay?: number;
  /** Re-run whenever this changes — used to replay on language switch. */
  replayKey?: string | number;
}

/**
 * Decrypt-in text effect. Characters resolve left to right while the
 * unresolved tail keeps cycling through random glyphs.
 *
 * Whitespace is never scrambled, so word shapes and line breaks hold steady
 * and the layout does not jitter while the effect runs.
 */
export function ScrambleText({
  text,
  className,
  tick = 30,
  speed = 1.4,
  delay = 0,
  replayKey,
}: ScrambleTextProps) {
  const reduced = usePrefersReducedMotion();
  const [scrambled, setScrambled] = useState<string | null>(null);
  const frame = useRef(0);

  // Reset during render when the source text changes, rather than in an
  // effect — otherwise the previous word would flash in the new language.
  const [lastText, setLastText] = useState(text);
  if (lastText !== text) {
    setLastText(text);
    setScrambled(null);
  }

  // Derived: null means "not scrambling", and reduced-motion never scrambles.
  const display = reduced || scrambled === null ? text : scrambled;

  useEffect(() => {
    if (reduced) return;

    let intervalId: number | undefined;
    frame.current = 0;

    const startId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        frame.current += speed;
        const revealed = Math.floor(frame.current);

        if (revealed >= text.length) {
          setScrambled(text);
          if (intervalId) window.clearInterval(intervalId);
          return;
        }

        let out = "";
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          if (i < revealed || ch === " " || ch === "\n") out += ch;
          else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setScrambled(out);
      }, tick);
    }, delay);

    return () => {
      window.clearTimeout(startId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [text, tick, speed, delay, reduced, replayKey]);

  // The animating span is hidden from assistive tech and a stable copy is
  // exposed instead, so screen readers never announce scrambled glyphs.
  return (
    <span className={className}>
      <span aria-hidden="true">{display}</span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
