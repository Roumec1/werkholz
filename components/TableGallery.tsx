"use client";

import { useCallback, useEffect, useState } from "react";
import type { TableItem } from "@/lib/tables";
import TableIllustration from "./TableIllustration";

interface Props {
  item: TableItem;
}

/**
 * Generates 4 illustration variants to simulate a real photo gallery.
 * When Sanity is wired, this swaps in real image URLs but keeps the
 * carousel behavior identical.
 */
export default function TableGallery({ item }: Props) {
  const [index, setIndex] = useState(0);
  const total = 4;

  const next = useCallback(() => setIndex((i) => (i + 1) % total), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  return (
    <div>
      {/* Main image */}
      <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl shadow-stone-900/10 bg-bone">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              opacity: i === index ? 1 : 0,
              pointerEvents: i === index ? "auto" : "none",
              filter: `brightness(${i === 0 ? 1 : 0.94 + i * 0.025}) saturate(${i === 0 ? 1 : 1 - i * 0.04})`,
              transform: i === index ? "scale(1)" : "scale(1.02)",
            }}
          >
            <TableIllustration item={item} className="absolute inset-0" />
          </div>
        ))}

        {/* Navigation arrows */}
        <button
          onClick={prev}
          aria-label="Previous image"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-bone/85 backdrop-blur hover:bg-bone flex items-center justify-center text-ink shadow-md transition-all"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M11 4L6 8l5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={next}
          aria-label="Next image"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-bone/85 backdrop-blur hover:bg-bone flex items-center justify-center text-ink shadow-md transition-all"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M5 4l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Counter */}
        <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-ink/70 backdrop-blur text-bone text-xs tabular-nums">
          {index + 1} / {total}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="mt-4 grid grid-cols-4 gap-3">
        {[0, 1, 2, 3].map((i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`View image ${i + 1}`}
            aria-current={i === index}
            className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 relative ${
              i === index ? "border-ink" : "border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <div
              className="absolute inset-0"
              style={{ filter: `brightness(${i === 0 ? 1 : 0.94 + i * 0.025}) saturate(${i === 0 ? 1 : 1 - i * 0.04})` }}
            >
              <TableIllustration item={item} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
