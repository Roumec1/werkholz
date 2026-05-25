#!/usr/bin/env node
/**
 * add-table.js — one-shot product onboarding for WERKHOLZ.
 *
 * Usage:
 *   node scripts/add-table.js photos/table-2 [--dry]
 *
 * What it does:
 *   1. Reads definition.txt from the source folder
 *   2. Optimizes every image (.png/.jpg/.jpeg) to public/photos/<slug>/NN-name.jpg
 *      (sharp + mozjpeg, q82, max 1800w, sorted alphabetically — rename source
 *      files with `01-`, `02-` prefixes to control ordering)
 *   3. Parses the definition for dimensions / wood / shape / features
 *   4. Generates a TableItem with localized DE/EN/CS title + description
 *   5. Inserts the entry before `];` in lib/tables.ts (skipped with --dry)
 *
 * definition.txt formats supported (mix as needed):
 *   - free text lines (parsed heuristically — e.g. "diameter 88cm", "oak", "kitchen")
 *   - key: value lines for explicit overrides, e.g.:
 *       title: Round Oak Kitchen Table Ø88
 *       title.de: Küchentisch Eiche rund Ø88
 *       title.cs: Kuchyňský stůl dub kulatý Ø88
 *       description.en: Round solid-wood kitchen table ...
 *       description.de: ...
 *       description.cs: ...
 *       price: 1390
 *       status: available | in_production | reserved | sold
 *       featured: true
 *       productType: kitchen_table
 *       wood: oak | walnut | ash | beech
 *       shape: round | rect
 *       diameter: 88
 *       length: 220
 *       width: 95
 *       height: 75
 *       thickness: 4
 *       edge: straight_edge | live_edge | soft_rounded
 *       resin: none | black | smoke | clear
 *       base: x-frame | cross | a-frame | column | tapered-wood | slim-steel
 *       finish: hard wax oil satin | natural oil matte | ...
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// HEIC support (iPhone photos). Loaded lazily so the script still runs if the
// package isn't installed and no HEIC files are present.
let heicConvert = null;
function loadHeicConvert() {
  if (heicConvert) return heicConvert;
  try {
    heicConvert = require("heic-convert");
    return heicConvert;
  } catch {
    console.error("HEIC file detected but `heic-convert` is not installed.");
    console.error("Install with:  npm install heic-convert");
    process.exit(1);
  }
}

// ---------- args ----------
const args = process.argv.slice(2);
const dry = args.includes("--dry");
const srcDir = args.find((a) => !a.startsWith("--"));
if (!srcDir) {
  console.error("Usage: node scripts/add-table.js photos/<folder> [--dry]");
  process.exit(1);
}
if (!fs.existsSync(srcDir)) {
  console.error("Folder not found: " + srcDir);
  process.exit(1);
}

const ROOT = path.resolve(__dirname, "..");
const TABLES_FILE = path.join(ROOT, "lib", "tables.ts");

// ---------- parse definition.txt ----------
const defPath = path.join(srcDir, "definition.txt");
if (!fs.existsSync(defPath)) {
  console.error("Missing definition.txt in " + srcDir);
  process.exit(1);
}
const defText = fs.readFileSync(defPath, "utf8");
const defLines = defText.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

/** Explicit "key: value" lines win over heuristics. */
const explicit = {};
for (const line of defLines) {
  const m = line.match(/^([a-zA-Z][a-zA-Z0-9_.]*)\s*:\s*(.+)$/);
  if (m) explicit[m[1].toLowerCase()] = m[2].trim();
}
const looseText = defLines.filter((l) => !/^[a-zA-Z][a-zA-Z0-9_.]*\s*:/.test(l)).join(" ");

// ---------- helpers ----------
function pickNum(re) {
  const m = (explicit[re.key] && /(\d+(\.\d+)?)/.exec(explicit[re.key])) ||
            re.fallback.exec(looseText);
  return m ? parseFloat(m[1]) : undefined;
}
function lowerLoose() { return looseText.toLowerCase(); }
function has(...keys) {
  const t = lowerLoose();
  return keys.some((k) => t.includes(k));
}

// dimensions
const diameter = pickNum({ key: "diameter", fallback: /(?:diameter|⌀|ø|durchmesser|průměr)[^\d]*(\d+(\.\d+)?)/i });
const length = pickNum({ key: "length", fallback: /(?:length|länge|délka)[^\d]*(\d+(\.\d+)?)/i });
const width = pickNum({ key: "width", fallback: /(?:width|breite|šířka)[^\d]*(\d+(\.\d+)?)/i });
const height = pickNum({ key: "height", fallback: /(?:height|höhe|výška)[^\d]*(\d+(\.\d+)?)/i }) || 75;
const thickness = pickNum({ key: "thickness", fallback: /(?:thickness|stärke|tlou[sš][tť]ka)[^\d]*(\d+(\.\d+)?)/i }) || 4;

const isRound = explicit.shape === "round" || diameter !== undefined || has("round", "kulat", "rund", "circle");

// wood
const woodKey =
  explicit.wood?.toLowerCase() ||
  (has("walnut", "ořech", "nussbaum") ? "walnut" :
   has("ash", "jasan", "esche") ? "ash" :
   has("beech", "buk") ? "beech" :
   has("oak", "dub", "eiche") ? "oak" :
   "oak");
const WOOD = {
  oak:    { de: "Europäische Eiche",         en: "European oak",         cs: "Evropský dub" },
  walnut: { de: "Amerikanischer Nussbaum",   en: "American walnut",      cs: "Americký ořech" },
  ash:    { de: "Esche",                     en: "Ash",                  cs: "Jasan" },
  beech:  { de: "Europäische Buche",         en: "European beech",       cs: "Evropský buk" },
};
// Properly declined forms for "made of" phrases:
//   DE: aus <dative>     CS: z/ze <genitive>
const WOOD_OF = {
  oak:    { de: "aus europäischer Eiche",        en: "in European oak",     cs: "z evropského dubu" },
  walnut: { de: "aus amerikanischem Nussbaum",   en: "in American walnut",  cs: "z amerického ořechu" },
  ash:    { de: "aus Esche",                     en: "in ash",              cs: "z jasanu" },
  beech:  { de: "aus europäischer Buche",        en: "in European beech",   cs: "z evropského buku" },
};
const wood = WOOD[woodKey] || WOOD.oak;
const woodOf = WOOD_OF[woodKey] || WOOD_OF.oak;

// product type
const ptKey =
  explicit.producttype?.toLowerCase() ||
  (has("conference", "konferenz", "konferenční") ? "conference_table" :
   has("restaurant", "bistro café") ? "restaurant_table" :
   has("bistro") ? "bistro_table" :
   has("desk", "schreibtisch", "psací") ? "desk" :
   has("kitchen", "küche", "kuchyň") ? "kitchen_table" :
   has("coffee", "couch", "konferenční stolek") ? "coffee_table" :
   has("dining", "esstisch", "jídelní") ? "dining_table" :
   "custom_table");

// edge
const edgeKey =
  explicit.edge ||
  (has("live edge", "baumkante", "přírodní hrana") ? "live_edge" :
   isRound || has("soft", "round", "kulat") ? "soft_rounded" :
   "straight_edge");

// resin
const resinKey =
  explicit.resin ||
  (has("black epoxy", "epoxy", "black resin", "schwarzes harz", "černá pryskyřice") ? "black" :
   has("smoke resin") ? "smoke" :
   has("clear resin") ? "clear" :
   "none");

// base
const baseKey = (explicit.base || "").toLowerCase();
const BASE = {
  "x-frame":      { de: "Schwarzes X-Stahlgestell",     en: "Black X-frame steel base",  cs: "Černá X-podnož z oceli" },
  "cross":        { de: "Schwarzes Stahlkreuz",         en: "Black steel cross",          cs: "Černý ocelový kříž" },
  "a-frame":      { de: "Schwarzes A-Stahlgestell",     en: "Black A-frame steel base",   cs: "Černá A-podnož" },
  "column":       { de: "Schwarze Stahlsäule",          en: "Black steel column",         cs: "Černá ocelová noha" },
  "tapered-wood": { de: "Holzbeine, konisch",           en: "Tapered wooden legs",        cs: "Dřevěné nohy, konické" },
  "slim-steel":   { de: "Schlanke schwarze Stahlbeine", en: "Slim black steel legs",      cs: "Štíhlé černé ocelové nohy" },
  "hairpin":      { de: "Schwarze Hairpin-Beine",       en: "Black hairpin legs",         cs: "Černé hairpin nohy" },
};
const base = BASE[baseKey] || (
  has("hairpin", "hair pin", "hair-pin") ? BASE["hairpin"] :
  has("x-frame", "x frame", "x form", "x tvar") ? BASE["x-frame"] :
  has("cross", "kreuz", "kříž") ? BASE["cross"] :
  has("a-frame", "a-form", "a-podnož") ? BASE["a-frame"] :
  has("column", "säule", "ocelová noha") ? BASE["column"] :
  has("tapered", "konisch", "konické", "wooden legs") ? BASE["tapered-wood"] :
  has("slim", "schlanke", "štíhlé") ? BASE["slim-steel"] :
  has("metal legs", "metal", "steel", "stahl", "ocelové") ? BASE["x-frame"] :
  BASE["x-frame"]
);

// finish
const finishKey = (explicit.finish || "hard wax oil satin").toLowerCase();
const FINISH = {
  "hard wax oil satin": { de: "Hartwachsöl, seidenmatt", en: "Hard wax oil, satin", cs: "Tvrdý voskový olej, polomat" },
  "hard wax oil matte": { de: "Hartwachsöl, matt",       en: "Hard wax oil, matte", cs: "Tvrdý voskový olej, mat" },
  "natural oil matte":  { de: "Naturöl, matt",            en: "Natural oil, matte",  cs: "Přírodní olej, mat" },
  "natural oil satin":  { de: "Naturöl, seidenmatt",      en: "Natural oil, satin",  cs: "Přírodní olej, polomat" },
};
const finish = FINISH[finishKey] || FINISH["hard wax oil satin"];

// status / price / featured
const status = (explicit.status || "available").toLowerCase();
const price = explicit.price ? parseInt(explicit.price.replace(/\D/g, ""), 10) : null;
const featured = /^(true|yes|1)$/i.test(explicit.featured || "true");

// ---------- title + slug ----------
const dimToken = isRound ? `Ø${diameter || ""}` : (length ? `${length}` : "");
const PT = {
  coffee_table:     { de: "Couchtisch",       en: "Coffee Table",       cs: "Konferenční stolek" },
  dining_table:     { de: "Esstisch",         en: "Dining Table",       cs: "Jídelní stůl" },
  bistro_table:     { de: "Bistrotisch",      en: "Bistro Table",       cs: "Bistro stůl" },
  kitchen_table:    { de: "Küchentisch",      en: "Kitchen Table",      cs: "Kuchyňský stůl" },
  desk:             { de: "Schreibtisch",     en: "Desk",               cs: "Psací stůl" },
  conference_table: { de: "Konferenztisch",   en: "Conference Table",   cs: "Konferenční stůl" },
  restaurant_table: { de: "Restauranttisch",  en: "Restaurant Table",   cs: "Restaurační stůl" },
  custom_table:     { de: "Tisch nach Maß",   en: "Custom Table",       cs: "Stůl na míru" },
};
function buildTitle(locale) {
  if (explicit[`title.${locale}`]) return explicit[`title.${locale}`];
  if (explicit.title && locale === "en") return explicit.title;
  const pt = PT[ptKey][locale];
  // Last word of the wood name for short titles: "Eiche" / "oak" / "dub"
  const wname = wood[locale].split(" ").pop();
  const epoxySuffix = resinKey === "black"
    ? (locale === "cs" ? "epoxy" : "Epoxy")
    : "";
  let parts;
  if (locale === "en") {
    // English order: [Round] [Wood] [Type] [Dim] [, Epoxy]
    const roundWord = isRound ? "Round " : "";
    const woodCap = wname.charAt(0).toUpperCase() + wname.slice(1);
    parts = [`${roundWord}${woodCap} ${pt}`];
    if (dimToken) parts.push(dimToken);
    if (epoxySuffix) parts.push(`, ${epoxySuffix}`);
    return parts.join(" ").replace(" ,", ",").replace(/\s+/g, " ").trim();
  } else if (locale === "de") {
    // [Type] [Wood] [rund] [Dim], [Epoxy]
    parts = [pt, wname];
    if (isRound) parts.push("rund");
    if (dimToken) parts.push(dimToken);
    let s = parts.join(" ");
    if (epoxySuffix) s += `, ${epoxySuffix}`;
    return s;
  } else {
    // cs: [Type] [wood-lower] [kulatý] [Dim], [epoxy]
    parts = [pt, wname.toLowerCase()];
    if (isRound) parts.push("kulatý");
    if (dimToken) parts.push(dimToken);
    let s = parts.join(" ");
    if (epoxySuffix) s += `, ${epoxySuffix}`;
    return s;
  }
}
const title = { de: buildTitle("de"), en: buildTitle("en"), cs: buildTitle("cs") };

function slugify(s) {
  return s.toLowerCase()
    .replace(/ø/g, "")
    .replace(/[äöüß]/g, (c) => ({ä:"ae", ö:"oe", ü:"ue", ß:"ss"}[c]))
    .replace(/[áčďéěíňóřšťúůýž]/g, (c) => ({á:"a", č:"c", ď:"d", é:"e", ě:"e", í:"i", ň:"n", ó:"o", ř:"r", š:"s", ť:"t", ú:"u", ů:"u", ý:"y", ž:"z"}[c]))
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
const slug = { de: slugify(title.de), en: slugify(title.en), cs: slugify(title.cs) };

// ---------- description ----------
const seatsBy = (() => {
  if (diameter) return diameter >= 110 ? "6" : diameter >= 95 ? "4–6" : diameter >= 80 ? "4" : "2–4";
  if (length) return length >= 280 ? "10–12" : length >= 240 ? "8–10" : length >= 200 ? "6–8" : length >= 160 ? "4–6" : "2–4";
  return null;
})();
// Czech grammar: 1 → osoba, 2-4 → osoby, 5+ → osob
function csPersons(seats) {
  if (!seats) return "";
  if (seats === "1") return "osobu";
  // ranges like "2-4", "4-6", "6-8", "8-10", "10-12" → use "osoby" (since the lower bound is 2-10)
  // single numbers: 4 → osoby, 6 → osob, etc.
  const single = /^(\d+)$/.exec(seats);
  if (single) {
    const n = parseInt(single[1], 10);
    return n >= 2 && n <= 4 ? "osoby" : "osob";
  }
  // Range — use the upper bound to decide
  const range = /^(\d+)[–-](\d+)$/.exec(seats);
  if (range) {
    const upper = parseInt(range[2], 10);
    return upper >= 2 && upper <= 4 ? "osoby" : "osob";
  }
  return "osob";
}
function buildDescription(locale) {
  if (explicit[`description.${locale}`]) return explicit[`description.${locale}`];
  // Phrasing depends on whether resin fills natural voids (live edge) or sits as deliberate stripes
  const epoxyNote = resinKey === "black"
    ? (edgeKey === "live_edge"
        ? {
            de: "Schwarzes Harz füllt die natürlichen Risse und Astlöcher. ",
            en: "Black resin fills the natural cracks and knot holes. ",
            cs: "Černá pryskyřice vyplňuje přirozené praskliny a suky. ",
          }[locale]
        : {
            de: "Schwarze Epoxy-Streifen setzen einen ruhigen grafischen Akzent. ",
            en: "Black epoxy stripes add a quiet graphic accent. ",
            cs: "Černé epoxidové pruhy tvoří klidný grafický akcent. ",
          }[locale])
    : "";
  const liveEdgeNote = edgeKey === "live_edge" ? {
    de: "Mit natürlicher Baumkante. ",
    en: "With natural live edge. ",
    cs: "S přírodní hranou. ",
  }[locale] : "";
  const dimStr = isRound
    ? `Ø ${diameter || "?"} cm`
    : `${length || "?"} × ${width || "?"} cm`;
  const seatsStr = seatsBy ? {
    de: `Für ${seatsBy} Personen. `,
    en: `Seats ${seatsBy}. `,
    cs: `Pro ${seatsBy} ${csPersons(seatsBy)}. `,
  }[locale] : "";
  const productNoun = PT[ptKey][locale];
  const TEMPL = {
    de: `${isRound ? "Runder " : ""}Massivholz-${productNoun} ${woodOf.de}, ${dimStr}. ${liveEdgeNote}${epoxyNote}${base.de}. ${seatsStr}${finish.de}.`,
    en: `${isRound ? "Round " : "Solid-wood "}${isRound ? "solid-wood " : ""}${productNoun.toLowerCase()} ${woodOf.en}, ${dimStr}. ${liveEdgeNote}${epoxyNote}${base.en}. ${seatsStr}${finish.en}.`,
    cs: `${isRound ? "Kulatý " : "Masivní "}${isRound ? "masivní " : ""}${productNoun.toLowerCase()} ${woodOf.cs}, ${dimStr}. ${liveEdgeNote}${epoxyNote}${base.cs}. ${seatsStr}${finish.cs}.`,
  };
  // Capitalize first letter and clean whitespace
  let out = TEMPL[locale].replace(/\s+/g, " ").trim();
  out = out.charAt(0).toUpperCase() + out.slice(1);
  return out;
}
const description = { de: buildDescription("de"), en: buildDescription("en"), cs: buildDescription("cs") };

// ---------- image processing ----------
const folderName = path.basename(srcDir).replace(/[^\w-]+/g, "-").toLowerCase();
const dstDir = path.join(ROOT, "public", "photos", folderName);
const imageExts = /\.(png|jpe?g|webp|heic|heif)$/i;
const sources = fs.readdirSync(srcDir)
  .filter((n) => imageExts.test(n))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

/**
 * Read a single image file as a sharp-ready buffer. HEIC/HEIF go through
 * heic-convert first (sharp's npm build doesn't decode them on Windows/Linux).
 */
async function readAsBuffer(filePath) {
  if (/\.(heic|heif)$/i.test(filePath)) {
    const convert = loadHeicConvert();
    const inputBuffer = fs.readFileSync(filePath);
    // heic-convert returns a JPEG buffer at the given quality (0-1). Use 0.95
    // here so the only quality loss is sharp's final mozjpeg pass.
    return await convert({ buffer: inputBuffer, format: "JPEG", quality: 0.95 });
  }
  return fs.readFileSync(filePath);
}

if (sources.length === 0) {
  console.error("No images found in " + srcDir);
  process.exit(1);
}

(async () => {
  if (!dry) fs.mkdirSync(dstDir, { recursive: true });
  const imagePaths = [];
  let totalBefore = 0, totalAfter = 0;
  for (let i = 0; i < sources.length; i++) {
    const src = path.join(srcDir, sources[i]);
    const base = String(i + 1).padStart(2, "0");
    const dstName = `${base}.jpg`;
    const dst = path.join(dstDir, dstName);
    const beforeBytes = fs.statSync(src).size;
    totalBefore += beforeBytes;
    if (!dry) {
      const buf = await readAsBuffer(src);
      const meta = await sharp(buf).metadata();
      let pipeline = sharp(buf);
      if (meta.width > 1800) pipeline = pipeline.resize({ width: 1800, withoutEnlargement: true });
      await pipeline.jpeg({ quality: 82, mozjpeg: true, progressive: true }).toFile(dst);
      const afterBytes = fs.statSync(dst).size;
      totalAfter += afterBytes;
      const heicTag = /\.(heic|heif)$/i.test(sources[i]) ? " (heic)" : "";
      console.log(`  ${dstName.padEnd(8)} ${(beforeBytes/1024).toFixed(0).padStart(5)} KB → ${(afterBytes/1024).toFixed(0).padStart(4)} KB${heicTag}`);
    } else {
      const heicTag = /\.(heic|heif)$/i.test(sources[i]) ? " [will decode HEIC]" : "";
      console.log(`  [dry] would write ${dstName} from ${sources[i]}${heicTag}`);
    }
    imagePaths.push(`/photos/${folderName}/${dstName}`);
  }

  // ---------- build the TableItem entry ----------
  const tablesSrc = fs.readFileSync(TABLES_FILE, "utf8");
  const existingIds = [...tablesSrc.matchAll(/id:\s*"(\d+)"/g)].map((m) => parseInt(m[1], 10));
  const newId = String((existingIds.length ? Math.max(...existingIds) : 0) + 1);

  // sortOrder: newest real product on top → 0; subsequent reals shift down. Simpler: sortOrder = 0 always
  // and rely on insertion order for ties. Keep it 0 for now.
  const sortOrder = 0;

  // Build dimensions object — only include fields that are known so the output
  // is always syntactically valid TypeScript (no /* TODO */ placeholders).
  const dims = isRound
    ? `{ ${diameter ? `diameterCm: ${diameter}, ` : ""}heightCm: ${height}, thicknessCm: ${thickness} }`
    : `{ ${length ? `lengthCm: ${length}, ` : ""}${width ? `widthCm: ${width}, ` : ""}heightCm: ${height}, thicknessCm: ${thickness} }`;

  const gradient = (() => {
    // soft warm gradient driven by wood
    const G = {
      oak:    "linear-gradient(135deg, #D9B97A 0%, #8B6A3A 55%, #2A2620 100%)",
      walnut: "linear-gradient(135deg, #6F5430 0%, #3A2C1A 60%, #1F170E 100%)",
      ash:    "linear-gradient(135deg, #F5EFE4 0%, #C4A878 60%, #8B6A3A 100%)",
      beech:  "linear-gradient(135deg, #EBE0CC 0%, #C4A878 60%, #6F5430 100%)",
    };
    return G[woodKey] || G.oak;
  })();

  const block =
`  {
    id: "${newId}",
    slug: {
      de: "${slug.de}",
      en: "${slug.en}",
      cs: "${slug.cs}",
    },
    title: {
      de: ${JSON.stringify(title.de)},
      en: ${JSON.stringify(title.en)},
      cs: ${JSON.stringify(title.cs)},
    },
    description: {
      de: ${JSON.stringify(description.de)},
      en: ${JSON.stringify(description.en)},
      cs: ${JSON.stringify(description.cs)},
    },
    status: ${JSON.stringify(status)},
    productType: ${JSON.stringify(ptKey)},
    price: ${price ?? "null"},
    currency: "EUR",
    dimensions: ${dims},
    woodType: { de: ${JSON.stringify(wood.de)}, en: ${JSON.stringify(wood.en)}, cs: ${JSON.stringify(wood.cs)} },
    edgeType: ${JSON.stringify(edgeKey)},
    resinDetail: ${JSON.stringify(resinKey)},
    legBaseType: { de: ${JSON.stringify(base.de)}, en: ${JSON.stringify(base.en)}, cs: ${JSON.stringify(base.cs)} },
    finish: { de: ${JSON.stringify(finish.de)}, en: ${JSON.stringify(finish.en)}, cs: ${JSON.stringify(finish.cs)} },
    featured: ${featured},
    placeholderGradient:
      "${gradient}",
    images: ${JSON.stringify(imagePaths, null, 2).replace(/\n/g, "\n      ")},
    sortOrder: ${sortOrder},
  },
`;

  console.log("\n--- generated TableItem ---\n");
  console.log(block);
  console.log("--- end ---\n");

  if (dry) {
    console.log("[dry] — no files written. Drop --dry to apply.");
    return;
  }

  if (existingIds.includes(parseInt(newId, 10))) {
    console.error("id collision (" + newId + "); aborting tables.ts insert");
    process.exit(1);
  }
  if (slug.en && tablesSrc.includes(`en: "${slug.en}"`)) {
    console.warn("⚠ slug.en already present in tables.ts — entry may be a duplicate. Skipping insert.");
    return;
  }

  const insertAt = tablesSrc.lastIndexOf("];");
  if (insertAt < 0) {
    console.error("Couldn't find closing `];` in lib/tables.ts");
    process.exit(1);
  }
  const newSrc = tablesSrc.slice(0, insertAt) + block + tablesSrc.slice(insertAt);
  fs.writeFileSync(TABLES_FILE, newSrc);
  console.log(`✓ Inserted id ${newId} into lib/tables.ts`);
  console.log(`✓ ${imagePaths.length} images written to public/photos/${folderName}/  (saved ${((totalBefore - totalAfter) / 1024).toFixed(0)} KB)`);
  console.log(`\nNext steps:`);
  console.log(`  1. Open lib/tables.ts and review the generated entry — title/description are heuristic; polish if needed`);
  console.log(`  2. npm run build  — verify everything compiles`);
  console.log(`  3. git add public/photos/${folderName}/ lib/tables.ts && git commit && git push`);
})().catch((e) => { console.error(e); process.exit(1); });
