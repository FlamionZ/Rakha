import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/layout/JsonLd";
import { ProjectDetail } from "@/components/project/ProjectDetail";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { getProject, getProjectNeighbours, projects } from "@/content/projects";
import { pageMeta } from "@/content/meta";
import { ui } from "@/content/ui";
import { isLocale } from "@/lib/locale";
import { breadcrumbSchema, pageMetadata, projectSchema } from "@/lib/seo";

/** Prerenders every detail page, in both languages. */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/[lang]/work/[slug]">,
): Promise<Metadata> {
  const { lang, slug } = await props.params;
  const project = getProject(slug);
  if (!isLocale(lang) || !project) return {};

  return pageMetadata({
    locale: lang,
    path: `/work/${project.slug}`,
    title: project.name,
    description: project.tagline[lang],
    image: project.image,
  });
}

export default async function ProjectPage(
  props: PageProps<"/[lang]/work/[slug]">,
) {
  const { lang, slug } = await props.params;
  const project = getProject(slug);
  if (!isLocale(lang) || !project) notFound();

  const { prev, next } = getProjectNeighbours(slug);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(lang, [
          { name: ui.nav.home[lang], path: "/" },
          { name: pageMeta.work.title[lang], path: "/work" },
          { name: project.name, path: `/work/${project.slug}` },
        ])}
      />
      <JsonLd data={projectSchema(lang, project)} />
      <ProjectDetail project={project} prev={prev} next={next} />
      <ContactCTA />
    </>
  );
}
