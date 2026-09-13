import type { LocalizedText } from "./types";
import { projects } from "./projects";

export interface StackGroup {
  label: LocalizedText;
  /** Technology names, exactly as they appear in project stacks. */
  items: string[];
}

/**
 * The stack, grouped by what each thing is for.
 *
 * This replaces the decorative marquee that used to sit on /about — the same
 * names, but arranged so they answer a question instead of sliding past. The
 * marquee stays on the home page, where it is texture; a page about how
 * someone works owes the reader information.
 *
 * `usageCount` below is derived from the projects themselves, so a technology
 * cannot be claimed here without appearing in shipped work — and the count is
 * a fact rather than a self-assessed "proficiency" bar, which is the part of
 * these sections that is usually invented.
 */
const GROUPS: StackGroup[] = [
  {
    label: { id: "Frontend", en: "Frontend" },
    items: [
      "Next.js",
      "App Router",
      "React Native",
      "Expo",
      "Vite",
      "TanStack Query",
      "Zustand",
    ],
  },
  {
    label: { id: "Backend & Runtime", en: "Backend & runtime" },
    items: ["Bun", "NestJS", "FastAPI", "Express.js", "Laravel", "Python", "Next.js API"],
  },
  {
    label: { id: "Data & Pencarian", en: "Data & search" },
    items: [
      "PostgreSQL",
      "pgvector",
      "HNSW",
      "Redis",
      "Meilisearch",
      "MongoDB",
      "MySQL",
      "SQLite",
      "Supabase",
    ],
  },
  {
    label: { id: "AI", en: "AI" },
    items: ["LLM", "VLM", "RAG", "Docling"],
  },
  {
    label: { id: "Infrastruktur", en: "Infrastructure" },
    items: ["Vercel"],
  },
];

/** How many shipped projects each technology actually appears in. */
export const usageCount: Record<string, number> = projects.reduce<Record<string, number>>(
  (counts, project) => {
    for (const tech of project.stack) counts[tech] = (counts[tech] ?? 0) + 1;
    return counts;
  },
  {},
);

/**
 * Groups, with anything not present in a real project stripped out.
 *
 * A hand-written list drifts the moment a project changes; filtering against
 * `usageCount` means the page cannot claim a technology the work does not
 * contain. Items sort by how widely each is actually used.
 */
export const stackGroups: StackGroup[] = GROUPS.map((group) => ({
  ...group,
  items: group.items
    .filter((tech) => usageCount[tech])
    .sort((a, b) => usageCount[b] - usageCount[a] || a.localeCompare(b)),
})).filter((group) => group.items.length > 0);

/** Anything in a project stack that no group claims — a build-time safety net. */
export const ungroupedTech: string[] = Object.keys(usageCount)
  .filter((tech) => !GROUPS.some((group) => group.items.includes(tech)))
  .sort();
