import type { Architecture } from "./types";

/**
 * System diagrams for the five deep-dive projects.
 *
 * Every node, responsibility and insight below is taken from the
 * `caseStudy.architecture` prose already written for that project — this file
 * draws what is written, it does not add to it. If a system changes, the prose
 * is the source of truth and this follows it.
 *
 * Keyed by slug and attached in projects.ts, so a project without a diagram
 * simply does not render one.
 */
export const architectures: Record<string, Architecture> = {
  airon: {
    layers: [
      {
        label: { id: "Aplikasi", en: "Application" },
        nodes: [
          {
            tech: "Next.js · Bun",
            note: {
              id: "Lapisan aplikasi dan alur kasir, berjalan di atas runtime Bun.",
              en: "Application layer and the till flow, running on the Bun runtime.",
            },
          },
        ],
      },
      {
        label: { id: "Data", en: "Data" },
        nodes: [
          {
            tech: "PostgreSQL",
            note: {
              id: "Sumber kebenaran transaksi.",
              en: "Source of truth for transactions.",
            },
          },
          {
            tech: "Redis",
            note: {
              id: "Menahan agregat yang paling sering dibaca.",
              en: "Holds the most frequently read aggregates.",
            },
          },
        ],
      },
      {
        label: { id: "Jalur AI", en: "AI paths" },
        async: true,
        nodes: [
          {
            tech: "VLM",
            ai: true,
            note: {
              id: "Pemindaian faktur multimodal, pada saat input.",
              en: "Multimodal invoice scanning, at input time.",
            },
          },
          {
            tech: "LLM",
            ai: true,
            note: {
              id: "Membaca tren transaksi yang sudah di-cache untuk menyusun ringkasan analitik.",
              en: "Reads already-cached transaction trends to build analytic summaries.",
            },
          },
        ],
      },
    ],
    insight: {
      id: "Dua jalur AI berjalan terpisah, sehingga inferensi berat tidak pernah memblokir alur kasir.",
      en: "The two AI paths run separately, so heavy inference never blocks the till.",
    },
  },

  aron: {
    layers: [
      {
        label: { id: "Masukan", en: "Ingest" },
        nodes: [
          {
            tech: "Docling",
            note: {
              id: "Mengekstrak dokumen operasional kompleks menjadi teks yang mempertahankan hierarki.",
              en: "Extracts complex operational documents into hierarchy-preserving text.",
            },
          },
        ],
      },
      {
        label: { id: "Penyimpanan", en: "Storage" },
        nodes: [
          {
            tech: "pgvector · PostgreSQL",
            note: {
              id: "Potongan teks di-embed dan disimpan sebagai vektor, di dalam database yang sama dengan data operasional.",
              en: "Chunks are embedded and stored as vectors, inside the same database as the operational data.",
            },
          },
          {
            tech: "Redis",
            note: {
              id: "Menahan state percakapan.",
              en: "Holds conversation state.",
            },
          },
        ],
      },
      {
        label: { id: "Jalur AI", en: "AI path" },
        nodes: [
          {
            tech: "VLM",
            ai: true,
            note: {
              id: "Menangani lampiran gambar yang dikirim pelanggan.",
              en: "Handles image attachments sent by customers.",
            },
          },
        ],
      },
    ],
    insight: {
      id: "pgvector hidup di PostgreSQL yang sama dengan data operasional — tidak ada database vektor terpisah untuk disinkronkan.",
      en: "pgvector lives in the same PostgreSQL as the operational data — there is no separate vector database to keep in sync.",
    },
  },

  proteron: {
    layers: [
      {
        label: { id: "Runtime", en: "Runtime" },
        nodes: [
          {
            tech: "NestJS · TypeScript",
            note: {
              id: "Logika operasional CRM — pipeline, lead, polis — tempat konsistensi transaksional menentukan.",
              en: "CRM operational logic — pipeline, leads, policies — where transactional consistency decides.",
            },
          },
          {
            tech: "FastAPI · Python",
            ai: true,
            note: {
              id: "Komputasi dokumen AI, tempat ekosistem library-nya jauh lebih matang.",
              en: "AI document computation, where the library ecosystem is far more mature.",
            },
          },
        ],
      },
      {
        label: { id: "Data", en: "Data" },
        nodes: [
          {
            tech: "PostgreSQL · pgvector",
            note: {
              id: "Melayani pencarian semantik polis.",
              en: "Serves semantic policy search.",
            },
          },
          {
            tech: "Redis",
            note: {
              id: "Lapisan cache di antara kedua runtime.",
              en: "Cache layer between the two runtimes.",
            },
          },
        ],
      },
    ],
    insight: {
      id: "Dua runtime dengan tanggung jawab berbeda, masing-masing dipilih karena di situlah ekosistemnya paling kuat.",
      en: "Two runtimes with different responsibilities, each chosen for where its ecosystem is strongest.",
    },
  },

  "hikmah-ai": {
    layers: [
      {
        label: { id: "Masukan", en: "Ingest" },
        nodes: [
          {
            tech: "Docling",
            note: {
              id: "Mem-parsing literatur digital multibahasa Arab–Indonesia.",
              en: "Parses multilingual Arabic–Indonesian digital literature.",
            },
          },
        ],
      },
      {
        label: { id: "Penelusuran", en: "Retrieval" },
        nodes: [
          {
            tech: "pgvector · HNSW",
            note: {
              id: "Menyimpan embedding di dalam PostgreSQL, dengan indexing HNSW untuk penelusuran kemiripan.",
              en: "Stores embeddings inside PostgreSQL, with HNSW indexing for similarity search.",
            },
          },
        ],
      },
      {
        label: { id: "Aplikasi", en: "Application" },
        nodes: [
          {
            tech: "Next.js · Bun",
            note: {
              id: "Runtime Bun menjalankan lapisan aplikasi Next.js.",
              en: "The Bun runtime runs the Next.js application layer.",
            },
          },
        ],
      },
    ],
    insight: {
      id: "Arsitektur RAG yang membatasi sintesis jawaban hanya pada rujukan primer tepercaya.",
      en: "A RAG architecture that restricts answer synthesis to trusted primary sources only.",
    },
  },

  assistary: {
    layers: [
      {
        label: { id: "Aplikasi & API", en: "App & API" },
        nodes: [
          {
            tech: "Next.js · NestJS",
            note: {
              id: "Menangani aplikasi dan API.",
              en: "Handle the application and the API.",
            },
          },
        ],
      },
      {
        label: { id: "Antrean", en: "Queue" },
        async: true,
        nodes: [
          {
            tech: "Redis queue",
            note: {
              id: "Rekaman masuk ke queue dan diproses di latar belakang.",
              en: "Recordings enter the queue and are processed in the background.",
            },
          },
          {
            tech: "Python microservice",
            note: {
              id: "Pemrosesan audio.",
              en: "Audio processing.",
            },
          },
        ],
      },
      {
        label: { id: "Jalur AI", en: "AI path" },
        nodes: [
          {
            tech: "Transkripsi + diarisasi",
            ai: true,
            note: {
              id: "Transkripsi dengan identifikasi pembicara, lebih dahulu.",
              en: "Transcription with speaker identification, first.",
            },
          },
          {
            tech: "LLM",
            ai: true,
            note: {
              id: "Mengekstrak keputusan dan action item dari transkrip yang sudah terstruktur.",
              en: "Extracts decisions and action items from the already-structured transcript.",
            },
          },
        ],
      },
    ],
    insight: {
      id: "Urutannya menentukan: transkrip distrukturkan lebih dulu, LLM baru bekerja di atas hasilnya.",
      en: "The order is the point: the transcript is structured first, and only then does the LLM work on top of it.",
    },
  },
};
