"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { LOCALES, type Locale } from "@/lib/routes";

const LABELS: Record<Locale, string> = { de: "DE", en: "EN", cs: "CZ" };
const FULL: Record<Locale, string> = {
  de: "Deutsch",
  en: "English",
  cs: "Čeština",
};

interface Props {
  currentLocale: Locale;
  variant?: "header" | "footer";
}

export default function LanguageSwitcher({ currentLocale, variant = "header" }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function switchTo(locale: Locale) {
    // Replace the leading locale segment in the current pathname
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && LOCALES.includes(segments[0] as Locale)) {
      segments[0] = locale;
    } else {
      segments.unshift(locale);
    }
    const newPath = "/" + segments.join("/");
    document.cookie = `preferred_locale=${locale}; path=/; max-age=31536000; SameSite=Lax`;
    setOpen(false);
    router.push(newPath);
  }

  if (variant === "footer") {
    return (
      <div role="group" aria-label="Language" className="flex gap-2 text-xs uppercase tracking-widest">
        {LOCALES.map((loc, i) => (
          <span key={loc} className="flex items-center gap-2">
            <button
              onClick={() => switchTo(loc)}
              lang={loc}
              aria-pressed={loc === currentLocale}
              className={`transition-colors ${
                loc === currentLocale ? "text-bone" : "text-stone-400 hover:text-bone"
              }`}
            >
              {LABELS[loc]}
            </button>
            {i < LOCALES.length - 1 && <span className="text-stone-600" aria-hidden="true">·</span>}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-medium text-ink hover:text-graphite transition-colors py-2"
        aria-label={`Language: ${FULL[currentLocale]}`}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {LABELS[currentLocale]}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          aria-hidden="true"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div role="menu" className="absolute right-0 mt-2 min-w-[140px] bg-cream border border-stone-200 rounded-md shadow-lg py-1 animate-slide-down z-50">
          {LOCALES.map((loc) => (
            <button
              key={loc}
              role="menuitemradio"
              aria-checked={loc === currentLocale}
              lang={loc}
              onClick={() => switchTo(loc)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-stone-100 transition-colors flex items-center justify-between ${
                loc === currentLocale ? "text-ink font-medium" : "text-stone-600"
              }`}
            >
              <span>{FULL[loc]}</span>
              {loc === currentLocale && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M3 7l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
