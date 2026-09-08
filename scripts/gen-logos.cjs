const si = require("simple-icons");
const fs = require("fs");

// Tech name exactly as written in content/ -> simple-icons slug
const MAP = {
  "Next.js": "nextdotjs",
  "Next.js API": "nextdotjs",
  "App Router": "nextdotjs",
  Bun: "bun",
  PostgreSQL: "postgresql",
  Redis: "redis",
  React: "react",
  "React Native": "react",
  Expo: "expo",
  "Express.js": "express",
  FastAPI: "fastapi",
  Laravel: "laravel",
  Meilisearch: "meilisearch",
  MongoDB: "mongodb",
  MySQL: "mysql",
  NestJS: "nestjs",
  Python: "python",
  SQLite: "sqlite",
  Supabase: "supabase",
  "TanStack Query": "reactquery",
  TypeScript: "typescript",
  Vercel: "vercel",
  Vite: "vite",
  Docker: "docker",
  PyTorch: "pytorch",
  TensorFlow: "tensorflow",
  "Scikit-Learn": "scikitlearn",
  NumPy: "numpy",
  Qdrant: "qdrant",
  Flask: "flask",
  "Node.js": "nodedotjs",
};

function hexToHsl(h) {
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const mx = Math.max(r, g, b);
  const mn = Math.min(r, g, b);
  let hh = 0;
  let s = 0;
  const l = (mx + mn) / 2;
  if (mx !== mn) {
    const d = mx - mn;
    s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
    hh = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
    hh /= 6;
  }
  return [hh, s, l];
}

function hslToHex(h, s, l) {
  const f = (n) => {
    const k = (n + h * 12) % 12;
    const a = s * Math.min(l, 1 - l);
    return Math.round(255 * (l - a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)))));
  };
  return "#" + [f(0), f(8), f(4)].map((v) => v.toString(16).padStart(2, "0")).join("");
}

// Lift dark / achromatic brand colours so they read on a near-black ground.
function readable(hex) {
  const [h, s, l] = hexToHsl(hex);
  // Near-neutral marks (Next.js, Vercel, Bun, Express, Expo) have no hue worth
  // preserving — a slight tint lifted to full saturation invents a colour the
  // brand does not have. Send them to the site's foreground instead.
  if (s < 0.2) return "#e6eaf2";
  // Only genuinely dark hues need lifting; mid-tones already read on near-black.
  if (l < 0.42) return hslToHex(h, Math.max(s, 0.55), 0.63);
  return "#" + hex.toLowerCase();
}

const seen = new Map();
for (const [name, slug] of Object.entries(MAP)) {
  const key = "si" + slug.charAt(0).toUpperCase() + slug.slice(1);
  const icon = si[key];
  if (!icon) {
    console.error("MISSING", slug);
    process.exit(1);
  }
  if (!seen.has(slug)) {
    seen.set(slug, { title: icon.title, path: icon.path, hex: readable(icon.hex), raw: icon.hex });
  }
}

const header = [
  "// Brand marks vendored from simple-icons. The package is NOT a dependency —",
  "// only these paths are copied in, so the icon set costs nothing at runtime.",
  "//",
  "// `hex` is the brand colour adjusted for legibility on a near-black ground:",
  "// achromatic marks (Next.js, Vercel, Bun, Express) become near-white, and dark",
  "// hues keep their hue but gain lightness. Regenerate with scripts/gen-logos.cjs.",
  "",
  "export interface BrandMark {",
  "  title: string;",
  "  /** Single 24x24 path, using simple-icons' fill geometry. */",
  "  path: string;",
  "  hex: string;",
  "}",
  "",
  "export const brandMarks: Record<string, BrandMark> = {",
].join("\n");

let out = header + "\n";
for (const [slug, v] of seen) {
  out +=
    "  " +
    JSON.stringify(slug) +
    ": { title: " +
    JSON.stringify(v.title) +
    ", path: " +
    JSON.stringify(v.path) +
    ", hex: " +
    JSON.stringify(v.hex) +
    " },\n";
}
out += "};\n\n/** Tech name exactly as written in content/ -> brand mark slug. */\n";
out += "export const techToBrand: Record<string, string> = {\n";
for (const [name, slug] of Object.entries(MAP)) {
  out += "  " + JSON.stringify(name) + ": " + JSON.stringify(slug) + ",\n";
}
out += "};\n";

fs.writeFileSync("content/logos.ts", out);
console.log("wrote content/logos.ts:", seen.size, "marks for", Object.keys(MAP).length, "names");
for (const [s, v] of seen) console.log("  " + s.padEnd(15), v.raw, "->", v.hex);
