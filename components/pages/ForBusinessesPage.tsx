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
  const benefits = [
    {
      title: locale === "de" ? "Passende Serien" : locale === "en" ? "Matching batches" : "Sjednocené série",
      desc:
        locale === "de"
          ? "Mehrere Tische aus derselben Holzcharge, konsistente Maße und gleiches Finish."
          : locale === "en"
            ? "Multiple tables from the same wood batch, consistent dimensions and identical finish."
            : "Více stolů ze stejné šarže dřeva, konzistentní rozměry a stejný povrch.",
    },
    {
      title: locale === "de" ? "Robuste matte Oberflächen" : locale === "en" ? "Durable matte surfaces" : "Odolné matné povrchy",
      desc:
        locale === "de"
          ? "Hartwachsöl-Finish: alltagstauglich, reparierbar, ohne Hochglanz."
          : locale === "en"
            ? "Hard wax oil finish: built for daily use, easy to repair, no high-gloss."
            : "Tvrdý voskový olej: pro každodenní použití, snadno opravitelný, bez vysokého lesku.",
    },
    {
      title: locale === "de" ? "Planbare Fertigung" : locale === "en" ? "Predictable production" : "Plánovatelná výroba",
      desc:
        locale === "de"
          ? "Klare Termine, abgestimmte Lieferung, planbar für Renovierung oder Eröffnung."
          : locale === "en"
            ? "Clear deadlines, coordinated delivery, planned around renovation or opening."
            : "Jasné termíny, koordinované doručení, plánovatelné kolem renovace nebo otevření.",
    },
    {
      title: locale === "de" ? "Direkter Kontakt" : locale === "en" ? "Direct contact" : "Přímý kontakt",
      desc:
        locale === "de"
          ? "Sie sprechen direkt mit der Werkstatt. Kein Zwischenhandel, keine Filialkette."
          : locale === "en"
            ? "You speak directly with the workshop. No middlemen, no franchise."
            : "Mluvíte přímo s dílnou. Žádní prostředníci, žádný řetězec.",
    },
  ];

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
                className="p-8 rounded-2xl bg-cream border border-stone-200/60 hover:border-stone-300 transition-colors"
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
            <p className="eyebrow">{locale === "de" ? "Was wir anders machen" : locale === "en" ? "What we do differently" : "Co děláme jinak"}</p>
            <h2 className="mt-4 section-title">
              {locale === "de"
                ? "Vier Punkte, die für Firmen den Unterschied machen."
                : locale === "en"
                  ? "Four things that make the difference for businesses."
                  : "Čtyři věci, které pro firmy dělají rozdíl."}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="p-8 sm:p-10 rounded-2xl border border-stone-200">
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
