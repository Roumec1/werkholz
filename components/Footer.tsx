"use client";

import Link from "next/link";

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  return (
    <footer className="bg-stone-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">WERKHOLZ</h3>
            <p className="text-stone-400 text-sm">
              {locale === "de"
                ? "Holzarbeiten nach Maß aus unserer Werkstatt."
                : locale === "en"
                  ? "Custom woodwork from our workshop."
                  : "Zakázková výroba ze dřeva z naší dílny."}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">
              {locale === "de"
                ? "Navigation"
                : locale === "en"
                  ? "Navigation"
                  : "Navigace"}
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <Link
                  href={`/${locale}/aktuelle-stuecke`}
                  className="hover:text-white transition"
                >
                  {locale === "de"
                    ? "Aktuelle Stücke"
                    : locale === "en"
                      ? "Current Pieces"
                      : "Aktuální kusy"}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/kontakt`}
                  className="hover:text-white transition"
                >
                  {locale === "de"
                    ? "Kontakt"
                    : locale === "en"
                      ? "Contact"
                      : "Kontakt"}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">
              {locale === "de"
                ? "Rechtliches"
                : locale === "en"
                  ? "Legal"
                  : "Právní"}
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <Link
                  href={`/${locale}/impressum`}
                  className="hover:text-white transition"
                >
                  {locale === "de"
                    ? "Impressum"
                    : locale === "en"
                      ? "Imprint"
                      : "Výtisk"}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/datenschutz`}
                  className="hover:text-white transition"
                >
                  {locale === "de"
                    ? "Datenschutz"
                    : locale === "en"
                      ? "Privacy"
                      : "Ochrana dat"}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-800 text-center text-sm text-stone-400">
          <p>
            &copy; 2026 WERKHOLZ.{" "}
            {locale === "de"
              ? "Alle Rechte vorbehalten."
              : locale === "en"
                ? "All rights reserved."
                : "Všechna práva vyhrazena."}
          </p>
        </div>
      </div>
    </footer>
  );
}
