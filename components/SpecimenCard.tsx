import type { TableItem } from "@/lib/tables";
import type { Locale } from "@/lib/routes";

interface Props {
  item: TableItem;
  locale: Locale;
  position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
}

/**
 * SpecimenCard — a small museum-catalog overlay placed on key product photos.
 *
 * Shows the piece's catalog number, a thin oak-colored rule, and the wood +
 * year in spaced caps. The visual purpose: turn every hero shot into a page
 * from a catalogue raisonné. Reinforces the "signed and dated" promise in
 * the Standards section without restating it.
 *
 * Decoupled positioning so it can sit out of the way of other overlays
 * (status badges in cards, counter in galleries).
 */
export default function SpecimenCard({ item, locale, position = "bottom-left" }: Props) {
  const positionClasses: Record<NonNullable<Props["position"]>, string> = {
    "bottom-left": "bottom-4 left-4 sm:bottom-5 sm:left-5",
    "bottom-right": "bottom-4 right-4 sm:bottom-5 sm:right-5",
    "top-left": "top-4 left-4 sm:top-5 sm:left-5",
    "top-right": "top-4 right-4 sm:top-5 sm:right-5",
  };

  const year = new Date().getFullYear();
  const idStr = `N° ${String(item.id).padStart(3, "0")}`;
  const wood = item.woodType[locale].toUpperCase();

  return (
    <div
      className={`absolute ${positionClasses[position]} z-10 px-3.5 py-2.5 bg-bone/92 backdrop-blur-md text-ink shadow-md shadow-stone-900/15 select-none pointer-events-none`}
      aria-hidden="true"
    >
      <p className="font-display italic text-lg sm:text-xl leading-none tracking-tight">
        {idStr}
      </p>
      <div className="my-1.5 h-px bg-moss-600/65" />
      <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-stone-600 font-medium leading-none">
        {wood} · {year}
      </p>
    </div>
  );
}
