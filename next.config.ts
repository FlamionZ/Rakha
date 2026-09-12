import type { NextConfig } from "next";

/**
 * Every route now lives under `app/[lang]`, so the pre-i18n URLs would 404.
 * These keep the old addresses working — anything already indexed, linked from
 * a CV, or pasted into a message still resolves — and send the bare domain to
 * Indonesian, which is what `x-default` in the metadata also points at.
 *
 * 308s on purpose: permanent, and they preserve the request method.
 */
const nextConfig: NextConfig = {
  reactCompiler: true,

  async redirects() {
    return [
      { source: "/", destination: "/id", permanent: true },
      { source: "/about", destination: "/id/about", permanent: true },
      { source: "/work", destination: "/id/work", permanent: true },
      { source: "/work/:slug", destination: "/id/work/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
