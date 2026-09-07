"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { bootLines, ui } from "@/content/ui";
import { site } from "@/content/site";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { useLocale } from "@/lib/i18n";

const SESSION_KEY = "rakha.booted";
const LINE_MS = 340;

/* ------------------------------------------------------------------
   "Has this session already booted?" as an external store.

   The server snapshot is `true` — treat it as already booted — so the server
   renders nothing and there is no flash of the overlay before hydration.
   ------------------------------------------------------------------ */

const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

function getSnapshot(): boolean {
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    // Private mode — treat as not yet booted; the intro simply plays again.
    return false;
  }
}

function markBooted() {
  try {
    window.sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    /* nothing to persist to */
  }
  for (const listener of listeners) listener();
}

/**
 * Terminal boot overlay, shown once per browser session.
 * Escape, any key, or a click skips it. Reduced-motion users never see it.
 */
export function BootSequence() {
  const reduced = usePrefersReducedMotion();
  const { t } = useLocale();
  const booted = useSyncExternalStore(subscribe, getSnapshot, () => true);
  const [step, setStep] = useState(0);

  const show = !reduced && !booted;

  const dismiss = useCallback(() => markBooted(), []);

  // Advance one line at a time, then dismiss.
  useEffect(() => {
    if (!show) return;
    if (step >= bootLines.length) {
      const doneId = window.setTimeout(dismiss, 420);
      return () => window.clearTimeout(doneId);
    }
    const nextId = window.setTimeout(() => setStep((s) => s + 1), LINE_MS);
    return () => window.clearTimeout(nextId);
  }, [show, step, dismiss]);

  // Lock scrolling and wire up the skip affordances.
  useEffect(() => {
    if (!show) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = () => dismiss();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [show, dismiss]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="boot"
          className="fixed inset-0 z-[120] flex cursor-pointer flex-col justify-center bg-bg px-6 sm:px-12"
          onClick={dismiss}
          exit={{ opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          role="status"
          aria-live="polite"
        >
          <div className="mx-auto w-full max-w-2xl font-mono text-sm sm:text-base">
            <p className="mb-6 text-muted">
              <span className="text-accent">&#10095;</span> {site.handle.toLowerCase()}@portfolio
            </p>

            {bootLines.slice(0, step).map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.22 }}
                className="mb-1.5 text-fg"
              >
                <span className="mr-2 text-accent">&#43;</span>
                {t(line)}
              </motion.p>
            ))}

            <span className="caret inline-block" aria-hidden="true" />
          </div>

          <p className="label absolute bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
            {t(ui.a11y.skipIntro)}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
