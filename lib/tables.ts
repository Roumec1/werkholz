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
