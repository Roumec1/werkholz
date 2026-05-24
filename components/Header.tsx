"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { localePath, type Locale } from "@/lib/routes";
import LanguageSwitcher from "./LanguageSwitcher";
import type { Dictionary } from "@/lib/i18n";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

export default function Header({ locale, dict }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const nav = [
    { label: dict.nav.currentPieces, href: localePath(locale, "currentPieces") },
    { label: dict.nav.customTables, href: localePath(locale, "customTables") },
    { label: dict.nav.forBusinesses, href: localePath(locale, "forBusinesses") },
    { label: dict.nav.process, href: localePath(locale, "process") },
  ];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-bone/85 backdrop-blur-md border-b border-stone-200/60"
            : "bg-transparent"
        }`}
      >
        <div className="container-w">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link
              href={localePath(locale, "home")}
              className="font-display text-xl sm:text-2xl tracking-tight text-ink"
              aria-label="WERKHOLZ — Home"
            >
              WERKHOLZ
            </Link>

            <nav className="hidden lg:flex items-center gap-10">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-stone-700 hover:text-ink transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-ink transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4 sm:gap-6">
              <div className="hidden sm:block">
                <LanguageSwitcher currentLocale={locale} />
              </div>

              <Link
                href={localePath(locale, "contact")}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2 bg-ink text-bone rounded-full text-sm font-medium hover:bg-graphite transition-colors"
              >
                {dict.nav.inquiry}
              </Link>

              <button
                onClick={() => setMenuOpen(true)}
                className="lg:hidden flex flex-col gap-1.5 p-2 -mr-2"
                aria-label={dict.nav.menu}
              >
                <span className="block w-5 h-px bg-ink" />
                <span className="block w-5 h-px bg-ink" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-bone animate-fade-in lg:hidden">
          <div className="container-w h-full flex flex-col">
            <div className="flex items-center justify-between h-16 sm:h-20">
              <Link
                href={localePath(locale, "home")}
                onClick={() => setMenuOpen(false)}
                className="font-display text-xl tracking-tight"
              >
                WERKHOLZ
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 -mr-2"
                aria-label={dict.nav.close}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col gap-2 mt-12 flex-1">
              {nav.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-3xl sm:text-4xl text-ink py-2 animate-fade-up"
                  style={{ animationDelay: `${i * 60}ms`, opacity: 0 }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center justify-between py-8 border-t border-stone-200">
              <LanguageSwitcher currentLocale={locale} />
              <Link
                href={localePath(locale, "contact")}
                onClick={() => setMenuOpen(false)}
                className="btn-primary"
              >
                {dict.nav.inquiry}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
