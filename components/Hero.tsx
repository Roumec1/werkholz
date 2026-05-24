import Link from "next/link";
import { localePath, type Locale } from "@/lib/routes";
import type { Dictionary } from "@/lib/i18n";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

export default function Hero({ locale, dict }: Props) {
  return (
    <section className="relative pt-32 sm:pt-40 lg:pt-44 pb-20 sm:pb-28 overflow-hidden">
      {/* Background wood-grain hero illustration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-cream via-bone to-bone" />
        <div className="absolute top-0 right-0 w-[60%] h-full opacity-60 hidden md:block">
          <WoodGrainBackdrop />
        </div>
        <div className="absolute inset-0 grain" />
      </div>

      <div className="container-w relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 max-w-3xl">
            <p className="eyebrow animate-fade-up" style={{ animationDelay: "100ms", opacity: 0 }}>
              {dict.hero.eyebrow}
            </p>

            <h1
              className="mt-6 font-display font-light text-display-xl text-ink text-balance animate-fade-up"
              style={{ animationDelay: "200ms", opacity: 0 }}
            >
              {dict.hero.headline}
            </h1>

            <p
              className="mt-8 text-lg sm:text-xl text-stone-600 leading-relaxed max-w-2xl animate-fade-up"
              style={{ animationDelay: "350ms", opacity: 0 }}
            >
              {dict.hero.subheadline}
            </p>

            <div
              className="mt-10 flex flex-wrap gap-3 animate-fade-up"
              style={{ animationDelay: "500ms", opacity: 0 }}
            >
              <Link href={localePath(locale, "contact")} className="btn-primary">
                {dict.hero.cta1}
                <Arrow />
              </Link>
              <Link href={localePath(locale, "currentPieces")} className="btn-secondary">
                {dict.hero.cta2}
              </Link>
            </div>

            <div
              className="mt-14 flex flex-wrap gap-x-8 gap-y-3 animate-fade-up"
              style={{ animationDelay: "650ms", opacity: 0 }}
            >
              <TrustPoint>{dict.hero.trust1}</TrustPoint>
              <TrustPoint>{dict.hero.trust2}</TrustPoint>
              <TrustPoint>{dict.hero.trust3}</TrustPoint>
            </div>
          </div>

          {/* Hero visual — large stylized table card */}
          <div
            className="lg:col-span-5 relative animate-fade-up"
            style={{ animationDelay: "400ms", opacity: 0 }}
          >
            <HeroTableVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustPoint({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-sm text-stone-700">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-oak-500">
        <path d="M3 7l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {children}
    </div>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="-mr-0.5">
      <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WoodGrainBackdrop() {
  return (
    <svg
      viewBox="0 0 800 1000"
      className="w-full h-full"
      preserveAspectRatio="xMaxYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="wg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D9C7A6" stopOpacity="0.5" />
          <stop offset="50%" stopColor="#A88550" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#6F5430" stopOpacity="0.6" />
        </linearGradient>
        <filter id="blur">
          <feGaussianBlur stdDeviation="40" />
        </filter>
      </defs>
      <rect width="800" height="1000" fill="url(#wg)" />
      <g opacity="0.25" stroke="#3A2C1A" strokeWidth="1" fill="none" filter="url(#blur)">
        <path d="M0,200 Q200,180 400,210 T800,200" />
        <path d="M0,300 Q200,280 400,310 T800,300" />
        <path d="M0,400 Q200,380 400,410 T800,400" />
        <path d="M0,500 Q200,480 400,510 T800,500" />
        <path d="M0,600 Q200,580 400,610 T800,600" />
        <path d="M0,700 Q200,680 400,710 T800,700" />
        <path d="M0,800 Q200,780 400,810 T800,800" />
      </g>
    </svg>
  );
}

function HeroTableVisual() {
  return (
    <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none">
      {/* Decorative card with rich gradient */}
      <div
        className="absolute inset-0 rounded-3xl shadow-2xl shadow-oak-900/20 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #C4A878 0%, #A88550 35%, #6F5430 70%, #3A2C1A 100%)",
        }}
      >
        {/* Subtle wood-grain lines */}
        <svg viewBox="0 0 400 500" className="w-full h-full opacity-30">
          <g stroke="#1F170E" strokeWidth="0.5" fill="none">
            {Array.from({ length: 14 }).map((_, i) => (
              <path
                key={i}
                d={`M0,${40 + i * 32} Q100,${35 + i * 32} 200,${45 + i * 32} T400,${40 + i * 32}`}
              />
            ))}
          </g>
        </svg>
      </div>

      {/* Floating status chip */}
      <div className="absolute -bottom-4 -left-4 sm:-left-6 bg-cream rounded-2xl p-5 shadow-xl shadow-stone-900/10 border border-stone-200/60 max-w-[240px]">
        <div className="flex items-center gap-2 text-status-available">
          <span className="pulse-dot" />
          <span className="text-xs uppercase tracking-widest font-medium">
            In der Werkstatt
          </span>
        </div>
        <p className="mt-3 font-display text-lg leading-tight text-ink">
          6 Tische gerade in Fertigung
        </p>
      </div>

      {/* Floating spec chip */}
      <div className="absolute -top-4 -right-4 sm:-right-6 bg-ink text-bone rounded-2xl px-5 py-4 shadow-xl shadow-ink/20 hidden sm:block">
        <p className="text-[10px] uppercase tracking-widest text-stone-400">Material</p>
        <p className="mt-1 font-display text-lg">Massivholz</p>
      </div>
    </div>
  );
}
