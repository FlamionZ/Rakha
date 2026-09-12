import type { Metadata } from "next";
import type { Locale } from "@/content/types";
import { LOCALES } from "@/lib/locale";
import { education, experience } from "@/content/experience";
import type { Project } from "@/content/types";
import { projects } from "@/content/projects";
import { site, summary } from "@/content/site";

/** Open Graph wants a territory-qualified tag; our locales are bare languages. */
const OG_LOCALE: Record<Locale, string> = {
  id: "id_ID",
  en: "en_US",
};

export const OG_IMAGE = "/og.png";

function absolute(locale: Locale, path: string): string {
  const suffix = path === "/" ? "" : path;
  return `${site.url}/${locale}${suffix}`;
}

/**
 * Canonical + hreflang for one page, in one locale.
 *
 * Both language versions are real URLs, so every page has to declare which one
 * it is and where its sibling lives. Without this, two near-identical pages
 * compete with each other instead of being understood as one page in two
 * languages. `x-default` points at Indonesian, matching the root redirect.
 */
export function localeAlternates(locale: Locale, path: string): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const candidate of LOCALES) languages[candidate] = absolute(candidate, path);
  languages["x-default"] = absolute("id", path);

  return { canonical: absolute(locale, path), languages };
}

interface PageMetaInput {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  /** Overrides the shared card — project pages pass their screenshot. */
  image?: string;
}

/** One place that knows how a page of this site describes itself. */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  image,
}: PageMetaInput): Metadata {
  // Dimensions are declared only for the shared card, whose size we control.
  // Project screenshots are ~1904x942, so stating 1200x630 for them would be
  // a plain lie to any platform that trusts the declared size.
  const images = image
    ? [{ url: image, alt: site.name }]
    : [{ url: OG_IMAGE, width: 1200, height: 630, alt: site.name }];

  return {
    title,
    description,
    alternates: localeAlternates(locale, path),
    openGraph: {
      type: "website",
      url: absolute(locale, path),
      title,
      description,
      siteName: site.name,
      locale: OG_LOCALE[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
      images,
    },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

/* ------------------------------------------------------------------
   Structured data.

   The site had none, which left search engines with a page rather than a
   person: no way to connect the name, the role, the employer and the work
   into one entity. These are plain objects, serialised into a <script> by
   the JsonLd component.
   ------------------------------------------------------------------ */

/** The `Person` this whole site is about. */
export function personSchema(locale: Locale) {
  const current = experience.find((role) => /sekarang|present/i.test(role.period[locale]));

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.name,
    alternateName: site.shortName,
    url: `${site.url}/${locale}`,
    image: `${site.url}/me.webp`,
    jobTitle: site.role[locale],
    description: summary[locale],
    email: `mailto:${site.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location[locale],
      addressCountry: "ID",
    },
    sameAs: [site.github, site.linkedin],
    knowsLanguage: ["id", "en"],
    ...(current
      ? {
          worksFor: {
            "@type": "Organization",
            name: site.company.name,
            url: site.company.url,
          },
        }
      : {}),
    alumniOf: education.map((entry) => ({
      "@type": "EducationalOrganization",
      name: entry.org,
    })),
    // Only technologies that actually appear in the shipped work.
    knowsAbout: [...new Set(projects.flatMap((project) => project.stack))].sort(),
  };
}

export function websiteSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: `${site.url}/${locale}`,
    name: site.name,
    description: summary[locale],
    inLanguage: locale,
    publisher: { "@id": `${site.url}/#person` },
  };
}

/** Breadcrumbs give search results a readable path instead of a bare URL. */
export function breadcrumbSchema(
  locale: Locale,
  trail: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absolute(locale, crumb.path),
    })),
  };
}

/**
 * One shipped project.
 *
 * `CreativeWork` rather than `SoftwareApplication`: the page is a case study
 * about the product, not a download page for it, and SoftwareApplication
 * expects offer/pricing shape we would only be able to fake. A demo URL, where
 * one exists, is attached as the thing the work produced.
 */
export function projectSchema(locale: Locale, project: Project) {
  const demo = project.demo.href;

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${absolute(locale, `/work/${project.slug}`)}#work`,
    name: project.name,
    headline: project.name,
    description: project.tagline[locale],
    abstract: project.context ? project.context[locale] : undefined,
    inLanguage: locale,
    url: absolute(locale, `/work/${project.slug}`),
    image: project.image ? `${site.url}${project.image}` : undefined,
    genre: project.domain[locale],
    keywords: project.stack.join(", "),
    author: { "@id": `${site.url}/#person` },
    creator: { "@id": `${site.url}/#person` },
    ...(demo ? { sameAs: demo } : {}),
    ...(project.repos.length > 0
      ? { codeRepository: project.repos.map((repo) => repo.href) }
      : {}),
  };
}
