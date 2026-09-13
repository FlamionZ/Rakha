import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/layout/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { hasNotes, notesByDate } from "@/content/notes";
import { pageMeta } from "@/content/meta";
import { ui } from "@/content/ui";
import { isLocale } from "@/lib/locale";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export async function generateMetadata(
  props: PageProps<"/[lang]/notes">,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!isLocale(lang)) return {};

  return {
    ...pageMetadata({
      locale: lang,
      path: "/notes",
      title: pageMeta.notes.title[lang],
      description: pageMeta.notes.description[lang],
    }),
    // An index with nothing in it should not be in the index.
    robots: hasNotes ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default async function NotesPage(props: PageProps<"/[lang]/notes">) {
  const { lang } = await props.params;
  if (!isLocale(lang)) return null;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(lang, [
          { name: ui.nav.home[lang], path: "/" },
          { name: pageMeta.notes.title[lang], path: "/notes" },
        ])}
      />

      <div className="px-5 pb-16 pt-32 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-2xl">
            <Reveal>
              <p className="label mb-4 flex items-center gap-2">
                <span className="inline-block h-px w-8 bg-accent" aria-hidden="true" />
                {pageMeta.notes.title[lang]}
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="display-lg text-fg">{ui.notes.title[lang]}</h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-4 text-base leading-relaxed text-muted">
                {ui.notes.body[lang]}
              </p>
            </Reveal>
          </div>

          {notesByDate.length === 0 ? (
            <Reveal>
              <p className="border-t border-border py-16 font-mono text-sm text-muted">
                {ui.notes.empty[lang]}
              </p>
            </Reveal>
          ) : (
            <ul className="border-t border-border">
              {notesByDate.map((note, i) => (
                <Reveal key={note.slug} delay={i * 0.05}>
                  <li className="border-b border-border">
                    <Link
                      href={`/${lang}/notes/${note.slug}`}
                      className="group grid grid-cols-1 gap-x-10 gap-y-3 py-8 md:grid-cols-12"
                    >
                      <time
                        dateTime={note.date}
                        className="label tabular-nums md:col-span-3 md:pt-1"
                      >
                        {note.date}
                      </time>

                      <div className="md:col-span-9">
                        <h2 className="font-display text-xl font-bold leading-tight tracking-tight text-fg transition-colors duration-300 group-hover:text-accent sm:text-2xl">
                          {note.title[lang]}
                        </h2>
                        <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted">
                          {note.summary[lang]}
                        </p>
                        {note.tags.length > 0 && (
                          <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-faint">
                            {note.tags.map((tag) => (
                              <span key={tag}>#{tag}</span>
                            ))}
                          </p>
                        )}
                      </div>
                    </Link>
                  </li>
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </div>

      <ContactCTA />
    </>
  );
}
