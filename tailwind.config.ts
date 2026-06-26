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
          red: "#ed1c24",     // Pantone 032 C red
          gold: "#fdb913",    // Pantone 7408 C gold
          blue: "#023f88",    // Pantone 294 C blue
          dark: "#0f172a",    // Slate-900 for dark layouts
          light: "#f8fafc",   // Slate-50 for light card backdrops
        },
      },
    },
  },
  plugins: [],
};
export default config;
