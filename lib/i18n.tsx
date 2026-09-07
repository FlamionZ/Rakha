"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { Locale, LocalizedText } from "@/content/types";

const STORAGE_KEY = "rakha.locale";
const DEFAULT_LOCALE: Locale = "id";

function isLocale(value: unknown): value is Locale {
  return value === "id" || value === "en";
}

/* ------------------------------------------------------------------
   localStorage as an external store.

   Modelling it this way rather than as useState + useEffect gives us three
   things: a server snapshot that always matches the first client render (no
   hydration mismatch), free cross-tab sync via the `storage` event, and no
   state-setting inside an effect.
   ------------------------------------------------------------------ */

const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  // Fires when another tab writes the same key.
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getSnapshot(): Locale {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isLocale(stored) ? stored : DEFAULT_LOCALE;
  } catch {
    // Private-mode browsers throw on storage access rather than returning null.
    return DEFAULT_LOCALE;
  }
}

function getServerSnapshot(): Locale {
  return DEFAULT_LOCALE;
}

function writeLocale(next: Locale) {
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Preference will not persist, but the session still works.
  }
  emit();
}

interface LocaleContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
  toggle: () => void;
  /** Resolve a bilingual string to the active language. */
  t: (text: LocalizedText) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLocale = useCallback((next: Locale) => writeLocale(next), []);

  // Keep the document language in sync for screen readers and hyphenation.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      toggle: () => setLocale(locale === "id" ? "en" : "id"),
      t: (text: LocalizedText) => text[locale],
    }),
    [locale, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside <LocaleProvider>");
  return ctx;
}
