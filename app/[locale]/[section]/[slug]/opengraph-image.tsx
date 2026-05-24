import { ImageResponse } from "next/og";
import { getTableBySlug, type TableItem } from "@/lib/tables";
import { normalizeLocale } from "@/lib/i18n";

export const runtime = "edge";
export const alt = "WERKHOLZ table";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function woodFor(item: TableItem) {
  const w = item.woodType.en.toLowerCase();
  if (w.includes("walnut") || w.includes("oř") || w.includes("nuss")) return ["#8B6A3A", "#4F3A1F", "#2A1D0E"];
  if (w.includes("ash") || w.includes("jas") || w.includes("esch")) return ["#E8DCC0", "#C4A878", "#8B6A3A"];
  if (w.includes("beech") || w.includes("buk")) return ["#EBD9B8", "#C7A26A", "#8B6A3A"];
  return ["#D9BE8E", "#A88550", "#6F5430"];
}

export default async function OGImage({
  params,
}: {
  params: { locale: string; section: string; slug: string };
}) {
  const loc = normalizeLocale(params.locale);
  const item = getTableBySlug(params.slug, loc);

  if (!item) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#F7F4EE",
            color: "#1A1814",
            fontSize: 48,
          }}
        >
          WERKHOLZ
        </div>
      ),
      { ...size }
    );
  }

  const [light, mid, dark] = woodFor(item);
  const price = item.price ? `${item.price.toLocaleString("de-DE")} €` : "Auf Anfrage";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#F7F4EE",
          fontFamily: "sans-serif",
        }}
      >
        {/* Left — text */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 64,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em" }}>WERKHOLZ</div>
            <div
              style={{
                fontSize: 14,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#544025",
              }}
            >
              {item.status === "available" ? "Verfügbar" : item.status === "sold" ? "Verkauft" : "In Fertigung"}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 56, fontWeight: 300, lineHeight: 1.1, letterSpacing: "-0.03em" }}>
              {item.title[loc]}
            </div>
            <div style={{ fontSize: 22, color: "#544025", marginTop: 18, maxWidth: 480 }}>
              {item.woodType[loc]} · {item.dimensions.diameterCm
                ? `Ø ${item.dimensions.diameterCm} cm`
                : `${item.dimensions.lengthCm} × ${item.dimensions.widthCm} cm`}
            </div>
          </div>

          <div style={{ fontSize: 36, fontWeight: 500, color: "#1A1814" }}>{price}</div>
        </div>

        {/* Right — wood swatch */}
        <div
          style={{
            width: 540,
            height: "100%",
            display: "flex",
            background: `linear-gradient(135deg, ${light} 0%, ${mid} 55%, ${dark} 100%)`,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
