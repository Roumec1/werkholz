"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { TableItem } from "@/lib/tables";
import type { Dictionary } from "@/lib/i18n";
import TableIllustration from "./TableIllustration";

interface Props {
  item: TableItem;
  dict: Dictionary;
}

export default function TableGallery({ item, dict }: Props) {
  const g = dict.gallery;
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  // Use real photos when present; otherwise fall back to 4 tinted SVG variants
  const realImages = item.images && item.images.length > 0 ? item.images : null;
  const total = realImages ? realImages.length : 4;
  const safeIndex = Math.min(index, total - 1);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % total),
    [total]
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + total) % total),
    [total]
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "Escape") setLightbox(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  const altFor = (i: number) =>
    `${item.title[Object.keys(item.title)[0] as keyof typeof item.title]} — ${g.thumbLabel.replace("{n}", String(i + 1))}`;

  function renderSlide(i: number, isLightbox = false) {
    if (realImages) {
      return (
        <Image
          src={realImages[i]}
          alt={altFor(i)}
          fill
          sizes={isLightbox ? "100vw" : "(min-width: 1024px) 50vw, 100vw"}
          className="object-cover"
          priority={i === 0 && !isLightbox}
        />
      );
    }
    return (
      <div
        className="absolute inset-0"
        style={{
          filter: `brightness(${i === 0 ? 1 : 0.94 + i * 0.025}) saturate(${i === 0 ? 1 : 1 - i * 0.04})`,
        }}
      >
        <TableIllustration item={item} className="absolute inset-0" />
      </div>
    );
  }

  return (
    <>
      <div>
        {/* Main image */}
        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl shadow-stone-900/10 bg-bone group">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                opacity: i === safeIndex ? 1 : 0,
                pointerEvents: i === safeIndex ? "auto" : "none",
                transform: i === safeIndex ? "scale(1)" : "scale(1.02)",
              }}
            >
              {renderSlide(i)}
            </div>
          ))}

          {/* Tap-to-expand */}
          <button
            onClick={() => setLightbox(true)}
            aria-label={g.expand}
            className="absolute inset-0 cursor-zoom-in"
          />

          {/* Navigation arrows */}
          {total > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label={g.prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-bone/85 backdrop-blur hover:bg-bone flex items-center justify-center text-ink shadow-md transition-all"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M11 4L6 8l5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label={g.next}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-bone/85 backdrop-blur hover:bg-bone flex items-center justify-center text-ink shadow-md transition-all"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M5 4l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          )}

          {/* Counter */}
          <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-ink/70 backdrop-blur text-bone text-xs tabular-nums pointer-events-none">
            {safeIndex + 1} / {total}
          </div>

          {/* Expand hint */}
          <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-ink/70 backdrop-blur text-bone text-xs flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 5V2h3M10 5V2H7M2 7v3h3M10 7v3H7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {g.hint}
          </div>
        </div>

        {/* Thumbnails */}
        <div
          className={`mt-4 grid gap-3`}
          style={{ gridTemplateColumns: `repeat(${Math.min(total, 4)}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={g.thumbLabel.replace("{n}", String(i + 1))}
              aria-pressed={i === safeIndex}
              className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                i === safeIndex ? "border-ink" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              {realImages ? (
                <Image
                  src={realImages[i]}
                  alt=""
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              ) : (
                <div
                  className="absolute inset-0"
                  style={{ filter: `brightness(${i === 0 ? 1 : 0.94 + i * 0.025}) saturate(${i === 0 ? 1 : 1 - i * 0.04})` }}
                >
                  <TableIllustration item={item} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-ink/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-fade-in"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightbox(false)}
        >
          <button
            onClick={() => setLightbox(false)}
            aria-label={g.close}
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-bone/10 hover:bg-bone/20 backdrop-blur text-bone flex items-center justify-center transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M5 5l8 8M13 5l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          {total > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label={g.prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-bone/10 hover:bg-bone/20 backdrop-blur text-bone flex items-center justify-center transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M12 4L6 9l6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label={g.next}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-bone/10 hover:bg-bone/20 backdrop-blur text-bone flex items-center justify-center transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M6 4l6 5-6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          )}

          <div
            className="relative w-full max-w-4xl aspect-[4/5] rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {Array.from({ length: total }).map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  opacity: i === safeIndex ? 1 : 0,
                  pointerEvents: i === safeIndex ? "auto" : "none",
                }}
              >
                {renderSlide(i, true)}
              </div>
            ))}
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-bone/10 backdrop-blur text-bone text-sm tabular-nums">
            {safeIndex + 1} / {total}
          </div>
        </div>
      )}
    </>
  );
}
