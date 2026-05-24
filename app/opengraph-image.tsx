import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "WERKHOLZ — Custom solid wood tables";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: 80,
          background:
            "linear-gradient(135deg, #F7F4EE 0%, #EDE3D0 50%, #D9C7A6 100%)",
          color: "#1A1814",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 36, fontWeight: 600, letterSpacing: "-0.02em" }}>
            WERKHOLZ
          </div>
          <div
            style={{
              fontSize: 16,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#544025",
            }}
          >
            Berlin · Germany
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: 940,
            }}
          >
            Custom solid wood tables from our workshop.
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#544025",
              marginTop: 32,
              maxWidth: 800,
            }}
          >
            Coffee, dining, bistro & business tables — built to order, delivered across Germany.
          </div>
        </div>

        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <Tag>Solid wood</Tag>
          <Tag>Made to order</Tag>
          <Tag>Delivered nationwide</Tag>
        </div>
      </div>
    ),
    { ...size }
  );
}

function Tag({ children }: { children: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px 22px",
        borderRadius: 999,
        border: "1px solid rgba(26, 24, 20, 0.2)",
        fontSize: 20,
        color: "#1A1814",
      }}
    >
      {children}
    </div>
  );
}
