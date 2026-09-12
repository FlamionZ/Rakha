import type { Locale } from "@/content/types";

/**
 * Locale constants and pure path helpers.
 *
 * Deliberately NOT in lib/i18n.tsx: that module is `"use client"`, and a
 * server component importing a value from a client module receives a client
 * reference proxy rather than the value itself — `LOCALES.map` is then not a
 * function. The provider and hook need React and stay client-side; everything
 * here is plain data that both sides need.
 */
export const LOCALES: readonly Locale[] = ["id", "en"];
export const DEFAULT_LOCALE: Locale = "id";

export function isLocale(value: unknown): value is Locale {
  return value === "id" || value === "en";
}

/**
 * Prefix an app-relative path with a locale segment.
 *
 * Every route lives under `app/[lang]`, so a bare "/work/airon" is not a real
 * URL — it has to become "/id/work/airon". Fragment-only targets ("/#contact")
 * keep their hash attached to the locale root.
 */
export function localePath(locale: Locale, path: string): string {
  if (path === "/") return `/${locale}`;
  if (path.startsWith("/#")) return `/${locale}${path.slice(1)}`;
  return `/${locale}${path}`;
}

/** Strip the locale segment back off, so a path can be re-prefixed. */
export function stripLocale(pathname: string): string {
  for (const locale of LOCALES) {
    if (pathname === `/${locale}`) return "/";
    if (pathname.startsWith(`/${locale}/`)) return pathname.slice(locale.length + 1);
  }
  return pathname;
}
