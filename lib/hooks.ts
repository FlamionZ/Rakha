"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

/**
 * Subscribe to a media query.
 *
 * `useSyncExternalStore` is the right primitive here rather than
 * useState + useEffect: matchMedia *is* an external mutable store, and this
 * form gives us a distinct server snapshot (`false`) for free — so the markup
 * React renders on the server always matches the first client render.
 */
function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/** True when the visitor has asked the OS to reduce motion. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/**
 * True only for mouse/trackpad users. Gates the custom cursor and card tilt,
 * which are actively bad on touch (no hover state, jittery under scroll).
 */
export function useFinePointer(): boolean {
  return useMediaQuery("(pointer: fine)");
}

const noopSubscribe = () => () => {};

/** False on the server and during hydration, true from the first commit on. */
export function useMounted(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

/** Copy-to-clipboard with a self-clearing "copied" flag. */
export function useCopyToClipboard(resetAfter = 2000) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      return true;
    } catch {
      // Insecure context or denied permission — the mailto link still works.
      return false;
    }
  }, []);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), resetAfter);
    return () => window.clearTimeout(id);
  }, [copied, resetAfter]);

  return { copied, copy };
}
