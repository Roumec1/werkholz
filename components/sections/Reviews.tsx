import type { Locale } from "@/lib/routes";
import type { Dictionary } from "@/lib/i18n";
import Reveal from "../Reveal";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

export default function Reviews({ dict }: Props) {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-w">
        <Reveal className="max-w-2xl mb-16">
          <p className="eyebrow">{dict.reviews.eyebrow}</p>
          <h2 className="mt-4 section-title">{dict.reviews.title}</h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dict.reviews.items.map((review, i) => (
            <Reveal key={i} delay={i * 80}>
              <figure className="h-full p-8 sm:p-10 rounded-md bg-cream border border-stone-200/60 flex flex-col">
                <svg width="28" height="22" viewBox="0 0 28 22" fill="none" className="text-moss-500 mb-6">
                  <path
                    d="M0 22V12C0 5.4 4.2 0.8 10.5 0L12 2.5C7.6 4.2 5 7.5 5 12H10V22H0ZM16 22V12C16 5.4 20.2 0.8 26.5 0L28 2.5C23.6 4.2 21 7.5 21 12H26V22H16Z"
                    fill="currentColor"
                  />
                </svg>

                <blockquote className="font-display text-lg sm:text-xl text-ink leading-snug flex-1 text-balance">
                  {review.quote}
                </blockquote>

                <figcaption className="mt-8 pt-6 border-t border-stone-200">
                  <p className="font-medium text-ink text-sm">{review.name}</p>
                  <p className="mt-1 text-xs text-stone-500">{review.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
