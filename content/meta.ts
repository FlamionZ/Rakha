import type { LocalizedText } from "./types";

/**
 * Per-page titles and descriptions, in both languages.
 *
 * These used to be English-only string literals sitting in the route files,
 * which meant an Indonesian page advertised itself in English: the search
 * snippet and the landing page disagreed. Keeping them here as LocalizedText
 * makes the pairing compiler-enforced, the same way the rest of the content
 * works.
 */
export interface PageMeta {
  title: LocalizedText;
  description: LocalizedText;
}

export const pageMeta = {
  home: {
    // The root title is composed from the name and role in layout.tsx; this
    // description is the one that reaches the search snippet.
    title: { id: "Beranda", en: "Home" },
    description: {
      id: "Fullstack Engineer dan AI Engineer di Solo Raya. Merancang sistem web berlatensi rendah dan membawa LLM, Vision Language Model, RAG, serta vector search ke dalam produk yang benar-benar dipakai.",
      en: "Fullstack and AI engineer based in Solo Raya, Indonesia. I design low-latency web systems and take LLMs, Vision Language Models, RAG and vector search into products people actually use.",
    },
  },

  about: {
    title: { id: "Tentang", en: "About" },
    description: {
      id: "Pengalaman, pendidikan, dan cara saya bekerja: AI Engineer di Astheron Technologies, S1 Teknik Informatika UMS. Fokus pada clean architecture, optimalisasi performa, dan product delivery.",
      en: "Experience, education and how I work: AI Engineer at Astheron Technologies, BSc Informatics at UMS. Focused on clean architecture, performance optimisation and product delivery.",
    },
  },

  work: {
    title: { id: "Karya", en: "Work" },
    description: {
      id: "Sebelas produk perangkat lunak yang sudah berjalan: POS AI-native, engine RAG domain spesifik, CRM asuransi enterprise, search engine UMKM regional, dan platform live-chat berkonkurensi tinggi.",
      en: "Eleven shipped software products: AI-native POS systems, domain-specific RAG engines, an enterprise insurance CRM, a regional MSME search platform and a high-concurrency live-chat platform.",
    },
  },

  notes: {
    title: { id: "Catatan", en: "Notes" },
    description: {
      id: "Catatan teknis tentang keputusan arsitektur nyata: kapan VLM mengalahkan OCR, menjaga inferensi berat di luar jalur kritis, dan vector search di dalam PostgreSQL.",
      en: "Technical notes on real architecture decisions: when a VLM beats OCR, keeping heavy inference off the critical path, and vector search inside PostgreSQL.",
    },
  },
} satisfies Record<string, PageMeta>;
