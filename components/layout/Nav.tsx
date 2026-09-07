"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { ui } from "@/content/ui";
import { site } from "@/content/site";
import { useLocale } from "@/lib/i18n";
import { LocaleToggle } from "./LocaleToggle";
import { Magnetic } from "@/components/motion/Magnetic";

const LINKS = [
  { href: "/work", label: ui.nav.work },
  { href: "/about", label: ui.nav.about },
  { href: "/#contact", label: ui.nav.contact },
] as const;

export function Nav() {
  const pathname = usePathname();
  const { t } = useLocale();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (value) => setScrolled(value > 24));

  // Any navigation closes the mobile panel. Adjusting state during render on a
  // changed input is React's recommended alternative to a reset effect — it
  // avoids the extra render pass an effect would cost.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  // Lock the page behind the open panel.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  function isActive(href: string) {
    if (href.startsWith("/#")) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <>
      {/* Lives in Nav rather than the layout so it can be localised. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[130] focus:rounded-sm focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:font-semibold focus:text-bg"
      >
        {t(ui.a11y.skipToContent)}
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-border bg-bg/80 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <Link
            href="/"
            className="group flex items-center gap-2 font-mono text-sm font-medium tracking-tight"
          >
            <span className="text-accent transition-transform duration-300 group-hover:translate-x-0.5">
              &#10095;
            </span>
            <span className="text-fg">{site.shortName.toLowerCase()}</span>
            <span className="caret hidden sm:inline-block" aria-hidden="true" />
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <ul className="hidden items-center gap-1 md:flex">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative rounded-sm px-3 py-1.5 font-mono text-xs tracking-wide transition-colors duration-200 ${
                      isActive(link.href) ? "text-accent" : "text-muted hover:text-fg"
                    }`}
                  >
                    {t(link.label)}
                    {isActive(link.href) && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-3 -bottom-0.5 h-px bg-accent"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            <LocaleToggle />

            <Magnetic strength={0.25} className="hidden sm:block">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 rounded-sm bg-accent px-4 py-1.5 font-mono text-xs font-semibold text-bg transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(198,255,61,0.45)]"
              >
                {t(ui.hero.getInTouch)}
              </a>
            </Magnetic>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-label={t(menuOpen ? ui.nav.close : ui.nav.menu)}
              className="flex h-9 w-9 items-center justify-center rounded-sm border border-border text-fg md:hidden"
            >
              <span className="relative block h-3 w-4">
                <motion.span
                  className="absolute left-0 block h-px w-full bg-current"
                  animate={menuOpen ? { top: 6, rotate: 45 } : { top: 2, rotate: 0 }}
                  transition={{ duration: 0.25 }}
                />
                <motion.span
                  className="absolute left-0 block h-px w-full bg-current"
                  animate={menuOpen ? { top: 6, rotate: -45 } : { top: 10, rotate: 0 }}
                  transition={{ duration: 0.25 }}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center gap-2 bg-bg/95 px-8 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            {LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * i + 0.06, duration: 0.4 }}
              >
                <Link
                  href={link.href}
                  className="display-md block py-2 text-fg transition-colors hover:text-accent"
                >
                  <span className="mr-3 font-mono text-sm text-accent">
                    0{i + 1}
                  </span>
                  {t(link.label)}
                </Link>
              </motion.div>
            ))}

            <motion.a
              href={`mailto:${site.email}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.4 }}
              className="mt-8 font-mono text-sm text-muted underline decoration-accent underline-offset-4"
            >
              {site.email}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
