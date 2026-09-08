export type Locale = "id" | "en";

/** Every user-facing string carries both languages side by side. */
export type LocalizedText = Record<Locale, string>;

/**
 * Demo availability. Two of the eleven demos are intentionally dead
 * (event finished / server retired) — we render those as chips, never as links.
 */
export type ProjectStatus = "live" | "local" | "inactive" | "completed";

export type ProjectTag = "ai" | "pos" | "mobile" | "realtime" | "search" | "web";

export interface Highlight {
  title: LocalizedText;
  body: LocalizedText;
}

export interface RepoLink {
  label: string;
  href: string;
}

/**
 * The four questions a case study has to answer for the reader to judge the
 * engineering rather than just the feature list: why it existed, how it is put
 * together, what was genuinely hard, and what changed as a result.
 *
 * Optional on Project — only the deep-dived projects carry one. The rest keep
 * the concise highlight format, which is the honest treatment for smaller work.
 */
export interface CaseStudy {
  problem: LocalizedText;
  architecture: LocalizedText;
  challenge: LocalizedText;
  outcome: LocalizedText;
}

/**
 * One headline number, shown beside the project name.
 *
 * Only set where a real, defensible figure exists — an empty metric is better
 * than an invented one, so most projects deliberately have none.
 */
export interface ProjectMetric {
  value: string;
  label: LocalizedText;
}

export interface Project {
  slug: string;
  /** 1-based display index, matches the ordering in the source portfolio. */
  index: number;
  name: string;
  tagline: LocalizedText;
  domain: LocalizedText;
  /** Full technology list, rendered as badges. */
  stack: string[];
  /** The subset of `stack` that is AI infrastructure — highlighted differently. */
  aiPipeline: string[];
  tags: ProjectTag[];
  highlights: Highlight[];
  repos: RepoLink[];
  demo: {
    /** Absent when the demo is not reachable. */
    href?: string;
    label: LocalizedText;
  };
  status: ProjectStatus;
  featured: boolean;
  /** Per-project accent so detail pages don't all feel identical. */
  accent: string;
  /** Path under /public. Absent → ProjectImage renders a generated panel. */
  image?: string;
  /** Who it was built for and in what capacity — client, product, research. */
  context?: LocalizedText;
  /** Present on deep-dived projects only. */
  caseStudy?: CaseStudy;
  /** Only where a defensible number exists. */
  metric?: ProjectMetric;
}
