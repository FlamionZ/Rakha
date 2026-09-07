import Image from "next/image";

interface ProjectImageProps {
  src?: string;
  alt: string;
  accent: string;
  name: string;
  stack: string[];
  priority?: boolean;
  sizes?: string;
  /**
   * "cover" crops to fill — right for thumbnails. "contain" shows the whole
   * frame — right for the detail hero, where cropping a product's sidebar out
   * of a dashboard screenshot makes it look broken.
   */
  fit?: "cover" | "contain";
}

/**
 * Single entry point for project artwork.
 *
 * Screenshots are cropped from the top, which keeps a product's nav and hero
 * in frame — the part that actually identifies it. When a project has no
 * screenshot at all we paint a generated panel from its accent instead, so a
 * missing asset reads as a design decision rather than a broken image.
 */
export function ProjectImage({
  src,
  alt,
  accent,
  name,
  stack,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  fit = "cover",
}: ProjectImageProps) {
  if (!src) {
    return (
      <div
        className="relative flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden bg-surface-2 px-6"
        style={{
          backgroundImage: `radial-gradient(120% 90% at 50% 0%, ${accent}22 0%, transparent 60%)`,
        }}
      >
        <div className="dot-grid absolute inset-0 opacity-30" aria-hidden="true" />
        <span
          className="relative font-display text-4xl font-bold tracking-tight sm:text-5xl"
          style={{ color: accent }}
        >
          {name}
        </span>
        <div className="relative flex flex-wrap justify-center gap-1.5">
          {stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-sm border border-border-bright bg-bg/60 px-2 py-0.5 font-mono text-[10px] text-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={
        fit === "contain"
          ? "object-contain"
          : "object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
      }
    />
  );
}
