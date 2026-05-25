"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";

interface Props {
  dict: Dictionary;
}

export default function Newsletter({ dict }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);
    // Phase 3: wire to actual provider (Buttondown / ConvertKit / Resend / Sanity)
    await new Promise((r) => setTimeout(r, 500));
    setSubmitted(true);
    setLoading(false);
  }

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-stone-900 border border-stone-800">
      <h3 className="font-display text-xl text-bone">{dict.newsletter.title}</h3>
      <p className="mt-2 text-sm text-stone-400 leading-relaxed">{dict.newsletter.subtitle}</p>

      {submitted ? (
        <p className="mt-5 text-sm text-status-available">{dict.newsletter.thanks}</p>
      ) : (
        <form onSubmit={onSubmit} className="mt-5 flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={dict.newsletter.placeholder}
            className="flex-1 px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-bone placeholder:text-stone-500 focus:outline-none focus:border-stone-400 transition-colors text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 bg-bone text-ink rounded-xl text-sm font-medium hover:bg-cream transition-colors disabled:opacity-60"
          >
            {dict.newsletter.submit}
          </button>
        </form>
      )}
    </div>
  );
}
