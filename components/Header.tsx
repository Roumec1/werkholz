"use client";

import Link from "next/link";

interface HeaderProps {
  locale: string;
}

const navItems = {
  de: [
    { label: "Aktuelle Stücke", href: "/aktuelle-stuecke" },
    { label: "Tische nach Maß", href: "/tische-nach-mass" },
    { label: "Für Firmen", href: "/fuer-firmen" },
    { label: "Ablauf", href: "/ablauf" },
  ],
  en: [
    { label: "Current Pieces", href: "/current-pieces" },
    { label: "Custom Tables", href: "/custom-tables" },
    { label: "For Businesses", href: "/for-businesses" },
    { label: "Process", href: "/process" },
  ],
  cs: [
    { label: "Aktuální kusy", href: "/aktualni-kusy" },
    { label: "Stoly na míru", href: "/stoly-na-miru" },
    { label: "Pro firmy", href: "/pro-firmy" },
    { label: "Postup", href: "/postup" },
  ],
};

export default function Header({ locale }: HeaderProps) {
  const items = navItems[locale as keyof typeof navItems] || navItems.de;

  return (
    <header className="sticky top-0 bg-white border-b border-stone-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href={`/${locale}`} className="font-bold text-xl text-stone-900">
            WERKHOLZ
          </Link>

          <nav className="hidden md:flex gap-8">
            {items.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className="text-sm text-stone-700 hover:text-stone-900 transition"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex gap-4 items-center">
            <select
              value={locale}
              onChange={(e) => {
                window.location.pathname = `/${e.target.value}`;
              }}
              className="text-sm bg-transparent border border-stone-300 rounded px-2 py-1"
            >
              <option value="de">DE</option>
              <option value="en">EN</option>
              <option value="cs">CZ</option>
            </select>

            <Link
              href={`/${locale}/kontakt`}
              className="px-4 py-2 bg-stone-900 text-white text-sm rounded hover:bg-stone-800 transition"
            >
              {locale === "de"
                ? "Anfrage"
                : locale === "en"
                  ? "Inquiry"
                  : "Poptávka"}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
