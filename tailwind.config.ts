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
         * Surface palette: Japanese restraint. Pure off-white with the
         * faintest breath of warmth, near-black text. NO accent color.
         * The wood photographs are the only color on the page — every
         * other element is monochrome. References: Karimoku Case Study,
         * Ariake, Time & Style.
         */
        bone: "#F7F5F0",       // primary surface — very subtle warm off-white, almost paper
        cream: "#FBFAF6",      // raised surfaces — softer still, when needed
        ink: "#161513",        // text — warm near-black, not pure
        graphite: "#3A3936",   // secondary text / nav
        /*
         * Moss palette retained in config so existing class refs don't break
         * during the transition, but mapped to NEUTRAL grays so all "moss"
         * usages quietly become hairline grays. Next sweep will remove the
         * references entirely.
         */
        moss: {
          50:  "#F4F3F0",
          100: "#E8E6E1",
          200: "#D0CDC6",
          300: "#A8A49C",
          400: "#7E7B73",
          500: "#5E5B55",
          600: "#454340",
          700: "#3A3936",
          800: "#262624",
          900: "#161513",
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
