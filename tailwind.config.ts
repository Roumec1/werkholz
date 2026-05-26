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
         * Surface palette: cool gallery wall. A hint of blue-gray undertone,
         * NOT paper. The wood photographs are the only warmth — the room is
         * cold. Pure neutrals still read as "off-white paper" against warm
         * wood; cool neutrals create the contrast that says "gallery, not
         * farmhouse." References: Karimoku Case Study, Ariake, Aesop.
         */
        bone: "#F1F2F3",       // primary surface — cool light gray, gallery wall
        cream: "#F7F8F9",      // raised surfaces — softer cool white
        ink: "#15181C",        // text — cool near-black, hint of blue undertone
        graphite: "#3B3F44",   // secondary text — cool charcoal
        /*
         * Moss palette retargeted to COOL neutral grays so all existing
         * class refs become quiet hairline strokes that match the cool
         * surface. There is no accent color on this site anymore — the
         * wood photographs are the entire color story.
         */
        moss: {
          50:  "#EEF0F1",
          100: "#E0E3E5",
          200: "#C5C9CC",
          300: "#A2A7AB",
          400: "#7B8087",
          500: "#5C6168",
          600: "#43474C",
          700: "#3B3F44",
          800: "#23262A",
          900: "#15181C",
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
         * Stone neutrals: now genuinely cool gray (no warm undertone left).
         * Used for body text, secondary text, hairline borders.
         */
        stone: {
          50: "#F6F7F8",
          100: "#E9EBED",
          200: "#CDD0D3",
          300: "#ABAFB4",
          400: "#82868C",
          500: "#62666B",
          600: "#46494E",
          700: "#33363A",
          800: "#212427",
          900: "#13151A",
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
