import Image from "next/image";
import Link from "next/link";
import type { TableItem } from "@/lib/tables";
import { localePath, type Locale } from "@/lib/routes";
import type { Dictionary } from "@/lib/i18n";
import StatusBadge from "./StatusBadge";
import TableIllustration from "./TableIllustration";

interface Props {
  item: TableItem;
  locale: Locale;
  dict: Dictionary;
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
    <Link href={href} className="group block card-hover">
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-md shadow-stone-900/5 bg-bone">
        {item.images && item.images.length > 0 ? (
          <Image
            src={item.images[0]}
            alt={item.title[locale]}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain p-4 sm:p-6 transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <TableIllustration item={item} className="absolute inset-0" />
        )}

        <div className="absolute top-4 left-4 z-10">
          <StatusBadge status={item.status} dict={dict} />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-cream/95 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 shadow-md">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="font-display text-xl text-ink leading-snug group-hover:text-graphite transition-colors">
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
