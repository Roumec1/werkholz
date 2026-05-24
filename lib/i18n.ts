import de from "@/locales/de.json";
import en from "@/locales/en.json";
import cs from "@/locales/cs.json";
import { DEFAULT_LOCALE, isValidLocale, type Locale } from "./routes";

export type Dictionary = typeof de;

const dictionaries: Record<Locale, Dictionary> = { de, en, cs };

export function getDictionary(locale: string): Dictionary {
  if (isValidLocale(locale)) return dictionaries[locale];
  return dictionaries[DEFAULT_LOCALE];
}

export function normalizeLocale(locale: string): Locale {
  return isValidLocale(locale) ? locale : DEFAULT_LOCALE;
}
