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
        title={dict.customTables.title}
        subtitle={dict.customTables.subtitle}
      />
      <Categories locale={locale} dict={dict} />
      <Process locale={locale} dict={dict} />
      <FinalCTA locale={locale} dict={dict} />
    </>
  );
}
