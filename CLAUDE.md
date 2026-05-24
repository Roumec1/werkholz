# WERKHOLZ — Custom Woodwork Table Studio Website

## Project Overview

**WERKHOLZ** is a multilingual website for a custom woodwork business focused on solid wood tables. The site serves as a living catalog and inquiry engine for Berlin/Germany customers.

**Status**: Foundation phase (static structure + localization framework)

## Brand & Positioning

- **Brand**: WERKHOLZ (temporary placeholder, editable via config)
- **Core message**: "Custom woodwork from our workshop"
- **Do NOT say**: "European workshop", "Czech company", "Czech-made"
- **Market**: Berlin + Germany
- **Legal entity**: Czech company / workshop operations (disclosed in Impressum only)

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Sanity (to be integrated Phase 2)
- **Deployment**: Vercel
- **Contact form**: Tally or Formspree (Phase 3)

## Languages & Localization

- **Locales**: German (de), English (en), Czech (cs)
- **Default**: German
- **Routing**: `/de`, `/en`, `/cs`
- **Cookies**: `preferred_locale` only (essential, no consent banner at launch)
- **Dictionary files**: `/locales/*.json` (one per language)

## Project Structure

```
werkholz/
├── app/
│   ├── [locale]/                 # Localized routes
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Homepage
│   │   ├── aktuelle-stuecke/     # Current pieces (localized path)
│   │   ├── tische-nach-mass/     # Custom tables page
│   │   ├── fuer-firmen/          # B2B page
│   │   ├── ablauf/               # Process page
│   │   ├── kontakt/              # Contact / inquiry form
│   │   ├── impressum/            # Legal
│   │   └── datenschutz/          # Privacy
│   ├── layout.tsx                # Root layout
│   └── globals.css
├── components/
│   ├── Header.tsx                # Sticky header with nav + language switcher
│   ├── Footer.tsx                # Footer with legal links
│   ├── Hero.tsx                  # Hero section
│   ├── TableCard.tsx             # (Phase 2) Table item card
│   ├── StatusBadge.tsx           # (Phase 2) Status labels
│   └── InquiryCTA.tsx            # (Phase 3) Inquiry button logic
├── lib/
│   ├── i18n.ts                   # Translation helper
│   ├── sanity.ts                 # (Phase 2) Sanity client config
│   ├── constants.ts              # Brand config, routes
│   └── seo.ts                    # (Phase 2) SEO metadata helpers
├── locales/
│   ├── de.json                   # German strings
│   ├── en.json                   # English strings
│   └── cs.json                   # Czech strings
├── sanity/                        # (Phase 2) Sanity schema & config
│   ├── sanity.config.ts
│   └── schemas/
│       ├── tableItem.ts
│       └── siteSettings.ts
├── public/                        # Images, favicon
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Pages at Launch

| Page | German Route | English Route | Czech Route | Status |
|------|---|---|---|---|
| Homepage | `/de` | `/en` | `/cs` | Ready |
| Current pieces | `/de/aktuelle-stuecke` | `/en/current-pieces` | `/cs/aktualni-kusy` | Phase 2 |
| Piece detail | `/de/aktuelle-stuecke/[slug]` | `/en/current-pieces/[slug]` | `/cs/aktualni-kusy/[slug]` | Phase 2 |
| Custom tables info | `/de/tische-nach-mass` | `/en/custom-tables` | `/cs/stoly-na-miru` | Phase 2 |
| For businesses | `/de/fuer-firmen` | `/en/for-businesses` | `/cs/pro-firmy` | Phase 2 |
| Process | `/de/ablauf` | `/en/process` | `/cs/postup` | Phase 2 |
| Inquiry form | `/de/kontakt` | `/en/contact` | `/cs/kontakt` | Phase 3 |
| Imprint | `/de/impressum` | `/en/imprint` | `/cs/vytisk` | TODO |
| Privacy | `/de/datenschutz` | `/en/privacy` | `/cs/ochrana-dat` | TODO |

## Current Phase: Foundation

✅ **Completed**:
- Project structure
- Localization framework (i18n)
- Header with language switcher
- Hero section with localized copy
- Footer with legal links
- Tailwind configuration (warm off-white, stone, dark accents)
- Git initialization

🔄 **Next (Phase 2)**:
- Sanity CMS integration
- TableItem schema
- Current pieces gallery page
- Table detail pages
- Image optimization

🔄 **Phase 3**:
- Contact/inquiry form (Tally or Formspree)
- Item prefill logic
- WhatsApp CTA

🔄 **Phase 4**:
- Impressum & Datenschutz pages
- Real product images
- Domain setup
- SEO metadata (hreflang, sitemap)
- Deployment to Vercel

## Brand Config

Keep brand name + tagline centralized:

```ts
// lib/constants.ts
export const BRAND = {
  name: "WERKHOLZ",
  taglines: {
    de: "Holzarbeiten nach Maß aus unserer Werkstatt.",
    en: "Custom woodwork from our workshop.",
    cs: "Zakázková výroba ze dřeva z naší dílny.",
  },
};
```

Change in one place, updates everywhere.

## Product Categories (Phase 2)

Do NOT add at launch:
- Shelves, boards, cutting boards
- Wall panels, general decor
- "All wood products"

Launch categories only:
- Couchtische / Coffee tables
- Esstische / Dining tables
- Bistro-/Küchentische / Bistro/kitchen tables
- Schreibtische / Desks
- Konferenztische / Conference tables
- Café-/Büro-/Restauranttische / Cafe/office/restaurant tables
- Tische nach Maß / Custom tables

## Design Direction

- **Feeling**: Warm, minimal, premium, grounded, modern workshop
- **NOT**: Rustic farmhouse, luxury gold, epoxy-hobby style
- **Colors**: Off-white/stone bg, dark stone text, oak beige accent, black CTAs
- **Typography**: Clean sans-serif (Inter, Geist, Manrope)
- **Images**: Large, spacious sections, real workshop + finished table photos
- **Layout**: Mobile-first, rounded corners (not childish), minimal animations

## Sanity Schema (Phase 2)

```ts
TableItem {
  title: { de, en, cs }
  slug: { de, en, cs }
  description: { de, en, cs }
  status: "available" | "in_production" | "reserved" | "sold"
  productType: string
  price: number (EUR)
  dimensions: { lengthCm, widthCm, diameterCm, heightCm, thicknessCm }
  woodType: string
  edgeType: "straight_edge" | "live_edge" | "soft_rounded" | "custom"
  resinDetail: "none" | "black" | "smoke" | "clear" | "custom"
  legBaseType: string
  finish: string
  images: image[]
  estimatedCompletionDate: date
  deliveryNote: { de, en, cs }
  featured: boolean
  soldDate: date
  sortOrder: number
  createdAt, updatedAt
}
```

## Deployment

- **Host**: Vercel
- **Auto-deploy**: On push to main
- **Environment**: Node.js 20+
- **Build**: `npm run build`

## Key Rules

1. **No ecommerce at launch** — inquiry only
2. **No generic shop copy** — real workshop feel
3. **Language switcher always visible** — header
4. **Sold items still convert** — "Request similar table"
5. **Mobile-first** — test on all screens
6. **Real images ASAP** — placeholders OK during dev
7. **SEO-ready** — hreflang, sitemap, canonical URLs

## Contact

Questions? Check the full brief: `werkholz_website_megabrief.md`
