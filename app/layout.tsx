import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WERKHOLZ | Custom Woodwork Tables",
  description: "Custom solid wood tables from our workshop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className="bg-stone-50 text-stone-900">{children}</body>
    </html>
  );
}
