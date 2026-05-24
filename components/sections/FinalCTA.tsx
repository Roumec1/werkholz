import Link from "next/link";
import { localePath, type Locale } from "@/lib/routes";
import type { Dictionary } from "@/lib/i18n";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

export default function FinalCTA({ locale, dict }: Props) {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-w">
        <div className="relative rounded-3xl overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #1A1814 0%, #2B2722 50%, #423C32 100%)",
            }}
          />
          <svg viewBox="0 0 1200 600" className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
            <g stroke="#C4A878" strokeWidth="0.5" fill="none">
              {Array.from({ length: 24 }).map((_, i) => (
                <path key={i} d={`M0,${20 + i * 26} Q300,${10 + i * 26} 600,${30 + i * 26} T1200,${20 + i * 26}`} />
              ))}
            </g>
          </svg>

          <div className="relative px-8 py-20 sm:px-16 sm:py-28 lg:py-32 text-center max-w-3xl mx-auto">
            <h2 className="font-display font-light text-display-lg text-bone text-balance">
              {dict.finalCta.title}
            </h2>
            <p className="mt-6 text-lg text-bone/70 leading-relaxed max-w-xl mx-auto">
              {dict.finalCta.subtitle}
            </p>

            <div className="mt-10 flex flex-wrap gap-3 justify-center">
              <Link
                href={localePath(locale, "contact")}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-bone text-ink rounded-full text-sm font-medium tracking-wide hover:bg-cream transition-all duration-300 hover:gap-3"
              >
                {dict.finalCta.primary}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <a
                href="https://wa.me/491700000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-bone/30 text-bone rounded-full text-sm font-medium tracking-wide hover:border-bone hover:gap-3 transition-all duration-300"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {dict.finalCta.whatsapp}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
