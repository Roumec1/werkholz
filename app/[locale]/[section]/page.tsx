import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, normalizeLocale } from "@/lib/i18n";
import { ROUTES, type Locale, type RouteKey, LOCALES } from "@/lib/routes";
import CurrentPiecesPage from "@/components/pages/CurrentPiecesPage";
import CustomTablesPage from "@/components/pages/CustomTablesPage";
import ForBusinessesPage from "@/components/pages/ForBusinessesPage";
import ProcessPage from "@/components/pages/ProcessPage";
import ContactPage from "@/components/pages/ContactPage";
import ImpressumPage from "@/components/pages/ImpressumPage";
import PrivacyPage from "@/components/pages/PrivacyPage";
import MaterialsPage from "@/components/pages/MaterialsPage";

function resolveRoute(locale: Locale, segment: string): RouteKey | null {
  const keys: RouteKey[] = [
    "currentPieces",
    "customTables",
    "forBusinesses",
    "process",
    "contact",
    "impressum",
    "privacy",
    "materials",
  ];
  for (const key of keys) {
    if (ROUTES[key][locale] === segment) return key;
  }
  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; section: string }>;
}): Promise<Metadata> {
  const { locale, section } = await params;
  const loc = normalizeLocale(locale);
  const dict = getDictionary(loc);
  const routeKey = resolveRoute(loc, section);
  if (!routeKey) return {};

  const meta = dict.sectionMeta[routeKey as keyof typeof dict.sectionMeta];
  const canonical = `/${loc}/${section}`;

  return {
    title: meta.title,
    description: meta.desc,
    alternates: {
      canonical,
      languages: {
        de: `/de/${ROUTES[routeKey].de}`,
        en: `/en/${ROUTES[routeKey].en}`,
        cs: `/cs/${ROUTES[routeKey].cs}`,
        "x-default": `/de/${ROUTES[routeKey].de}`,
      },
    },
    openGraph: {
      title: `${meta.title} | WERKHOLZ`,
      description: meta.desc,
      locale: loc,
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  const params: Array<{ locale: Locale; section: string }> = [];
  for (const locale of LOCALES) {
    const segments = [
      ROUTES.currentPieces[locale],
      ROUTES.customTables[locale],
      ROUTES.forBusinesses[locale],
      ROUTES.process[locale],
      ROUTES.contact[locale],
      ROUTES.impressum[locale],
      ROUTES.privacy[locale],
      ROUTES.materials[locale],
    ];
    for (const section of segments) {
      params.push({ locale, section });
    }
  }
  return params;
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ locale: string; section: string }>;
}) {
  const { locale, section } = await params;
  const loc = normalizeLocale(locale);
  const dict = getDictionary(loc);
  const routeKey = resolveRoute(loc, section);
  if (!routeKey) notFound();

  switch (routeKey) {
    case "currentPieces":
      return <CurrentPiecesPage locale={loc} dict={dict} />;
    case "customTables":
      return <CustomTablesPage locale={loc} dict={dict} />;
    case "forBusinesses":
      return <ForBusinessesPage locale={loc} dict={dict} />;
    case "process":
      return <ProcessPage locale={loc} dict={dict} />;
    case "contact":
      return <ContactPage locale={loc} dict={dict} />;
    case "impressum":
      return <ImpressumPage locale={loc} dict={dict} />;
    case "privacy":
      return <PrivacyPage locale={loc} dict={dict} />;
    case "materials":
      return <MaterialsPage locale={loc} dict={dict} />;
    default:
      notFound();
  }
}
