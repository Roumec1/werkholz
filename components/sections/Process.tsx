import type { Locale } from "@/lib/routes";
import type { Dictionary } from "@/lib/i18n";
import Reveal from "../Reveal";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

export default function Process({ dict }: Props) {
  const steps = [dict.process.step1, dict.process.step2, dict.process.step3, dict.process.step4];

  return (
    <section className="py-24 sm:py-32">
      <div className="container-w">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">{dict.process.eyebrow}</p>
            <h2 className="mt-4 section-title">{dict.process.title}</h2>
            <p className="mt-5 section-subtitle">{dict.process.subtitle}</p>

            <div className="mt-10 p-5 rounded-2xl bg-cream border border-stone-200">
              <p className="text-xs uppercase tracking-widest text-stone-500 mb-2">
                {dict.process.eyebrow}
              </p>
              <p className="text-ink text-base leading-relaxed">
                {dict.process.time}
              </p>
            </div>
          </Reveal>

          <div className="lg:col-span-8">
            <ol className="space-y-px">
              {steps.map((step, i) => (
                <Reveal
                  key={i}
                  delay={i * 70}
                  as="li"
                  className="group relative grid grid-cols-[auto_1fr] gap-6 sm:gap-10 py-8 border-t border-stone-200 first:border-t-0"
                >
                  <div className="font-display text-5xl sm:text-6xl text-stone-300 leading-none w-16 sm:w-20 tabular-nums group-hover:text-oak-400 transition-colors duration-500">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-stone-600 leading-relaxed max-w-prose">
                      {step.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
