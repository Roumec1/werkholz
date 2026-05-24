import type { Locale } from "@/lib/routes";
import type { Dictionary } from "@/lib/i18n";
import { tablesByStatus } from "@/lib/tables";
import TableCard from "../TableCard";
import PageHeader from "./PageHeader";
import FinalCTA from "../sections/FinalCTA";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

export default function CurrentPiecesPage({ locale, dict }: Props) {
  const available = tablesByStatus("available");
  const inProduction = tablesByStatus("in_production");
  const reserved = tablesByStatus("reserved");
  const sold = tablesByStatus("sold");

  const groups = [
    { label: dict.currentPreview.available, items: available, indicator: true, color: "text-status-available" },
    { label: dict.currentPreview.production, items: inProduction, indicator: false, color: "text-status-production" },
    { label: dict.status.reserved, items: reserved, indicator: false, color: "text-status-reserved" },
    { label: dict.currentPreview.soldInspiration, items: sold, indicator: false, color: "text-stone-500" },
  ].filter((g) => g.items.length > 0);

  return (
    <>
      <PageHeader
        eyebrow={dict.featured.eyebrow}
        title={locale === "de" ? "Alle aktuellen Stücke" : locale === "en" ? "All current pieces" : "Všechny aktuální kusy"}
        subtitle={dict.featured.subtitle}
      />

      {groups.map((group, gi) => (
        <section key={gi} className="py-8 sm:py-12">
          <div className="container-w">
            <div className="flex items-center gap-3 mb-10">
              <div className={`inline-flex items-center gap-2 ${group.color}`}>
                {group.indicator && <span className="pulse-dot" />}
                <span className="eyebrow text-current">{group.label}</span>
              </div>
              <span className="text-stone-400 text-sm">· {group.items.length}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {group.items.map((item) => (
                <TableCard key={item.id} item={item} locale={locale} dict={dict} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <FinalCTA locale={locale} dict={dict} />
    </>
  );
}
