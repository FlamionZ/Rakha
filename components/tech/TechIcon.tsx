import type { ReactNode } from "react";
import { brandMarks, techToBrand } from "@/content/logos";

/**
 * Concept glyphs.
 *
 * RAG, LLM, VLM, HNSW, pgvector, Docling and Zustand are techniques and
 * libraries with no brand mark to borrow. Rather than invent fake logos, they
 * get a deliberately different family: stroked line glyphs against the solid
 * brand marks. Products are filled, concepts are drawn — the two read as one
 * system precisely because they are consistently distinct.
 */
const CONCEPT_GLYPHS: Record<string, ReactNode> = {
  // Retrieval feeding a document
  RAG: (
    <>
      <rect x="13" y="4" width="8" height="16" rx="1.5" />
      <path d="M3 12h7M7.5 8.5 11 12l-3.5 3.5" />
    </>
  ),
  // Token graph converging on a single node
  LLM: (
    <>
      <circle cx="5" cy="6" r="2" />
      <circle cx="5" cy="18" r="2" />
      <circle cx="12" cy="12" r="2.6" />
      <circle cx="19.5" cy="12" r="2" />
      <path d="M6.6 7.2 9.9 10.4M6.6 16.8 9.9 13.6M14.6 12h2.9" />
    </>
  ),
  // Lens — vision models
  VLM: (
    <>
      <path d="M2.5 12S6 6.2 12 6.2 21.5 12 21.5 12 18 17.8 12 17.8 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.6" />
    </>
  ),
  // Hierarchical navigable small world — layered node graph
  HNSW: (
    <>
      <circle cx="6" cy="5" r="1.7" />
      <circle cx="17" cy="5" r="1.7" />
      <circle cx="4" cy="12.5" r="1.7" />
      <circle cx="12" cy="12.5" r="1.7" />
      <circle cx="20" cy="12.5" r="1.7" />
      <circle cx="9" cy="19.5" r="1.7" />
      <circle cx="17" cy="19.5" r="1.7" />
      <path d="M7.4 5.8 10.7 11.3M15.5 6 13 11.2M5.2 13.6 7.9 17.9M13.2 13.4 15.6 18.1M18.6 13.5 17.6 17.9" />
    </>
  ),
  // A vector from the origin
  pgvector: (
    <>
      <circle cx="5" cy="19" r="1.9" />
      <path d="M6.5 17.5 18.5 5.5M13.2 5h5.8v5.8" />
    </>
  ),
  // Layered document sheets
  Docling: (
    <>
      <rect x="3" y="6.5" width="12.5" height="14.5" rx="1.6" />
      <path d="M8 3h11a2 2 0 0 1 2 2v11.5" />
      <path d="M6.4 11.5h5.7M6.4 15.5h5.7" />
    </>
  ),
  // Stacked state layers
  Zustand: (
    <>
      <path d="M12 2.8 21 7.6l-9 4.8-9-4.8 9-4.8Z" />
      <path d="M3 12.2 12 17l9-4.8" />
      <path d="M3 16.6 12 21.4l9-4.8" />
    </>
  ),
};

interface TechIconProps {
  name: string;
  className?: string;
}

/** True when we can draw something for this name. */
export function hasTechIcon(name: string): boolean {
  return Boolean(techToBrand[name] || CONCEPT_GLYPHS[name]);
}

/** The brand colour for a name, or null for concepts and unknowns. */
export function techBrandColor(name: string): string | null {
  const slug = techToBrand[name];
  return slug ? brandMarks[slug].hex : null;
}

/**
 * Renders at `currentColor`, so the parent decides whether it sits muted or
 * blooms into brand colour.
 */
export function TechIcon({ name, className }: TechIconProps) {
  const slug = techToBrand[name];

  if (slug) {
    const mark = brandMarks[slug];
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        role="img"
        aria-hidden="true"
        fill="currentColor"
      >
        <path d={mark.path} />
      </svg>
    );
  }

  const glyph = CONCEPT_GLYPHS[name];
  if (!glyph) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      role="img"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {glyph}
    </svg>
  );
}
