"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function update() {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? Math.min(100, (scrolled / total) * 100) : 0;
      setProgress(pct);
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 inset-x-0 z-50 h-0.5 bg-transparent pointer-events-none"
    >
      <div
        className="h-full bg-oak-500/70 origin-left transition-transform duration-150"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  );
}
