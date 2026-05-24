"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** Distance in px the element starts offset below its final position */
  distance?: number;
  /** Animation duration in ms */
  duration?: number;
  as?: keyof React.JSX.IntrinsicElements;
}

export default function Reveal({
  children,
  delay = 0,
  className = "",
  distance = 28,
  duration = 900,
  as = "div",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as as keyof React.JSX.IntrinsicElements;
  const style: React.CSSProperties = {
    transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : `translateY(${distance}px)`,
    willChange: "opacity, transform",
  };

  // @ts-expect-error — dynamic tag
  return <Tag ref={ref} style={style} className={className}>{children}</Tag>;
}
