"use client";

import Link from "next/link";

interface HeroProps {
  locale: string;
  dict: Record<string, any>;
}

export default function Hero({ locale, dict }: HeroProps) {
  const hero = dict.hero;

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-stone-100 to-stone-50 px-4 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-stone-900 mb-6 leading-tight">
          {hero.headline}
        </h1>

        <p className="text-xl text-stone-700 mb-12 leading-relaxed max-w-2xl mx-auto">
          {hero.subheadline}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/${locale}/kontakt`}
            className="px-8 py-3 bg-stone-900 text-white font-medium rounded hover:bg-stone-800 transition"
          >
            {hero.cta1}
          </Link>

          <Link
            href={`/${locale}/aktuelle-stuecke`}
            className="px-8 py-3 border-2 border-stone-900 text-stone-900 font-medium rounded hover:bg-stone-50 transition"
          >
            {hero.cta2}
          </Link>
        </div>

        {/* Trust points */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-stone-200">
          <div>
            <p className="text-stone-600">
              {locale === "de"
                ? "Massivholz"
                : locale === "en"
                  ? "Solid wood"
                  : "Masivní dřevo"}
            </p>
          </div>
          <div>
            <p className="text-stone-600">
              {locale === "de"
                ? "Nach Maß gefertigt"
                : locale === "en"
                  ? "Made to order"
                  : "Vyrobeno na míru"}
            </p>
          </div>
          <div>
            <p className="text-stone-600">
              {locale === "de"
                ? "Lieferung deutschlandweit"
                : locale === "en"
                  ? "Delivered across Germany"
                  : "Doručeno po celém Německu"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
