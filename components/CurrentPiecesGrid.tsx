"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/routes";
import type { Dictionary } from "@/lib/i18n";
import { type TableItem, type TableStatus, type ProductType } from "@/lib/tables";
import TableCard from "./TableCard";
import Reveal from "./Reveal";

interface Props {
  items: TableItem[];
  locale: Locale;
  dict: Dictionary;
}

type SortKey = "newest" | "price_asc" | "price_desc";

const STATUSES: Array<{ key: TableStatus | "all"; }> = [
  { key: "all" },
  { key: "available" },
  { key: "in_production" },
  { key: "reserved" },
  { key: "sold" },
];

const TYPES: Array<ProductType | "all"> = [
  "all",
  "dining_table",
  "coffee_table",
  "bistro_table",
  "desk",
  "conference_table",
];

const TYPE_LABEL_KEYS: Record<Exclude<ProductType, "kitchen_table" | "restaurant_table" | "custom_table">, "dining" | "coffee" | "bistro" | "desk" | "business"> = {
  dining_table: "dining",
  coffee_table: "coffee",
  bistro_table: "bistro",
  desk: "desk",
  conference_table: "business",
};

export default function CurrentPiecesGrid({ items, locale, dict }: Props) {
  const [status, setStatus] = useState<TableStatus | "all">("all");
  const [type, setType] = useState<ProductType | "all">("all");
  const [sort, setSort] = useState<SortKey>("newest");

  const filtered = useMemo(() => {
    let list = items;
    if (status !== "all") list = list.filter((i) => i.status === status);
    if (type !== "all") list = list.filter((i) => i.productType === type);

    list = [...list];
    if (sort === "newest") {
      list.sort((a, b) => a.sortOrder - b.sortOrder);
    } else if (sort === "price_asc") {
      list.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    } else if (sort === "price_desc") {
      list.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    }
    return list;
  }, [items, status, type, sort]);

  const typeLabel = (t: ProductType | "all"): string => {
    if (t === "all") return dict.filters.all;
    const key = TYPE_LABEL_KEYS[t as keyof typeof TYPE_LABEL_KEYS];
    if (!key) return t;
    return dict.categories[key].title;
  };

  return (
    <section className="py-8 sm:py-12">
      <div className="container-w">
        {/* Filter bar */}
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {STATUSES.map((s) => {
              const label = s.key === "all" ? dict.filters.all : dict.status[s.key];
              const active = status === s.key;
              return (
                <button
                  key={s.key}
                  onClick={() => setStatus(s.key)}
                  className={`px-4 py-2 rounded-full text-sm border transition-all duration-200 ${
                    active
                      ? "bg-ink text-bone border-ink"
                      : "border-stone-300 text-stone-700 hover:border-ink hover:text-ink"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-3 lg:gap-4">
            <label className="relative">
              <span className="sr-only">{dict.filters.filterBy}</span>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as ProductType | "all")}
                className="appearance-none pl-4 pr-10 py-2 rounded-full border border-stone-300 bg-bone text-sm text-ink focus:outline-none focus:border-ink transition-colors"
              >
                {TYPES.map((t) => (
                  <option key={t} value={t}>
                    {typeLabel(t)}
                  </option>
                ))}
              </select>
              <Caret />
            </label>

            <label className="relative">
              <span className="sr-only">{dict.filters.sortBy}</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="appearance-none pl-4 pr-10 py-2 rounded-full border border-stone-300 bg-bone text-sm text-ink focus:outline-none focus:border-ink transition-colors"
              >
                <option value="newest">{dict.filters.sortNewest}</option>
                <option value="price_asc">{dict.filters.sortPriceAsc}</option>
                <option value="price_desc">{dict.filters.sortPriceDesc}</option>
              </select>
              <Caret />
            </label>
          </div>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-stone-500">{dict.filters.noResults}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filtered.map((item, i) => (
              <Reveal key={item.id} delay={Math.min(i, 5) * 60}>
                <TableCard item={item} locale={locale} dict={dict} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Caret() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone-500"
    >
      <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
