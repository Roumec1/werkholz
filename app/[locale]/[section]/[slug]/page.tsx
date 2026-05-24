import { notFound } from "next/navigation";
import { getDictionary, normalizeLocale } from "@/lib/i18n";
import { ROUTES, LOCALES, type Locale } from "@/lib/routes";
import { getTableBySlug, SAMPLE_TABLES } from "@/lib/tables";
import TableDetailPage from "@/components/pages/TableDetailPage";

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

export default async function TableSlugPage({
  params,
}: {
  params: Promise<{ locale: string; section: string; slug: string }>;
}) {
  const { locale, section, slug } = await params;
  const loc = normalizeLocale(locale);
  const dict = getDictionary(loc);

  // Only serve detail pages under the localized currentPieces segment
  if (section !== ROUTES.currentPieces[loc]) notFound();

  const item = getTableBySlug(slug, loc);
  if (!item) notFound();

  return <TableDetailPage item={item} locale={loc} dict={dict} />;
}
