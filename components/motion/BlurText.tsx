interface BlurTextProps {
  text: string;
  className?: string;
  /** Letters for a headline; words for a sentence. */
  animateBy?: "words" | "letters";
  /** Seconds before the first unit starts. */
  delay?: number;
  /** Seconds between units. */
  stagger?: number;
}

/**
 * Text that resolves out of a defocus, one unit at a time.
 *
 * Driven by CSS rather than by JS + IntersectionObserver as in the reference
 * implementation. Two reasons: this renders the page's `h1`, and a JS-applied
 * `opacity: 0` gets serialised into the server HTML — so a bundle that fails
 * or arrives late leaves the headline invisible. It also keeps the component
 * out of the client bundle entirely.
 *
 * Under reduced-motion the global rule collapses the duration and `both`
 * fill-mode lands every unit on its finished frame immediately.
 */
export function BlurText({
  text,
  className = "",
  animateBy = "words",
  delay = 0,
  stagger = 0.08,
}: BlurTextProps) {
  const units = animateBy === "letters" ? Array.from(text) : text.split(" ");

  return (
    <span
      className={`inline-flex flex-wrap ${className}`}
      style={
        {
          "--blur-delay": `${delay}s`,
          "--blur-stagger": `${stagger}s`,
        } as React.CSSProperties
      }
    >
      {units.map((unit, i) => (
        <span
          key={`${unit}-${i}`}
          className="blur-in-unit inline-block"
          style={{ "--i": i } as React.CSSProperties}
        >
          {unit === " " ? " " : unit}
          {animateBy === "words" && i < units.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
