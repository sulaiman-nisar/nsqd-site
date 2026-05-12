/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        paper: "#FFFFFF",
        sun: "#FFDA00",
        wa: "#25D366",
        wahover: "#1DA851",
        mute: "rgba(255, 255, 255, 0.62)",
        edge: "rgba(255, 255, 255, 0.10)",
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
        spec: ["IBM Plex Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "monospace"],
      },
      fontSize: {
        display: ["clamp(3rem, 7vw, 6.5rem)", { lineHeight: "0.95", letterSpacing: "-0.02em", fontWeight: "800" }],
        h1: ["clamp(2.25rem, 5vw, 4rem)", { lineHeight: "1.02", letterSpacing: "-0.02em", fontWeight: "800" }],
        h2: ["clamp(1.75rem, 3.4vw, 2.75rem)", { lineHeight: "1.05", letterSpacing: "-0.015em", fontWeight: "700" }],
        h3: ["clamp(1.25rem, 2vw, 1.5rem)", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" }],
        eyebrow: ["0.78rem", { lineHeight: "1", letterSpacing: "0.16em", fontWeight: "600" }],
      },
      letterSpacing: { tightest: "-0.03em" },
      maxWidth: { content: "78rem" },
      spacing: {
        section: "clamp(5rem, 10vw, 9rem)",
        gutter: "clamp(1.25rem, 3.5vw, 2.5rem)",
      },
      transitionTimingFunction: {
        punch: "cubic-bezier(0.2, 0.8, 0.2, 1)",
        laser: "cubic-bezier(0.95, 0, 0.05, 1)",
      },
      backgroundImage: {
        grain: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
