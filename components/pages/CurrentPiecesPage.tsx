import type { Locale } from "@/lib/routes";
import type { Dictionary } from "@/lib/i18n";
import { SAMPLE_TABLES, tablesByStatus } from "@/lib/tables";
import PageHeader from "./PageHeader";
import FinalCTA from "../sections/FinalCTA";
import CurrentPiecesGrid from "../CurrentPiecesGrid";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

export default function CurrentPiecesPage({ locale, dict }: Props) {
  const stats = {
    available: tablesByStatus("available").length,
    inProduction: tablesByStatus("in_production").length,
    reserved: tablesByStatus("reserved").length,
    sold: tablesByStatus("sold").length,
  };

  return (
    <>
      <PageHeader
        eyebrow={dict.featured.eyebrow}
        title={dict.currentPieces.title}
        subtitle={dict.featured.subtitle}
      />

      <section className="pb-4">
        <div className="container-w">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <Stat label={dict.status.available} value={stats.available} pulse />
            <Stat label={dict.status.in_production} value={stats.inProduction} />
            <Stat label={dict.status.reserved} value={stats.reserved} />
            <Stat label={dict.status.sold} value={stats.sold} muted />
          </div>
        </div>
      </section>

      <CurrentPiecesGrid items={SAMPLE_TABLES} locale={locale} dict={dict} />

      <FinalCTA locale={locale} dict={dict} />
    </>
  );
}

function Stat({
  label,
  value,
  pulse = false,
  muted = false,
}: {
  label: string;
  value: number;
  pulse?: boolean;
  muted?: boolean;
}) {
  return (
    <div
      className={`p-5 rounded-md border ${
        muted ? "bg-stone-100 border-stone-200" : "bg-cream border-stone-200/60"
      }`}
    >
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500">
        {pulse && <span className="pulse-dot text-status-available" />}
        {label}
      </div>
      <p className="mt-2 font-display text-3xl text-ink tabular-nums">{value}</p>
    </div>
  );
}
