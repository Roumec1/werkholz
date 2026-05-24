import type { Dictionary } from "@/lib/i18n";
import Reveal from "../Reveal";

interface Props {
  dict: Dictionary;
}

const ICONS = [
  // Daily — water drop / cloth
  <svg key="day" width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M11 3c2.5 3 5 5.5 5 8.5C16 14.5 13.8 17 11 17s-5-2.5-5-5.5C6 8.5 8.5 6 11 3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
  </svg>,
  // Monthly — small oil bottle
  <svg key="mo" width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M9 3h4M10 3v3M8 6h6M6 11v6a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-6L14 6H8L6 11z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round" />
  </svg>,
  // If needed — sand block
  <svg key="if" width="22" height="22" viewBox="0 0 22 22" fill="none">
    <rect x="3" y="9" width="16" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M3 12h16M6 9V7M16 9V7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>,
];

export default function Care({ dict }: Props) {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-w">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">{dict.care.eyebrow}</p>
            <h2 className="mt-4 section-title">{dict.care.title}</h2>
            <p className="mt-5 section-subtitle">{dict.care.subtitle}</p>
          </Reveal>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {dict.care.items.map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="h-full p-7 rounded-2xl bg-bone border border-stone-200">
                  <div className="w-11 h-11 rounded-full bg-oak-100 text-oak-600 flex items-center justify-center">
                    {ICONS[i]}
                  </div>
                  <h3 className="mt-6 font-display text-xl text-ink">{item.title}</h3>
                  <p className="mt-3 text-sm text-stone-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
