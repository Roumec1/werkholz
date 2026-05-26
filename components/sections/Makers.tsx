import Image from "next/image";
import Link from "next/link";
import { localePath, type Locale } from "@/lib/routes";
import type { Dictionary } from "@/lib/i18n";
import Reveal from "../Reveal";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

// Workshop hero shot used for the Makers section. We pick a process photo
// (live-edge slab on the CNC) so the page leads with "this is where we work"
// before showing finished pieces.
const WORKSHOP_PHOTO = "/photos/table-4/02.jpg";

export default function Makers({ locale, dict }: Props) {
  const m = dict.makers;

  return (
    <section className="py-24 sm:py-32 bg-cream relative overflow-hidden">
      {/* Subtle grain texture echoes the wood theme without competing */}
      <div className="absolute inset-0 grain opacity-40 pointer-events-none" />

      <div className="container-w relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Image side — large editorial photo with caption */}
          <Reveal className="lg:col-span-7">
            <figure className="relative">
              <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-stone-900/15 bg-bone">
                <Image
                  src={WORKSHOP_PHOTO}
                  alt={m.imageCaption}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />
                {/* Soft bottom gradient anchors the caption visually */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/45 via-ink/10 to-transparent pointer-events-none" />
              </div>
              <figcaption className="mt-4 flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-stone-500 font-medium">
                <span className="block w-6 h-px bg-oak-500" />
                {m.imageCaption}
              </figcaption>
            </figure>
          </Reveal>

          {/* Text side — eyebrow → headline → letter → signature */}
          <Reveal delay={120} className="lg:col-span-5">
            <p className="eyebrow">{m.eyebrow}</p>

            <h2 className="mt-5 font-display font-light text-display-lg text-ink leading-[1.05] text-balance">
              {m.title}{" "}
              <em className="italic text-oak-700 font-normal">{m.titleAccent}</em>
            </h2>

            <div className="mt-8 space-y-5 text-base sm:text-[17px] text-stone-700 leading-[1.75]">
              {m.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Signature mark — the "JT" monogram + label */}
            <div className="mt-10 pt-8 border-t border-stone-200/80 flex items-center gap-4">
              <div
                aria-hidden="true"
                className="w-14 h-14 rounded-full bg-ink text-bone flex items-center justify-center font-display italic text-xl shadow-md shadow-stone-900/15"
              >
                JT
              </div>
              <div>
                <p className="font-display text-lg text-ink italic leading-tight">
                  {m.signature}
                </p>
                <p className="text-xs uppercase tracking-widest text-stone-500 mt-1">
                  {m.signatureLabel}
                </p>
              </div>
            </div>

            {/* Inline CTAs — primary plan, secondary how-we-work */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={localePath(locale, "contact")} className="btn-primary">
                {m.ctaLabel}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="-mr-0.5">
                  <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href={localePath(locale, "process")} className="btn-ghost">
                {m.ctaSecondary}
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
