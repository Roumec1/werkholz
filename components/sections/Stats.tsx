import type { Dictionary } from "@/lib/i18n";
import Reveal from "../Reveal";

interface Props {
  dict: Dictionary;
}

/**
 * Stats — static, confident. No CountUp animation: artisanal brands don't
 * announce their numbers with a tick-tick-tick. The numbers just are.
 */
export default function Stats({ dict }: Props) {
  return (
    <section className="py-20 sm:py-24 border-y border-stone-200/70 bg-cream">
      <div className="container-w">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6">
          {dict.stats.items.map((stat, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="text-center md:text-left">
                <p className="font-display font-light text-5xl sm:text-6xl text-ink tabular-nums leading-none">
                  {stat.value}
                </p>
                <p className="mt-4 text-sm text-stone-600 leading-snug max-w-[200px] mx-auto md:mx-0">
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
