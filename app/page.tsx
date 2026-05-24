import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/lib/routes";

function pickLocaleFromAcceptLanguage(header: string | null): Locale | null {
  if (!header) return null;
  const tokens = header.split(",").map((t) => t.split(";")[0].trim().toLowerCase());
  for (const tok of tokens) {
    const short = tok.slice(0, 2);
    if (LOCALES.includes(short as Locale)) return short as Locale;
  }
  return null;
}

export default async function RootPage() {
  const cookieStore = await cookies();
  const stored = cookieStore.get("preferred_locale")?.value;
  if (stored && LOCALES.includes(stored as Locale)) {
    redirect(`/${stored}`);
  }

  const h = await headers();
  const fromHeader = pickLocaleFromAcceptLanguage(h.get("accept-language"));
  redirect(`/${fromHeader ?? DEFAULT_LOCALE}`);
}
