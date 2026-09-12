"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Locale, LocalizedText } from "@/content/types";
import { localePath } from "@/lib/locale";

interface LocaleContextValue {
  locale: Locale;
  /** Resolve a bilingual string to the active language. */
  t: (text: LocalizedText) => string;
  /** Locale-aware href builder — see `localePath`. */
  path: (path: string) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

/**
 * Locale comes from the route, not from storage.
 *
 * It used to be read from localStorage via useSyncExternalStore, which meant
 * the server had no way to know it and always rendered Indonesian. The English
 * half of the content had no URL of its own and so could not be linked,
 * shared, or indexed. Now `app/[lang]` owns it: both languages are real,
 * statically prerendered pages, and the toggle is a navigation.
 */
export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      t: (text: LocalizedText) => text[locale],
      path: (path: string) => localePath(locale, path),
    }),
    [locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside <LocaleProvider>");
  return ctx;
}
