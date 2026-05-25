"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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

  // Memoize the parsed structure so referential identity stays stable across renders.
  // Without this, `match` is a fresh array on every render and any useEffect that
  // depends on it re-runs every tick → animation restart loop ("vibration").
  const parsed = useMemo(() => {
    const m = value.match(/^([^\d]*)(\d+)(?:[\s–—-]*(\d+))?([^\d]*)$/);
    if (!m) {
      return { isAnimatable: false, prefix: "", startStr: "0", endStr: "0", suffix: "", hasRange: false };
    }
    return {
      isAnimatable: true,
      prefix: m[1] ?? "",
      startStr: m[2] ?? "0",
      endStr: m[3] ?? m[2] ?? "0",
      suffix: m[4] ?? "",
      hasRange: !!m[3],
    };
  }, [value]);

  useEffect(() => {
    if (!parsed.isAnimatable) {
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
          if (e.isIntersecting) {
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
  }, [parsed.isAnimatable, value]);

  useEffect(() => {
    if (!started || !parsed.isAnimatable) return;
    const target = parseInt(parsed.endStr, 10);
    const range = parsed.hasRange ? `${parsed.startStr}–` : "";
    const startTime = performance.now();
    let raf = 0;
    let lastInt = -1;

    function tick(now: number) {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      // Snap to exact target at end to prevent floating-point oscillation
      const current = t >= 1 ? target : Math.floor(eased * target);
      if (current !== lastInt) {
        lastInt = current;
        setDisplayed(`${parsed.prefix}${range}${current}${parsed.suffix}`);
      }
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, parsed, duration]);

  if (!parsed.isAnimatable) {
    return <span ref={ref}>{value}</span>;
  }

  // Grid-stack trick: hidden final value reserves full width; animated value overlays it.
  // This prevents layout shifts as digit count grows (e.g. "1+" → "200+").
  return (
    <span ref={ref} className="tabular-nums" style={{ display: "inline-grid" }}>
      <span style={{ gridArea: "1/1", visibility: "hidden" }} aria-hidden>{value}</span>
      <span style={{ gridArea: "1/1" }}>{displayed}</span>
    </span>
  );
}
