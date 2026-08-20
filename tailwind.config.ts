import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        night: "#07111f",
        navy: "#0b1628",
        panel: "#0e1b31",
        line: "#18314f",
        brandCyan: "#22d3ee",
        ice: "#dff7ff",
        steel: "#8aa4bd",
        signal: "#38bdf8",
      },
      boxShadow: {
        command:
          "0 0 0 1px rgba(125,211,252,.16), 0 24px 80px rgba(2,8,23,.45)",
        glow: "0 0 35px rgba(125,211,252,.25)",
      },
      backgroundImage: {
        grid:
          "linear-gradient(rgba(125,211,252,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,.055) 1px, transparent 1px)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
