# WERKHOLZ — Custom Woodwork Table Studio Website

## Project Overview

**WERKHOLZ** is a multilingual website for a custom woodwork business focused on solid wood tables. The site serves as a living catalog and inquiry engine for Berlin/Germany customers.

**Status**: Phase 1 complete (full static prototype + design system + all pages). Ready for Phase 2 (Sanity CMS) and Phase 3 (real inquiry backend).

## Brand & Positioning

- **Brand**: WERKHOLZ (temporary placeholder, editable via locale dictionaries)
- **Core message**: "Custom woodwork from our workshop"
- **Do NOT say**: "European workshop", "Czech company", "Czech-made"
- **Market**: Berlin + Germany
- **Legal entity**: Czech company / workshop operations (disclosed in Impressum only)

## Tech Stack

- **Framework**: Next.js 15 (App Router, RSC)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS with custom design tokens
- **Fonts**: Inter (sans) + Fraunces (display serif) via `next/font/google`
- **CMS**: Sanity (Phase 2)
- **Inquiry form**: Tally / Formspree / Resend (Phase 3)
- **Deployment**: Vercel (auto-deploy on push to `main`)

## Live Site

- **Production**: https://werkholz-aqp1v91yb-roumec1s-projects.vercel.app
- **Repo**: https://github.com/Roumec1/werkholz

## Languages & Localization

- **Locales**: German (`de`, default), English (`en`), Czech (`cs`)
- **Routing**: All paths prefixed `/de`, `/en`, `/cs`; URL segments are localized too
- **Root redirect**: `/` reads `preferred_locale` cookie → `Accept-Language` header → DE fallback
- **Cookie**: `preferred_locale` only (essential, set by language switcher)
- **Dictionaries**: `locales/{de,en,cs}.json`
- **Helper**: `lib/routes.ts` exposes `localePath(locale, route, slug?)` for type-safe links

## Project Structure

```
werkholz/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx                  # Header + Footer + per-locale metadata/hreflang
│   │   ├── page.tsx                    # Homepage (8 sections)
│   │   ├── [section]/
│   │   │   ├── page.tsx                # Resolves localized section URLs
│   │   │   └── [slug]/page.tsx         # Table detail pages
│   ├── layout.tsx                      # Root <html>, font setup, base metadata
│   ├── page.tsx                        # Root redirect based on locale detection
│   ├── globals.css                     # Tailwind layers + component classes
│   ├── sitemap.ts                      # All 48 URLs (locales × pages × tables)
│   └── robots.ts
├── components/
│   ├── Header.tsx                      # Sticky header, mobile menu, lang switcher
│   ├── Footer.tsx                      # Dark footer with columns, lang switcher
│   ├── Hero.tsx                        # Hero with animated wood-grain backdrop
│   ├── LanguageSwitcher.tsx            # Header dropdown + footer inline variant
│   ├── TableCard.tsx                   # Reusable card for table grids
│   ├── StatusBadge.tsx                 # Available/in_production/reserved/sold badge
│   ├── InquiryForm.tsx                 # Full inquiry form, item prefill from URL
│   ├── pages/                          # Page-level components (rendered by section router)
│   │   ├── PageHeader.tsx
│   │   ├── CurrentPiecesPage.tsx
│   │   ├── TableDetailPage.tsx
│   │   ├── CustomTablesPage.tsx
│   │   ├── ForBusinessesPage.tsx
│   │   ├── ProcessPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── ImpressumPage.tsx
│   │   └── PrivacyPage.tsx
│   └── sections/                       # Reusable homepage/sub-page sections
│       ├── FeaturedPieces.tsx
│       ├── Categories.tsx
│       ├── Process.tsx
│       ├── CurrentPreview.tsx
│       ├── B2BSection.tsx
│       ├── FAQ.tsx
│       └── FinalCTA.tsx
├── lib/
│   ├── routes.ts                       # ROUTES table + localePath() helper
│   ├── i18n.ts                         # getDictionary + normalizeLocale
│   └── tables.ts                       # Sample TableItem data + filters
├── locales/                            # Full DE/EN/CS dictionaries
│   ├── de.json
│   ├── en.json
│   └── cs.json
├── public/                             # Future: real product images
├── next.config.ts
├── tailwind.config.ts                  # Custom palette + display fonts + animations
├── tsconfig.json
└── package.json
```

## Pages (all 3 locales)

| Page | DE | EN | CS |
|------|---|---|---|
| Home | `/de` | `/en` | `/cs` |
| Current pieces | `/de/aktuelle-stuecke` | `/en/current-pieces` | `/cs/aktualni-kusy` |
| Table detail | `/de/aktuelle-stuecke/[slug]` | `/en/current-pieces/[slug]` | `/cs/aktualni-kusy/[slug]` |
| Custom tables | `/de/tische-nach-mass` | `/en/custom-tables` | `/cs/stoly-na-miru` |
| For businesses | `/de/fuer-firmen` | `/en/for-businesses` | `/cs/pro-firmy` |
| Process | `/de/ablauf` | `/en/process` | `/cs/postup` |
| Contact | `/de/kontakt` | `/en/contact` | `/cs/kontakt` |
| Imprint | `/de/impressum` | `/en/imprint` | `/cs/vytisk` |
| Privacy | `/de/datenschutz` | `/en/privacy` | `/cs/ochrana-dat` |

Total: **48 statically generated pages** + sitemap + robots.

## Design System

**Colors** (Tailwind tokens — `tailwind.config.ts`)
- `bone` (#F7F4EE) — primary warm off-white background
- `cream` (#FBF8F2) — slightly lighter card surface
- `ink` (#1A1814) — primary near-black text / CTA
- `graphite` (#2B2722) — hover state for ink
- `oak.{50..900}` — wood-warmth accent palette
- `stone.{50..900}` — neutral scale
- `status.available` (warm green), `production` (oak), `reserved` (deeper oak), `sold` (stone gray)

**Typography**
- `font-sans` → Inter (body)
- `font-display` → Fraunces (light, soft, optical) — used for headings
- Custom fluid type scale: `text-display-xl/lg/md`

**Components classes** (`globals.css`)
- `.container-w` — page container with responsive padding
- `.btn-primary`, `.btn-secondary`, `.btn-ghost`
- `.eyebrow` — uppercase tracking-widest label
- `.section-title`, `.section-subtitle`
- `.badge`, `.badge-available/production/reserved/sold`
- `.pulse-dot` — animated pulse for "available now" status
- `.grain` — subtle SVG paper-grain texture overlay

**Animations**
- `animate-fade-up` — staggered entry for hero text/cards
- `animate-fade-in` — overlay transitions
- `animate-slide-down` — dropdown menus
- Smooth scroll, balance text wrap

## Sample Table Data

`lib/tables.ts` holds 6 sample tables covering all statuses:
- `available` (2): Oak dining 220, Walnut coffee live-edge
- `in_production` (2): Oak bistro round, Ash desk
- `reserved` (1): Beech kitchen table
- `sold` (1): Oak conference 300

Each has localized title/description/wood/base/finish + a wood-tone gradient placeholder (real photos replace later).

## Inquiry Flow

`components/InquiryForm.tsx`:
- All fields from brief (name, email, phone, city, type, dimensions, edge, resin, reference, budget, timing, message)
- Reads `?item=<slug>&status=<status>` query params from table detail CTAs → shows referenced piece card
- Phase 1: simulated submit (logs success). Phase 3: wire to Tally/Formspree/Resend.

## What's Working

✅ All 48 pages render statically  
✅ Multilingual routing with localized URL segments  
✅ Header sticky/translucent on scroll, full mobile menu overlay  
✅ Language switcher in header (dropdown) + footer (inline)  
✅ Locale persistence via `preferred_locale` cookie  
✅ Root path detects locale from cookie/header  
✅ Status badges with pulse animation for available pieces  
✅ Status-aware CTAs on table detail pages  
✅ Inquiry form prefilled from item link  
✅ Sitemap + robots.txt  
✅ hreflang alternates + OpenGraph metadata  
✅ Mobile-first responsive across breakpoints  
✅ Build: 48 static pages generated  
✅ Deployed to Vercel  

## Phase 2 — Sanity CMS

Replace `lib/tables.ts` with Sanity-driven data:

```ts
// sanity/schemas/tableItem.ts
TableItem {
  title: { de, en, cs }
  slug: { de, en, cs }
  description: { de, en, cs }
  status: "available" | "in_production" | "reserved" | "sold"
  productType: string
  price: number (EUR)
  dimensions: { lengthCm, widthCm, diameterCm, heightCm, thicknessCm }
  woodType: string (localized)
  edgeType: "straight_edge" | "live_edge" | "soft_rounded" | "custom"
  resinDetail: "none" | "black" | "smoke" | "clear" | "custom"
  legBaseType: string (localized)
  finish: string (localized)
  images: image[]                  // ← real photos
  estimatedCompletionDate: date
  deliveryNote: { de, en, cs }
  featured: boolean
  soldDate: date
  sortOrder: number
}
```

Then swap `getTableBySlug` / `tablesByStatus` / `featuredTables` for Sanity GROQ queries. Component interfaces stay the same.

## Phase 3 — Inquiry Backend

Choose one:
- **Tally embed**: drop iframe into `InquiryForm.tsx`
- **Formspree**: POST form data to formspree endpoint
- **Resend**: Next.js Route Handler `app/api/inquiry/route.ts` that emails workshop + sends auto-reply

Add WhatsApp number to `components/Footer.tsx` and `FinalCTA.tsx` (currently `+49 170 0000000` placeholder).

## Phase 4 — Launch Readiness

- [ ] Replace placeholder Impressum + Datenschutz with real legal text
- [ ] Add real product photos (replace gradient placeholders)
- [ ] Custom domain (werkholz.de or similar)
- [ ] Set `NEXT_PUBLIC_SITE_URL` env var on Vercel
- [ ] Verify hreflang in Google Search Console
- [ ] Submit sitemap.xml

## Key Rules (from brief — do not break)

1. **No ecommerce at launch** — inquiry only
2. **Don't say "European workshop" or "Czech company"** in marketing copy
3. **Language switcher always visible** — header
4. **Sold items still convert** — "Request similar table"
5. **Mobile-first** — test on all screens
6. **Real images ASAP** — gradients are placeholders
7. **Tables only** — no shelves/boards/decor categories yet

## Development

```bash
npm run dev    # http://localhost:3000
npm run build  # static build
npm run start  # production preview
```

## Full Brief

See `werkholz_website_megabrief.md` in the project root (or `~/Downloads`) for the complete product/design spec.
