import Link from "next/link";
import { localePath, type Locale } from "@/lib/routes";
import LanguageSwitcher from "./LanguageSwitcher";
import type { Dictionary } from "@/lib/i18n";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

export default function Footer({ locale, dict }: Props) {
  const navLinks = [
    { label: dict.nav.currentPieces, href: localePath(locale, "currentPieces") },
    { label: dict.nav.customTables, href: localePath(locale, "customTables") },
    { label: dict.nav.forBusinesses, href: localePath(locale, "forBusinesses") },
    { label: dict.nav.process, href: localePath(locale, "process") },
    { label: dict.nav.inquiry, href: localePath(locale, "contact") },
  ];

  const legalLinks = [
    { label: dict.footer.imprint, href: localePath(locale, "impressum") },
    { label: dict.footer.privacy, href: localePath(locale, "privacy") },
  ];

  return (
    <footer className="bg-ink text-bone mt-32">
      <div className="container-w py-20 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-5">
            <Link href={localePath(locale, "home")} className="font-display text-3xl tracking-tight inline-block">
              WERKHOLZ
            </Link>
            <p className="mt-6 text-stone-400 leading-relaxed max-w-md">
              {dict.footer.tagline}
            </p>
            <div className="mt-10">
              <LanguageSwitcher currentLocale={locale} variant="footer" />
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="eyebrow text-stone-500 mb-5">{dict.footer.navTitle}</h4>
            <ul className="space-y-3">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-stone-300 hover:text-bone transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="eyebrow text-stone-500 mb-5">{dict.footer.legalTitle}</h4>
            <ul className="space-y-3">
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-stone-300 hover:text-bone transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="eyebrow text-stone-500 mb-5">{dict.footer.contactTitle}</h4>
            <ul className="space-y-3 text-sm text-stone-300">
              <li>
                <a href="mailto:hello@werkholz.de" className="hover:text-bone transition-colors">
                  hello@werkholz.de
                </a>
              </li>
              <li className="text-stone-400">Berlin · {locale === "de" ? "Deutschland" : locale === "en" ? "Germany" : "Německo"}</li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-stone-500">
            &copy; {new Date().getFullYear()} WERKHOLZ. {dict.footer.rights}
          </p>
          <p className="text-xs text-stone-500">
            {locale === "de" ? "In unserer Werkstatt gefertigt." : locale === "en" ? "Made in our workshop." : "Vyrobeno v naší dílně."}
          </p>
        </div>
      </div>
    </footer>
  );
}
