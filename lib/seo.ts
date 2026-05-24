import type { TableItem } from "./tables";
import type { Locale } from "./routes";
import { ROUTES } from "./routes";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://werkholz.vercel.app";

const ORG = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#organization`,
  name: "WERKHOLZ",
  description: "Custom solid wood tables made in our workshop, delivered to Berlin and across Germany.",
  url: SITE_URL,
  email: "hello@werkholz.de",
  areaServed: { "@type": "Country", name: "Germany" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Berlin",
    addressCountry: "DE",
  },
  image: `${SITE_URL}/og-default.png`,
  sameAs: [] as string[],
};

export function organizationSchema() {
  return ORG;
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "WERKHOLZ",
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: ["de-DE", "en-US", "cs-CZ"],
  };
}

export function tableProductSchema(item: TableItem, locale: Locale) {
  const url = `${SITE_URL}/${locale}/${ROUTES.currentPieces[locale]}/${item.slug[locale]}`;
  const availability =
    item.status === "available"
      ? "https://schema.org/InStock"
      : item.status === "in_production"
        ? "https://schema.org/PreOrder"
        : item.status === "reserved"
          ? "https://schema.org/LimitedAvailability"
          : "https://schema.org/SoldOut";

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: item.title[locale],
    description: item.description[locale],
    image: `${SITE_URL}/og/table/${item.slug[locale]}.png`,
    brand: { "@type": "Brand", name: "WERKHOLZ" },
    material: item.woodType[locale],
    url,
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "EUR",
      price: item.price ?? undefined,
      availability,
      seller: { "@id": `${SITE_URL}/#organization` },
    },
  };
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.url}`,
    })),
  };
}
