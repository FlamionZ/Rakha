import type { LocalizedText, ProjectStatus, ProjectTag } from "./types";

/**
 * Every piece of chrome copy. Leaves are LocalizedText so the `t()` helper
 * from lib/i18n resolves them without any key-path lookup.
 */
export const ui = {
  nav: {
    home: { id: "Beranda", en: "Home" },
    work: { id: "Karya", en: "Work" },
    about: { id: "Tentang", en: "About" },
    contact: { id: "Kontak", en: "Contact" },
    menu: { id: "Menu", en: "Menu" },
    close: { id: "Tutup", en: "Close" },
  },

  hero: {
    available: { id: "Terbuka untuk proyek baru", en: "Open to new projects" },
    lead: { id: "Membangun", en: "I build" },
    viewWork: { id: "Lihat Karya", en: "View Work" },
    getInTouch: { id: "Hubungi Saya", en: "Get in Touch" },
  },

  sections: {
    selectedWorkLabel: { id: "Karya Pilihan", en: "Selected Work" },
    selectedWorkTitle: { id: "Yang saya bangun", en: "Things I have built" },
    selectedWorkBody: {
      id: "Lima proyek yang paling mewakili cara saya bekerja. Sebelas lainnya menunggu di halaman karya.",
      en: "Five projects that best represent how I work. The rest are waiting on the work page.",
    },
    viewAll: { id: "Lihat semua 11 proyek", en: "View all 11 projects" },

    capabilitiesLabel: { id: "Pilar Keahlian", en: "Capability Pillars" },
    capabilitiesTitle: { id: "Apa yang saya bawa", en: "What I bring" },

    statsLabel: { id: "Rekapitulasi", en: "By the numbers" },

    allWorkLabel: { id: "Arsip Lengkap", en: "Full Archive" },
    allWorkTitle: { id: "Semua Proyek", en: "All Projects" },
    allWorkBody: {
      id: "Sebelas produk perangkat lunak lintas skala, dari POS AI-native hingga sistem berkonkurensi tinggi.",
      en: "Eleven software products across a wide range of scales, from AI-native POS to high-concurrency systems.",
    },

    aboutLabel: { id: "Tentang", en: "About" },
    aboutTitle: { id: "Ringkasan Eksekutif", en: "Executive Summary" },
  },

  project: {
    overview: { id: "Ikhtisar", en: "Overview" },
    stack: { id: "Teknologi", en: "Tech Stack" },
    aiPipeline: { id: "Pipeline AI", en: "AI Pipeline" },
    highlights: { id: "Value Engineering", en: "Value Engineering" },
    sourceCode: { id: "Kode Sumber", en: "Source Code" },
    links: { id: "Tautan", en: "Links" },
    backToWork: { id: "Kembali ke Karya", en: "Back to Work" },
    prev: { id: "Sebelumnya", en: "Previous" },
    next: { id: "Berikutnya", en: "Next" },
    noPreview: { id: "Pratinjau tidak tersedia", en: "No preview available" },
    caseStudy: { id: "Studi Kasus", en: "Case Study" },
  },

  filter: {
    label: { id: "Saring", en: "Filter" },
    all: { id: "Semua", en: "All" },
    empty: {
      id: "Tidak ada proyek pada kategori ini.",
      en: "No projects in this category.",
    },
  },

  contact: {
    label: { id: "Kontak", en: "Contact" },
    title: { id: "Mari bangun sesuatu", en: "Let's build something" },
    body: {
      id: "Terbuka untuk peran fullstack, rekayasa AI, dan proyek freelance. Balasan biasanya dalam 24 jam.",
      en: "Open to fullstack roles, AI engineering work and freelance projects. I usually reply within 24 hours.",
    },
    email: { id: "Kirim Email", en: "Send Email" },
    whatsapp: { id: "WhatsApp", en: "WhatsApp" },
    copy: { id: "Salin email", en: "Copy email" },
    copied: { id: "Tersalin", en: "Copied" },
  },

  footer: {
    builtWith: { id: "Dibangun dengan", en: "Built with" },
    backToTop: { id: "Ke atas", en: "Back to top" },
  },

  notFound: {
    code: { id: "404", en: "404" },
    title: { id: "Rute tidak ditemukan", en: "Route not found" },
    body: {
      id: "Halaman yang kamu cari tidak ada di sistem ini.",
      en: "The page you are looking for does not exist on this system.",
    },
    home: { id: "Kembali ke beranda", en: "Return home" },
  },

  a11y: {
    switchLanguage: { id: "Ganti bahasa", en: "Switch language" },
    skipToContent: { id: "Lompat ke konten", en: "Skip to content" },
    skipIntro: { id: "Lewati intro", en: "Skip intro" },
  },
} as const satisfies Record<string, Record<string, LocalizedText>>;

/** Human labels for the demo-availability chip. */
export const statusLabel: Record<ProjectStatus, LocalizedText> = {
  live: { id: "Live", en: "Live" },
  local: { id: "Lokal", en: "Local" },
  inactive: { id: "Server Nonaktif", en: "Server Inactive" },
  completed: { id: "Acara Selesai", en: "Event Completed" },
};

/** Filter chips on /work, in display order. */
export const tagLabel: Record<ProjectTag, LocalizedText> = {
  ai: { id: "AI & RAG", en: "AI & RAG" },
  pos: { id: "POS", en: "POS" },
  mobile: { id: "Mobile", en: "Mobile" },
  realtime: { id: "Real-Time", en: "Real-Time" },
  search: { id: "Search", en: "Search" },
  web: { id: "Web", en: "Web" },
};

export const tagOrder: ProjectTag[] = ["ai", "pos", "mobile", "realtime", "search", "web"];

/** Lines typed out by the boot overlay on first visit. */
export const bootLines: LocalizedText[] = [
  { id: "menginisialisasi runtime...", en: "initialising runtime..." },
  { id: "memuat 11 proyek", en: "loading 11 projects" },
  { id: "menghubungkan pipeline AI", en: "connecting ai pipeline" },
  { id: "siap.", en: "ready." },
];
