import Hero from "@/components/Hero";
import { getDictionary } from "@/lib/i18n";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <>
      <Hero locale={locale} dict={dict} />
      {/* Additional sections will be added here */}
    </>
  );
}
