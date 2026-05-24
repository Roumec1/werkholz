import Hero from "@/components/Hero";
import { getDictionary } from "@/lib/i18n";

export default async function Home({ params }: { params: { locale: string } }) {
  const dict = await getDictionary(params.locale);

  return (
    <>
      <Hero locale={params.locale} dict={dict} />
      {/* Additional sections will be added here */}
    </>
  );
}
