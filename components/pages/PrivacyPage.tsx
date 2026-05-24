import type { Locale } from "@/lib/routes";
import type { Dictionary } from "@/lib/i18n";
import PageHeader from "./PageHeader";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

export default function PrivacyPage({ locale, dict }: Props) {
  return (
    <>
      <PageHeader
        eyebrow={dict.footer.legalTitle}
        title={dict.footer.privacy}
      />

      <section className="pb-32">
        <div className="container-w">
          <div className="max-w-2xl space-y-8 text-stone-700 leading-relaxed">
            <p>
              {locale === "de"
                ? "Wir nehmen den Schutz Ihrer persönlichen Daten ernst und behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften (DSGVO) sowie dieser Datenschutzerklärung."
                : locale === "en"
                  ? "We take the protection of your personal data seriously and treat it confidentially in accordance with statutory data protection regulations (GDPR) and this privacy policy."
                  : "Ochranu vašich osobních údajů bereme vážně a nakládáme s nimi důvěrně v souladu se zákonnými předpisy o ochraně osobních údajů (GDPR) a tímto prohlášením."}
            </p>

            <div>
              <h2 className="font-display text-2xl text-ink mb-3">
                {locale === "de" ? "Cookies" : locale === "en" ? "Cookies" : "Cookies"}
              </h2>
              <p>
                {locale === "de"
                  ? "Diese Website verwendet ausschließlich technisch notwendige Cookies (z.B. zur Speicherung Ihrer Sprachpräferenz). Es werden keine Tracking- oder Marketing-Cookies eingesetzt."
                  : locale === "en"
                    ? "This site uses only essential cookies (e.g., to remember your language preference). No tracking or marketing cookies are set."
                    : "Tato stránka používá pouze nezbytné cookies (např. pro uložení vaší jazykové preference). Nepoužíváme žádné sledovací ani marketingové cookies."}
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-ink mb-3">
                {locale === "de" ? "Kontaktformular" : locale === "en" ? "Contact form" : "Kontaktní formulář"}
              </h2>
              <p>
                {locale === "de"
                  ? "Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter."
                  : locale === "en"
                    ? "When you submit inquiries via the contact form, your information is stored for processing the request and for any follow-up questions. We do not share this data without your consent."
                    : "Pokud nám zasíláte poptávky prostřednictvím kontaktního formuláře, vaše údaje uchováváme za účelem zpracování dotazu a případných následných otázek. Tyto údaje nepředáváme bez vašeho souhlasu."}
              </p>
            </div>

            <p className="text-sm text-stone-500 pt-8">
              {locale === "de"
                ? "Hinweis: Diese Seite ist ein Platzhalter und sollte vor dem Launch von einer juristischen Fachperson geprüft werden."
                : locale === "en"
                  ? "Note: This page is a placeholder and should be reviewed by legal counsel before launch."
                  : "Poznámka: Tato stránka je zástupný symbol a před spuštěním by měla být zkontrolována právníkem."}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
