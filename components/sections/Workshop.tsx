import Image from "next/image";
import type { Locale } from "@/lib/routes";
import type { Dictionary } from "@/lib/i18n";
import Reveal from "../Reveal";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

// Asymmetric photo-essay layout:
// - One large feature photo on the left (12/7 cols on desktop, full width on mobile)
// - Two stacked smaller photos on the right (12/5 cols)
// Each entry pairs a real workshop photo with a journal-style caption — so the
// section reads like a page from the maker's notebook, not a SaaS feature grid.
const ENTRIES = [
  {
    src: "/photos/table-6/01.jpg",
    aspect: "aspect-[5/6]",
    span: "lg:col-span-7 lg:row-span-2",
  },
  {
    src: "/photos/table-4/02.jpg",
    aspect: "aspect-[5/4]",
    span: "lg:col-span-5",
  },
  {
    src: "/photos/table-3/01.jpg",
    aspect: "aspect-[5/4]",
    span: "lg:col-span-5",
  },
];

export default function Workshop({ dict }: Props) {
  const entries = dict.workshop.entries;

  return (
    <section className="py-24 sm:py-32 bg-cream">
      <div className="container-w">
        <Reveal className="max-w-2xl mb-14 sm:mb-16">
          <p className="eyebrow">{dict.workshop.eyebrow}</p>
          <h2 className="mt-4 section-title">{dict.workshop.title}</h2>
          <p className="mt-5 section-subtitle">{dict.workshop.subtitle}</p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {ENTRIES.map((e, i) => {
            const caption = entries[i]?.caption ?? "";
            return (
              <Reveal key={i} delay={i * 100} className={e.span}>
                <figure className="h-full flex flex-col">
                  <div
                    className={`relative ${e.aspect} rounded-2xl overflow-hidden shadow-lg shadow-stone-900/10 bg-bone`}
                  >
                    <Image
                      src={e.src}
                      alt={caption}
                      fill
                      sizes={i === 0 ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 42vw, 100vw"}
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-5 flex items-start gap-3 text-sm sm:text-[15px] text-stone-700 leading-[1.7]">
                    <span
                      aria-hidden="true"
                      className="font-display italic text-oak-700 text-lg shrink-0 leading-none mt-0.5 tabular-nums"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{caption}</span>
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
