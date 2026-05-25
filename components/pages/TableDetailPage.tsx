import Link from "next/link";
import { localePath, type Locale } from "@/lib/routes";
import type { Dictionary } from "@/lib/i18n";
import { type TableItem, SAMPLE_TABLES } from "@/lib/tables";
import StatusBadge from "../StatusBadge";
import TableCard from "../TableCard";
import TableGallery from "../TableGallery";
import SizeVisualizer from "../SizeVisualizer";

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
            {dict.tableDetail.backLink}
          </Link>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-7">
              <TableGallery item={item} dict={dict} />
              <div className="mt-6">
                <SizeVisualizer item={item} dict={dict} />
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
                      {dict.tableDetail.estimatedCompletion}
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

                {/* Care kit bonus */}
                <div className="mt-4 flex items-start gap-3 p-4 rounded-xl bg-oak-50 border border-oak-100">
                  <div className="w-8 h-8 rounded-full bg-oak-200/60 flex items-center justify-center text-oak-700 shrink-0">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M5 1.5h4M6 1.5v2.5M5 4h4M3.5 8v4a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V8L9 4H5L3.5 8z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="text-xs leading-relaxed">
                    <p className="text-ink font-medium">
                      {dict.tableDetail.careTitle}
                    </p>
                    <p className="text-stone-600 mt-0.5">
                      {dict.tableDetail.careDesc}
                    </p>
                  </div>
                </div>

                {/* Spec list */}
                <dl className="mt-12 divide-y divide-stone-200 border-y border-stone-200">
                  <SpecRow label={dict.tableDetail.specDimensions}>
                    {formatDimensions(item)}
                    {item.dimensions.thicknessCm && (
                      <span className="text-stone-500"> · {dict.tableDetail.specThickness} {item.dimensions.thicknessCm} cm</span>
                    )}
                  </SpecRow>
                  <SpecRow label={dict.tableDetail.specWood}>
                    {item.woodType[locale]}
                  </SpecRow>
                  <SpecRow label={dict.tableDetail.specEdge}>
                    {edgeLabel(item.edgeType, dict)}
                  </SpecRow>
                  <SpecRow label={dict.tableDetail.specBase}>
                    {item.legBaseType[locale]}
                  </SpecRow>
                  <SpecRow label={dict.tableDetail.specFinish}>
                    {item.finish[locale]}
                  </SpecRow>
                  {item.resinDetail !== "none" && (
                    <SpecRow label={dict.tableDetail.specResin}>
                      {item.resinDetail}
                    </SpecRow>
                  )}
                </dl>

                {/* Delivery info widget */}
                <div className="mt-10 p-5 rounded-2xl bg-cream border border-stone-200/60">
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-oak-500 shrink-0">
                      <path d="M1 5h9v6H1zM10 7h3l2 2v2h-5M3 13a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM12 13a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round" />
                    </svg>
                    <span className="eyebrow">{dict.reservation.deliveryFrom}</span>
                  </div>
                  <p className="mt-3 font-display text-xl text-ink">
                    {item.status === "available"
                      ? `3–7 ${dict.reservation.daysShort}`
                      : item.status === "in_production"
                        ? `2–4 ${dict.reservation.weeksShort}`
                        : `2–4 ${dict.reservation.weeksShort}`}
                  </p>
                  <div className="mt-3 space-y-1 text-xs text-stone-600">
                    <p className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-oak-500" />
                      {dict.reservation.berlin}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-stone-400" />
                      {dict.reservation.deliveryRegion}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-stone-200">
                    <p className="text-xs text-stone-500">{dict.reservation.questions}</p>
                    <a
                      href="https://wa.me/491700000000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-2 text-sm text-ink hover:text-oak-600 transition-colors"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                      </svg>
                      {dict.reservation.callUs}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="py-24 sm:py-32 mt-16">
          <div className="container-w">
            <h2 className="font-display font-light text-display-md text-ink mb-10">
              {dict.tableDetail.similarPieces}
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

function edgeLabel(edge: TableItem["edgeType"], dict: Dictionary): string {
  const labels: Record<string, string> = {
    straight_edge: dict.tableDetail.edgeStraight,
    live_edge: dict.tableDetail.edgeLive,
    soft_rounded: dict.tableDetail.edgeRounded,
  };
  return labels[edge] ?? edge;
}
