"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import type { Locale } from "@/lib/routes";
import type { Dictionary } from "@/lib/i18n";
import { SAMPLE_TABLES } from "@/lib/tables";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

function FormInner({ locale, dict }: Props) {
  const searchParams = useSearchParams();
  const itemSlug = searchParams.get("item");
  const status = searchParams.get("status");
  const referencedItem = itemSlug ? SAMPLE_TABLES.find((t) => t.slug[locale] === itemSlug) : null;

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    // Phase 1: simulate submission. Phase 3 will wire up Tally/Formspree/Resend.
    await new Promise((r) => setTimeout(r, 600));
    setSubmitted(true);
    setSubmitting(false);
  }

  if (submitted) {
    return (
      <div className="rounded-md bg-status-available/10 p-10 border border-status-available/20">
        <div className="w-12 h-12 rounded-full bg-status-available text-bone flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 10l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="mt-6 font-display text-2xl text-ink">
          {dict.form.successTitle}
        </h3>
        <p className="mt-3 text-stone-600 leading-relaxed">
          {dict.form.successSubtitle}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {referencedItem && (
        <div className="rounded-md bg-cream border border-stone-200 p-5 flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-md shrink-0"
            style={{ background: referencedItem.placeholderGradient }}
          />
          <div className="min-w-0">
            <p className="eyebrow text-stone-500">
              {dict.form.inquiryAbout}
            </p>
            <p className="mt-1 font-display text-lg text-ink truncate">
              {referencedItem.title[locale]}
            </p>
            {status && (
              <p className="text-xs text-stone-500 mt-0.5">
                {dict.status[status as keyof typeof dict.status]}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        <Field id="name" label={dict.form.name} required />
        <Field id="email" label={dict.form.email} type="email" required />
        <Field id="phone" label={dict.form.phone} />
        <Field id="city" label={dict.form.city} />
      </div>

      <Select id="productType" label={dict.form.productType} options={[
        { value: "coffee_table", label: dict.categories.coffee.title },
        { value: "dining_table", label: dict.categories.dining.title },
        { value: "bistro_table", label: dict.categories.bistro.title },
        { value: "desk", label: dict.categories.desk.title },
        { value: "business", label: dict.categories.business.title },
      ]} />

      <Field id="dimensions" label={dict.form.dimensions} placeholder={dict.form.dimensionsPlaceholder} />

      <div className="grid sm:grid-cols-2 gap-5">
        <Select id="edge" label={dict.form.edge} options={[
          { value: "straight", label: dict.form.edgeStraight },
          { value: "live", label: dict.form.edgeLive },
          { value: "unsure", label: dict.form.edgeUnsure },
        ]} />
        <Select id="resin" label={dict.form.resin} options={[
          { value: "none", label: dict.form.resinNone },
          { value: "black", label: dict.form.resinBlack },
          { value: "unsure", label: dict.form.resinUnsure },
        ]} />
      </div>

      <Field id="reference" label={dict.form.reference} placeholder="https://..." />

      <div className="grid sm:grid-cols-2 gap-5">
        <Field id="budget" label={dict.form.budget} placeholder="€" />
        <Field id="timing" label={dict.form.timing} />
      </div>

      <Textarea id="message" label={dict.form.message} rows={4} />

      <button
        type="submit"
        disabled={submitting}
        className="btn-primary w-full justify-center disabled:opacity-60"
      >
        {submitting ? dict.form.sending : dict.form.submit}
      </button>

      <p className="text-xs text-stone-500 leading-relaxed">
        {dict.form.whatsapp}
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  type = "text",
  required = false,
  placeholder,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs uppercase tracking-widest text-stone-500 mb-2">
        {label}{required && " *"}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-cream border border-stone-200 rounded-md text-ink placeholder:text-stone-400 focus:outline-none focus:border-ink transition-colors"
      />
    </div>
  );
}

function Textarea({ id, label, rows = 4 }: { id: string; label: string; rows?: number }) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs uppercase tracking-widest text-stone-500 mb-2">
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        rows={rows}
        className="w-full px-4 py-3 bg-cream border border-stone-200 rounded-md text-ink placeholder:text-stone-400 focus:outline-none focus:border-ink transition-colors resize-y"
      />
    </div>
  );
}

function Select({
  id,
  label,
  options,
}: {
  id: string;
  label: string;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs uppercase tracking-widest text-stone-500 mb-2">
        {label}
      </label>
      <select
        id={id}
        name={id}
        className="w-full px-4 py-3 bg-cream border border-stone-200 rounded-md text-ink focus:outline-none focus:border-ink transition-colors appearance-none"
      >
        <option value="">—</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function InquiryForm(props: Props) {
  return (
    <Suspense fallback={<div className="h-96 rounded-md bg-cream animate-pulse" />}>
      <FormInner {...props} />
    </Suspense>
  );
}
