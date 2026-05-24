import Link from "next/link";
import { localePath, type Locale } from "@/lib/routes";
import type { Dictionary } from "@/lib/i18n";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

const CARDS: Array<{
  key: "coffee" | "dining" | "bistro" | "desk" | "business";
  gradient: string;
  big?: boolean;
}> = [
  {
    key: "dining",
    gradient: "linear-gradient(135deg, #C4A878 0%, #8B6A3A 60%, #3A2C1A 100%)",
    big: true,
  },
  {
    key: "coffee",
    gradient: "linear-gradient(135deg, #EBE0CC 0%, #C4A878 60%, #6F5430 100%)",
  },
  {
    key: "bistro",
    gradient: "linear-gradient(135deg, #D9C7A6 0%, #A88550 60%, #544025 100%)",
  },
  {
    key: "desk",
    gradient: "linear-gradient(135deg, #F5EFE4 0%, #C4A878 60%, #8B6A3A 100%)",
  },
  {
    key: "business",
    gradient: "linear-gradient(135deg, #6F5430 0%, #3A2C1A 60%, #1F170E 100%)",
  },
];

export default function Categories({ locale, dict }: Props) {
  return (
    <section className="py-24 sm:py-32 bg-cream">
      <div className="container-w">
        <div className="max-w-2xl mb-16">
          <p className="eyebrow">{dict.categories.eyebrow}</p>
          <h2 className="mt-4 section-title">{dict.categories.title}</h2>
          <p className="mt-5 section-subtitle">{dict.categories.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {CARDS.map((card) => {
            const cat = dict.categories[card.key];
            return (
              <Link
                key={card.key}
                href={localePath(locale, "currentPieces")}
                className={`group relative overflow-hidden rounded-2xl card-hover ${
                  card.big ? "lg:col-span-2 lg:row-span-2 aspect-square lg:aspect-auto" : "aspect-[4/5]"
                }`}
              >
                <div
                  className="absolute inset-0"
                  style={{ background: card.gradient }}
                />
                <svg viewBox="0 0 400 500" className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
                  <g stroke="#1F170E" strokeWidth="0.4" fill="none">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <path key={i} d={`M0,${30 + i * 32} Q100,${25 + i * 32} 200,${35 + i * 32} T400,${30 + i * 32}`} />
                    ))}
                  </g>
                </svg>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />

                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-bone">
                  <h3 className={`font-display ${card.big ? "text-3xl sm:text-4xl" : "text-2xl"} leading-tight`}>
                    {cat.title}
                  </h3>
                  <p className="mt-3 text-bone/80 text-sm leading-relaxed max-w-md text-pretty">
                    {cat.desc}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-500">
                    {dict.featured.viewAll}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
