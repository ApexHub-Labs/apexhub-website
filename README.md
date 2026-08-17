# ApexHub Labs — Website

Premium one-page marketing site for **ApexHub Labs**.
_Build. Transform. Innovate._

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and
**Motion** (framer-motion). The site uses a **dark, editorial** visual
language with scroll-driven motion.

## Design language

- **Dark editorial theme** — black canvas, white type, gray accents (still only
  the three brand colors `#000000 / #FFFFFF / #676767`).
- **Oversized typography** — display hero, giant section headings, numbered
  editorial index rows, ghost/outline background wordmarks.
- **Motion & scroll effects** (in `components/`):
  - `ScrollProgress` — fixed top progress bar tied to page scroll.
  - `SplitText` — word-by-word mask reveal for headings.
  - `Reveal` — fade/slide-in on scroll (Motion `whileInView`).
  - `Parallax` — scroll-linked vertical drift for ghost wordmarks.
  - `Marquee` — infinite services ticker (pauses on hover).
  - `Magnetic` — cursor-attracted buttons.
  - Featured Work uses a **cursor-following preview** over an editorial index.
  - Approach uses a **scroll-scrubbed progress line** across the 5 stages.
  - All motion respects `prefers-reduced-motion` via `MotionConfig`.

### Logos

Uses the real brand logos from `public/`:
`logo-dark.png` (white lockup, on the dark UI) and `logo-light.png` (black
lockup, for JSON-LD / light contexts) — copied from the originals
`apexhub bgDark.png` / `apexhub bgLight.png`.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Brand design system (enforced)

| Token        | Value                                              |
| ------------ | -------------------------------------------------- |
| Black        | `#000000`                                          |
| White        | `#FFFFFF`                                          |
| Gray         | `#676767`                                          |
| Headlines    | **Myanmar Khyay**, 126px, 6% letter-spacing        |
| Body / lead  | **Montserrat Regular**, 48px, 33% letter-spacing   |

Only these three colors are used — no gradients, no additional hues.
Type sizes use `clamp()` to scale responsively while preserving the 126/48
hierarchy and relative letter-spacing. Tokens live in [app/globals.css](app/globals.css).

### Fonts

- **Montserrat** loads automatically via `next/font` (self-hosted, no layout shift).
- **Myanmar Khyay** is not on any public CDN. To activate it, drop the font file at
  `public/fonts/MyanmarKhyay.woff2` (and/or `.ttf`). Until then, a geometric
  fallback stack preserves the intended bold, minimal hierarchy. The `@font-face`
  is already wired in [app/globals.css](app/globals.css).

## Logo

Uses the **official ApexHub Labs logos** in `public/`: `logo-dark.png` in the
nav/footer (white lockup on the dark UI) and `logo-light.png` for JSON-LD. These
are space-free copies of the supplied `apexhub bgDark.png` / `apexhub bgLight.png`.
`mark.svg` (triple-peak favicon) and `og.svg` (dark social card) round out the set.

## Featured Work screenshots

The editorial project index uses a **cursor-following monogram preview** (no
invented stats/testimonials, per brief). To use real screenshots, drop images
in `public/work/` and set the `image` field for each project in
[components/FeaturedWork.tsx](components/FeaturedWork.tsx) — they'll replace the
monogram in the hover preview.

## Contact form

- Client validation + accessible error states in [components/Contact.tsx](components/Contact.tsx).
- Server validation in [app/api/contact/route.ts](app/api/contact/route.ts).
  By default it logs submissions so the site works out of the box. Wire an email
  provider (Resend / SendGrid / Postmark / SMTP) where marked to receive enquiries.

## Structure

```
app/
  layout.tsx        # metadata, SEO, JSON-LD, fonts, skip link
  page.tsx          # section composition
  globals.css       # design tokens + primitives
  sections.css      # section styles
  robots.ts, sitemap.ts
  api/contact/route.ts
components/
  Nav, Hero, WhatWeBuild, FeaturedWork, Approach, About, Contact, Footer
  Reveal.tsx        # scroll-in animation (respects reduced-motion)
public/
  logo.svg, mark.svg, og.svg
```

## Accessibility & SEO

- Semantic landmarks, skip link, keyboard-navigable menu, visible focus rings.
- `prefers-reduced-motion` respected throughout.
- Open Graph + Twitter cards, canonical URL, `robots.txt`, `sitemap.xml`,
  Organization JSON-LD.

> Update the production domain (currently `https://apexhublabs.com`) and social
> URLs in [app/layout.tsx](app/layout.tsx), [app/robots.ts](app/robots.ts), and
> [app/sitemap.ts](app/sitemap.ts) before launch.
