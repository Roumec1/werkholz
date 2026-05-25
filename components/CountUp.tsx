"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  value: string;
  duration?: number;
}

/**
 * Animates the numeric portion of a value (e.g. "200+", "12", "2–4", "100%")
 * counting up when scrolled into view. Non-numeric chars are preserved.
 */
export default function CountUp({ value, duration = 1400 }: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [displayed, setDisplayed] = useState(value);
  const [started, setStarted] = useState(false);

  // Detect numeric structure: "{prefix}{number}{suffix}"
  // For ranges like "2–4" we count to the LAST number (4) and prepend "2–"
  const match = value.match(/^([^\d]*)(\d+)(?:[\s–—-]*(\d+))?([^\d]*)$/);
  const isAnimatable = !!match;
  const prefix = match?.[1] ?? "";
  const startStr = match?.[2] ?? "0";
  const endStr = match?.[3] ?? match?.[2] ?? "0";
  const suffix = match?.[4] ?? "";

  useEffect(() => {
    if (!isAnimatable) {
      setDisplayed(value);
      return;
    }
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplayed(value);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started) {
            setStarted(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isAnimatable, value, started]);

  useEffect(() => {
    if (!started || !isAnimatable) return;
    const target = parseInt(endStr, 10);
    const range = match?.[3] ? `${startStr}–` : "";
    const start = performance.now();
    let raf = 0;

    function tick(now: number) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = Math.round(eased * target);
      setDisplayed(`${prefix}${range}${current}${suffix}`);
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, isAnimatable, prefix, startStr, endStr, suffix, duration, match]);

  if (!isAnimatable) {
    return <span ref={ref}>{value}</span>;
  }

  // Render initial state showing the start of the range or 0
  return (
    <span ref={ref} className="tabular-nums">
      {displayed}
    </span>
  );
}
