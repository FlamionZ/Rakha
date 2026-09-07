import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "airon",
    index: 1,
    name: "Airon",
    tagline: {
      id: "POS AI-Native & Intelijen Bisnis Otonom",
      en: "AI-Native POS & Autonomous Business Intelligence",
    },
    domain: { id: "POS & Manajemen Bisnis", en: "POS & Business Management" },
    stack: ["Next.js", "Bun", "PostgreSQL", "Redis", "VLM", "LLM"],
    aiPipeline: ["VLM", "LLM"],
    tags: ["ai", "pos"],
    highlights: [
      {
        title: { id: "Input Cerdas via VLM", en: "Intelligent Input via VLM" },
        body: {
          id: "Menggantikan input data manual kasir dengan memanfaatkan VLM untuk pemindaian faktur/struk belanja secara multimodal, mengekstraksi metadata item, harga, dan diskon secara instan.",
          en: "Replaces manual cashier data entry with a Vision Language Model that scans invoices and receipts multimodally, extracting item metadata, pricing and discounts instantly.",
        },
      },
      {
        title: { id: "Analis Bisnis Otonom", en: "Autonomous Business Analyst" },
        body: {
          id: "Mengintegrasikan LLM untuk membaca tren transaksi PostgreSQL yang di-cache di Redis, menghasilkan ringkasan analitik harian, proyeksi stok menipis, serta saran strategi harga kepada pemilik usaha.",
          en: "An LLM reads transaction trends from PostgreSQL cached in Redis, producing daily analytics digests, low-stock projections and pricing strategy suggestions for the owner.",
        },
      },
      {
        title: { id: "Runtime Berperforma Tinggi", en: "High-Performance Runtime" },
        body: {
          id: "Mengadopsi runtime Bun untuk memastikan penanganan I/O backend lebih cepat hingga 3x dibandingkan runtime Node konvensional.",
          en: "Adopted the Bun runtime for backend I/O handling up to 3x faster than conventional Node.",
        },
      },
    ],
    repos: [{ label: "GitHub", href: "https://github.com/FlamionZ/Airon" }],
    demo: {
      href: "https://airon.astheron.my.id/",
      label: { id: "Demo Langsung", en: "Live Demo" },
    },
    status: "live",
    featured: true,
    accent: "#c6ff3d",
    image: "/projects/airon.webp",
  },

  {
    slug: "aron",
    index: 2,
    name: "Aron",
    tagline: {
      id: "Dukungan Pelanggan AI Omnichannel & Knowledge Engine",
      en: "Omnichannel AI Customer Support & Knowledge Engine",
    },
    domain: {
      id: "Chatbot AI Omnichannel (WhatsApp)",
      en: "Omnichannel AI Chatbot (WhatsApp)",
    },
    stack: ["Next.js", "Bun", "PostgreSQL", "Redis", "pgvector", "Docling", "RAG", "LLM", "VLM"],
    aiPipeline: ["pgvector", "Docling", "RAG", "LLM", "VLM"],
    tags: ["ai"],
    highlights: [
      {
        title: {
          id: "Document Parsing Berkualitas Tinggi (Docling)",
          en: "High-Fidelity Document Parsing (Docling)",
        },
        body: {
          id: "Memanfaatkan library Docling untuk mengekstrak dokumen operasional perusahaan yang kompleks (tabel, bagan, format PDF berlapis) tanpa kehilangan struktur hierarki informasi.",
          en: "Uses Docling to extract complex operational documents — tables, charts, layered PDFs — without losing the hierarchical structure of the information.",
        },
      },
      {
        title: {
          id: "Retrieval-Augmented Generation (RAG)",
          en: "Retrieval-Augmented Generation (RAG)",
        },
        body: {
          id: "Menggunakan pgvector dalam PostgreSQL untuk pencarian semantik berlatensi rendah, memungkinkan bot menjawab pertanyaan pelanggan di WhatsApp secara akurat, kontekstual, dan bebas halusinasi.",
          en: "pgvector inside PostgreSQL powers low-latency semantic search, letting the bot answer WhatsApp customer questions accurately, in context, and free of hallucination.",
        },
      },
      {
        title: { id: "Penanganan Multimodal", en: "Multimodal Handling" },
        body: {
          id: "Dilengkapi modul VLM untuk mengenali gambar komplain, bukti transfer perbankan, dan dokumen yang dikirimkan pelanggan melalui WhatsApp secara otomatis.",
          en: "A VLM module automatically recognises complaint photos, bank transfer receipts and documents customers send over WhatsApp.",
        },
      },
    ],
    repos: [{ label: "GitHub", href: "https://github.com/maulanawirawan/aron-project" }],
    demo: {
      href: "https://aron.iliterate.ai/",
      label: { id: "Demo Langsung", en: "Live Demo" },
    },
    status: "live",
    featured: true,
    accent: "#4de8ff",
    image: "/projects/aron.webp",
  },

  {
    slug: "proteron",
    index: 3,
    name: "Proteron",
    tagline: {
      id: "CRM AI Enterprise untuk Industri Asuransi",
      en: "Enterprise AI CRM for the Insurance Industry",
    },
    domain: { id: "CRM AI Enterprise", en: "Enterprise AI CRM" },
    stack: [
      "Next.js",
      "NestJS",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "pgvector",
      "RAG",
      "LLM",
      "VLM",
    ],
    aiPipeline: ["pgvector", "RAG", "LLM", "VLM"],
    tags: ["ai", "web"],
    highlights: [
      {
        title: {
          id: "Arsitektur Microservices Terpisah",
          en: "Decoupled Microservice Architecture",
        },
        body: {
          id: "Memisahkan logika operasional CRM enterprise pada NestJS (TypeScript) dengan komputasi berat dokumen AI pada microservice FastAPI (Python).",
          en: "Separates enterprise CRM operational logic in NestJS (TypeScript) from heavy AI document computation in a FastAPI (Python) microservice.",
        },
      },
      {
        title: { id: "Policy Document Copilot", en: "Policy Document Copilot" },
        body: {
          id: "Agen AI berbasis RAG yang membantu agen asuransi mencari pasal polis, klausul pengecualian, dan komparasi paket proteksi dalam hitungan detik.",
          en: "A RAG-based AI agent helping insurance agents find policy articles, exclusion clauses and coverage comparisons in seconds.",
        },
      },
      {
        title: {
          id: "Underwriting & Verifikasi Klaim",
          en: "Underwriting & Claim Verification",
        },
        body: {
          id: "Modul OCR & VLM cerdas untuk verifikasi validitas klaim medis dan berkas identitas pemegang polis secara otomatis.",
          en: "Intelligent OCR and VLM modules that automatically verify the validity of medical claims and policyholder identity documents.",
        },
      },
    ],
    repos: [{ label: "GitHub", href: "https://github.com/astherontechnologies/Proteron" }],
    demo: {
      href: "https://proteron.astheron.my.id/",
      label: { id: "Demo Langsung", en: "Live Demo" },
    },
    status: "live",
    featured: true,
    accent: "#7c6bff",
    image: "/projects/proteron.webp",
  },

  {
    slug: "hikmah-ai",
    index: 4,
    name: "Hikmah AI",
    tagline: {
      id: "Mesin RAG Pengetahuan Keislaman Domain-Spesifik",
      en: "Domain-Specific Islamic Knowledge RAG Engine",
    },
    domain: { id: "Knowledge Engine Keislaman", en: "Islamic Knowledge Engine" },
    stack: ["Next.js", "Bun", "PostgreSQL", "pgvector", "HNSW", "Docling", "RAG", "LLM"],
    aiPipeline: ["pgvector", "HNSW", "Docling", "RAG", "LLM"],
    tags: ["ai"],
    highlights: [
      {
        title: { id: "Retrieval Bebas Halusinasi", en: "Zero-Hallucination Retrieval" },
        body: {
          id: "Mengembangkan arsitektur RAG khusus domain pengetahuan keislaman yang berfokus ketat pada hukum Islam (fikih), sejarah Islam, dan pengetahuan umum Islam dengan membatasi sintesis jawaban hanya pada rujukan primer tepercaya.",
          en: "A RAG architecture purpose-built for Islamic knowledge — fiqh, Islamic history and general Islamic studies — constraining answer synthesis strictly to trusted primary sources.",
        },
      },
      {
        title: {
          id: "Preservasi Struktur Kitab via Docling",
          en: "Preserving Kitab Structure with Docling",
        },
        body: {
          id: "Menggunakan Docling untuk melakukan ekstraksi dan parsing dokumen/literatur digital multibahasa (Arab-Indonesia) agar penomoran bab, pasal hukum, dan referensi sanad/matan tetap utuh saat dipecah menjadi chunks.",
          en: "Docling extracts and parses multilingual digital literature (Arabic-Indonesian) so chapter numbering, legal articles and sanad/matan references stay intact when split into chunks.",
        },
      },
      {
        title: {
          id: "Semantic Search Berkecepatan Tinggi",
          en: "High-Speed Semantic Search",
        },
        body: {
          id: "Memanfaatkan pgvector dalam PostgreSQL dengan algoritma indexing HNSW untuk melakukan penelusuran kemiripan semantik terhadap ribuan dokumen rujukan dalam hitungan milidetik.",
          en: "pgvector in PostgreSQL with HNSW indexing performs semantic similarity search across thousands of reference documents in milliseconds.",
        },
      },
    ],
    repos: [{ label: "GitHub", href: "https://github.com/patemi/HikmahAI_Asther" }],
    demo: {
      label: { id: "Lingkungan Lokal · Riset Skripsi", en: "Local Environment · Thesis Research" },
    },
    status: "local",
    featured: true,
    accent: "#3dffb0",
    image: "/projects/hikmah-ai.webp",
  },

  {
    slug: "assistary",
    index: 5,
    name: "Assistary.AI",
    tagline: {
      id: "Notulen Rapat Otomatis & Ekstraksi Action Item",
      en: "Automated Minutes of Meeting & Action-Item Extractor",
    },
    domain: { id: "Notulen Rapat Otomatis (MoM)", en: "Automated Minutes of Meeting (MoM)" },
    stack: ["Next.js", "NestJS", "Python", "PostgreSQL", "Redis", "LLM"],
    aiPipeline: ["LLM"],
    tags: ["ai"],
    highlights: [
      {
        title: {
          id: "Transkripsi & Ringkasan End-to-End",
          en: "End-to-End Transcription & Summarisation",
        },
        body: {
          id: "Mengubah rekaman percakapan rapat menjadi teks terstruktur dengan identifikasi pembicara (speaker diarization).",
          en: "Turns meeting recordings into structured text with speaker diarization.",
        },
      },
      {
        title: {
          id: "Ekstraksi Insight yang Actionable",
          en: "Actionable Insight Extraction",
        },
        body: {
          id: "Menggunakan LLM teroptimasi untuk mengekstraksi poin kesepakatan, daftar tugas (action items), penanggung jawab (PIC), dan batas waktu pengerjaan (deadline) secara otomatis.",
          en: "An optimised LLM automatically extracts agreements, action items, owners (PIC) and deadlines.",
        },
      },
      {
        title: { id: "Antrian Pekerjaan Asinkron", en: "Asynchronous Job Queue" },
        body: {
          id: "Menggunakan Redis queue untuk memproses file audio berukuran besar di latar belakang tanpa memblokir request pengguna.",
          en: "A Redis queue processes large audio files in the background without blocking user requests.",
        },
      },
    ],
    repos: [{ label: "GitHub", href: "https://github.com/FlamionZ/Assistarty.ai" }],
    demo: { label: { id: "Lingkungan Lokal · Internal", en: "Local Environment · Internal" } },
    status: "local",
    featured: true,
    accent: "#ffb53d",
    image: "/projects/assistary.webp",
  },

  {
    slug: "notula",
    index: 6,
    name: "Notula",
    tagline: {
      id: "Aplikasi Mobile Lintas Platform untuk Notulen Rapat",
      en: "Cross-Platform Mobile App for Meeting Notes & MoM",
    },
    domain: { id: "Aplikasi Mobile MoM", en: "Mobile App for MoM" },
    stack: [
      "React Native",
      "Expo",
      "Next.js API",
      "TanStack Query",
      "Zustand",
      "PostgreSQL",
      "Redis",
      "LLM",
    ],
    aiPipeline: ["LLM"],
    tags: ["ai", "mobile"],
    highlights: [
      {
        title: {
          id: "State Management & Sinkronisasi Data",
          en: "State Management & Data Synchronisation",
        },
        body: {
          id: "Memadukan Zustand untuk client-state yang ringan dan TanStack Query untuk caching, deduplikasi request server, serta sinkronisasi data instan.",
          en: "Pairs Zustand for lightweight client state with TanStack Query for caching, server request deduplication and instant data synchronisation.",
        },
      },
      {
        title: { id: "Produktivitas Mobile-First", en: "Mobile-First Productivity" },
        body: {
          id: "Memungkinkan profesional merekam rapat secara langsung dari smartphone dan menerima notifikasi saat ringkasan AI selesai diproses.",
          en: "Lets professionals record meetings straight from their phone and get notified the moment the AI summary is ready.",
        },
      },
      {
        title: { id: "Ekosistem Menyatu", en: "Seamless Ecosystem" },
        body: {
          id: "Integrasi backend API terpadu yang dapat diakses serentak melalui aplikasi mobile maupun web dashboard.",
          en: "A unified backend API served simultaneously to the mobile app and the web dashboard.",
        },
      },
    ],
    repos: [{ label: "GitHub", href: "https://github.com/FlamionZ/Notula" }],
    demo: { label: { id: "Lokal / Expo Development Build", en: "Local / Expo Development Build" } },
    status: "local",
    featured: false,
    accent: "#ff6bd6",
  },

  {
    slug: "focaron",
    index: 7,
    name: "Focaron",
    tagline: {
      id: "POS AI-Native untuk Fotokopi & Percetakan",
      en: "AI-Native POS for Document Duplication & Printing",
    },
    domain: { id: "POS Fotokopi & Percetakan", en: "Copy & Print Centre POS" },
    stack: ["Next.js", "Bun", "PostgreSQL", "Redis", "LLM", "VLM"],
    aiPipeline: ["LLM", "VLM"],
    tags: ["ai", "pos"],
    highlights: [
      {
        title: {
          id: "Estimasi Pekerjaan Cetak Otomatis",
          en: "Automated Print Job Estimation",
        },
        body: {
          id: "Menggunakan VLM untuk menganalisis file cetak pengguna (cakupan warna hitam/warna, densitas tinta, estimasi jumlah halaman, dan kebutuhan jilid) secara presisi.",
          en: "A VLM analyses print files precisely — black and colour coverage, ink density, page count estimation and binding requirements.",
        },
      },
      {
        title: { id: "Mesin Harga Dinamis", en: "Dynamic Pricing Engine" },
        body: {
          id: "Menghitung biaya cetak kompleks secara instan berdasarkan spesifikasi kertas dan beban operasional mesin fotokopi/cetak.",
          en: "Computes complex print costs instantly from paper specification and copier/press operational load.",
        },
      },
    ],
    repos: [{ label: "GitHub", href: "https://github.com/FlamionZ/Focaron" }],
    demo: { label: { id: "Lingkungan Lokal · Internal", en: "Local Environment · Internal" } },
    status: "local",
    featured: false,
    accent: "#ff4d4d",
    image: "/projects/focaron.webp",
  },

  {
    slug: "soraumkm",
    index: 8,
    name: "SoraUMKM",
    tagline: {
      id: "Search Engine & Direktori UMKM Berkecepatan Tinggi",
      en: "High-Speed Search Engine & Directory for Regional MSMEs",
    },
    domain: { id: "Direktori & Search Engine UMKM", en: "MSME Directory & Search Engine" },
    stack: ["Next.js", "Express.js", "MongoDB", "Meilisearch"],
    aiPipeline: [],
    tags: ["search", "web"],
    highlights: [
      {
        title: {
          id: "Instant Search Engine via Meilisearch",
          en: "Instant Search Engine via Meilisearch",
        },
        body: {
          id: "Menerapkan dedicated search engine Meilisearch yang menghadirkan fitur typo-tolerance, pencarian instan (search-as-you-type) sub-50ms, dan pemfilteran berlapis (kategori sektor usaha, radius wilayah, dan popularitas).",
          en: "A dedicated Meilisearch engine delivering typo tolerance, sub-50ms search-as-you-type and layered filtering by business sector, geographic radius and popularity.",
        },
      },
      {
        title: { id: "Arsitektur Skema Fleksibel", en: "Flexible Schema Architecture" },
        body: {
          id: "Menggunakan MongoDB untuk menyimpan data profil dinamis ratusan UMKM di Solo Raya (spesifikasi produk bervariasi, koordinat GPS, galeri foto, jam operasional).",
          en: "MongoDB stores dynamic profiles for hundreds of MSMEs across Solo Raya — varying product specs, GPS coordinates, photo galleries and opening hours.",
        },
      },
      {
        title: { id: "Arsitektur Backend Terpisah", en: "Decoupled Backend Architecture" },
        body: {
          id: "Memisahkan frontend Next.js dengan API server Express.js untuk memastikan throughput query tinggi dan kemudahan pemeliharaan service.",
          en: "Splits the Next.js frontend from an Express.js API server for high query throughput and easier service maintenance.",
        },
      },
    ],
    repos: [
      { label: "Frontend", href: "https://github.com/patemi/SkripsiUMKM-frontend-" },
      { label: "Backend", href: "https://github.com/patemi/SkripsiUMKM-backend-" },
    ],
    demo: { label: { id: "Server Nonaktif", en: "Server Inactive" } },
    status: "inactive",
    featured: false,
    accent: "#4d9fff",
    image: "/projects/soraumkm.webp",
  },

  {
    slug: "wedding-livechat",
    index: 9,
    name: "Wedding Live Chat",
    tagline: {
      id: "Platform Interaktif Berkonkurensi Tinggi",
      en: "High-Concurrency Interactive Platform",
    },
    domain: { id: "Platform Live Chat (Presidential Event)", en: "Live Chat Platform (Presidential Event)" },
    stack: ["Laravel", "Vite", "MySQL"],
    aiPipeline: [],
    tags: ["realtime", "web"],
    highlights: [
      {
        title: { id: "Sistem dengan Stabilitas Ekstrem", en: "Extreme Stability Under Load" },
        body: {
          id: "Dibangun khusus untuk menangani lonjakan ribuan pesan interaktif secara serentak pada hajatan pernikahan tokoh kenegaraan (Presidential Event).",
          en: "Purpose-built to absorb surges of thousands of simultaneous interactive messages at a head-of-state wedding celebration (Presidential Event).",
        },
      },
      {
        title: { id: "Sistem Moderasi Real-Time", en: "Real-Time Moderation System" },
        body: {
          id: "Dashboard kurasi pesan instan untuk menyaring ucapan tamu sebelum ditampilkan di layar proyeksi utama panggung.",
          en: "An instant message-curation dashboard filtering guest messages before they reach the main stage projection screen.",
        },
      },
      {
        title: { id: "Optimasi Database & Asset", en: "Database & Asset Optimisation" },
        body: {
          id: "Penggunaan indexing agresif pada MySQL dan bundling Vite untuk memastikan latensi rendering antarmuka layar LED tetap mulus tanpa stuttering.",
          en: "Aggressive MySQL indexing and Vite bundling keep LED wall rendering latency smooth and stutter-free.",
        },
      },
    ],
    repos: [{ label: "GitHub", href: "https://github.com/FlamionZ/wedding-livechat" }],
    demo: { label: { id: "Acara Selesai · Offline", en: "Event Completed · Offline" } },
    status: "completed",
    featured: false,
    accent: "#ff4d6d",
    image: "/projects/wedding-livechat.webp",
  },

  {
    slug: "yumna-villa-dieng",
    index: 10,
    name: "Yumna Villa Dieng",
    tagline: {
      id: "Mesin Direct Booking & Showcase Properti",
      en: "Direct Booking & Property Showcase Engine",
    },
    domain: { id: "Platform Direct-Booking Hospitality", en: "Hospitality Direct-Booking Platform" },
    stack: ["Next.js", "App Router", "Supabase", "PostgreSQL", "Vercel"],
    aiPipeline: [],
    tags: ["web"],
    highlights: [
      {
        title: { id: "Optimasi Konversi Langsung", en: "Direct Conversion Optimisation" },
        body: {
          id: "Dibangun untuk memotong komisi platform OTA melalui sistem reservasi mandiri yang cepat, ramah pengguna di ponsel, dan terintegrasi kalender.",
          en: "Built to cut OTA platform commission through a fast, mobile-friendly, calendar-integrated direct reservation system.",
        },
      },
      {
        title: {
          id: "SEO & Core Web Vitals Berperforma Tinggi",
          en: "High-Performance SEO & Core Web Vitals",
        },
        body: {
          id: "Memanfaatkan Server-Side Rendering (SSR) dan Incremental Static Regeneration (ISR) untuk memastikan website memuat di bawah 1 detik dengan skor Lighthouse tinggi.",
          en: "Server-Side Rendering and Incremental Static Regeneration keep the site loading in under a second with high Lighthouse scores.",
        },
      },
    ],
    repos: [{ label: "GitHub", href: "https://github.com/FlamionZ/Villa-Luxury" }],
    demo: {
      href: "https://villadiengluxury.com/",
      label: { id: "Demo Langsung", en: "Live Demo" },
    },
    status: "live",
    featured: false,
    accent: "#5cd6a8",
    image: "/projects/yumna-villa-dieng.webp",
  },

  {
    slug: "astheron-portal",
    index: 11,
    name: "Astheron Portal",
    tagline: {
      id: "Platform Showcase Resmi Astheron Technologies",
      en: "Official Showcase Platform for Astheron Technologies",
    },
    domain: { id: "Company Profile & Tech Showcase", en: "Company Profile & Tech Showcase" },
    stack: ["Next.js", "Bun", "SQLite"],
    aiPipeline: [],
    tags: ["web"],
    highlights: [
      {
        title: { id: "Arsitektur Minimalis & Efisien", en: "Minimal, Efficient Architecture" },
        body: {
          id: "Menggunakan SQLite tersemat (embedded) dan runtime Bun untuk menghasilkan profil agensi perangkat lunak dengan kebutuhan memori rendah dan zero cold-start latency.",
          en: "Embedded SQLite plus the Bun runtime produce a software agency profile with low memory needs and zero cold-start latency.",
        },
      },
      {
        title: { id: "Interactive Tech Showcase", en: "Interactive Tech Showcase" },
        body: {
          id: "Menampilkan kapabilitas rekayasa software dan demo interaktif kapabilitas produk Astheron kepada calon klien B2B.",
          en: "Presents software engineering capability and interactive product demos to prospective B2B clients.",
        },
      },
    ],
    repos: [{ label: "GitHub", href: "https://github.com/astherontechnologies/ashteron" }],
    demo: {
      href: "https://astheron.my.id/",
      label: { id: "Demo Langsung", en: "Live Demo" },
    },
    status: "live",
    featured: false,
    accent: "#e6eaf2",
    image: "/projects/astheron-portal.webp",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/**
 * Previous/next wrap around the full list so the detail page never
 * dead-ends on the first or last project.
 */
export function getProjectNeighbours(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: undefined, next: undefined };
  return {
    prev: projects[(i - 1 + projects.length) % projects.length],
    next: projects[(i + 1) % projects.length],
  };
}
