import Image from "next/image";
import Link from "next/link";
import { localePath, type Locale } from "@/lib/routes";
import type { Dictionary } from "@/lib/i18n";
import { featuredTables, tablesByStatus } from "@/lib/tables";
import TableIllustration from "./TableIllustration";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

export default function Hero({ locale, dict }: Props) {
  // Prefer a featured piece with real photos for the hero visual
  const featured =
    featuredTables().find((t) => t.images && t.images.length > 0) ??
    featuredTables()[0];
  const heroPhoto = featured?.images?.[0];
  const liveCount = tablesByStatus("in_production").length + tablesByStatus("available").length;

  return (
    <section className="relative pt-32 sm:pt-40 lg:pt-44 pb-20 sm:pb-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-cream via-bone to-bone" />
        <div className="absolute inset-0 grain" />
      </div>

      <div className="container-w relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7 max-w-3xl">
            <p className="eyebrow animate-fade-up" style={{ animationDelay: "100ms", opacity: 0 }}>
              {dict.hero.eyebrow}
            </p>

            <h1
              className="mt-6 font-display font-light text-display-xl text-ink text-balance animate-fade-up"
              style={{ animationDelay: "200ms", opacity: 0 }}
            >
              {dict.hero.headline}{" "}
              <em className="italic text-oak-700 font-normal">
                {dict.hero.headlineAccent}
              </em>
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

          {/* Hero visual — real table illustration of the featured piece */}
          <div
            className="lg:col-span-5 relative animate-fade-up"
            style={{ animationDelay: "400ms", opacity: 0 }}
          >
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none rounded-3xl overflow-hidden shadow-2xl shadow-oak-900/15 bg-bone">
              {heroPhoto ? (
                <Image
                  src={heroPhoto}
                  alt={featured?.title[locale] ?? ""}
                  fill
                  sizes="(min-width: 1024px) 42vw, 90vw"
                  className="object-cover scale-[1.05]"
                  priority
                />
              ) : (
                featured && <TableIllustration item={featured} className="absolute inset-0" />
              )}
            </div>

            {/* Floating live-status chip */}
            <div className="absolute -bottom-5 -left-3 sm:-left-6 bg-cream rounded-2xl p-5 shadow-xl shadow-stone-900/10 border border-stone-200/60 max-w-[260px]">
              <div className="flex items-center gap-2 text-status-available">
                <span className="pulse-dot" />
                <span className="text-xs uppercase tracking-widest font-medium">
                  {dict.hero.workshopLabel}
                </span>
              </div>
              <p className="mt-3 font-display text-lg leading-tight text-ink">
                {liveCount}{" "}
                {dict.hero.liveCountText}
              </p>
            </div>

            {/* Floating spec chip */}
            {featured && (
              <div className="absolute -top-3 -right-3 sm:-right-6 bg-ink text-bone rounded-2xl px-5 py-4 shadow-xl shadow-ink/20 hidden sm:block">
                <p className="text-[10px] uppercase tracking-widest text-stone-400">
                  {dict.hero.currentlyLabel}
                </p>
                <p className="mt-1 font-display text-lg">{featured.woodType[locale]}</p>
              </div>
            )}
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
