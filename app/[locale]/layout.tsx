import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { getDictionary, normalizeLocale } from "@/lib/i18n";
import { LOCALES } from "@/lib/routes";
import { organizationSchema, websiteSchema } from "@/lib/seo";

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = normalizeLocale(locale);
  const dict = getDictionary(loc);

  return {
    title: { default: `WERKHOLZ — ${dict.brand.tagline}`, template: "%s | WERKHOLZ" },
    description: dict.hero.subheadline,
    alternates: {
      canonical: `/${loc}`,
      languages: {
        de: "/de",
        en: "/en",
        cs: "/cs",
        "x-default": "/de",
      },
    },
    openGraph: {
      title: `WERKHOLZ — ${dict.brand.tagline}`,
      description: dict.hero.subheadline,
      locale: loc,
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = normalizeLocale(locale);
  const dict = getDictionary(loc);

  return (
    <>
      <JsonLd data={[organizationSchema(), websiteSchema()]} />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-ink focus:text-bone focus:px-4 focus:py-2 focus:rounded"
      >
        {loc === "de" ? "Zum Inhalt springen" : loc === "en" ? "Skip to content" : "Přejít na obsah"}
      </a>
      <Header locale={loc} dict={dict} />
      <main id="main-content">{children}</main>
      <Footer locale={loc} dict={dict} />
    </>
  );
}
