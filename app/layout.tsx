import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "opsz"],
});

export const metadata: Metadata = {
  title: {
    default: "WERKHOLZ — Massivholztische nach Maß",
    template: "%s | WERKHOLZ",
  },
  description:
    "Custom solid wood tables from our workshop. Delivered to Berlin and across Germany.",
  metadataBase: new URL("https://werkholz.vercel.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="bg-bone text-ink antialiased font-sans">{children}</body>
    </html>
  );
}
