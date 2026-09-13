import type { MetadataRoute } from "next";
import { notesByDate } from "@/content/notes";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { LOCALES } from "@/lib/locale";

/**
 * Every page, in every language, with its siblings declared.
 *
 * /notes and its entries appear only once a note exists — submitting an empty
 * index to Google invites it to judge the site thinner than it is.
 */
const PATHS = [
  "/",
  "/work",
  "/about",
  ...projects.map((p) => `/work/${p.slug}`),
  ...(notesByDate.length > 0
    ? ["/notes", ...notesByDate.map((n) => `/notes/${n.slug}`)]
    : []),
];

/**
 * The site previously had no sitemap at all, so discovery depended entirely on
 * Google finding its way in by links. Each entry also carries `alternates`, so
 * the Indonesian and English versions of a page arrive as one pair rather than
 * as two competing URLs.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return LOCALES.flatMap((locale) =>
    PATHS.map((path) => {
      const suffix = path === "/" ? "" : path;

      return {
        url: `${site.url}/${locale}${suffix}`,
        lastModified,
        changeFrequency: "monthly" as const,
        // The home page and the work index are the entry points worth crawling
        // first; detail pages matter but are reached through them.
        priority: path === "/" ? 1 : path === "/work" ? 0.9 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((alt) => [alt, `${site.url}/${alt}${suffix}`]),
          ),
        },
      };
    }),
  );
}
