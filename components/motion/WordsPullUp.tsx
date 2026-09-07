interface WordsPullUpProps {
  text: string;
  className?: string;
  /**
   * Words read better for a phrase; characters read better for a single word,
   * where a one-unit "stagger" would not register as motion at all.
   */
  splitBy?: "word" | "char";
  /** Superscript marker on the final unit. Only use it when something refers to it. */
  showAsterisk?: boolean;
  /** Seconds before the first unit starts. */
  delay?: number;
  /** Seconds between units. */
  stagger?: number;
}

/**
 * Units rise into place on load.
 *
 * Deliberately a stylesheet animation rather than a JS-driven one. The
 * reference implementation started each unit at `opacity: 0` through
 * framer-motion, which React serialises into the server-rendered HTML — so a
 * failed or slow bundle leaves the heading invisible. That is an acceptable
 * risk for a decorative element and not for the page's `h1`.
 *
 * Being CSS also means no client component boundary and no hydration cost for
 * what is purely presentational.
 */
export function WordsPullUp({
  text,
  className = "",
  splitBy = "word",
  showAsterisk = false,
  delay = 0,
  stagger = 0.07,
}: WordsPullUpProps) {
  const units = splitBy === "char" ? Array.from(text) : text.split(" ");

  return (
    <span
      className={`inline-flex flex-wrap ${className}`}
      style={
        {
          "--pull-delay": `${delay}s`,
          "--pull-stagger": `${stagger}s`,
        } as React.CSSProperties
      }
    >
      {units.map((unit, i) => {
        const isLast = i === units.length - 1;
        return (
          <span
            key={`${unit}-${i}`}
            className="pull-up-unit relative inline-block"
            style={
              {
                "--i": i,
                marginRight: splitBy === "word" && !isLast ? "0.25em" : undefined,
              } as React.CSSProperties
            }
          >
            {unit === " " ? " " : unit}
            {showAsterisk && isLast && (
              <span
                className="absolute -right-[0.34em] top-[0.06em] text-[0.26em] text-accent"
                aria-hidden="true"
              >
                *
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
}
