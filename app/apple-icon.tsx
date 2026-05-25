import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          fontSize: 110,
          fontWeight: 600,
          fontFamily: "serif",
          letterSpacing: "-0.04em",
        }}
      >
        W
      </div>
    ),
    { ...size }
  );
}
