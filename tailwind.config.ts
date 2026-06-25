import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          red: "#e31e24",     // Logo crimson red
          gold: "#f5b300",    // Logo yellow/gold
          green: "#1da853",   // Logo green
          dark: "#0f172a",    // Slate-900 for dark layouts
          light: "#f8fafc",   // Slate-50 for light card backdrops
        },
      },
    },
  },
  plugins: [],
};
export default config;
