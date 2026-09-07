/**
 * Ambient backdrop: a masked dot grid plus two soft accent blooms.
 *
 * Deliberately pure CSS and server-rendered — it covers the whole viewport on
 * every route, so anything JS-driven here would cost paint on every page.
 */
export function GridBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="dot-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_5%,transparent_70%)]" />
      <div className="absolute -top-40 left-1/2 h-[520px] w-[min(900px,120vw)] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-[130px]" />
      <div className="absolute -bottom-52 -right-40 h-[440px] w-[440px] rounded-full bg-accent-2/[0.06] blur-[120px]" />
      <div className="absolute -left-40 top-1/3 h-[380px] w-[380px] rounded-full bg-accent-3/[0.04] blur-[120px]" />
    </div>
  );
}
