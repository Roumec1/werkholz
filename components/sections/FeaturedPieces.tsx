import Link from "next/link";
import { localePath, type Locale } from "@/lib/routes";
import type { Dictionary } from "@/lib/i18n";
import { featuredTables } from "@/lib/tables";
import TableCard from "../TableCard";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

export default function FeaturedPieces({ locale, dict }: Props) {
  const items = featuredTables();

  return (
    <section className="py-24 sm:py-32">
      <div className="container-w">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <p className="eyebrow">{dict.featured.eyebrow}</p>
            <h2 className="mt-4 section-title">{dict.featured.title}</h2>
            <p className="mt-5 section-subtitle">{dict.featured.subtitle}</p>
          </div>

          <Link href={localePath(locale, "currentPieces")} className="btn-ghost shrink-0">
            {dict.featured.viewAll}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {items.map((item) => (
            <TableCard key={item.id} item={item} locale={locale} dict={dict} />
          ))}
        </div>
      </div>
    </section>
  );
}
