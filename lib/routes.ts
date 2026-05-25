export type Locale = "de" | "en" | "cs";

export const LOCALES: Locale[] = ["de", "en", "cs"];
export const DEFAULT_LOCALE: Locale = "de";

export const ROUTES = {
  home: { de: "", en: "", cs: "" },
  currentPieces: {
    de: "aktuelle-stuecke",
    en: "current-pieces",
    cs: "aktualni-kusy",
  },
  customTables: {
    de: "tische-nach-mass",
    en: "custom-tables",
    cs: "stoly-na-miru",
  },
  forBusinesses: {
    de: "fuer-firmen",
    en: "for-businesses",
    cs: "pro-firmy",
  },
  process: {
    de: "ablauf",
    en: "process",
    cs: "postup",
  },
  contact: {
    de: "kontakt",
    en: "contact",
    cs: "kontakt",
  },
  impressum: {
    de: "impressum",
    en: "imprint",
    cs: "vytisk",
  },
  privacy: {
    de: "datenschutz",
    en: "privacy",
    cs: "ochrana-dat",
  },
  materials: {
    de: "hoelzer",
    en: "materials",
    cs: "drevo",
  },
} as const;

export type RouteKey = keyof typeof ROUTES;

export function localePath(locale: Locale, route: RouteKey, slug?: string): string {
  const segment = ROUTES[route][locale];
  const base = `/${locale}${segment ? "/" + segment : ""}`;
  return slug ? `${base}/${slug}` : base;
}

export function isValidLocale(locale: string): locale is Locale {
  return LOCALES.includes(locale as Locale);
}
