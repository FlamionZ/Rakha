import type { Metadata } from "next";
import { JsonLd } from "@/components/layout/JsonLd";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Experience } from "@/components/sections/Experience";
import { StackTable } from "@/components/sections/StackTable";
import { Testimonials } from "@/components/sections/Testimonials";
import { pageMeta } from "@/content/meta";
import { ui } from "@/content/ui";
import { isLocale } from "@/lib/locale";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export async function generateMetadata(
  props: PageProps<"/[lang]/about">,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!isLocale(lang)) return {};

  return pageMetadata({
    locale: lang,
    path: "/about",
    title: pageMeta.about.title[lang],
    description: pageMeta.about.description[lang],
  });
}

export default async function AboutPage(props: PageProps<"/[lang]/about">) {
  const { lang } = await props.params;
  if (!isLocale(lang)) return null;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(lang, [
          { name: ui.nav.home[lang], path: "/" },
          { name: pageMeta.about.title[lang], path: "/about" },
        ])}
      />
      <AboutIntro />
      <Experience />
      <StackTable />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
