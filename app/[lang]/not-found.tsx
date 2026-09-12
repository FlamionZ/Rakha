"use client";

import Link from "next/link";
import { ScrambleText } from "@/components/motion/ScrambleText";
import { ui } from "@/content/ui";
import { useLocale } from "@/lib/i18n";

export default function NotFound() {
  const { t, path } = useLocale();

  return (
    <section className="flex min-h-[80svh] flex-col items-center justify-center px-5 py-32 text-center sm:px-8">
      <p className="label mb-6">error</p>

      <h1 className="display-xl text-accent">
        <ScrambleText text="404" speed={0.5} tick={60} />
      </h1>

      <p className="mt-6 font-display text-2xl font-bold tracking-tight text-fg">
        {t(ui.notFound.title)}
      </p>

      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
        {t(ui.notFound.body)}
      </p>

      <Link
        href={path("/")}
        className="group mt-10 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-mono text-sm font-semibold text-bg transition-shadow duration-300 hover:shadow-[0_0_32px_rgba(198,255,61,0.45)]"
      >
        <span className="transition-transform duration-300 group-hover:-translate-x-1">
          &#8592;
        </span>
        {t(ui.notFound.home)}
      </Link>
    </section>
  );
}
