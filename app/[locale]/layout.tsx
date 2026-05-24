import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getDictionary, normalizeLocale } from "@/lib/i18n";
import { LOCALES } from "@/lib/routes";

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
      <Header locale={loc} dict={dict} />
      <main>{children}</main>
      <Footer locale={loc} dict={dict} />
    </>
  );
}
