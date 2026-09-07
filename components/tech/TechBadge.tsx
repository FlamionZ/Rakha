import { TechIcon, hasTechIcon, techBrandColor } from "./TechIcon";

/** Concepts have no brand colour; they bloom to the AI accent instead. */
const CONCEPT_ACCENT = "#4de8ff";

function brandVar(name: string) {
  return { ["--brand" as string]: techBrandColor(name) ?? CONCEPT_ACCENT };
}

/**
 * Icon plus name. Deliberately not a pill — the old design wrapped every
 * technology in a rounded chip, which turned each card into a bag of lozenges.
 * Mark and word sitting on the page read as typography instead.
 */
export function TechBadge({ name }: { name: string }) {
  return (
    <span
      className="group/tech inline-flex items-center gap-1.5 whitespace-nowrap"
      style={brandVar(name)}
    >
      {hasTechIcon(name) && (
        <TechIcon
          name={name}
          className="h-3.5 w-3.5 shrink-0 text-faint transition-colors duration-300 group-hover/tech:text-[var(--brand)]"
        />
      )}
      <span className="font-mono text-[11px] leading-none text-muted transition-colors duration-300 group-hover/tech:text-fg">
        {name}
      </span>
    </span>
  );
}

interface TechStripProps {
  names: string[];
  /** Show at most this many marks, then a numeric overflow. */
  max?: number;
  className?: string;
  size?: "sm" | "md";
}

/**
 * Marks only, no words — for dense rows where the logo is enough and the full
 * stack is one click away.
 *
 * Note the layout classes stop short of `display`: callers routinely need to
 * hide this responsively, and a hardcoded `inline-flex` here would collide
 * with their `hidden lg:flex`. Wrap it if you need conditional display.
 */
export function TechStrip({ names, max = 6, className, size = "sm" }: TechStripProps) {
  const drawable = names.filter(hasTechIcon);
  const shown = drawable.slice(0, max);
  const overflow = drawable.length - shown.length;
  const box = size === "md" ? "h-[18px] w-[18px]" : "h-4 w-4";

  return (
    <span className={`flex items-center gap-2.5 ${className ?? ""}`}>
      {shown.map((name) => (
        <span key={name} className="group/tech inline-flex" style={brandVar(name)} title={name}>
          <TechIcon
            name={name}
            className={`${box} shrink-0 text-faint transition-colors duration-300 group-hover/tech:text-[var(--brand)]`}
          />
        </span>
      ))}
      {overflow > 0 && (
        <span className="font-mono text-[10px] leading-none text-faint">+{overflow}</span>
      )}
    </span>
  );
}
