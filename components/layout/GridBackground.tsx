/**
 * Ambient backdrop.
 *
 * The first version floated three blurred colour blobs — the single most
 * recognisable "AI-generated site" tell. The second overcorrected into a full
 * blueprint grid plus five column guides, which drew a visible cage behind
 * every row of content.
 *
 * What survives is the quietest version that still gives the page a ground:
 * a fine grid that fades out well before the fold, and one cool wash at the
 * horizon. Texture you notice only if you look for it.
 */
export function GridBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="blueprint absolute inset-0 opacity-[0.35] [mask-image:linear-gradient(to_bottom,black,transparent_55%)]" />
      <div className="absolute inset-x-0 top-0 h-[50vh] bg-gradient-to-b from-accent/[0.05] to-transparent" />
    </div>
  );
}
