import Image from "next/image";
import Link from "next/link";
import { localePath, type Locale } from "@/lib/routes";
import type { Dictionary } from "@/lib/i18n";
import { featuredTables, tablesByStatus } from "@/lib/tables";
import TableIllustration from "./TableIllustration";
import SpecimenCard from "./SpecimenCard";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

/**
 * Hero — editorial, restrained.
 *
 * Strips all the SaaS conventions of the prior version: no trust-checkmark
 * row, no floating "currently oak" pill, no pulse-dot chip. What's left:
 * eyebrow, large headline with italic accent, subhead, two CTAs, and a
 * single dignified meta-line linking to current pieces. On the right, one
 * clean product photo — no overlays. The hero should feel like the cover
 * of a small catalog, not a landing page.
 */
export default function Hero({ locale, dict }: Props) {
  const featured =
    featuredTables().find((t) => t.images && t.images.length > 0) ??
    featuredTables()[0];
  const heroPhoto = featured?.images?.[0];
  const liveCount =
    tablesByStatus("in_production").length + tablesByStatus("available").length;

  return (
    <section className="relative pt-32 sm:pt-40 lg:pt-48 pb-24 sm:pb-32 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cream via-bone to-bone" />
      <div className="absolute inset-0 -z-10 grain opacity-60" />

      <div className="container-w relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Text column */}
          <div className="lg:col-span-7 max-w-3xl">
            <p
              className="eyebrow animate-fade-up"
              style={{ animationDelay: "100ms", opacity: 0 }}
            >
              {dict.hero.eyebrow}
            </p>

            <h1
              className="mt-8 font-display font-light text-display-xl text-ink text-balance leading-[1.02] animate-fade-up"
              style={{ animationDelay: "200ms", opacity: 0 }}
            >
              {dict.hero.headline}{" "}
              <em className="italic text-oak-700 font-normal">
                {dict.hero.headlineAccent}
              </em>
            </h1>

            <p
              className="mt-10 text-lg sm:text-xl text-stone-600 leading-[1.7] max-w-xl animate-fade-up"
              style={{ animationDelay: "350ms", opacity: 0 }}
            >
              {dict.hero.subheadline}
            </p>

            <div
              className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-3 animate-fade-up"
              style={{ animationDelay: "500ms", opacity: 0 }}
            >
              <Link href={localePath(locale, "contact")} className="btn-primary">
                {dict.hero.cta1}
                <Arrow />
              </Link>
              <Link
                href={localePath(locale, "currentPieces")}
                className="btn-secondary"
              >
                {dict.hero.cta2}
              </Link>
            </div>

            {/* Single, dignified meta line — replaces the trust-chip row */}
            <p
              className="mt-12 flex items-center gap-3 text-sm text-stone-500 animate-fade-up"
              style={{ animationDelay: "650ms", opacity: 0 }}
            >
              <span className="block w-8 h-px bg-oak-500/70" />
              <span className="uppercase tracking-[0.18em] text-[11px] text-oak-700">
                {dict.hero.workshopLabel}
              </span>
              <Link
                href={localePath(locale, "currentPieces")}
                className="text-stone-700 hover:text-ink transition-colors"
              >
                {liveCount} {dict.hero.liveCountText} →
              </Link>
            </p>
          </div>

          {/* Photo column — clean, no overlays */}
          <div
            className="lg:col-span-5 relative animate-fade-up"
            style={{ animationDelay: "400ms", opacity: 0 }}
          >
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none rounded-md overflow-hidden border border-stone-300/60 bg-bone">
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
                featured && (
                  <TableIllustration
                    item={featured}
                    className="absolute inset-0"
                  />
                )
              )}
              {featured && (
                <SpecimenCard item={featured} locale={locale} position="bottom-left" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="-mr-0.5"
    >
      <path
        d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
