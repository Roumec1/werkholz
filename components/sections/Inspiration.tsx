import Link from "next/link";
import { localePath, type Locale } from "@/lib/routes";
import type { Dictionary } from "@/lib/i18n";
import { SAMPLE_TABLES, tablesByStatus } from "@/lib/tables";
import TableIllustration from "../TableIllustration";
import Reveal from "../Reveal";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

export default function Inspiration({ locale, dict }: Props) {
  // Use sold + reserved + a couple available as inspiration grid
  const sold = tablesByStatus("sold");
  const reserved = tablesByStatus("reserved");
  const available = tablesByStatus("available");
  const pieces = [...sold, ...reserved, ...available].slice(0, 5);
  // Fallback if we don't have enough — pad with featured
  while (pieces.length < 5) pieces.push(SAMPLE_TABLES[pieces.length % SAMPLE_TABLES.length]);

  return (
    <section className="py-24 sm:py-32 bg-cream">
      <div className="container-w">
        <Reveal className="max-w-2xl mb-14">
          <p className="eyebrow">{dict.inspiration.eyebrow}</p>
          <h2 className="mt-4 section-title">{dict.inspiration.title}</h2>
          <p className="mt-5 section-subtitle">{dict.inspiration.subtitle}</p>
        </Reveal>

        {/* Asymmetric mosaic */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {/* Big featured */}
          <Reveal className="col-span-2 row-span-2 sm:col-span-2 sm:row-span-2">
            <Tile item={pieces[0]} locale={locale} aspect="square" big />
          </Reveal>
          <Reveal delay={80}>
            <Tile item={pieces[1]} locale={locale} aspect="tall" />
          </Reveal>
          <Reveal delay={140}>
            <Tile item={pieces[2]} locale={locale} aspect="tall" />
          </Reveal>
          <Reveal delay={200} className="col-span-2">
            <Tile item={pieces[3]} locale={locale} aspect="wide" />
          </Reveal>
        </div>

        <div className="mt-10 flex justify-center">
          <Link href={localePath(locale, "currentPieces")} className="btn-secondary">
            {dict.featured.viewAll}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Tile({
  item,
  locale,
  aspect,
  big = false,
}: {
  item: import("@/lib/tables").TableItem;
  locale: Locale;
  aspect: "square" | "tall" | "wide";
  big?: boolean;
}) {
  const aspectClass =
    aspect === "square" ? "aspect-square" : aspect === "tall" ? "aspect-[3/4]" : "aspect-[2/1]";
  return (
    <Link
      href={localePath(locale, "currentPieces", item.slug[locale])}
      className={`group relative block w-full h-full overflow-hidden rounded-md card-hover bg-bone`}
    >
      <div className={`relative w-full h-full ${big ? "" : aspectClass}`}>
        {big && <div className="aspect-square sm:aspect-auto sm:h-full" />}
        <div className="absolute inset-0">
          <TableIllustration item={item} className="absolute inset-0" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-bone">
          <p className={`font-display ${big ? "text-2xl sm:text-3xl" : "text-lg"} leading-tight`}>
            {item.title[locale]}
          </p>
          <p className="mt-1 text-xs text-bone/70 uppercase tracking-widest">
            {item.woodType[locale]}
          </p>
        </div>
      </div>
    </Link>
  );
}
