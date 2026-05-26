"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { localePath, type Locale } from "@/lib/routes";
import type { Dictionary } from "@/lib/i18n";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

const COOKIE = "werkholz_cookie_notice_dismissed";

export default function CookieNotice({ locale, dict }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = document.cookie.split("; ").some((c) => c.startsWith(`${COOKIE}=`));
    if (!dismissed) {
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  function accept() {
    document.cookie = `${COOKIE}=1; path=/; max-age=31536000; SameSite=Lax`;
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 px-4 pb-4 sm:px-6 sm:pb-6 pointer-events-none"
      role="region"
      aria-label="Cookie notice"
    >
      <div className="max-w-3xl mx-auto pointer-events-auto bg-ink text-bone rounded-md shadow-2xl shadow-ink/30 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-slide-down">
        <p className="text-sm leading-relaxed text-stone-300 flex-1">
          {dict.cookies.message}{" "}
          <Link
            href={localePath(locale, "privacy")}
            className="underline underline-offset-2 hover:text-bone"
          >
            {dict.cookies.more}
          </Link>
        </p>
        <button
          onClick={accept}
          className="shrink-0 px-5 py-2 bg-bone text-ink rounded-full text-sm font-medium hover:bg-cream transition-colors"
        >
          {dict.cookies.accept}
        </button>
      </div>
    </div>
  );
}
