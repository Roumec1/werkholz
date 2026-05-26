import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm off-white background — pushed amber/paper for a heritage feel
        bone: "#F2EAD6",
        cream: "#F8F1DE",
        // Text colors — warmer near-black, deep umber not pure black
        ink: "#1B130C",
        graphite: "#2D2419",
        // Wood tones
        oak: {
          50: "#F5EFE4",
          100: "#EBE0CC",
          200: "#D9C7A6",
          300: "#C4A878",
          400: "#A88550",
          500: "#8B6A3A",
          600: "#6F5430",
          700: "#544025",
          800: "#3A2C1A",
          900: "#1F170E",
        },
        // Stone neutrals
        stone: {
          50: "#FAF8F4",
          100: "#F0EDE6",
          200: "#DDD7CC",
          300: "#BFB6A7",
          400: "#9A8F7E",
          500: "#7A6F5E",
          600: "#5C5447",
          700: "#423C32",
          800: "#2A2620",
          900: "#161410",
        },
        // Status colors (subtle, not neon)
        status: {
          available: "#5A7A3F",
          production: "#A88550",
          reserved: "#8B6A3A",
          sold: "#6B6258",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 8vw, 6rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.25rem, 5vw, 4rem)", { lineHeight: "1.02", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(1.75rem, 3.5vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
      },
      letterSpacing: {
        widest: "0.2em",
      },
      maxWidth: {
        "8xl": "88rem",
        prose: "65ch",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "fade-up": "fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-down": "slideDown 0.3s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
