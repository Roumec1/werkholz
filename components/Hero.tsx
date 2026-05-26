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

/**
 * Hero — Japanese-restraint reset.
 *
 * Reference: karimoku-casestudy.com, ariake-collection.com, timeandstyle.com.
 * One large quiet photograph. A narrow text block beside it with tiny type,
 * massive whitespace, and asymmetric placement. No floating widgets, no
 * SpecimenCard overlay (that moves to the gallery), no border or radius
 * on the photo, no trust chips. The composition breathes.
 *
 * Type is intentionally SMALLER than typical landing pages — restraint
 * IS the brand signal. Big type screams; tiny type whispers.
 */
export default function Hero({ locale, dict }: Props) {
  const featured =
    featuredTables().find((t) => t.images && t.images.length > 0) ??
    featuredTables()[0];
  const heroPhoto = featured?.images?.[0];
  const liveCount =
    tablesByStatus("in_production").length + tablesByStatus("available").length;

  return (
    <section className="relative pt-32 sm:pt-40 lg:pt-48 pb-32 sm:pb-48">
      <div className="container-w">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          {/* Photograph — large, unframed, no chrome */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="relative aspect-[4/5] w-full max-w-2xl mx-auto lg:mx-0 bg-bone">
              {heroPhoto ? (
                <Image
                  src={heroPhoto}
                  alt={featured?.title[locale] ?? ""}
                  fill
                  sizes="(min-width: 1024px) 55vw, 90vw"
                  className="object-cover"
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
            </div>
          </div>

          {/* Text — narrow, tiny type, generous vertical rhythm */}
          <div className="lg:col-span-5 order-1 lg:order-2 max-w-sm lg:max-w-none">
            <p
              className="eyebrow animate-fade-up"
              style={{ animationDelay: "100ms", opacity: 0 }}
            >
              {dict.hero.eyebrow}
            </p>

            <h1
              className="mt-10 font-display font-light text-3xl sm:text-[2.25rem] lg:text-[2.5rem] text-ink leading-[1.18] text-balance animate-fade-up"
              style={{ animationDelay: "200ms", opacity: 0 }}
            >
              {dict.hero.headline}{" "}
              <em className="italic text-ink/60 font-normal">
                {dict.hero.headlineAccent}
              </em>
            </h1>

            <p
              className="mt-10 text-[15px] text-graphite leading-[1.85] max-w-sm animate-fade-up"
              style={{ animationDelay: "350ms", opacity: 0 }}
            >
              {dict.hero.subheadline}
            </p>

            {/* CTAs as quiet text links — no pills, no buttons */}
            <div
              className="mt-14 flex flex-col gap-5 animate-fade-up"
              style={{ animationDelay: "500ms", opacity: 0 }}
            >
              <Link
                href={localePath(locale, "contact")}
                className="inline-flex items-center gap-3 text-sm text-ink border-b border-ink/45 pb-1.5 w-fit hover:border-ink hover:gap-4 transition-all"
              >
                {dict.hero.cta1}
                <Arrow />
              </Link>
              <Link
                href={localePath(locale, "currentPieces")}
                className="inline-flex items-center gap-3 text-sm text-graphite border-b border-graphite/30 pb-1.5 w-fit hover:text-ink hover:border-ink transition-colors"
              >
                {dict.hero.cta2}
              </Link>
            </div>

            <p
              className="mt-16 text-[10px] uppercase tracking-[0.32em] text-graphite/75 animate-fade-up"
              style={{ animationDelay: "650ms", opacity: 0 }}
            >
              {dict.hero.workshopLabel} · {liveCount} {dict.hero.liveCountText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
      <path
        d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
