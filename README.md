# VRSN® — Independent Creative Studio

An editorial, typography-led single-page site for **VRSN®**, an independent creative
studio working in brand identity, digital experience and motion.

> Every brand has a better version. We find it, then build it end to end.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | React 19 (SPA, client-rendered) |
| Build | Vite 8 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) + a custom editorial class layer |
| Animation | Motion (`framer-motion` 13) |
| Icons | `lucide-react` |
| Hosting | Cloudflare Pages (`dist/` static output) |

No backend, no database. The site is fully static.

---

## Design system

The visual language lives in `src/index.css`. Two ideas carry it:

1. **Typography is the visual.** Type classes (`.t-hero`, `.t-display`, `.t-mega`,
   `.t-row`, `.t-statement`, `.t-body`, `.t-meta`) are the primary design tool.
   Whitespace is the layout.
2. **Chapters.** The page alternates between a warm-paper ground and an ink ground.
   Adding `className="chapter-ink"` to a section flips the entire token set
   (`--bg`, `--fg`, `--muted`, `--line`, `--accent`, `--frame`) for everything inside it.

```
Hero · Manifesto      paper   quiet, type-driven
Statement             ink     the loud claim
Work · Services ·
About                 paper   the printed portfolio
Process               ink     sticky, photographic
Collaboration         paper   editorial list
Contact · Footer      ink     the close
```

Palette: near-black `#0e0e0d`, warm-white `#f4f1eb`, neutral greys, one rust accent `#c8441d`.

Type: **Geist** (display + body), **Geist Mono** (metadata), **Instrument Serif**
(italic emphasis only).

---

## Structure

```
src/
├── App.tsx                 page composition + chapter rhythm
├── index.css               design system: tokens, chapter flip, type scale
├── data/content.ts         all copy, projects, services, process, audiences
├── lib/motion.ts           shared motion language (easings, variants)
├── hooks/useMedia.ts       pointer / viewport / reduced-motion capability hooks
├── components/
│   ├── Navbar.tsx          transparent → blurred on scroll; reads chapter beneath
│   ├── MobileMenu.tsx      full-screen editorial overlay, focus-trapped
│   ├── CustomCursor.tsx    desktop-only; switches to VIEW → / LET'S TALK →
│   ├── Preloader.tsx       ink curtain; skipped under reduced motion
│   ├── Marquee.tsx         infinite typographic band, scroll-velocity reactive
│   ├── RevealText.tsx      masked line + word reveals
│   ├── ImageReveal.tsx     clip-path curtain + parallax
│   ├── EditorialLink.tsx   underline + arrow CTA (never a pill)
│   ├── MagneticButton.tsx  subtle magnetic pull for primary CTAs
│   ├── ProjectCard.tsx     per-project editorial composition
│   ├── ProjectFilter.tsx   typographic filters w/ sliding indicator
│   └── ArchiveOverlay.tsx  full project index
└── sections/               Hero, Manifesto, Statement, Work, Services,
                            About, Process, Collaboration, Contact, Footer
```

### Where to edit content

All copy is in **`src/data/content.ts`** — studio details, hero headline, manifesto,
projects, services, process stages, audiences, navigation and socials.
Change text there, not in the components.

### Adding a project

Append to `projects` in `src/data/content.ts` and pick a `composition`
(`feature` · `offset-right` · `full` · `split` · `half-right` · `tall-left` · `wide-right`)
so no two consecutive projects share a rhythm. Drop the image in `public/images/`.

---

## Local development

```bash
npm install
npm run dev          # Vite dev server
```

Build and preview the production output the way Cloudflare serves it:

```bash
npm run build
npx wrangler pages dev dist --ip 0.0.0.0 --port 3000
```

Or via PM2 (config in `ecosystem.config.cjs`):

```bash
pm2 start ecosystem.config.cjs
```

## Deploy

```bash
npm run build
npx wrangler pages deploy dist --project-name <project-name>
```

---

## Accessibility & performance notes

- Semantic landmarks, one `<h1>`, labelled `<section>`s, real focus states.
- `prefers-reduced-motion` is honoured: the preloader is skipped, the custom cursor
  is disabled, and all scroll-driven transforms resolve to identity.
- Hover-only enhancements (cursor label, summary reveal, cursor-tracked service
  preview) are gated on `(pointer: fine)` + a desktop width, so touch devices never
  pay for effects they cannot express.
- Animations are restricted to `transform` and `opacity`; images are lazy-loaded
  and `decoding="async"` below the fold.

---

## Content policy

Statistics, client rosters and testimonials that could not be verified were
**removed rather than invented**. The studio section states only facts that are
supportable (practice, team shape, disciplines, location). If you want figures or a
client list on the site, supply the real ones in `src/data/content.ts`.

---

## Status

- Redesign implemented; production build passes; all assets serve.
- **Not yet deployed.** Local preview verified via the dev/preview server.
- Photography in `public/images/` is placeholder art direction — swap for real
  project work before launch.
