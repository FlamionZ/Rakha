"use client";

import type { NoteBlock } from "@/content/notes";
import { useLocale } from "@/lib/i18n";

/**
 * Renders a note's block list.
 *
 * Prose width is capped well below the page's max — long technical paragraphs
 * are unreadable at 1200px, and the measure matters more here than filling the
 * grid.
 */
export function NoteBody({ body }: { body: NoteBlock[] }) {
  const { t } = useLocale();

  return (
    <div className="max-w-[68ch]">
      {body.map((block, i) => {
        switch (block.kind) {
          case "h":
            return (
              <h2
                key={i}
                className="mt-12 font-display text-2xl font-bold leading-tight tracking-tight text-fg first:mt-0"
              >
                {t(block.text)}
              </h2>
            );

          case "p":
            return (
              <p key={i} className="mt-5 text-base leading-relaxed text-muted">
                {t(block.text)}
              </p>
            );

          case "quote":
            return (
              <blockquote
                key={i}
                className="mt-7 border-l-2 border-accent pl-5 text-lg leading-relaxed text-fg"
              >
                {t(block.text)}
              </blockquote>
            );

          case "list":
            return (
              <ul key={i} className="mt-5 space-y-2.5">
                {block.items.map((item) => (
                  <li
                    key={item.en}
                    className="relative pl-5 text-base leading-relaxed text-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-[0.7em] h-px w-2.5 bg-border-bright"
                    />
                    {t(item)}
                  </li>
                ))}
              </ul>
            );

          case "code":
            return (
              // Code is the one thing allowed to be wider than the measure, so
              // it gets its own scroll container rather than forcing the page
              // to scroll sideways.
              <div
                key={i}
                className="mt-7 overflow-x-auto rounded-sm border border-border bg-surface"
              >
                <pre className="p-4 font-mono text-[13px] leading-relaxed text-fg">
                  <code>{block.code}</code>
                </pre>
              </div>
            );
        }
      })}
    </div>
  );
}
