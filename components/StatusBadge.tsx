import type { TableStatus } from "@/lib/tables";
import type { Dictionary } from "@/lib/i18n";

interface Props {
  status: TableStatus;
  dict: Dictionary;
  size?: "sm" | "md";
}

const STYLES: Record<TableStatus, string> = {
  available: "badge-available",
  in_production: "badge-production",
  reserved: "badge-reserved",
  sold: "badge-sold",
};

export default function StatusBadge({ status, dict, size = "sm" }: Props) {
  return (
    <span
      className={`badge ${STYLES[status]} ${size === "md" ? "text-sm px-4 py-1.5" : ""}`}
    >
      {dict.status[status]}
    </span>
  );
}
