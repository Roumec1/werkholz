import type { Locale } from "@/lib/routes";
import type { Dictionary } from "@/lib/i18n";
import PageHeader from "./PageHeader";
import Materials from "../sections/Materials";
import Care from "../sections/Care";
import FinalCTA from "../sections/FinalCTA";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

const DETAILS: Array<{ id: string; light: string; mid: string; dark: string; grain: string }> = [
  { id: "oak", light: "#D9BE8E", mid: "#A88550", dark: "#6F5430", grain: "#3A2C1A" },
  { id: "walnut", light: "#8B6A3A", mid: "#4F3A1F", dark: "#2A1D0E", grain: "#15100A" },
  { id: "ash", light: "#E8DCC0", mid: "#C4A878", dark: "#8B6A3A", grain: "#54402A" },
  { id: "beech", light: "#EBD9B8", mid: "#C7A26A", dark: "#8B6A3A", grain: "#3A2C1A" },
];

export default function MaterialsPage({ locale, dict }: Props) {
  return (
    <>
      <PageHeader
        eyebrow={dict.materials.eyebrow}
        title={dict.materials.title}
        subtitle={dict.materials.subtitle}
      />

      {/* Big wood character splits */}
      <section className="pb-12 sm:pb-16">
        <div className="container-w space-y-4 sm:space-y-6">
          {dict.materials.items.map((item, i) => {
            const tone = DETAILS[i];
            const reverse = i % 2 === 1;
            return (
              <div
                key={item.name}
                className={`grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-stone-200/60 bg-cream ${
                  reverse ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div
                  className="aspect-[3/2] md:aspect-auto relative min-h-[280px]"
                  style={{
                    background: `linear-gradient(135deg, ${tone.light} 0%, ${tone.mid} 55%, ${tone.dark} 100%)`,
                  }}
                >
                  <svg
                    viewBox="0 0 400 300"
                    preserveAspectRatio="xMidYMid slice"
                    className="absolute inset-0 w-full h-full"
                  >
                    <g stroke={tone.grain} strokeWidth="0.6" fill="none" opacity="0.4">
                      {Array.from({ length: 22 }).map((_, j) => (
                        <path
                          key={j}
                          d={`M0,${15 + j * 14} Q100,${10 + j * 14} 200,${17 + j * 14} T400,${15 + j * 14}`}
                        />
                      ))}
                    </g>
                    <ellipse cx="280" cy="120" rx="14" ry="8" fill={tone.grain} opacity="0.3" />
                    <ellipse cx="280" cy="120" rx="8" ry="4" fill={tone.grain} opacity="0.5" />
                  </svg>
                </div>

                <div className="p-8 sm:p-10 lg:p-14 flex flex-col justify-center">
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="font-display text-3xl sm:text-4xl text-ink">{item.name}</h2>
                    <span className="text-xs uppercase tracking-widest text-stone-500">
                      {item.origin}
                    </span>
                  </div>
                  <p className="mt-5 text-stone-700 leading-relaxed">{item.character}</p>

                  {/* Quick attribute pills */}
                  <div className="mt-8 flex flex-wrap gap-2">
                    {[
                      { label: locale === "de" ? "Härte" : locale === "en" ? "Hardness" : "Tvrdost", value: i === 0 ? "★★★★" : i === 1 ? "★★★★★" : i === 2 ? "★★★" : "★★★★" },
                      { label: locale === "de" ? "Lieblings für" : locale === "en" ? "Best for" : "Nejlépe pro", value: i === 0 ? (locale === "de" ? "Esstische" : locale === "en" ? "Dining tables" : "Jídelní stoly") : i === 1 ? (locale === "de" ? "Wohntische" : locale === "en" ? "Living rooms" : "Obývací pokoje") : i === 2 ? (locale === "de" ? "Schreibtische" : locale === "en" ? "Desks" : "Psací stoly") : (locale === "de" ? "Küchen" : locale === "en" ? "Kitchens" : "Kuchyně") },
                    ].map((attr) => (
                      <span
                        key={attr.label}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bone border border-stone-200 text-xs text-stone-700"
                      >
                        <span className="text-stone-500">{attr.label}:</span>
                        <span className="text-ink">{attr.value}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Care dict={dict} />
      <Materials locale={locale} dict={dict} />
      <FinalCTA locale={locale} dict={dict} />
    </>
  );
}
