import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "WERKHOLZ",
  description: "Custom solid wood tables from our workshop",
};

export function generateStaticParams() {
  return [{ locale: "de" }, { locale: "en" }, { locale: "cs" }];
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <div lang={params.locale}>
      <Header locale={params.locale} />
      <main>{children}</main>
      <Footer locale={params.locale} />
    </div>
  );
}
