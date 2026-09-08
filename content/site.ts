import type { LocalizedText } from "./types";
import { projects } from "./projects";

export const site = {
  name: "Muhammad Rakha Abimanyu",
  shortName: "Rakha",
  handle: "FlamionZ",
  role: {
    id: "Fullstack Developer & AI Engineer",
    en: "Fullstack Developer & AI Engineer",
  } satisfies LocalizedText,
  location: { id: "Solo Raya, Indonesia", en: "Solo Raya, Indonesia" } satisfies LocalizedText,
  email: "rakhaabimanyu5@gmail.com",
  phone: "+62 857-4230-3620",
  /** Digits only, for the wa.me deep link. */
  whatsapp: "6285742303620",
  github: "https://github.com/FlamionZ",
  linkedin: "https://linkedin.com/in/muhrakabi",
  url: "https://rakha.dev",
  /** Where he builds. Surfaced in the hero and footer as a credibility signal. */
  company: {
    name: "Astheron Technologies",
    url: "https://astheron.my.id/",
  },
} as const;

/**
 * Downloadable CV.
 *
 * Left null deliberately: a button that 404s is worse than no button. Drop a
 * PDF at /public/cv.pdf and set this to "/cv.pdf" — nothing else changes.
 */
export const cvPath: string | null = null;

export const summary: LocalizedText = {
  id: "Fullstack Engineer dengan keahlian khusus merancang sistem web modern berlatensi rendah serta mengintegrasikan kapabilitas Artificial Intelligence — LLM, Vision Language Model, RAG, dan Vector Search — ke dalam aplikasi produksi.",
  en: "Fullstack engineer specialising in low-latency modern web systems and in shipping real Artificial Intelligence capability — LLMs, Vision Language Models, RAG and vector search — into production applications.",
};

/** One line under the name in the hero. Concrete, not a slogan. */
export const tagline: LocalizedText = {
  id: "Merancang sistem web dan AI yang benar-benar dipakai.",
  en: "Designing web and AI systems people actually use.",
};

export const summaryLong: LocalizedText = {
  id: "Berpengalaman merancang dan mengimplementasikan 11 produk perangkat lunak lintas skala — mulai dari arsitektur microservices untuk enterprise CRM, sistem AI-native POS multimodal, engine RAG domain spesifik, aplikasi mobile AI, search engine platform UMKM regional, hingga penanganan sistem live-chat berkonkurensi tinggi pada event kenegaraan.",
  en: "I have designed and shipped 11 software products across a wide range of scales — microservice architecture for an enterprise CRM, a multimodal AI-native POS, a domain-specific RAG engine, an AI mobile app, a regional MSME search platform, and a high-concurrency live-chat system for a state occasion.",
};

/** Headline numbers for the hero counter row. Derived, so they can never drift. */
export const stats = [
  {
    value: projects.length,
    label: { id: "Produk Dikirim", en: "Products Shipped" } satisfies LocalizedText,
  },
  {
    value: projects.filter((p) => p.tags.includes("ai")).length,
    label: { id: "Sistem Bertenaga AI", en: "AI-Powered Systems" } satisfies LocalizedText,
  },
  {
    value: projects.filter((p) => p.status === "live").length,
    label: { id: "Deployment Live", en: "Live Deployments" } satisfies LocalizedText,
  },
  {
    value: 1,
    label: { id: "Event Kenegaraan", en: "Presidential Event" } satisfies LocalizedText,
  },
];

/**
 * What he can be hired to build.
 *
 * Each service names a project that already demonstrates it — a claim with
 * evidence attached reads very differently from a skills list, and every
 * `proof` slug resolves to a real case study on this site.
 */
export const services = [
  {
    id: "ai",
    accent: "#4de8ff",
    title: {
      id: "Sistem AI untuk Produksi",
      en: "AI Systems That Reach Production",
    } satisfies LocalizedText,
    body: {
      id: "Bukan sekadar prompting. Pipeline RAG berbasis pgvector, parsing dokumen kompleks lewat Docling agar struktur tabel dan hierarki tidak hilang saat di-chunk, OCR/VLM untuk berkas visual, serta orkestrasi microservice yang menjaga inferensi berat tidak memblokir alur pengguna.",
      en: "Not prompting. pgvector-backed RAG pipelines, complex document parsing through Docling so tables and hierarchy survive chunking, OCR and VLM for visual files, and microservice orchestration that keeps heavy inference from blocking the user flow.",
    } satisfies LocalizedText,
    keywords: ["RAG", "pgvector", "Docling", "VLM", "FastAPI", "HNSW"],
    proof: {
      slug: "proteron",
      note: {
        id: "CRM asuransi dengan copilot polis dan verifikasi klaim otomatis",
        en: "An insurance CRM with a policy copilot and automated claim verification",
      } satisfies LocalizedText,
    },
  },
  {
    id: "fullstack",
    accent: "#c6ff3d",
    title: {
      id: "Produk Fullstack End-to-End",
      en: "End-to-End Fullstack Products",
    } satisfies LocalizedText,
    body: {
      id: "Dari skema database sampai antarmuka yang dipakai kasir setiap hari. React/Next.js dan runtime Bun di depan, NestJS, Express.js, atau Laravel di belakang, PostgreSQL dan Redis sebagai fondasi data, serta React Native Expo ketika produknya perlu hidup di ponsel.",
      en: "From database schema to the interface a cashier uses all day. React/Next.js and the Bun runtime at the front, NestJS, Express.js or Laravel behind it, PostgreSQL and Redis as the data foundation, and React Native Expo when the product needs to live on a phone.",
    } satisfies LocalizedText,
    keywords: ["Next.js", "NestJS", "Bun", "PostgreSQL", "React Native", "Laravel"],
    proof: {
      slug: "airon",
      note: {
        id: "POS AI-native dengan pemindaian faktur dan analitik otonom",
        en: "An AI-native POS with invoice scanning and autonomous analytics",
      } satisfies LocalizedText,
    },
  },
  {
    id: "scale",
    accent: "#ff4d6d",
    title: {
      id: "Search & Sistem Berkonkurensi Tinggi",
      en: "Search & High-Concurrency Systems",
    } satisfies LocalizedText,
    body: {
      id: "Ketika jumlah data atau jumlah pengguna menjadi masalahnya. Dedicated search engine dengan typo-tolerance dan latensi di bawah 50ms, lapisan caching Redis, indexing agresif, dan sistem real-time yang sudah diuji pada lonjakan trafik sungguhan.",
      en: "For when the data volume or the user count is the problem. A dedicated search engine with typo tolerance and sub-50ms latency, Redis caching layers, aggressive indexing, and real-time systems already proven against a genuine traffic surge.",
    } satisfies LocalizedText,
    keywords: ["Meilisearch", "Redis", "PostgreSQL", "MySQL", "MongoDB", "SQLite"],
    proof: {
      slug: "wedding-livechat",
      note: {
        id: "Ribuan pesan serentak pada hajatan tokoh kenegaraan",
        en: "Thousands of concurrent messages at a head-of-state occasion",
      } satisfies LocalizedText,
    },
  },
];

/** Marquee content — two counter-scrolling rows. */
export const marqueeRows: string[][] = [
  [
    "Next.js",
    "TypeScript",
    "React",
    "Bun",
    "NestJS",
    "FastAPI",
    "Express.js",
    "Laravel",
    "React Native",
    "Expo",
  ],
  [
    "PostgreSQL",
    "pgvector",
    "Redis",
    "MongoDB",
    "MySQL",
    "SQLite",
    "Meilisearch",
    "RAG",
    "Docling",
    "LLM",
    "VLM",
    "HNSW",
  ],
];
