import type { Locale } from "@/lib/routes";
import type { Dictionary } from "@/lib/i18n";
import PageHeader from "./PageHeader";
import Process from "../sections/Process";
import FinalCTA from "../sections/FinalCTA";
import Categories from "../sections/Categories";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

export default function CustomTablesPage({ locale, dict }: Props) {
  return (
    <>
      <PageHeader
        eyebrow={dict.nav.customTables}
        title={
          locale === "de"
            ? "Jeder Tisch beginnt mit einem Gespräch."
            : locale === "en"
              ? "Every table starts with a conversation."
              : "Každý stůl začíná rozhovorem."
        }
        subtitle={
          locale === "de"
            ? "Erzählen Sie uns von Ihrem Raum, Ihrem Wunschholz und Ihrer Nutzung. Wir schlagen passende Proportionen, Holz und Gestell vor und fertigen anschließend Ihren Tisch in unserer Werkstatt."
            : locale === "en"
              ? "Tell us about your space, your preferred wood, and how you'll use it. We'll suggest fitting proportions, wood, and base — then build your table in our workshop."
              : "Řekněte nám o svém prostoru, preferovaném dřevě a způsobu použití. Navrhneme vhodné proporce, dřevo a podnož — a poté vyrobíme váš stůl v naší dílně."
        }
      />
      <Categories locale={locale} dict={dict} />
      <Process locale={locale} dict={dict} />
      <FinalCTA locale={locale} dict={dict} />
    </>
  );
}
