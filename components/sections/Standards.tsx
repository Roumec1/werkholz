import type { Dictionary } from "@/lib/i18n";
import Reveal from "../Reveal";

interface Props {
  dict: Dictionary;
}

/**
 * "Standards" — a manifesto-style section. Two columns of conviction:
 * what we always do, what we never do. The work speaks. No personalities,
 * no founder story — just standards. Bigger typographic moves than the
 * surrounding sections so this reads as the editorial centerpiece.
 */
export default function Standards({ dict }: Props) {
  const s = dict.standards;

  return (
    <section className="py-28 sm:py-36 bg-bone relative">
      <div className="container-w">
        {/* Section header — centered, restrained */}
        <Reveal className="text-center max-w-3xl mx-auto mb-20 sm:mb-24">
          <p className="eyebrow">{s.eyebrow}</p>
          <h2 className="mt-5 font-display font-light text-display-lg sm:text-display-xl text-ink leading-[1.02] text-balance">
            {s.title}{" "}
            <em className="italic text-moss-700 font-normal">{s.titleAccent}</em>
          </h2>
        </Reveal>

        {/* Two columns: Always / Never */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 xl:gap-x-24 gap-y-16 max-w-6xl mx-auto">
          {/* ALWAYS */}
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.32em] text-moss-700 font-medium mb-3">
              {s.doLabel}
            </p>
            <div className="border-t border-stone-300/70 pt-10 space-y-12">
              {s.doItems.map((item, i) => (
                <Item key={i} index={i + 1} title={item.title} body={item.body} />
              ))}
            </div>
          </Reveal>

          {/* NEVER */}
          <Reveal delay={120}>
            <p className="text-[10px] uppercase tracking-[0.32em] text-stone-500 font-medium mb-3">
              {s.dontLabel}
            </p>
            <div className="border-t border-stone-300/70 pt-10 space-y-12">
              {s.dontItems.map((item, i) => (
                <Item key={i} index={i + 1} title={item.title} body={item.body} muted />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Item({
  index,
  title,
  body,
  muted = false,
}: {
  index: number;
  title: string;
  body: string;
  muted?: boolean;
}) {
  return (
    <div className="flex items-baseline gap-5">
      <span
        className={`font-display italic text-2xl shrink-0 tabular-nums leading-none mt-1 ${
          muted ? "text-stone-400" : "text-moss-600"
        }`}
      >
        {String(index).padStart(2, "0")}
      </span>
      <div className="min-w-0">
        <h3 className="font-display text-xl sm:text-2xl text-ink leading-[1.2]">
          {title}
        </h3>
        <p className="mt-3 text-[15px] text-stone-700 leading-[1.7]">{body}</p>
      </div>
    </div>
  );
}
