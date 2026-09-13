import type { LocalizedText } from "./types";

export interface Testimonial {
  /** The quote, in the language it was actually given, plus a translation. */
  quote: LocalizedText;
  author: string;
  /** Their role and where — this is what makes the quote worth anything. */
  role: LocalizedText;
  /** Optional link to the person, so a reader can verify they exist. */
  url?: string;
}

/**
 * Real references only.
 *
 * This array is deliberately empty. A portfolio with invented praise is worse
 * than one with none: the reader cannot check it, and if they ever do, every
 * other claim on the site becomes suspect too. The section renders nothing
 * while this is empty, so adding one entry is the only thing needed to make it
 * appear.
 *
 * To add one, ask the person for a sentence or two about working together,
 * then:
 *
 *   {
 *     quote: {
 *       id: "<what they said, in Indonesian>",
 *       en: "<the same thing in English>",
 *     },
 *     author: "<their name>",
 *     role: { id: "<Jabatan>, <Perusahaan>", en: "<Title>, <Company>" },
 *     url: "<their LinkedIn, optional>",
 *   }
 *
 * The most credible one available is whoever supervised the Astheron work.
 */
export const testimonials: Testimonial[] = [];
