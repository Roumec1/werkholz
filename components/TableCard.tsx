import Link from "next/link";
import type { TableItem } from "@/lib/tables";
import { localePath, type Locale } from "@/lib/routes";
import type { Dictionary } from "@/lib/i18n";
import StatusBadge from "./StatusBadge";

interface Props {
  item: TableItem;
  locale: Locale;
  dict: Dictionary;
  priority?: boolean;
}

function formatDimensions(item: TableItem): string {
  const d = item.dimensions;
  if (d.diameterCm) return `Ø ${d.diameterCm} × ${d.heightCm} cm`;
  if (d.lengthCm && d.widthCm) return `${d.lengthCm} × ${d.widthCm} × ${d.heightCm} cm`;
  return `${d.heightCm} cm`;
}

function formatPrice(item: TableItem, dict: Dictionary): string {
  if (!item.price) return dict.cta.onRequest;
  return `${item.price.toLocaleString("de-DE")} €`;
}

export default function TableCard({ item, locale, dict }: Props) {
  const href = localePath(locale, "currentPieces", item.slug[locale]);

  return (
    <Link
      href={href}
      className="group block card-hover"
    >
      <div
        className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-md shadow-stone-900/5"
        style={{ background: item.placeholderGradient }}
      >
        {/* Subtle wood grain overlay */}
        <svg viewBox="0 0 400 500" className="absolute inset-0 w-full h-full opacity-20">
          <g stroke="#1F170E" strokeWidth="0.4" fill="none">
            {Array.from({ length: 12 }).map((_, i) => (
              <path
                key={i}
                d={`M0,${40 + i * 38} Q100,${35 + i * 38} 200,${45 + i * 38} T400,${40 + i * 38}`}
              />
            ))}
          </g>
        </svg>

        <div className="absolute top-4 left-4">
          <StatusBadge status={item.status} dict={dict} />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-cream/95 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="font-display text-xl text-ink leading-snug">
          {item.title[locale]}
        </h3>
        <div className="mt-2 flex items-baseline justify-between gap-3">
          <p className="text-sm text-stone-500">{formatDimensions(item)}</p>
          <p className="text-sm font-medium text-ink">{formatPrice(item, dict)}</p>
        </div>
      </div>
    </Link>
  );
}
