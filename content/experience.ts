import type { LocalizedText } from "./types";

export interface ExperienceEntry {
  org: string;
  role: LocalizedText;
  /** As written on the CV. Kept verbatim rather than computed. */
  period: LocalizedText;
  url?: string;
  points: LocalizedText[];
}

export interface EducationEntry {
  org: string;
  qualification: LocalizedText;
  period: string;
  /** Grade, stream, or anything that qualifies the entry. */
  note?: LocalizedText;
}

/**
 * Taken directly from the CV — roles, dates and responsibilities are his own
 * words, condensed but not embellished.
 */
export const experience: ExperienceEntry[] = [
  {
    org: "Astheron Technologies",
    url: "https://astheron.my.id/",
    role: { id: "AI Engineer", en: "AI Engineer" },
    period: { id: "November 2024 – Agustus 2026", en: "November 2024 – August 2026" },
    points: [
      {
        id: "Memimpin perancangan arsitektur sistem untuk aplikasi AI-native dan platform SaaS produksi secara end-to-end — dari PRD sampai deployment.",
        en: "Led system architecture for AI-native applications and production SaaS platforms end to end — from PRD through to deployment.",
      },
      {
        id: "Merancang dan mengimplementasikan solusi berbasis LLM: pipeline RAG, conversational dan autonomous agents, serta pemrosesan dokumen cerdas (OCR dan document parsing).",
        en: "Designed and implemented LLM-based solutions: RAG pipelines, conversational and autonomous agents, and intelligent document processing (OCR and document parsing).",
      },
      {
        id: "Membangun arsitektur backend microservice berkinerja tinggi, dengan integrasi basis data relasional (PostgreSQL) dan basis data vektor (pgvector, Qdrant) untuk pencarian semantik berlatensi rendah.",
        en: "Built high-performance microservice backend architecture, integrating relational (PostgreSQL) and vector databases (pgvector, Qdrant) for low-latency semantic search.",
      },
      {
        id: "Mengelola kontainerisasi dan deployment menggunakan Docker untuk menjaga keandalan sistem, skalabilitas, dan efisiensi infrastruktur.",
        en: "Managed containerisation and deployment with Docker to keep systems reliable, scalable and infrastructure-efficient.",
      },
      {
        id: "Menerjemahkan kebutuhan bisnis dan spesifikasi teknis menjadi produk digital yang siap dipakai klien.",
        en: "Translated business requirements and technical specifications into digital products ready for client use.",
      },
    ],
  },
  {
    org: "SD Muhammadiyah PK Nogosari",
    role: { id: "Fullstack Developer Intern", en: "Fullstack Developer Intern" },
    period: { id: "Februari 2025 – April 2025", en: "February 2025 – April 2025" },
    points: [
      {
        id: "Membangun sistem akademik sekolah menggunakan Next.js.",
        en: "Built the school's academic system using Next.js.",
      },
      {
        id: "Memberikan pelatihan penggunaan sistem akademik kepada staf sekolah.",
        en: "Trained school staff on using the academic system.",
      },
      {
        id: "Mendukung penyampaian informasi sekolah melalui sistem tersebut.",
        en: "Supported the school's information delivery through that system.",
      },
    ],
  },
  {
    org: "Koordinator Mentoring FKI UMS",
    role: {
      id: "Anggota Departemen Kaderisasi",
      en: "Member, Cadre Development Department",
    },
    period: { id: "September 2023 – September 2024", en: "September 2023 – September 2024" },
    points: [
      {
        id: "Mengelola database pengurus, mentor, dan mentee secara terstruktur untuk mendukung administrasi organisasi.",
        en: "Maintained a structured database of officers, mentors and mentees to support the organisation's administration.",
      },
      {
        id: "Mengoordinasikan plotting mahasiswa baru serta pelaksanaan program mentoring.",
        en: "Coordinated new-student placement and the running of the mentoring programme.",
      },
      {
        id: "Menjadi stand-by mentor dan menjaga koordinasi hingga akhir masa kepengurusan.",
        en: "Served as stand-by mentor and kept coordination running to the end of the term.",
      },
    ],
  },
];

export const education: EducationEntry[] = [
  {
    org: "Universitas Muhammadiyah Surakarta",
    qualification: { id: "S1 Teknik Informatika", en: "BSc Informatics Engineering" },
    period: "2022 – 2026",
    note: { id: "IPK 3,61", en: "GPA 3.61" },
  },
  {
    org: "PPTQ Qoryatul Quran",
    qualification: {
      id: "MATIQ — Madrasah Aliyah Tahfizul Quran",
      en: "MATIQ — Madrasah Aliyah Tahfizul Quran",
    },
    period: "2019 – 2022",
  },
];
