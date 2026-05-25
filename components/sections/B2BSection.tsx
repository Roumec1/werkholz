import Link from "next/link";
import { localePath, type Locale } from "@/lib/routes";
import type { Dictionary } from "@/lib/i18n";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

export default function B2BSection({ locale, dict }: Props) {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-w">
        <div className="rounded-3xl bg-cream overflow-hidden border border-stone-200/60">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="p-10 sm:p-14 lg:p-16">
              <p className="eyebrow">{dict.b2b.eyebrow}</p>
              <h2 className="mt-4 section-title text-balance">
                {dict.b2b.title}
              </h2>
              <p className="mt-6 text-stone-600 leading-relaxed text-lg max-w-prose">
                {dict.b2b.subtitle}
              </p>

              <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {dict.b2b.useCases.map((useCase) => (
                  <li key={useCase} className="flex items-center gap-3 text-stone-700">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-oak-500 shrink-0">
                      <path d="M3 7l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-sm">{useCase}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Link href={localePath(locale, "forBusinesses")} className="btn-primary">
                  {dict.b2b.cta}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>

            <div
              className="relative min-h-[400px] lg:min-h-[600px]"
              style={{
                background:
                  "linear-gradient(135deg, #8B6A3A 0%, #544025 50%, #2A2620 100%)",
              }}
            >
              <svg viewBox="0 0 400 600" className="absolute inset-0 w-full h-full opacity-25" preserveAspectRatio="none">
                <g stroke="#1F170E" strokeWidth="0.5" fill="none">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <path key={i} d={`M0,${30 + i * 32} Q100,${25 + i * 32} 200,${35 + i * 32} T400,${30 + i * 32}`} />
                  ))}
                </g>
              </svg>

              {/* Floating spec card */}
              <div className="absolute bottom-8 left-8 right-8 sm:left-10 sm:right-10 bg-bone rounded-2xl p-6 shadow-xl">
                <p className="eyebrow">
                  {dict.b2b.batchTitle}
                </p>
                <p className="mt-3 font-display text-xl text-ink leading-tight">
                  {dict.b2b.batchText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
