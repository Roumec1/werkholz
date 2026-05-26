import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /*
         * Surface palette: architectural cool, warm-leaning gray. Concrete +
         * paper, not amber. Lets the warm wood photography read as luxe
         * material against a neutral wall — instead of competing with it.
         * References: COS, Aesop, Vitra, e15 showrooms.
         */
        bone: "#E8E6E0",       // primary surface — warm-leaning gray, like fine concrete
        cream: "#F4F2EC",      // card/raised surface — off-white with a breath of warmth
        ink: "#1A1A18",        // text — charcoal with a hint of warmth, not pure black
        graphite: "#2E2E2C",   // softer text / nav
        /*
         * Moss — the brand accent. Used sparingly: italic title accents,
         * eyebrow rules, hairlines that need to "show up", the drop-cap in
         * the letter. The single signature color you'd associate with werkholz.
         */
        moss: {
          50:  "#EEF2EB",
          100: "#DCE3D6",
          200: "#B7C5B0",
          300: "#92A589",
          400: "#6E8164",
          500: "#54684C",
          600: "#41523A",
          700: "#3A4A3F",   // anchor — used for italic accents
          800: "#2A3530",
          900: "#1B2421",
        },
        /*
         * Oak — retained as a SEMANTIC palette (wood-tone backgrounds in the
         * care-kit card, etc.), no longer the UI accent. The accent role now
         * belongs to moss.
         */
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
        /*
         * Stone neutrals retuned cooler to match the new bone surface.
         * Used for hairline borders, subtle text, dividers.
         */
        stone: {
          50: "#F7F6F2",
          100: "#ECEAE3",
          200: "#D5D2C9",
          300: "#B6B2A8",
          400: "#8E8B82",
          500: "#6E6C66",
          600: "#52514C",
          700: "#3A3937",
          800: "#262524",
          900: "#141413",
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
