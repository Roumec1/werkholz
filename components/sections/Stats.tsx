import type { Dictionary } from "@/lib/i18n";
import Reveal from "../Reveal";

interface Props {
  dict: Dictionary;
}

export default function Stats({ dict }: Props) {
  return (
    <section className="py-16 sm:py-20 border-y border-stone-200/60 bg-cream">
      <div className="container-w">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6">
          {dict.stats.items.map((stat, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="text-center md:text-left">
                <p className="font-display text-5xl sm:text-6xl text-ink tabular-nums leading-none">
                  {stat.value}
                </p>
                <p className="mt-3 text-sm text-stone-600 leading-snug">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
