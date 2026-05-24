import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  i18n: {
    locales: ["de", "en", "cs"],
    defaultLocale: "de",
  },
};

export default nextConfig;
