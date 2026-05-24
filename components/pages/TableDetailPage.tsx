import Link from "next/link";
import { localePath, type Locale } from "@/lib/routes";
import type { Dictionary } from "@/lib/i18n";
import { type TableItem, SAMPLE_TABLES } from "@/lib/tables";
import StatusBadge from "../StatusBadge";
import TableCard from "../TableCard";

interface Props {
  item: TableItem;
  locale: Locale;
  dict: Dictionary;
}

function formatDimensions(item: TableItem): string {
  const d = item.dimensions;
  if (d.diameterCm) return `Ø ${d.diameterCm} × H ${d.heightCm} cm`;
  if (d.lengthCm && d.widthCm) return `L ${d.lengthCm} × W ${d.widthCm} × H ${d.heightCm} cm`;
  return `H ${d.heightCm} cm`;
}

export default function TableDetailPage({ item, locale, dict }: Props) {
  const ctaLabel = dict.cta[item.status];
  const price = item.price ? `${item.price.toLocaleString("de-DE")} €` : dict.cta.onRequest;
  const related = SAMPLE_TABLES.filter(
    (t) => t.id !== item.id && t.productType === item.productType
  ).slice(0, 3);
  const inquiryHref = `${localePath(locale, "contact")}?item=${item.slug[locale]}&status=${item.status}`;

  return (
    <>
      <article className="pt-28 sm:pt-36">
        <div className="container-w">
          <Link
            href={localePath(locale, "currentPieces")}
            className="inline-flex items-center gap-2 text-sm text-stone-600 hover:text-ink transition-colors mb-8"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M11 7H3m0 0l3.5 3.5M3 7l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {locale === "de" ? "Alle Stücke" : locale === "en" ? "All pieces" : "Všechny kusy"}
          </Link>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Gallery placeholder */}
            <div className="lg:col-span-7">
              <div
                className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl shadow-stone-900/10"
                style={{ background: item.placeholderGradient }}
              >
                <svg viewBox="0 0 400 500" className="absolute inset-0 w-full h-full opacity-25">
                  <g stroke="#1F170E" strokeWidth="0.5" fill="none">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <path key={i} d={`M0,${30 + i * 30} Q100,${25 + i * 30} 200,${35 + i * 30} T400,${30 + i * 30}`} />
                    ))}
                  </g>
                </svg>
              </div>

              {/* Thumbnails */}
              <div className="mt-4 grid grid-cols-4 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-xl overflow-hidden border border-stone-200"
                    style={{ background: item.placeholderGradient, filter: `brightness(${0.85 + i * 0.05})` }}
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full opacity-25">
                      <g stroke="#1F170E" strokeWidth="0.3" fill="none">
                        {Array.from({ length: 8 }).map((_, j) => (
                          <path key={j} d={`M0,${10 + j * 12} Q25,${8 + j * 12} 50,${12 + j * 12} T100,${10 + j * 12}`} />
                        ))}
                      </g>
                    </svg>
                  </div>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <StatusBadge status={item.status} dict={dict} size="md" />

                <h1 className="mt-5 font-display font-light text-display-md text-ink text-balance">
                  {item.title[locale]}
                </h1>

                <p className="mt-3 text-3xl font-display text-ink">{price}</p>

                <p className="mt-6 text-stone-600 leading-relaxed">
                  {item.description[locale]}
                </p>

                {item.status === "in_production" && item.estimatedCompletionDate && (
                  <div className="mt-6 p-4 rounded-xl bg-status-production/10 text-status-production">
                    <p className="text-xs uppercase tracking-widest font-medium">
                      {locale === "de" ? "Voraussichtlich fertig" : locale === "en" ? "Estimated completion" : "Předpokládané dokončení"}
                    </p>
                    <p className="mt-1 font-medium text-base">
                      {new Date(item.estimatedCompletionDate).toLocaleDateString(
                        locale === "de" ? "de-DE" : locale === "en" ? "en-US" : "cs-CZ",
                        { day: "numeric", month: "long", year: "numeric" }
                      )}
                    </p>
                  </div>
                )}

                <div className="mt-8">
                  <Link href={inquiryHref} className="btn-primary w-full justify-center">
                    {ctaLabel}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>

                {/* Spec list */}
                <dl className="mt-12 divide-y divide-stone-200 border-y border-stone-200">
                  <SpecRow label={locale === "de" ? "Maße" : locale === "en" ? "Dimensions" : "Rozměry"}>
                    {formatDimensions(item)}
                    {item.dimensions.thicknessCm && (
                      <span className="text-stone-500"> · {locale === "de" ? "Stärke" : locale === "en" ? "thickness" : "tloušťka"} {item.dimensions.thicknessCm} cm</span>
                    )}
                  </SpecRow>
                  <SpecRow label={locale === "de" ? "Holz" : locale === "en" ? "Wood" : "Dřevo"}>
                    {item.woodType[locale]}
                  </SpecRow>
                  <SpecRow label={locale === "de" ? "Kante" : locale === "en" ? "Edge" : "Hrana"}>
                    {edgeLabel(item.edgeType, locale)}
                  </SpecRow>
                  <SpecRow label={locale === "de" ? "Gestell" : locale === "en" ? "Base" : "Podnož"}>
                    {item.legBaseType[locale]}
                  </SpecRow>
                  <SpecRow label={locale === "de" ? "Oberfläche" : locale === "en" ? "Finish" : "Povrch"}>
                    {item.finish[locale]}
                  </SpecRow>
                  {item.resinDetail !== "none" && (
                    <SpecRow label={locale === "de" ? "Harzdetail" : locale === "en" ? "Resin" : "Pryskyřice"}>
                      {item.resinDetail}
                    </SpecRow>
                  )}
                </dl>

                <p className="mt-8 text-sm text-stone-500">
                  {locale === "de"
                    ? "Lieferung nach Berlin und deutschlandweit. Preis auf Anfrage je nach Region."
                    : locale === "en"
                      ? "Delivery to Berlin and across Germany. Shipping cost on request, based on region."
                      : "Doručení do Berlína i po celém Německu. Cena dopravy na poptávku podle regionu."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="py-24 sm:py-32 mt-16">
          <div className="container-w">
            <h2 className="font-display font-light text-display-md text-ink mb-10">
              {locale === "de" ? "Ähnliche Stücke" : locale === "en" ? "Similar pieces" : "Podobné kusy"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {related.map((t) => (
                <TableCard key={t.id} item={t} locale={locale} dict={dict} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function SpecRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-4 py-4">
      <dt className="text-sm text-stone-500">{label}</dt>
      <dd className="text-sm text-ink">{children}</dd>
    </div>
  );
}

function edgeLabel(edge: TableItem["edgeType"], locale: Locale): string {
  const labels = {
    straight_edge: { de: "Gerade Kante", en: "Straight edge", cs: "Rovná hrana" },
    live_edge: { de: "Baumkante", en: "Live edge", cs: "Přírodní hrana" },
    soft_rounded: { de: "Weich gerundet", en: "Softly rounded", cs: "Jemně zaoblená" },
  } as const;
  return labels[edge as keyof typeof labels][locale];
}
