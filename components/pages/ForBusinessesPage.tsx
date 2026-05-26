import type { Locale } from "@/lib/routes";
import type { Dictionary } from "@/lib/i18n";
import PageHeader from "./PageHeader";
import FinalCTA from "../sections/FinalCTA";
import Process from "../sections/Process";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

export default function ForBusinessesPage({ locale, dict }: Props) {
  const benefits = dict.b2b.benefits;

  return (
    <>
      <PageHeader
        eyebrow={dict.b2b.eyebrow}
        title={dict.b2b.title}
        subtitle={dict.b2b.subtitle}
      />

      <section className="py-12 sm:py-20">
        <div className="container-w">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dict.b2b.useCases.map((useCase, i) => (
              <div
                key={useCase}
                className="p-8 rounded-md bg-cream border border-stone-200/60 hover:border-stone-300 transition-colors"
              >
                <span className="font-display text-4xl text-oak-400 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-4 font-display text-xl text-ink">{useCase}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-w">
          <div className="max-w-2xl mb-12">
            <p className="eyebrow">{dict.b2b.differenceEyebrow}</p>
            <h2 className="mt-4 section-title">{dict.b2b.differenceTitle}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="p-8 sm:p-10 rounded-md border border-stone-200">
                <h3 className="font-display text-2xl text-ink">{b.title}</h3>
                <p className="mt-3 text-stone-600 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Process locale={locale} dict={dict} />
      <FinalCTA locale={locale} dict={dict} />
    </>
  );
}
