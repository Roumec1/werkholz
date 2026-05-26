import type { Locale } from "@/lib/routes";
import type { Dictionary } from "@/lib/i18n";
import Reveal from "../Reveal";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

const WOODS = [
  {
    id: "oak",
    light: "#D9BE8E",
    mid: "#A88550",
    dark: "#6F5430",
    grain: "#3A2C1A",
  },
  {
    id: "walnut",
    light: "#8B6A3A",
    mid: "#4F3A1F",
    dark: "#2A1D0E",
    grain: "#15100A",
  },
  {
    id: "ash",
    light: "#E8DCC0",
    mid: "#C4A878",
    dark: "#8B6A3A",
    grain: "#54402A",
  },
  {
    id: "beech",
    light: "#EBD9B8",
    mid: "#C7A26A",
    dark: "#8B6A3A",
    grain: "#3A2C1A",
  },
];

export default function Materials({ dict }: Props) {
  return (
    <section className="py-24 sm:py-32 bg-bone">
      <div className="container-w">
        <Reveal className="max-w-2xl mb-16">
          <p className="eyebrow">{dict.materials.eyebrow}</p>
          <h2 className="mt-4 section-title">{dict.materials.title}</h2>
          <p className="mt-5 section-subtitle">{dict.materials.subtitle}</p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {dict.materials.items.map((item, i) => {
            const tone = WOODS[i];
            return (
              <Reveal key={item.name} delay={i * 70}>
                <article className="group">
                  <div className="relative aspect-[4/5] rounded-md overflow-hidden">
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(135deg, ${tone.light} 0%, ${tone.mid} 55%, ${tone.dark} 100%)`,
                      }}
                    />
                    {/* Wood-grain rings */}
                    <svg
                      viewBox="0 0 200 250"
                      className="absolute inset-0 w-full h-full"
                      preserveAspectRatio="xMidYMid slice"
                    >
                      <g stroke={tone.grain} strokeWidth="0.6" fill="none" opacity="0.4">
                        {Array.from({ length: 18 }).map((_, j) => (
                          <path
                            key={j}
                            d={`M0,${15 + j * 14} Q50,${10 + j * 14} 100,${17 + j * 14} T200,${15 + j * 14}`}
                          />
                        ))}
                      </g>
                      {/* Knot */}
                      <ellipse cx="130" cy="80" rx="9" ry="5" fill={tone.grain} opacity="0.3" />
                      <ellipse cx="130" cy="80" rx="5" ry="2.5" fill={tone.grain} opacity="0.55" />
                    </svg>

                    {/* Soft sheen */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>

                  <div className="mt-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-xl text-ink">{item.name}</h3>
                      <span className="text-xs uppercase tracking-widest text-stone-500">{item.origin}</span>
                    </div>
                    <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                      {item.character}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
