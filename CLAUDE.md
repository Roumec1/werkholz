# WERKHOLZ — Custom Woodwork Table Studio Website

## Project Overview

**WERKHOLZ** is a multilingual website for a custom woodwork business focused on solid wood tables. The site serves as a living catalog and inquiry engine for Berlin/Germany customers.

**Status**: Phase 1 complete + extensive polish. Deployed on Vercel, ready for Phase 2 (Sanity CMS) and Phase 3 (real inquiry backend).

## Live & Repo

- **Production**: https://werkholz-aqp1v91yb-roumec1s-projects.vercel.app
- **Repo**: https://github.com/Roumec1/werkholz
- **Build**: 71 statically generated pages + dynamic OG endpoints

## Brand & Positioning

- **Brand**: WERKHOLZ (placeholder, editable via locale dictionaries)
- **Core message**: "Custom woodwork from our workshop"
- **Do NOT say**: "European workshop", "Czech company", "Czech-made" — legal pages only
- **Market**: Berlin + Germany
- **Languages**: German (default), English, Czech

## Tech Stack

- Next.js 15 (App Router)
- TypeScript strict
- Tailwind CSS 3.4 with custom design tokens
- Inter (sans) + Fraunces (display serif) via `next/font/google`
- Sanity (Phase 2)
- Vercel auto-deploy

## Project Structure

```
werkholz/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx              # Per-locale layout, metadata, JSON-LD
│   │   ├── page.tsx                # Homepage (12 sections)
│   │   └── [section]/
│   │       ├── page.tsx            # Section router (resolves localized URLs)
│   │       └── [slug]/
│   │           ├── page.tsx        # Table detail with product schema
│   │           └── opengraph-image.tsx  # Per-table OG image
│   ├── layout.tsx                  # Root html + fonts
│   ├── page.tsx                    # Root redirect (cookie → header → DE)
│   ├── not-found.tsx               # Branded 404
│   ├── opengraph-image.tsx         # Default site OG
│   ├── icon.tsx                    # 32x32 favicon
│   ├── apple-icon.tsx              # 180x180 apple touch icon
│   ├── sitemap.ts                  # All URLs
│   ├── robots.ts
│   └── globals.css                 # Tailwind layers + animations + a11y
├── components/
│   ├── Header.tsx                  # Sticky, mobile menu, lang switcher
│   ├── Footer.tsx                  # Dark footer + Newsletter
│   ├── LanguageSwitcher.tsx        # Header dropdown + footer inline
│   ├── Hero.tsx                    # Hero with SVG table illustration
│   ├── ScrollProgress.tsx          # Top scroll-progress bar
│   ├── FloatingContact.tsx         # Fixed corner chat bubble
│   ├── CookieNotice.tsx            # Essential-cookie banner
│   ├── Newsletter.tsx              # Subscribe form
│   ├── Reveal.tsx                  # IntersectionObserver fade-up wrapper
│   ├── CountUp.tsx                 # Animated number counter
│   ├── TableCard.tsx               # Reusable card with illustration
│   ├── TableIllustration.tsx       # Bespoke SVG of each table type
│   ├── TableGallery.tsx            # Carousel + lightbox + thumbnails
│   ├── SizeVisualizer.tsx          # SVG scale comparison vs. 175cm person
│   ├── StatusBadge.tsx             # Status pill with pulse-dot
│   ├── InquiryForm.tsx             # Full inquiry form with prefill
│   ├── CurrentPiecesGrid.tsx       # Filter/sort interactive grid
│   ├── JsonLd.tsx                  # Structured data injection
│   ├── SectionDivider.tsx          # Wood-grain dividers
│   ├── pages/                      # Page-level components
│   │   ├── PageHeader.tsx
│   │   ├── CurrentPiecesPage.tsx
│   │   ├── TableDetailPage.tsx
│   │   ├── CustomTablesPage.tsx
│   │   ├── ForBusinessesPage.tsx
│   │   ├── ProcessPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── MaterialsPage.tsx       # Dedicated Materials page
│   │   ├── ImpressumPage.tsx
│   │   └── PrivacyPage.tsx
│   └── sections/
│       ├── FeaturedPieces.tsx
│       ├── Categories.tsx          # 5 cards (one big)
│       ├── Materials.tsx           # 4 wood swatches
│       ├── Workshop.tsx            # 6-tile process mural
│       ├── Process.tsx             # 4 numbered steps
│       ├── CurrentPreview.tsx      # Status counts (dark)
│       ├── Inspiration.tsx         # Asymmetric mosaic
│       ├── Reviews.tsx             # 3 testimonials
│       ├── Care.tsx                # Daily/monthly/if-needed
│       ├── B2BSection.tsx
│       ├── Stats.tsx               # Animated count-up stats
│       ├── FAQ.tsx                 # Accordion
│       └── FinalCTA.tsx
├── lib/
│   ├── routes.ts                   # ROUTES table + localePath()
│   ├── i18n.ts                     # getDictionary
│   ├── tables.ts                   # 12 sample TableItems
│   └── seo.ts                      # Schema.org generators
├── locales/                        # de/en/cs.json — full copy
├── postcss.config.mjs              # Tailwind + autoprefixer
├── tailwind.config.ts              # Custom palette, fonts, animations
├── next.config.ts
└── tsconfig.json
```

## Pages (all 3 locales)

| Page | DE | EN | CS |
|------|---|---|---|
| Home | `/de` | `/en` | `/cs` |
| Current pieces | `/de/aktuelle-stuecke` | `/en/current-pieces` | `/cs/aktualni-kusy` |
| Table detail | `/de/aktuelle-stuecke/[slug]` | `…/current-pieces/[slug]` | `…/aktualni-kusy/[slug]` |
| Custom tables | `/de/tische-nach-mass` | `/en/custom-tables` | `/cs/stoly-na-miru` |
| Materials | `/de/hoelzer` | `/en/materials` | `/cs/drevo` |
| For businesses | `/de/fuer-firmen` | `/en/for-businesses` | `/cs/pro-firmy` |
| Process | `/de/ablauf` | `/en/process` | `/cs/postup` |
| Contact | `/de/kontakt` | `/en/contact` | `/cs/kontakt` |
| Imprint | `/de/impressum` | `/en/imprint` | `/cs/vytisk` |
| Privacy | `/de/datenschutz` | `/en/privacy` | `/cs/ochrana-dat` |

## Homepage Sections (in order)

1. Hero — animated headline + real SVG table illustration + floating chips
2. Stats — animated count-up (200+, 12 years, 2-4 weeks, 100% solid wood)
3. Featured pieces — 3 cards with status badges
4. Categories — 5 cards (one large) wood-grain backgrounds
5. Materials — 4 wood swatches with character
6. Workshop — 6-tile process mural (planning → check)
7. Process — 4 numbered steps + production-time chip
8. Current preview — dark section, status counts
9. Inspiration — asymmetric mosaic of sold pieces
10. Reviews — 3 testimonials
11. Care — daily/monthly/if-needed care instructions
12. B2B — split card with use cases
13. FAQ — accordion with 6 questions
14. Final CTA — dark panel with inquiry + WhatsApp

## Table Detail Page Features

- 4-image gallery with prev/next, keyboard nav (←/→/Esc)
- Lightbox fullscreen view
- Size Visualizer — scale comparison to person silhouette
- Status badge (animated pulse for available)
- Status-aware CTA (Inquire / Reserve / Pre-order / Request similar)
- Care kit free-bonus card
- Reservation widget — delivery estimate + WhatsApp quick-ask
- Full spec list (dimensions, wood, edge, base, finish, resin)
- Similar pieces grid
- Inquiry prefill via `?item=<slug>&status=<status>`

## Design System

**Colors**
- `bone` (#F7F4EE) — primary warm off-white background
- `cream` (#FBF8F2) — slightly lighter card surface
- `ink` (#1A1814) — primary near-black text / CTA
- `oak.{50..900}` — wood-warmth accent palette
- `stone.{50..900}` — neutral scale
- `status.available/production/reserved/sold` — subtle, not neon

**Typography**
- `font-sans` → Inter (body)
- `font-display` → Fraunces (headings, optical variant)
- Fluid type scale: `text-display-xl/lg/md` using clamp()

**Animations**
- `Reveal` component fades up sections on scroll
- `CountUp` animates numeric stats into view
- `pulse-dot` for available-now status
- View-transitions API for route changes
- Respects `prefers-reduced-motion`

## Interactivity

- Locale-aware Language Switcher (header dropdown + footer inline)
- Mobile full-screen menu overlay
- Sticky header with translucent-on-scroll
- Filter + sort on Current Pieces (client-side)
- FAQ accordion
- Image gallery with carousel + lightbox + keyboard nav
- Cookie consent banner (dismissable, persists)
- Newsletter signup with form/success states
- Floating contact bubble with WhatsApp shortcut
- Scroll progress bar

## Sample Table Data

12 tables in `lib/tables.ts` covering all statuses:
- **Available** (4): Oak dining 220, Walnut coffee live-edge, Walnut desk 180, Beech round 100, Walnut live-edge 260
- **In production** (2): Oak bistro round, Ash desk, Oak coffee 100
- **Reserved** (1): Beech kitchen 160
- **Sold** (3): Oak conference 300, Ash bistro round 70, Oak restaurant set of 8

Each has localized title/description/wood/base/finish + bespoke SVG illustration.

## SEO

- `sitemap.xml` with all 71 URLs
- `robots.ts` pointing to sitemap
- hreflang alternates per locale on every page
- OG metadata + dynamic OG image generation (default + per-table)
- Schema.org JSON-LD: `Organization`, `WebSite`, `Product`, `BreadcrumbList`
- Canonical URLs per locale
- Localized URL slugs (DE/EN/CS)

## Accessibility

- Skip-to-content link (visible on focus)
- `:focus-visible` outlines only for keyboard users
- `prefers-reduced-motion` disables animations
- Semantic landmarks (`role=banner/contentinfo/main`)
- ARIA labels on nav, buttons
- `aria-modal` lightbox
- Keyboard shortcuts (Esc closes lightbox, ←/→ navigates gallery)

## Inquiry Flow

`components/InquiryForm.tsx` — all 13 fields from brief:
- Reads `?item=<slug>&status=<status>` from table detail CTAs
- Shows referenced piece card at top of form
- Phase 1: simulated submit. Phase 3: wire to Tally / Formspree / Resend API route

## Phase 2 — Sanity CMS

Replace `lib/tables.ts` with Sanity queries — `TableItem` schema in CLAUDE.md prior section. Component interfaces unchanged.

## Phase 3 — Inquiry Backend

Wire form to Tally / Formspree / `app/api/inquiry/route.ts` with Resend for email. WhatsApp number to update in Footer, FinalCTA, FloatingContact, and InquiryForm.

## Phase 4 — Launch Readiness

- [ ] Real Impressum + Datenschutz text
- [ ] Real product photos (replace SVG illustrations)
- [ ] Custom domain (werkholz.de)
- [ ] Set `NEXT_PUBLIC_SITE_URL` env var on Vercel
- [ ] Submit sitemap.xml to Google Search Console
- [ ] Set real WhatsApp number

## Development

```bash
npm run dev    # http://localhost:3000
npm run build  # Static build (71 pages)
npm run start  # Production preview
```

## Brief

Full product/design spec: `werkholz_website_megabrief.md`
