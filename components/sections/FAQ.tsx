"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";

interface Props {
  dict: Dictionary;
}

export default function FAQ({ dict }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 sm:py-32 bg-cream">
      <div className="container-w">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="eyebrow">{dict.faq.eyebrow}</p>
            <h2 className="mt-4 section-title">{dict.faq.title}</h2>
          </div>

          <div className="lg:col-span-8">
            <ul className="space-y-px">
              {dict.faq.items.map((item, i) => {
                const isOpen = open === i;
                return (
                  <li key={i} className="border-t border-stone-200 first:border-t-0">
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="w-full flex items-start justify-between gap-6 py-6 sm:py-7 text-left group"
                      aria-expanded={isOpen}
                    >
                      <span className="font-display text-xl sm:text-2xl text-ink leading-snug">
                        {item.q}
                      </span>
                      <span
                        className={`shrink-0 mt-2 w-8 h-8 rounded-full flex items-center justify-center border border-stone-300 transition-all duration-300 ${
                          isOpen ? "bg-ink border-ink text-bone rotate-45" : "text-stone-600 group-hover:border-ink"
                        }`}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-500 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-7 sm:pb-8 pr-12 text-stone-600 leading-relaxed text-base max-w-prose">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
