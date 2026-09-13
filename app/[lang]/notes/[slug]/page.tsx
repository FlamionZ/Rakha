import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/layout/JsonLd";
import { NoteBody } from "@/components/notes/NoteBody";
import { Reveal } from "@/components/motion/Reveal";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { getNote, notes } from "@/content/notes";
import { getProject } from "@/content/projects";
import { pageMeta } from "@/content/meta";
import { ui } from "@/content/ui";
import { isLocale } from "@/lib/locale";
import { articleSchema, breadcrumbSchema, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata(
  props: PageProps<"/[lang]/notes/[slug]">,
): Promise<Metadata> {
  const { lang, slug } = await props.params;
  const note = getNote(slug);
  if (!isLocale(lang) || !note) return {};

  return pageMetadata({
    locale: lang,
    path: `/notes/${note.slug}`,
    title: note.title[lang],
    description: note.summary[lang],
  });
}

export default async function NotePage(
  props: PageProps<"/[lang]/notes/[slug]">,
) {
  const { lang, slug } = await props.params;
  const note = getNote(slug);
  if (!isLocale(lang) || !note) notFound();

  // A note can cite the project it came out of, which is the difference
  // between an opinion and a report from a system that exists.
  const source = note.projectSlug ? getProject(note.projectSlug) : undefined;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(lang, [
          { name: ui.nav.home[lang], path: "/" },
          { name: pageMeta.notes.title[lang], path: "/notes" },
          { name: note.title[lang], path: `/notes/${note.slug}` },
        ])}
      />
      <JsonLd data={articleSchema(lang, note)} />

      <article className="px-5 pb-16 pt-32 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Link
              href={`/${lang}/notes`}
              className="group mb-12 inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors duration-300 hover:text-accent"
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-1">
                &#8592;
              </span>
              {pageMeta.notes.title[lang]}
            </Link>
          </Reveal>

          <header className="mb-14 max-w-[68ch]">
            <Reveal>
              <p className="label mb-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                <time dateTime={note.date} className="tabular-nums">
                  {note.date}
                </time>
                {note.tags.map((tag) => (
                  <span key={tag} className="text-faint">
                    #{tag}
                  </span>
                ))}
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="display-lg text-fg">{note.title[lang]}</h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 text-lg leading-relaxed text-muted">
                {note.summary[lang]}
              </p>
            </Reveal>

            {source && (
              <Reveal delay={0.18}>
                <p className="mt-7 border-l-2 border-accent pl-4 font-mono text-xs text-muted">
                  {ui.notes.fromProject[lang]}{" "}
                  <Link
                    href={`/${lang}/work/${source.slug}`}
                    className="text-fg transition-colors duration-300 hover:text-accent"
                  >
                    {source.name} &#8594;
                  </Link>
                </p>
              </Reveal>
            )}
          </header>

          <Reveal delay={0.1}>
            <NoteBody body={note.body} />
          </Reveal>
        </div>
      </article>

      <ContactCTA />
    </>
  );
}
