import type { LocalizedText } from "./types";

/**
 * A block of a note's body.
 *
 * Deliberately a small block union rather than MDX. Every other piece of
 * content on this site is a typed TS object — projects, experience,
 * architecture — and a second content pipeline with its own loader, plugin
 * config and Turbopack interaction is a lot of machinery to maintain for a
 * handful of technical notes. The trade-off is real: MDX is nicer to write
 * long-form in. If these ever outgrow the format, that is the moment to add
 * it, not before.
 */
export type NoteBlock =
  | { kind: "p"; text: LocalizedText }
  | { kind: "h"; text: LocalizedText }
  | { kind: "quote"; text: LocalizedText }
  | { kind: "list"; items: LocalizedText[] }
  | { kind: "code"; lang: string; code: string };

export interface Note {
  slug: string;
  title: LocalizedText;
  /** One or two sentences. Becomes the meta description and the index blurb. */
  summary: LocalizedText;
  /** ISO date, e.g. "2026-09-12". Used for ordering and for dateline markup. */
  date: string;
  /** Short, lowercase, and drawn from the site's own vocabulary. */
  tags: string[];
  /** Optional: the project this came out of, so a note can cite real work. */
  projectSlug?: string;
  body: NoteBlock[];
}

/**
 * Technical notes.
 *
 * Empty on purpose — these have to be yours. The engineering is done: add one
 * object here and it gets a URL in both languages, a spot in the sitemap,
 * Article structured data, an Open Graph card, and a link in the nav. Nothing
 * appears anywhere until the first one exists, so there is no empty blog
 * advertising itself in the meantime.
 *
 * Three that are already sitting in your case studies, needing only to be
 * written out — each is a decision you made and explained once:
 *
 *   1. "Kapan VLM mengalahkan OCR"  (from the Airon case study)
 *      You wrote: supplier receipts have no fixed layout, OCR fails
 *      line-by-line, and a VLM reads position as meaning. That is the whole
 *      argument — it needs the before/after and a sample failure, nothing more.
 *
 *   2. "pgvector di database yang sama, bukan vector DB terpisah"  (from Aron)
 *      You wrote: no separate vector database to keep in sync. The note is
 *      what that buys you and where it would stop being the right call.
 *
 *   3. "Menjaga inferensi berat di luar jalur kritis"  (from Airon + Assistary)
 *      Both systems put the expensive model behind a cache or a queue, for the
 *      same reason. Two examples of one principle is exactly a note.
 *
 * Template:
 *
 *   {
 *     slug: "kapan-vlm-mengalahkan-ocr",
 *     title: { id: "...", en: "..." },
 *     summary: { id: "...", en: "..." },
 *     date: "2026-09-20",
 *     tags: ["vlm", "ocr"],
 *     projectSlug: "airon",
 *     body: [
 *       { kind: "p", text: { id: "...", en: "..." } },
 *       { kind: "h", text: { id: "...", en: "..." } },
 *       { kind: "code", lang: "ts", code: "..." },
 *     ],
 *   }
 */
export const notes: Note[] = [];

/** Newest first. */
export const notesByDate: Note[] = [...notes].sort((a, b) => b.date.localeCompare(a.date));

export function getNote(slug: string): Note | undefined {
  return notes.find((note) => note.slug === slug);
}

/** Gates the nav link and the sitemap: no posts, no section. */
export const hasNotes = notes.length > 0;
