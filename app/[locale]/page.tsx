import Hero from "@/components/Hero";
import Makers from "@/components/sections/Makers";
import Stats from "@/components/sections/Stats";
import FeaturedPieces from "@/components/sections/FeaturedPieces";
import Categories from "@/components/sections/Categories";
import Materials from "@/components/sections/Materials";
import Workshop from "@/components/sections/Workshop";
import Process from "@/components/sections/Process";
import CurrentPreview from "@/components/sections/CurrentPreview";
import Inspiration from "@/components/sections/Inspiration";
import Reviews from "@/components/sections/Reviews";
import Care from "@/components/sections/Care";
import B2BSection from "@/components/sections/B2BSection";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import { getDictionary, normalizeLocale } from "@/lib/i18n";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = normalizeLocale(locale);
  const dict = getDictionary(loc);

  return (
    <>
      <Hero locale={loc} dict={dict} />
      <Makers locale={loc} dict={dict} />
      <Stats dict={dict} />
      <FeaturedPieces locale={loc} dict={dict} />
      <Categories locale={loc} dict={dict} />
      <Materials locale={loc} dict={dict} />
      <Workshop locale={loc} dict={dict} />
      <Process locale={loc} dict={dict} />
      <CurrentPreview locale={loc} dict={dict} />
      <Inspiration locale={loc} dict={dict} />
      <Reviews locale={loc} dict={dict} />
      <Care dict={dict} />
      <B2BSection locale={loc} dict={dict} />
      <FAQ dict={dict} />
      <FinalCTA locale={loc} dict={dict} />
    </>
  );
}
