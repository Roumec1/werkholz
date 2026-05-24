import Link from "next/link";
import { localePath, type Locale } from "@/lib/routes";
import type { Dictionary } from "@/lib/i18n";
import { tablesByStatus } from "@/lib/tables";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

export default function CurrentPreview({ locale, dict }: Props) {
  const blocks = [
    {
      key: "available" as const,
      label: dict.currentPreview.available,
      count: tablesByStatus("available").length,
      colorClass: "bg-status-available/10 text-status-available",
      indicator: true,
    },
    {
      key: "production" as const,
      label: dict.currentPreview.production,
      count: tablesByStatus("in_production").length,
      colorClass: "bg-status-production/15 text-status-production",
      indicator: false,
    },
    {
      key: "sold" as const,
      label: dict.currentPreview.soldInspiration,
      count: tablesByStatus("sold").length + tablesByStatus("reserved").length,
      colorClass: "bg-stone-200 text-stone-600",
      indicator: false,
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-ink text-bone relative overflow-hidden">
      <div className="absolute inset-0 grain opacity-50" />
      <div className="container-w relative">
        <div className="max-w-2xl mb-16">
          <p className="eyebrow text-stone-400">{dict.currentPreview.eyebrow}</p>
          <h2 className="mt-4 font-display font-light text-display-lg text-bone">
            {dict.currentPreview.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {blocks.map((block) => (
            <Link
              key={block.key}
              href={localePath(locale, "currentPieces")}
              className="group relative bg-stone-900 rounded-2xl p-8 sm:p-10 hover:bg-stone-800 transition-colors duration-500 border border-stone-800"
            >
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wide ${block.colorClass}`}>
                {block.indicator && <span className="pulse-dot" />}
                {block.label}
              </div>

              <div className="mt-8 flex items-baseline gap-3">
                <span className="font-display text-6xl sm:text-7xl text-bone tabular-nums">
                  {block.count}
                </span>
                <span className="text-stone-400 text-sm">
                  {block.count === 1
                    ? locale === "de" ? "Stück" : locale === "en" ? "piece" : "kus"
                    : locale === "de" ? "Stücke" : locale === "en" ? "pieces" : "kusů"}
                </span>
              </div>

              <div className="mt-10 inline-flex items-center gap-2 text-sm text-bone/70 group-hover:text-bone group-hover:gap-3 transition-all duration-300">
                {dict.currentPreview.viewAll}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
