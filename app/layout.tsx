import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { BootSequence } from "@/components/layout/BootSequence";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Footer } from "@/components/layout/Footer";
import { GridBackground } from "@/components/layout/GridBackground";
import { Nav } from "@/components/layout/Nav";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { site, summary } from "@/content/site";
import { LocaleProvider } from "@/lib/i18n";

// Variable names are --ff-* on purpose; see the note in globals.css.
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--ff-display",
  weight: ["500", "600", "700"],
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--ff-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--ff-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role.en}`,
    template: `%s — ${site.shortName}`,
  },
  description: summary.en,
  keywords: [
    "Fullstack Developer",
    "AI Engineer",
    "Next.js",
    "RAG",
    "pgvector",
    "Vision Language Model",
    "Indonesia",
    site.name,
  ],
  authors: [{ name: site.name, url: site.github }],
  creator: site.name,
  openGraph: {
    type: "website",
    title: `${site.name} — ${site.role.en}`,
    description: summary.en,
    siteName: site.name,
    locale: "id_ID",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role.en}`,
    description: summary.en,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#05060a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="dark">
      <body
        className={`${display.variable} ${sans.variable} ${mono.variable} grain antialiased`}
      >
        <span id="top" aria-hidden="true" />
        <LocaleProvider>
          <SmoothScroll>
            <GridBackground />
            <CustomCursor />
            <BootSequence />
            <Nav />
            <main id="main">{children}</main>
            <Footer />
          </SmoothScroll>
        </LocaleProvider>
      </body>
    </html>
  );
}
