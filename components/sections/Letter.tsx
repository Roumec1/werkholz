import type { Dictionary } from "@/lib/i18n";
import Reveal from "../Reveal";

interface Props {
  dict: Dictionary;
}

/**
 * A signed "letter from the workshop" — the most personal moment on the page.
 * Designed to feel like a magazine page or a hand-bound book opening, not a
 * marketing section. Centered, generous leading, display serif body, with a
 * stylized signature mark at the bottom.
 */
export default function Letter({ dict }: Props) {
  const l = dict.letter;

  return (
    <section className="py-24 sm:py-32 bg-bone relative overflow-hidden">
      {/* Subtle paper-grain texture to differentiate from neighboring sections */}
      <div className="absolute inset-0 grain opacity-50 pointer-events-none" />
      {/* Faint horizontal rule "deckle" at top and bottom for the page-spread feel */}
      <div className="absolute inset-x-0 top-0 h-px bg-stone-200/80" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-stone-200/80" />

      <div className="container-w relative">
        <div className="max-w-2xl mx-auto">
          <Reveal>
            <p className="eyebrow text-center">{l.eyebrow}</p>

            <h2 className="mt-5 font-display font-light text-display-md text-ink text-center leading-[1.1] text-balance">
              {l.title}
            </h2>

            {/* Decorative rule under the title */}
            <div className="mt-8 flex items-center justify-center">
              <span className="block w-12 h-px bg-oak-500/60" />
              <span className="mx-3 text-oak-600 text-sm">✦</span>
              <span className="block w-12 h-px bg-oak-500/60" />
            </div>

            <div className="mt-10 space-y-6 font-display text-lg sm:text-[19px] text-stone-800 leading-[1.7] sm:leading-[1.75]">
              {l.paragraphs.map((p, i) => (
                <p key={i} className={i === 0 ? "first-letter:font-display first-letter:text-5xl first-letter:font-medium first-letter:text-oak-700 first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:leading-none" : undefined}>
                  {p}
                </p>
              ))}
            </div>

            {/* Closer — a quiet sign-off, not a name */}
            <div className="mt-14 flex flex-col items-center gap-2">
              <p className="font-display italic text-xl sm:text-2xl text-stone-700">
                {l.signature}
              </p>
              <p className="text-[10px] uppercase tracking-[0.32em] text-stone-500">
                {l.signatureLocation}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
