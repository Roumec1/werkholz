import type { Locale } from "@/lib/routes";
import type { Dictionary } from "@/lib/i18n";
import Reveal from "../Reveal";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

// A mural of six "process moments" rendered as stylized SVGs.
// Each tile shows a different step in the workshop journey.
const TILES = [
  { svg: "planning", gradient: "linear-gradient(135deg,#F5EFE4 0%,#D9C7A6 100%)", textOnDark: false },
  { svg: "cutting", gradient: "linear-gradient(135deg,#6F5430 0%,#3A2C1A 100%)", textOnDark: true },
  { svg: "gluing", gradient: "linear-gradient(135deg,#C4A878 0%,#8B6A3A 100%)", textOnDark: true },
  { svg: "sanding", gradient: "linear-gradient(135deg,#EBE0CC 0%,#A88550 100%)", textOnDark: false },
  { svg: "finishing", gradient: "linear-gradient(135deg,#A88550 0%,#544025 100%)", textOnDark: true },
  { svg: "check", gradient: "linear-gradient(135deg,#1A1814 0%,#2B2722 100%)", textOnDark: true },
];

export default function Workshop({ dict }: Props) {
  return (
    <section className="py-24 sm:py-32 bg-cream">
      <div className="container-w">
        <Reveal className="max-w-2xl mb-16">
          <p className="eyebrow">{dict.workshop.eyebrow}</p>
          <h2 className="mt-4 section-title">{dict.workshop.title}</h2>
          <p className="mt-5 section-subtitle">{dict.workshop.subtitle}</p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {TILES.map((tile, i) => (
            <Reveal key={i} delay={i * 60}>
              <div
                className={`relative aspect-square rounded-2xl overflow-hidden group ${
                  i === 1 ? "md:row-span-2 md:aspect-auto md:h-full" : ""
                }`}
                style={{ background: tile.gradient }}
              >
                <Mural type={tile.svg as MuralType} />

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <span
                    className={`inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium ${
                      tile.textOnDark ? "text-bone" : "text-graphite"
                    }`}
                  >
                    <span
                      className="font-display text-base normal-case tracking-normal opacity-70 tabular-nums"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {dict.workshop.labels[i]}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

type MuralType = "planning" | "cutting" | "gluing" | "sanding" | "finishing" | "check";

function Mural({ type }: { type: MuralType }) {
  switch (type) {
    case "planning":
      return (
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
          {/* Blueprint */}
          <g stroke="#2A2620" strokeWidth="0.7" fill="none" opacity="0.55">
            <rect x="40" y="55" width="120" height="80" rx="2" />
            <line x1="40" y1="95" x2="160" y2="95" />
            <line x1="40" y1="115" x2="160" y2="115" />
            <line x1="80" y1="55" x2="80" y2="135" strokeDasharray="2 2" />
            <line x1="120" y1="55" x2="120" y2="135" strokeDasharray="2 2" />
            <text x="44" y="65" fontSize="7" fill="#2A2620">L=220</text>
            <text x="44" y="148" fontSize="7" fill="#2A2620">W=95</text>
          </g>
          <circle cx="155" cy="155" r="6" fill="#2A2620" opacity="0.6" />
          <line x1="155" y1="135" x2="155" y2="155" stroke="#2A2620" strokeWidth="1" opacity="0.6" />
        </svg>
      );

    case "cutting":
      return (
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
          {/* Saw blade */}
          <g transform="translate(100 95)">
            <circle r="42" fill="none" stroke="#F5EFE4" strokeWidth="1.5" opacity="0.7" />
            <circle r="34" fill="none" stroke="#F5EFE4" strokeWidth="0.7" opacity="0.5" />
            <circle r="5" fill="#F5EFE4" opacity="0.8" />
            <g stroke="#F5EFE4" strokeWidth="1" opacity="0.7">
              {Array.from({ length: 24 }).map((_, i) => {
                const a = (i / 24) * Math.PI * 2;
                const x1 = Math.cos(a) * 42;
                const y1 = Math.sin(a) * 42;
                const x2 = Math.cos(a) * 48;
                const y2 = Math.sin(a) * 48;
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
              })}
            </g>
          </g>
          {/* Wood */}
          <rect x="0" y="140" width="200" height="40" fill="#C4A878" opacity="0.7" />
          <line x1="0" y1="160" x2="200" y2="160" stroke="#3A2C1A" strokeWidth="0.5" opacity="0.4" />
          {/* Sawdust */}
          <g fill="#F5EFE4" opacity="0.7">
            {Array.from({ length: 12 }).map((_, i) => (
              <circle key={i} cx={50 + i * 12} cy={145 - Math.random() * 8} r="1" />
            ))}
          </g>
        </svg>
      );

    case "gluing":
      return (
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
          {/* Wood plank rows being joined */}
          <g>
            {Array.from({ length: 5 }).map((_, i) => (
              <rect
                key={i}
                x="30"
                y={45 + i * 22}
                width="140"
                height="18"
                rx="1"
                fill="#EBE0CC"
                opacity={0.6 + i * 0.05}
              />
            ))}
            <g stroke="#3A2C1A" strokeWidth="0.4" opacity="0.4" fill="none">
              {Array.from({ length: 5 }).map((_, i) => (
                <path
                  key={i}
                  d={`M30,${54 + i * 22} Q100,${48 + i * 22} 170,${54 + i * 22}`}
                />
              ))}
            </g>
          </g>
          {/* Clamp marks */}
          <rect x="20" y="40" width="6" height="125" rx="1" fill="#1F170E" opacity="0.6" />
          <rect x="174" y="40" width="6" height="125" rx="1" fill="#1F170E" opacity="0.6" />
        </svg>
      );

    case "sanding":
      return (
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
          {/* Sanding block */}
          <rect x="60" y="75" width="80" height="22" rx="3" fill="#1F170E" opacity="0.7" />
          <rect x="60" y="92" width="80" height="5" fill="#A88550" opacity="0.6" />
          {/* Motion lines */}
          <g stroke="#3A2C1A" strokeWidth="0.6" opacity="0.4" fill="none">
            <path d="M30,130 Q100,123 170,130" />
            <path d="M30,140 Q100,133 170,140" />
            <path d="M30,150 Q100,143 170,150" />
            <path d="M30,160 Q100,153 170,160" />
          </g>
          {/* Dust */}
          <g fill="#1F170E" opacity="0.35">
            {Array.from({ length: 24 }).map((_, i) => (
              <circle key={i} cx={20 + (i * 7) % 160} cy={110 + (i * 13) % 50} r="0.8" />
            ))}
          </g>
        </svg>
      );

    case "finishing":
      return (
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
          {/* Cloth wiping oil */}
          <g transform="translate(60 70) rotate(-12)">
            <rect width="80" height="50" rx="6" fill="#F5EFE4" opacity="0.75" />
            <path d="M0,12 Q20,8 40,12 Q60,16 80,10" stroke="#3A2C1A" strokeWidth="0.5" opacity="0.4" fill="none" />
            <path d="M0,28 Q20,32 40,26 Q60,22 80,30" stroke="#3A2C1A" strokeWidth="0.5" opacity="0.4" fill="none" />
            <path d="M0,42 Q20,38 40,42 Q60,46 80,40" stroke="#3A2C1A" strokeWidth="0.5" opacity="0.4" fill="none" />
          </g>
          {/* Oily glow */}
          <ellipse cx="100" cy="145" rx="70" ry="10" fill="#F5EFE4" opacity="0.25" />
        </svg>
      );

    case "check":
      return (
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
          {/* Checkmark surface */}
          <g stroke="#F5EFE4" strokeWidth="2" fill="none" opacity="0.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="100" cy="90" r="40" />
            <path d="M82,90 L96,104 L120,80" />
          </g>
          {/* Tally lines */}
          <g stroke="#F5EFE4" strokeWidth="1" opacity="0.5">
            <line x1="40" y1="150" x2="160" y2="150" />
            <line x1="40" y1="160" x2="130" y2="160" />
            <line x1="40" y1="170" x2="100" y2="170" />
          </g>
        </svg>
      );
  }
}
