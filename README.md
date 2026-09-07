# Portfolio — Muhammad Rakha Abimanyu

Bilingual (ID/EN) portfolio site for a fullstack developer and AI engineer.
Eleven shipped products, presented as a browsable archive with per-project case
study pages.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
Motion · Lenis. Fully static, no backend.

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (prerenders all 17 pages)
npm start          # serve the production build
npx eslint .       # lint
```

## Deploying to Vercel

The site is entirely static and needs no configuration or environment
variables.

```bash
npm i -g vercel
vercel              # preview deployment
vercel --prod       # production
```

Or push to GitHub and import the repository at
[vercel.com/new](https://vercel.com/new) — Vercel detects Next.js and uses the
correct build settings automatically.

After attaching a custom domain, update `site.url` in
[`content/site.ts`](content/site.ts) so Open Graph and canonical URLs resolve
correctly.

---

## How it is organised

```
app/                    Routes. Server components; metadata and static params.
  page.tsx              Home
  work/page.tsx         Filterable archive of all 11 projects
  work/[slug]/page.tsx  Case study, prerendered per project
  about/page.tsx        Bio and capability pillars
content/                All copy and data. No text is hardcoded in components.
  types.ts              Project / LocalizedText shapes
  projects.ts           The 11 projects, bilingual
  site.ts               Profile, contact, capability pillars, derived stats
  ui.ts                 Interface strings
lib/                    i18n provider, motion tokens, browser hooks
components/
  motion/               Generic primitives (Reveal, ScrambleText, TiltCard…)
  layout/               App shell (Nav, Footer, cursor, boot overlay…)
  sections/             Page sections
  project/              Project card, grid, detail, badges
public/projects/        Screenshots (WebP)
```

### Editing content

Everything a visitor reads lives in `content/`. Components take data, never
literals.

**Adding a project** — append an entry to the array in `content/projects.ts`.
The route, the archive card, the filter counts and the prev/next pager all pick
it up automatically; no component changes are needed.

**Adding a screenshot** — drop a file in `public/projects/` and set `image` on
the project. A project with no `image` renders a generated panel built from its
accent colour and stack instead, which is why Notula still looks deliberate.

**Both languages are required.** `LocalizedText` is `{ id: string; en: string }`,
so TypeScript will not let a translation be forgotten.

---

## Notes on a few decisions

**Locale lives in `localStorage`, not the URL.** Simpler routing and half as
many pages, at the cost of shareable per-language URLs. If bilingual SEO ever
matters, this becomes `app/[locale]/…` with `hreflang` tags — that is the one
change here with real reach.

**`useSyncExternalStore` for locale, boot state and media queries.** These are
external mutable stores. Modelling them that way gives a server snapshot that
always matches the first client render, so there is no hydration mismatch and
no state-setting inside effects.

**Dead demos are chips, not links.** SoraUMKM's server is retired and the
mckyevent site came down after the event. Both render as a non-clickable status
chip. Linking to a page that will not load looks worse than saying so.

**Motion degrades, it does not disappear.** Every animation is gated on
`prefers-reduced-motion`; the cursor and card tilt additionally require
`(pointer: fine)`. The boot overlay is skipped entirely for reduced-motion
visitors and shows once per session for everyone else.

**Images are WebP.** The source screenshots totalled 4.6 MB; re-encoding cut
that to 832 KB with no visible loss. `next/image` serves them down further.
