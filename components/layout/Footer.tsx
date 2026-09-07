"use client";

import Link from "next/link";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import { useLocale } from "@/lib/i18n";

const SOCIALS = [
  { label: "GitHub", href: site.github },
  { label: "LinkedIn", href: site.linkedin },
  { label: "Email", href: `mailto:${site.email}` },
];

export function Footer() {
  const { t } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="label mb-3">{site.location.en}</p>
            <p className="font-display text-2xl font-bold tracking-tight text-fg">
              {site.name}
            </p>
            <p className="mt-1 font-mono text-xs text-muted">{t(site.role)}</p>
          </div>

          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-1.5 py-2 font-mono text-xs text-muted transition-colors hover:text-accent"
                >
                  {social.label}
                  <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    &#8599;
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] text-muted">
            &copy; {year} {site.name}
          </p>
          <p className="font-mono text-[11px] text-muted">
            {t(ui.footer.builtWith)} Next.js &middot; TypeScript &middot; Tailwind &middot; Motion
          </p>
          <Link
            href="#top"
            className="-my-3 inline-block py-3 font-mono text-[11px] text-muted transition-colors hover:text-accent"
          >
            {t(ui.footer.backToTop)} &#8593;
          </Link>
        </div>
      </div>
    </footer>
  );
}
