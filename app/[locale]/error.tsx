"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useParams } from "next/navigation";

const COPY = {
  de: { title: "Etwas ist schiefgelaufen.", retry: "Nochmal versuchen", home: "Zur Startseite", homeHref: "/de" },
  en: { title: "Something went wrong.", retry: "Try again", home: "Go to homepage", homeHref: "/en" },
  cs: { title: "Něco se pokazilo.", retry: "Zkusit znovu", home: "Na hlavní stránku", homeHref: "/cs" },
} as const;

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const params = useParams();
  const rawLocale = typeof params?.locale === "string" ? params.locale : "de";
  const copy = COPY[rawLocale as keyof typeof COPY] ?? COPY.de;

  return (
    <main className="flex-1 flex items-center justify-center px-6 py-32">
      <div className="text-center max-w-md">
        <span
          className="font-display text-[80px] sm:text-[100px] leading-none"
          style={{
            background: "linear-gradient(135deg, #C4A878 0%, #A88550 50%, #6F5430 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          !
        </span>
        <h1 className="mt-4 font-display text-2xl sm:text-3xl text-ink">
          {copy.title}
        </h1>
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <button onClick={reset} className="btn-primary">
            {copy.retry}
          </button>
          <Link href={copy.homeHref} className="btn-secondary">
            {copy.home}
          </Link>
        </div>
      </div>
    </main>
  );
}
