import type { Locale } from "@/lib/routes";
import type { Dictionary } from "@/lib/i18n";
import PageHeader from "./PageHeader";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

export default function ImpressumPage({ locale, dict }: Props) {
  return (
    <>
      <PageHeader
        eyebrow={dict.footer.legalTitle}
        title={dict.footer.imprint}
      />

      <section className="pb-32">
        <div className="container-w">
          <div className="max-w-2xl prose prose-stone">
            <h2 className="font-display text-2xl text-ink mt-12 mb-4">
              {locale === "de" ? "Angaben gemäß § 5 TMG" : locale === "en" ? "Information according to § 5 TMG" : "Údaje dle § 5 TMG"}
            </h2>
            <p className="text-stone-700 leading-relaxed">
              [WERKHOLZ]<br />
              [Company legal name]<br />
              [Street, number]<br />
              [Postal code, City, Country]
            </p>

            <h3 className="font-display text-xl text-ink mt-10 mb-3">
              {locale === "de" ? "Vertreten durch" : locale === "en" ? "Represented by" : "Zastoupena"}
            </h3>
            <p className="text-stone-700">[Owner / Managing Director]</p>

            <h3 className="font-display text-xl text-ink mt-10 mb-3">
              {locale === "de" ? "Kontakt" : locale === "en" ? "Contact" : "Kontakt"}
            </h3>
            <p className="text-stone-700">
              {locale === "de" ? "Telefon" : locale === "en" ? "Phone" : "Telefon"}: [+49 …]<br />
              E-Mail: hello@werkholz.de
            </p>

            <h3 className="font-display text-xl text-ink mt-10 mb-3">
              {locale === "de" ? "Umsatzsteuer-ID" : locale === "en" ? "VAT ID" : "DIČ"}
            </h3>
            <p className="text-stone-700">[USt-ID / VAT ID]</p>

            <p className="mt-12 text-sm text-stone-500 leading-relaxed">
              {locale === "de"
                ? "Hinweis: Diese Seite ist ein Platzhalter. Vor dem Launch müssen die offiziellen Unternehmensangaben hinterlegt werden."
                : locale === "en"
                  ? "Note: This page is a placeholder. Official company details must be filled in before launch."
                  : "Poznámka: Tato stránka je zástupný symbol. Před spuštěním musí být doplněny oficiální firemní údaje."}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
