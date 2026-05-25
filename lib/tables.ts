import type { Locale } from "./routes";

export type TableStatus = "available" | "in_production" | "reserved" | "sold";

export type ProductType =
  | "coffee_table"
  | "dining_table"
  | "bistro_table"
  | "kitchen_table"
  | "desk"
  | "conference_table"
  | "restaurant_table"
  | "custom_table";

export interface TableItem {
  id: string;
  slug: Record<Locale, string>;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  status: TableStatus;
  productType: ProductType;
  price: number | null;
  currency: "EUR";
  dimensions: {
    lengthCm?: number;
    widthCm?: number;
    diameterCm?: number;
    heightCm: number;
    thicknessCm?: number;
  };
  woodType: Record<Locale, string>;
  edgeType: "straight_edge" | "live_edge" | "soft_rounded";
  resinDetail: "none" | "black" | "smoke" | "clear";
  legBaseType: Record<Locale, string>;
  finish: Record<Locale, string>;
  featured: boolean;
  estimatedCompletionDate?: string;
  /** Soft, warm gradient placeholder. Real photos replace later. */
  placeholderGradient: string;
  /**
   * Optional list of real product photo paths (relative to /public).
   * When present, components prefer these over the SVG illustration.
   * First image is treated as the hero / card preview.
   */
  images?: string[];
  sortOrder: number;
}

export const SAMPLE_TABLES: TableItem[] = [
  {
    id: "1",
    slug: {
      de: "esstisch-eiche-220",
      en: "dining-table-oak-220",
      cs: "jidelni-stul-dub-220",
    },
    title: {
      de: "Esstisch Eiche 220",
      en: "Oak Dining Table 220",
      cs: "Jídelní stůl dub 220",
    },
    description: {
      de: "Massiver Esstisch aus europäischer Eiche mit gerader Kante und schwarzem Stahlgestell. Geölt, 220 × 95 cm. Geeignet für 8 Personen.",
      en: "Solid European oak dining table with straight edge and black steel base. Oiled finish, 220 × 95 cm. Seats eight comfortably.",
      cs: "Masivní jídelní stůl z evropského dubu s rovnou hranou a černým ocelovým podnožím. Olejovaný, 220 × 95 cm. Pro 8 osob.",
    },
    status: "available",
    productType: "dining_table",
    price: 2890,
    currency: "EUR",
    dimensions: { lengthCm: 220, widthCm: 95, heightCm: 75, thicknessCm: 4 },
    woodType: { de: "Europäische Eiche", en: "European oak", cs: "Evropský dub" },
    edgeType: "straight_edge",
    resinDetail: "none",
    legBaseType: { de: "Schwarzes Stahlgestell", en: "Black steel base", cs: "Černá ocelová podnož" },
    finish: { de: "Naturöl, matt", en: "Natural oil, matte", cs: "Přírodní olej, mat" },
    featured: true,
    placeholderGradient:
      "linear-gradient(135deg, #C4A878 0%, #A88550 45%, #6F5430 100%)",
    sortOrder: 1,
  },
  {
    id: "2",
    slug: {
      de: "couchtisch-nussbaum-baumkante",
      en: "walnut-coffee-table-live-edge",
      cs: "konferencni-stolek-orech-prirodni-hrana",
    },
    title: {
      de: "Couchtisch Nussbaum, Baumkante",
      en: "Walnut Coffee Table, Live Edge",
      cs: "Konferenční stolek ořech, přírodní hrana",
    },
    description: {
      de: "Couchtisch aus amerikanischem Nussbaum mit natürlicher Baumkante. Schwarze Harzfüllung in den Astlöchern. 120 × 65 cm.",
      en: "American walnut coffee table with natural live edge. Black resin fills the knot inclusions. 120 × 65 cm.",
      cs: "Konferenční stolek z amerického ořechu s přírodní hranou. Černá pryskyřičná výplň v sukách. 120 × 65 cm.",
    },
    status: "available",
    productType: "coffee_table",
    price: 1450,
    currency: "EUR",
    dimensions: { lengthCm: 120, widthCm: 65, heightCm: 42, thicknessCm: 5 },
    woodType: { de: "Amerikanischer Nussbaum", en: "American walnut", cs: "Americký ořech" },
    edgeType: "live_edge",
    resinDetail: "black",
    legBaseType: { de: "Schwarze Stahlbeine, X-Form", en: "Black steel legs, X-frame", cs: "Černé ocelové nohy, tvar X" },
    finish: { de: "Hartwachsöl, seidenmatt", en: "Hard wax oil, satin", cs: "Tvrdý voskový olej, polomat" },
    featured: true,
    placeholderGradient:
      "linear-gradient(135deg, #6F5430 0%, #3A2C1A 60%, #1F170E 100%)",
    sortOrder: 2,
  },
  {
    id: "3",
    slug: {
      de: "bistrotisch-eiche-rund-80",
      en: "oak-bistro-table-round-80",
      cs: "bistro-stul-dub-kulaty-80",
    },
    title: {
      de: "Bistrotisch Eiche rund Ø80",
      en: "Round Oak Bistro Table Ø80",
      cs: "Bistro stůl dub kulatý Ø80",
    },
    description: {
      de: "Runder Bistrotisch aus Eiche, Durchmesser 80 cm. Schwarzes Stahlkreuz als Gestell. Ideal für Cafés und kleine Küchen.",
      en: "Round oak bistro table, 80 cm diameter. Black cross-steel base. Ideal for cafés and small kitchens.",
      cs: "Kulatý bistro stůl z dubu, průměr 80 cm. Černá kovová křížová podnož. Ideální pro kavárny a malé kuchyně.",
    },
    status: "in_production",
    productType: "bistro_table",
    price: 890,
    currency: "EUR",
    dimensions: { diameterCm: 80, heightCm: 75, thicknessCm: 4 },
    woodType: { de: "Europäische Eiche", en: "European oak", cs: "Evropský dub" },
    edgeType: "soft_rounded",
    resinDetail: "none",
    legBaseType: { de: "Schwarzes Stahlkreuz", en: "Black steel cross", cs: "Černý ocelový kříž" },
    finish: { de: "Naturöl, matt", en: "Natural oil, matte", cs: "Přírodní olej, mat" },
    featured: true,
    estimatedCompletionDate: "2026-06-15",
    placeholderGradient:
      "linear-gradient(135deg, #D9C7A6 0%, #A88550 60%, #544025 100%)",
    sortOrder: 3,
  },
  {
    id: "4",
    slug: {
      de: "schreibtisch-esche-160",
      en: "ash-desk-160",
      cs: "psaci-stul-jasan-160",
    },
    title: {
      de: "Schreibtisch Esche 160",
      en: "Ash Desk 160",
      cs: "Psací stůl jasan 160",
    },
    description: {
      de: "Schreibtisch aus heimischer Esche, 160 × 70 cm. Helle Maserung, matte Oberfläche, schlanke schwarze Beine.",
      en: "Locally sourced ash desk, 160 × 70 cm. Light grain, matte finish, slim black legs.",
      cs: "Psací stůl z domácího jasanu, 160 × 70 cm. Světlá kresba, matný povrch, štíhlé černé nohy.",
    },
    status: "in_production",
    productType: "desk",
    price: 1290,
    currency: "EUR",
    dimensions: { lengthCm: 160, widthCm: 70, heightCm: 75, thicknessCm: 3 },
    woodType: { de: "Esche", en: "Ash", cs: "Jasan" },
    edgeType: "straight_edge",
    resinDetail: "none",
    legBaseType: { de: "Schlanke schwarze Stahlbeine", en: "Slim black steel legs", cs: "Štíhlé černé ocelové nohy" },
    finish: { de: "Naturöl, matt", en: "Natural oil, matte", cs: "Přírodní olej, mat" },
    featured: false,
    estimatedCompletionDate: "2026-06-20",
    placeholderGradient:
      "linear-gradient(135deg, #F5EFE4 0%, #C4A878 60%, #8B6A3A 100%)",
    sortOrder: 4,
  },
  {
    id: "5",
    slug: {
      de: "konferenztisch-eiche-300",
      en: "oak-conference-table-300",
      cs: "konferencni-stul-dub-300",
    },
    title: {
      de: "Konferenztisch Eiche 300",
      en: "Oak Conference Table 300",
      cs: "Konferenční stůl dub 300",
    },
    description: {
      de: "Großzügiger Konferenztisch aus Eiche, 300 × 110 cm. Für 10–12 Personen. Bereits an ein Berliner Architekturbüro geliefert.",
      en: "Generous oak conference table, 300 × 110 cm. Seats 10–12. Already delivered to a Berlin architecture studio.",
      cs: "Velkorysý konferenční stůl z dubu, 300 × 110 cm. Pro 10–12 osob. Již dodáno berlínskému architektonickému studiu.",
    },
    status: "sold",
    productType: "conference_table",
    price: null,
    currency: "EUR",
    dimensions: { lengthCm: 300, widthCm: 110, heightCm: 75, thicknessCm: 5 },
    woodType: { de: "Europäische Eiche", en: "European oak", cs: "Evropský dub" },
    edgeType: "straight_edge",
    resinDetail: "none",
    legBaseType: { de: "Stahlgestell schwarz, A-Form", en: "Black steel base, A-frame", cs: "Černé ocelové podnoží, tvar A" },
    finish: { de: "Hartwachsöl, matt", en: "Hard wax oil, matte", cs: "Tvrdý voskový olej, mat" },
    featured: false,
    placeholderGradient:
      "linear-gradient(135deg, #8B6A3A 0%, #544025 50%, #2A2620 100%)",
    sortOrder: 5,
  },
  {
    id: "6",
    slug: {
      de: "kuechentisch-buche-160",
      en: "beech-kitchen-table-160",
      cs: "kuchynsky-stul-buk-160",
    },
    title: {
      de: "Küchentisch Buche 160",
      en: "Beech Kitchen Table 160",
      cs: "Kuchyňský stůl buk 160",
    },
    description: {
      de: "Reservierter Küchentisch aus heller Buche, 160 × 80 cm. Helles, freundliches Holz mit ruhiger Maserung.",
      en: "Reserved beech kitchen table, 160 × 80 cm. Light, friendly wood with calm grain.",
      cs: "Rezervovaný kuchyňský stůl z bukového dřeva, 160 × 80 cm. Světlé, přátelské dřevo s klidnou kresbou.",
    },
    status: "reserved",
    productType: "kitchen_table",
    price: 1490,
    currency: "EUR",
    dimensions: { lengthCm: 160, widthCm: 80, heightCm: 75, thicknessCm: 4 },
    woodType: { de: "Europäische Buche", en: "European beech", cs: "Evropský buk" },
    edgeType: "soft_rounded",
    resinDetail: "none",
    legBaseType: { de: "Holzbeine, konisch", en: "Tapered wooden legs", cs: "Dřevěné nohy, konické" },
    finish: { de: "Naturöl, seidenmatt", en: "Natural oil, satin", cs: "Přírodní olej, polomat" },
    featured: false,
    placeholderGradient:
      "linear-gradient(135deg, #EBE0CC 0%, #C4A878 60%, #6F5430 100%)",
    sortOrder: 6,
  },
  {
    id: "7",
    slug: {
      de: "esstisch-nussbaum-baumkante-260",
      en: "walnut-live-edge-dining-260",
      cs: "jidelni-stul-orech-prirodni-260",
    },
    title: {
      de: "Esstisch Nussbaum Baumkante 260",
      en: "Walnut Live Edge Dining 260",
      cs: "Jídelní stůl ořech přírodní hrana 260",
    },
    description: {
      de: "Statement-Esstisch aus amerikanischem Nussbaum mit natürlicher Baumkante an beiden Längsseiten. Schwarze Harzfüllungen, schwarzes A-Gestell.",
      en: "Statement walnut dining table with live edges on both long sides. Black resin fills, black A-frame base.",
      cs: "Působivý jídelní stůl z amerického ořechu s přírodní hranou na obou delších stranách. Černé pryskyřičné výplně, černá A-podnož.",
    },
    status: "available",
    productType: "dining_table",
    price: 4290,
    currency: "EUR",
    dimensions: { lengthCm: 260, widthCm: 100, heightCm: 75, thicknessCm: 5 },
    woodType: { de: "Amerikanischer Nussbaum", en: "American walnut", cs: "Americký ořech" },
    edgeType: "live_edge",
    resinDetail: "black",
    legBaseType: { de: "Schwarzes A-Stahlgestell", en: "Black A-frame steel base", cs: "Černá A-podnož" },
    finish: { de: "Hartwachsöl, matt", en: "Hard wax oil, matte", cs: "Tvrdý voskový olej, mat" },
    featured: true,
    placeholderGradient:
      "linear-gradient(135deg, #6F5430 0%, #3A2C1A 60%, #1F170E 100%)",
    sortOrder: 7,
  },
  {
    id: "8",
    slug: {
      de: "couchtisch-eiche-100",
      en: "oak-coffee-table-100",
      cs: "konferencni-stolek-dub-100",
    },
    title: {
      de: "Couchtisch Eiche 100",
      en: "Oak Coffee Table 100",
      cs: "Konferenční stolek dub 100",
    },
    description: {
      de: "Kompakter Couchtisch aus heller Eiche, 100 × 55 cm. Mit X-förmigem Stahlgestell. Perfekt für kleine Wohnzimmer und Stadtwohnungen.",
      en: "Compact light-oak coffee table, 100 × 55 cm. X-frame steel base. Perfect for small living rooms and apartments.",
      cs: "Kompaktní konferenční stolek ze světlého dubu, 100 × 55 cm. X-podnož. Ideální pro malé obývací pokoje.",
    },
    status: "in_production",
    productType: "coffee_table",
    price: 990,
    currency: "EUR",
    dimensions: { lengthCm: 100, widthCm: 55, heightCm: 42, thicknessCm: 4 },
    woodType: { de: "Europäische Eiche", en: "European oak", cs: "Evropský dub" },
    edgeType: "straight_edge",
    resinDetail: "none",
    legBaseType: { de: "Schwarze X-Stahlbeine", en: "Black X-frame steel legs", cs: "Černé X-ocelové nohy" },
    finish: { de: "Naturöl, matt", en: "Natural oil, matte", cs: "Přírodní olej, mat" },
    featured: false,
    estimatedCompletionDate: "2026-06-10",
    placeholderGradient:
      "linear-gradient(135deg, #D9C7A6 0%, #A88550 60%, #544025 100%)",
    sortOrder: 8,
  },
  {
    id: "9",
    slug: {
      de: "schreibtisch-nussbaum-180",
      en: "walnut-desk-180",
      cs: "psaci-stul-orech-180",
    },
    title: {
      de: "Schreibtisch Nussbaum 180",
      en: "Walnut Desk 180",
      cs: "Psací stůl ořech 180",
    },
    description: {
      de: "Eleganter Schreibtisch aus Nussbaum, 180 × 80 cm. Klare Kanten, schlanke schwarze Stahlbeine. Ideal für Designstudio oder Homeoffice.",
      en: "Elegant walnut desk, 180 × 80 cm. Clean edges, slim black steel legs. Ideal for design studio or home office.",
      cs: "Elegantní psací stůl z ořechu, 180 × 80 cm. Čisté hrany, štíhlé černé ocelové nohy. Ideální pro design studio nebo home office.",
    },
    status: "available",
    productType: "desk",
    price: 1790,
    currency: "EUR",
    dimensions: { lengthCm: 180, widthCm: 80, heightCm: 75, thicknessCm: 3 },
    woodType: { de: "Amerikanischer Nussbaum", en: "American walnut", cs: "Americký ořech" },
    edgeType: "straight_edge",
    resinDetail: "none",
    legBaseType: { de: "Schlanke schwarze Stahlbeine", en: "Slim black steel legs", cs: "Štíhlé černé ocelové nohy" },
    finish: { de: "Hartwachsöl, seidenmatt", en: "Hard wax oil, satin", cs: "Tvrdý voskový olej, polomat" },
    featured: true,
    placeholderGradient:
      "linear-gradient(135deg, #8B6A3A 0%, #4F3A1F 60%, #2A1D0E 100%)",
    sortOrder: 9,
  },
  {
    id: "10",
    slug: {
      de: "bistrotisch-esche-rund-70",
      en: "ash-bistro-round-70",
      cs: "bistro-stul-jasan-kulaty-70",
    },
    title: {
      de: "Bistrotisch Esche Ø70",
      en: "Ash Bistro Table Ø70",
      cs: "Bistro stůl jasan Ø70",
    },
    description: {
      de: "Heller Bistrotisch aus Esche, Ø 70 cm. Schlanker Stahlfuß mit schwerer Bodenplatte. Ideal für Cafés und kleine Esszimmer.",
      en: "Light ash bistro table, Ø 70 cm. Slim steel column with heavy floor plate. Ideal for cafés and small dining areas.",
      cs: "Světlý bistro stůl z jasanu, Ø 70 cm. Štíhlá ocelová noha s těžkou základnou. Ideální pro kavárny.",
    },
    status: "sold",
    productType: "bistro_table",
    price: null,
    currency: "EUR",
    dimensions: { diameterCm: 70, heightCm: 75, thicknessCm: 3 },
    woodType: { de: "Esche", en: "Ash", cs: "Jasan" },
    edgeType: "soft_rounded",
    resinDetail: "none",
    legBaseType: { de: "Stahlsäule schwarz", en: "Black steel column", cs: "Černá ocelová noha" },
    finish: { de: "Naturöl, matt", en: "Natural oil, matte", cs: "Přírodní olej, mat" },
    featured: false,
    placeholderGradient:
      "linear-gradient(135deg, #E8DCC0 0%, #C4A878 60%, #8B6A3A 100%)",
    sortOrder: 10,
  },
  {
    id: "11",
    slug: {
      de: "restauranttisch-eiche-140-set",
      en: "oak-restaurant-table-140-set",
      cs: "restauracni-stul-dub-140-set",
    },
    title: {
      de: "Restauranttisch Eiche 140 (Serie 8)",
      en: "Oak Restaurant Table 140 (set of 8)",
      cs: "Restaurační stůl dub 140 (série 8)",
    },
    description: {
      de: "Serie von 8 robusten Restauranttischen aus Eiche, 140 × 80 cm. Hartwachsöl, alltagstauglich. Bereits an ein Berliner Bistro geliefert.",
      en: "Set of 8 sturdy oak restaurant tables, 140 × 80 cm. Hard wax oil, built for daily use. Delivered to a Berlin bistro.",
      cs: "Série 8 robustních restauračních stolů z dubu, 140 × 80 cm. Tvrdý voskový olej, pro každodenní použití.",
    },
    status: "sold",
    productType: "restaurant_table",
    price: null,
    currency: "EUR",
    dimensions: { lengthCm: 140, widthCm: 80, heightCm: 75, thicknessCm: 4 },
    woodType: { de: "Europäische Eiche", en: "European oak", cs: "Evropský dub" },
    edgeType: "straight_edge",
    resinDetail: "none",
    legBaseType: { de: "Schwarzes Stahlkreuz", en: "Black steel cross", cs: "Černý ocelový kříž" },
    finish: { de: "Hartwachsöl, matt", en: "Hard wax oil, matte", cs: "Tvrdý voskový olej, mat" },
    featured: false,
    placeholderGradient:
      "linear-gradient(135deg, #A88550 0%, #6F5430 50%, #2A2620 100%)",
    sortOrder: 11,
  },
  {
    id: "12",
    slug: {
      de: "kuechentisch-buche-rund-100",
      en: "beech-round-kitchen-100",
      cs: "kuchynsky-stul-buk-kulaty-100",
    },
    title: {
      de: "Küchentisch Buche rund Ø100",
      en: "Round Beech Kitchen Table Ø100",
      cs: "Kuchyňský stůl buk kulatý Ø100",
    },
    description: {
      de: "Runder Küchentisch aus Buche, Ø 100 cm. Warmes Holz, weiche Kante. Perfekt für 4 Personen in einer offenen Küche.",
      en: "Round beech kitchen table, Ø 100 cm. Warm wood, softly rounded edge. Perfect for 4 in an open kitchen.",
      cs: "Kulatý kuchyňský stůl z buku, Ø 100 cm. Teplé dřevo, jemně zaoblená hrana. Pro 4 osoby.",
    },
    status: "available",
    productType: "kitchen_table",
    price: 1190,
    currency: "EUR",
    dimensions: { diameterCm: 100, heightCm: 75, thicknessCm: 4 },
    woodType: { de: "Europäische Buche", en: "European beech", cs: "Evropský buk" },
    edgeType: "soft_rounded",
    resinDetail: "none",
    legBaseType: { de: "Schwarzes Stahlkreuz", en: "Black steel cross", cs: "Černý ocelový kříž" },
    finish: { de: "Naturöl, seidenmatt", en: "Natural oil, satin", cs: "Přírodní olej, polomat" },
    featured: false,
    placeholderGradient:
      "linear-gradient(135deg, #EBD9B8 0%, #C7A26A 60%, #8B6A3A 100%)",
    sortOrder: 12,
  },
  {
    id: "13",
    slug: {
      de: "kuechentisch-eiche-rund-88-epoxy",
      en: "oak-round-kitchen-table-88-epoxy",
      cs: "kuchynsky-stul-dub-kulaty-88-epoxy",
    },
    title: {
      de: "Küchentisch Eiche rund Ø88, Epoxy",
      en: "Round Oak Kitchen Table Ø88, Epoxy",
      cs: "Kuchyňský stůl dub kulatý Ø88, epoxy",
    },
    description: {
      de: "Runder Massivholz-Küchentisch aus europäischer Eiche, Ø 88 cm. Zwei schwarze Epoxy-Streifen ziehen sich quer über die Platte und setzen einen ruhigen grafischen Akzent. Schwarzes X-Stahlgestell. Für 2–4 Personen, ideal für kleine Esszimmer und offene Küchen.",
      en: "Round solid-wood kitchen table in European oak, Ø 88 cm. Two black epoxy stripes run across the top — a quiet graphic accent against the warm grain. Black X-frame steel base. Seats 2–4 — at home in small dining rooms and open kitchens.",
      cs: "Kulatý masivní kuchyňský stůl z evropského dubu, Ø 88 cm. Dva černé epoxidové pruhy procházejí napříč deskou a tvoří klidný grafický akcent. Černá X-podnož z oceli. Pro 2–4 osoby, ideální pro malé jídelny a otevřené kuchyně.",
    },
    status: "available",
    productType: "kitchen_table",
    price: 1390,
    currency: "EUR",
    dimensions: { diameterCm: 88, heightCm: 75, thicknessCm: 4 },
    woodType: { de: "Europäische Eiche", en: "European oak", cs: "Evropský dub" },
    edgeType: "soft_rounded",
    resinDetail: "black",
    legBaseType: { de: "Schwarzes X-Stahlgestell", en: "Black X-frame steel base", cs: "Černá X-podnož z oceli" },
    finish: { de: "Hartwachsöl, seidenmatt", en: "Hard wax oil, satin", cs: "Tvrdý voskový olej, polomat" },
    featured: true,
    placeholderGradient:
      "linear-gradient(135deg, #D9B97A 0%, #8B6A3A 55%, #2A2620 100%)",
    images: [
      "/photos/table-1/01-lifestyle.jpg",
      "/photos/table-1/02-perspective.jpg",
      "/photos/table-1/03-perspective-angle.jpg",
      "/photos/table-1/04-perspective-detail.jpg",
      "/photos/table-1/05-top-detail.jpg",
      "/photos/table-1/06-side.jpg",
      "/photos/table-1/07-base.jpg",
    ],
    sortOrder: 0,
  },
];

export function getTableBySlug(
  slug: string,
  locale: Locale
): TableItem | undefined {
  return SAMPLE_TABLES.find((t) => t.slug[locale] === slug);
}

export function tablesByStatus(status: TableStatus): TableItem[] {
  return SAMPLE_TABLES.filter((t) => t.status === status).sort(
    (a, b) => a.sortOrder - b.sortOrder
  );
}

export function featuredTables(): TableItem[] {
  return SAMPLE_TABLES.filter((t) => t.featured).sort(
    (a, b) => a.sortOrder - b.sortOrder
  );
}
