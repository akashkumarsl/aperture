import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep space canvas
        void: {
          DEFAULT: "#04060b",
          900: "#04060b",
          800: "#070a12",
          700: "#0b0f1a",
          600: "#111726",
        },
        // Crude-oil → refined-gold spectrum
        crude: {
          DEFAULT: "#0a0a0c",
          light: "#1a1712",
        },
        gold: {
          DEFAULT: "#f5b942",
          soft: "#ffd479",
          deep: "#c8871a",
          ember: "#ff8a3d",
        },
        // Signal / intelligence accents
        aperture: {
          cyan: "#38e1ff",
          blue: "#4c7bff",
          violet: "#8b5cff",
          teal: "#2ee6c5",
          magenta: "#ff5adb",
        },
        glass: {
          line: "rgba(255,255,255,0.08)",
          fill: "rgba(255,255,255,0.03)",
        },
        // ── Light YC-style pitch deck (/deck) — scoped, restrained system ──
        deck: {
          paper: "#ffffff",
          paper2: "#f7f7f4",
          paper3: "#efeee8",
          ink: "#0b0b0f",
          ink2: "#3f3f46",
          muted: "#5c5c66",
          faint: "#6f6f79",
          line: "rgba(11,11,15,0.10)",
          line2: "rgba(11,11,15,0.055)",
          accent: "#ff5a1f",
          accentInk: "#c2410c",
          accentSoft: "#fff1ea",
          pos: "#0a6a47",
          neg: "#c02626",
          blue: "#2f5fff",
          blueInk: "#1d43c9",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      fontSize: {
        "fluid-sm": "clamp(0.85rem, 0.8rem + 0.3vw, 1rem)",
        "fluid-base": "clamp(1rem, 0.92rem + 0.4vw, 1.2rem)",
        "fluid-lg": "clamp(1.25rem, 1rem + 1.2vw, 1.75rem)",
        "fluid-xl": "clamp(1.8rem, 1.2rem + 3vw, 3.2rem)",
        "fluid-2xl": "clamp(2.6rem, 1.4rem + 6vw, 6rem)",
        "fluid-3xl": "clamp(3.4rem, 1.5rem + 9vw, 9.5rem)",
        // ── Deck fixed type scale (px on the 1280×720 stage) ──
        "d-micro": ["12px", { lineHeight: "1.35" }],
        "d-eyebrow": ["13px", { lineHeight: "1.1", letterSpacing: "0.18em" }],
        "d-small": ["15px", { lineHeight: "1.5" }],
        "d-body": ["18px", { lineHeight: "1.55" }],
        "d-lead": ["22px", { lineHeight: "1.5" }],
        "d-h3": ["26px", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
        "d-h2": ["34px", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        "d-h1": ["52px", { lineHeight: "1.08", letterSpacing: "-0.022em" }],
        "d-display": ["74px", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
      },
      letterSpacing: {
        tightest: "-0.045em",
        cinematic: "0.35em",
      },
      backdropBlur: {
        xs: "2px",
        "2xl": "40px",
        "3xl": "64px",
      },
      boxShadow: {
        glass: "0 8px 40px -12px rgba(0,0,0,0.6), inset 0 1px 0 0 rgba(255,255,255,0.06)",
        "glow-gold": "0 0 60px -10px rgba(245,185,66,0.55)",
        "glow-cyan": "0 0 60px -10px rgba(56,225,255,0.55)",
        "glow-violet": "0 0 60px -10px rgba(139,92,255,0.55)",
        "deck-card":
          "0 1px 2px rgba(11,11,15,0.04), 0 10px 30px -16px rgba(11,11,15,0.18)",
        "deck-lift": "0 24px 60px -28px rgba(11,11,15,0.30)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6", filter: "brightness(1)" },
          "50%": { opacity: "1", filter: "brightness(1.35)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "grain-shift": {
          "0%,100%": { transform: "translate(0,0)" },
          "20%": { transform: "translate(-4%,3%)" },
          "40%": { transform: "translate(3%,-2%)" },
          "60%": { transform: "translate(-2%,4%)" },
          "80%": { transform: "translate(4%,-3%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.22,1,0.36,1) both",
        "pulse-glow": "pulse-glow 3.5s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
        float: "float 6s ease-in-out infinite",
        "grain-shift": "grain-shift 8s steps(5) infinite",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16,1,0.3,1)",
        "in-out-cine": "cubic-bezier(0.83,0,0.17,1)",
      },
    },
  },
  plugins: [],
};

export default config;
