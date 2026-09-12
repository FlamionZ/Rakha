import type { Metadata } from "next";
import { SectionRail } from "@/components/layout/SectionRail";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Hero } from "@/components/sections/Hero";
import { PinnedWork } from "@/components/sections/PinnedWork";
import { Services } from "@/components/sections/Services";
import { StackMarquee } from "@/components/sections/StackMarquee";
import { StatsBar } from "@/components/sections/StatsBar";
import { pageMeta } from "@/content/meta";
import { site } from "@/content/site";
import { isLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(
  props: PageProps<"/[lang]">,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!isLocale(lang)) return {};

  return pageMetadata({
    locale: lang,
    path: "/",
    title: `${site.name} — ${site.role[lang]}`,
    description: pageMeta.home.description[lang],
  });
}

export default function HomePage() {
  return (
    <>
      {/* Rail lives here rather than in the layout: its sections are
          specific to this page. */}
      <SectionRail />
      <Hero />
      <StatsBar />
      <StackMarquee />
      <PinnedWork />
      <Services />
      <ContactCTA />
    </>
  );
}
