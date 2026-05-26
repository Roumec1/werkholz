import type { Metadata } from "next";
import { DM_Sans, Spectral } from "next/font/google";
import "./globals.css";

/*
 * Typography pair (Direction B — Sharper editorial):
 *   - Display: Spectral. A modern transitional serif with crisper terminals
 *     and tighter spacing than Fraunces. Less indie-craft, more printed-book.
 *   - Body: DM Sans. A geometric humanist sans with slightly more character
 *     than Inter — softer apertures, less ubiquitous in the web ecosystem,
 *     reads warmer without being unprofessional.
 *
 * CSS variables renamed to --font-display / --font-sans (semantic) so future
 * type swaps don't require touching every component.
 */
const sans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

const display = Spectral({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
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
    <html lang="de" className={`${sans.variable} ${display.variable}`}>
      <body className="bg-bone text-ink antialiased font-sans">{children}</body>
    </html>
  );
}
