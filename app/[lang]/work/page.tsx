import type { Metadata } from "next";
import { JsonLd } from "@/components/layout/JsonLd";
import { ProjectIndex } from "@/components/project/ProjectIndex";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { pageMeta } from "@/content/meta";
import { ui } from "@/content/ui";
import { isLocale } from "@/lib/locale";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export async function generateMetadata(
  props: PageProps<"/[lang]/work">,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!isLocale(lang)) return {};

  return pageMetadata({
    locale: lang,
    path: "/work",
    title: pageMeta.work.title[lang],
    description: pageMeta.work.description[lang],
  });
}

export default async function WorkPage(props: PageProps<"/[lang]/work">) {
  const { lang } = await props.params;
  if (!isLocale(lang)) return null;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(lang, [
          { name: ui.nav.home[lang], path: "/" },
          { name: pageMeta.work.title[lang], path: "/work" },
        ])}
      />
      <div className="px-5 pb-16 pt-32 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label={ui.sections.allWorkLabel}
            title={ui.sections.allWorkTitle}
            body={ui.sections.allWorkBody}
            as="h1"
          />
          <ProjectIndex />
        </div>
      </div>
      <ContactCTA />
    </>
  );
}
