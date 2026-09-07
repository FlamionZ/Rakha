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
} as const;

export const summary: LocalizedText = {
  id: "Fullstack Engineer dengan keahlian khusus merancang sistem web modern berlatensi rendah serta mengintegrasikan kapabilitas Artificial Intelligence — LLM, Vision Language Model, RAG, dan Vector Search — ke dalam aplikasi produksi.",
  en: "Fullstack engineer specialising in low-latency modern web systems and in shipping real Artificial Intelligence capability — LLMs, Vision Language Models, RAG and vector search — into production applications.",
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

/** The three value pillars from the portfolio's summary table. */
export const capabilities = [
  {
    id: "fullstack",
    accent: "#c6ff3d",
    title: { id: "Fullstack Web & Mobile", en: "Fullstack Web & Mobile" } satisfies LocalizedText,
    body: {
      id: "Menguasai ekosistem React/Next.js modern, runtime Bun, mobile via React Native Expo dengan TanStack Query & Zustand, serta arsitektur backend kokoh menggunakan NestJS, Express.js, dan Laravel.",
      en: "Fluent across the modern React/Next.js ecosystem, the Bun runtime, mobile via React Native Expo with TanStack Query and Zustand, plus solid backend architecture in NestJS, Express.js and Laravel.",
    } satisfies LocalizedText,
    keywords: ["Next.js", "React Native", "NestJS", "Express.js", "Laravel", "Bun"],
  },
  {
    id: "ai",
    accent: "#4de8ff",
    title: {
      id: "AI Siap Produksi",
      en: "AI Ready-for-Production",
    } satisfies LocalizedText,
    body: {
      id: "Bukan sekadar prompting — melainkan implementasi RAG berbasis pgvector, integrasi OCR/VLM untuk parsing visual, pemrosesan dokumen kompleks via Docling, dan orkestrasi microservice FastAPI.",
      en: "Not just prompting — pgvector-backed RAG implementations, OCR and VLM integration for visual parsing, complex document processing through Docling, and FastAPI microservice orchestration.",
    } satisfies LocalizedText,
    keywords: ["RAG", "pgvector", "VLM", "Docling", "FastAPI", "HNSW"],
  },
  {
    id: "scale",
    accent: "#ff4d6d",
    title: {
      id: "Search Engine & Skalabilitas Data",
      en: "Search Engine & Data Scalability",
    } satisfies LocalizedText,
    body: {
      id: "Implementasi dedicated search engine berlatensi rendah menggunakan Meilisearch pada SoraUMKM, penanganan traffic spike pada event kenegaraan, serta caching layer menggunakan Redis.",
      en: "A dedicated low-latency search engine built on Meilisearch for SoraUMKM, traffic-spike handling at a state event, and Redis caching layers throughout.",
    } satisfies LocalizedText,
    keywords: ["Meilisearch", "Redis", "PostgreSQL", "MongoDB", "MySQL", "SQLite"],
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
