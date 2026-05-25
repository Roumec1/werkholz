# scripts

Workflow helpers. Run from the repo root.

## `add-table.js` — one-command product onboarding

```bash
# 1. Drop a new folder under photos/, e.g.:
#    photos/table-2/
#      definition.txt
#      01-lifestyle.png
#      02-perspective.png
#      03-detail.png
#      ...

# 2. Run:
node scripts/add-table.js photos/table-2

# (or preview without writing anything:)
node scripts/add-table.js photos/table-2 --dry
```

The script will:

1. **Read** `definition.txt` (loose text + optional `key: value` overrides)
2. **Optimize** every image (.png / .jpg / .webp) to `public/photos/<folder>/01.jpg`, `02.jpg`, … (sharp + mozjpeg, q82, max 1800w). Files are taken in **natural sort order** — rename source files with `01-`, `02-` prefixes to control the gallery order (first file becomes the hero).
3. **Generate** a TableItem entry with localized DE / EN / CS title + description, dimensions, wood, base, edge, resin, finish, status, price.
4. **Insert** the entry into `lib/tables.ts` (the next sequential `id`).

Then run `npm run build` to verify and commit `public/photos/<folder>/` + `lib/tables.ts`.

---

### `definition.txt` format

Mix free-form text and explicit `key: value` lines as needed. **Explicit values always win** over heuristics — useful when you want to override a description or supply localized titles.

#### Minimal (heuristic — what was used for table-1)

```
Round oak kitchen table with metal legs
2 black epoxy stripes
diameter 88cm
height 75cm
thickness 4cm
```

This is parsed as: `kitchen_table`, `oak`, round, Ø88, h75, t4, resin: black, base: x-frame (from "metal legs"), edge: soft_rounded.

#### Maximal (explicit — total control)

```
title: Round Oak Kitchen Table Ø88
title.de: Küchentisch Eiche rund Ø88
title.cs: Kuchyňský stůl dub kulatý Ø88
description.en: Round solid-wood kitchen table in European oak…
description.de: Runder Massivholz-Küchentisch aus europäischer Eiche…
description.cs: Kulatý masivní kuchyňský stůl z evropského dubu…
status: available
featured: true
price: 1390
productType: kitchen_table
wood: oak
shape: round
diameter: 88
height: 75
thickness: 4
edge: soft_rounded
resin: black
base: x-frame
finish: hard wax oil satin
```

#### Available enum values

| key            | values |
|----------------|--------|
| `status`       | `available` · `in_production` · `reserved` · `sold` |
| `productType`  | `coffee_table` · `dining_table` · `bistro_table` · `kitchen_table` · `desk` · `conference_table` · `restaurant_table` · `custom_table` |
| `wood`         | `oak` · `walnut` · `ash` · `beech` |
| `shape`        | `round` · `rect` |
| `edge`         | `straight_edge` · `live_edge` · `soft_rounded` |
| `resin`        | `none` · `black` · `smoke` · `clear` |
| `base`         | `x-frame` · `cross` · `a-frame` · `column` · `tapered-wood` · `slim-steel` |
| `finish`       | `hard wax oil satin` · `hard wax oil matte` · `natural oil matte` · `natural oil satin` |
| `featured`     | `true` · `false` |

#### What gets auto-detected from free text

| heuristic clue (any language) | inferred field |
|---|---|
| "diameter / ⌀ / ø / durchmesser / průměr 88" | `dimensions.diameterCm = 88`, shape = round |
| "round / kulat / rund" | shape = round |
| "oak / dub / eiche", same for walnut/ash/beech | `wood` |
| "kitchen / küche / kuchyň", "desk", "bistro", "coffee", "dining", "conference" | `productType` |
| "metal legs / steel / stahl / ocelové" | `base = x-frame` (override with explicit `base:` if needed) |
| "live edge / baumkante / přírodní hrana" | `edge = live_edge` |
| "black epoxy / black resin / schwarzes harz / černá pryskyřice" | `resin = black` |

---

### After the script runs

The script prints the generated entry and writes:
- `public/photos/<folder>/01.jpg` … `NN.jpg`
- `lib/tables.ts` with the new TableItem appended

Always **open `lib/tables.ts` and review** the auto-generated `title` / `description` — the heuristic copy is a starting point, not final. Especially polish the German and Czech wording.

Then:

```bash
npm run build
git add public/photos/<folder>/ lib/tables.ts
git commit -m "Add product: <short name>"
git push
```

Vercel will auto-deploy on push.
