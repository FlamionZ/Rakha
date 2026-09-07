import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/project/ProjectDetail";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { getProject, getProjectNeighbours, projects } from "@/content/projects";

/** Prerenders all eleven detail pages at build time. */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/work/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.tagline.en,
    openGraph: {
      title: project.name,
      description: project.tagline.en,
      images: project.image ? [{ url: project.image }] : undefined,
    },
  };
}

export default async function ProjectPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const { prev, next } = getProjectNeighbours(slug);

  return (
    <>
      <ProjectDetail project={project} prev={prev} next={next} />
      <ContactCTA />
    </>
  );
}
