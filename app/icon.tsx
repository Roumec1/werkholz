import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #A88550 0%, #3A2C1A 100%)",
          color: "#F7F4EE",
          fontSize: 22,
          fontWeight: 700,
          fontFamily: "serif",
          letterSpacing: "-0.02em",
          borderRadius: 6,
        }}
      >
        W
      </div>
    ),
    { ...size }
  );
}
