import type { Locale } from "@/lib/routes";
import type { Dictionary } from "@/lib/i18n";
import PageHeader from "./PageHeader";
import Process from "../sections/Process";
import FAQ from "../sections/FAQ";
import FinalCTA from "../sections/FinalCTA";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

export default function ProcessPage({ locale, dict }: Props) {
  return (
    <>
      <PageHeader
        eyebrow={dict.process.eyebrow}
        title={dict.process.title}
        subtitle={dict.process.subtitle}
      />
      <Process locale={locale} dict={dict} />
      <FAQ dict={dict} />
      <FinalCTA locale={locale} dict={dict} />
    </>
  );
}
