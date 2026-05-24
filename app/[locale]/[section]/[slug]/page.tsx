import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, normalizeLocale } from "@/lib/i18n";
import { ROUTES, LOCALES, type Locale } from "@/lib/routes";
import { getTableBySlug, SAMPLE_TABLES } from "@/lib/tables";
import TableDetailPage from "@/components/pages/TableDetailPage";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, tableProductSchema } from "@/lib/seo";

export async function generateStaticParams() {
  const params: Array<{ locale: Locale; section: string; slug: string }> = [];
  for (const locale of LOCALES) {
    const section = ROUTES.currentPieces[locale];
    for (const item of SAMPLE_TABLES) {
      params.push({ locale, section, slug: item.slug[locale] });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; section: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const loc = normalizeLocale(locale);
  const item = getTableBySlug(slug, loc);
  if (!item) return {};

  const title = item.title[loc];
  const description = item.description[loc];

  const alternateLanguages: Record<string, string> = {};
  for (const altLocale of LOCALES) {
    alternateLanguages[altLocale] = `/${altLocale}/${ROUTES.currentPieces[altLocale]}/${item.slug[altLocale]}`;
  }
  alternateLanguages["x-default"] = `/de/${ROUTES.currentPieces.de}/${item.slug.de}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${loc}/${ROUTES.currentPieces[loc]}/${item.slug[loc]}`,
      languages: alternateLanguages,
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: loc,
    },
  };
}

export default async function TableSlugPage({
  params,
}: {
  params: Promise<{ locale: string; section: string; slug: string }>;
}) {
  const { locale, section, slug } = await params;
  const loc = normalizeLocale(locale);
  const dict = getDictionary(loc);

  if (section !== ROUTES.currentPieces[loc]) notFound();

  const item = getTableBySlug(slug, loc);
  if (!item) notFound();

  const breadcrumbs = breadcrumbSchema([
    { name: "WERKHOLZ", url: `/${loc}` },
    { name: dict.nav.currentPieces, url: `/${loc}/${ROUTES.currentPieces[loc]}` },
    { name: item.title[loc], url: `/${loc}/${ROUTES.currentPieces[loc]}/${item.slug[loc]}` },
  ]);

  return (
    <>
      <JsonLd data={[tableProductSchema(item, loc), breadcrumbs]} />
      <TableDetailPage item={item} locale={loc} dict={dict} />
    </>
  );
}
