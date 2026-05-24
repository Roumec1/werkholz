import de from "@/locales/de.json";
import en from "@/locales/en.json";
import cs from "@/locales/cs.json";

export type Locale = "de" | "en" | "cs";

const dictionaries: Record<Locale, typeof de> = {
  de,
  en,
  cs,
};

export async function getDictionary(locale: string): Promise<typeof de> {
  if (locale === "en" || locale === "cs") {
    return dictionaries[locale as Locale];
  }
  return dictionaries.de;
}
