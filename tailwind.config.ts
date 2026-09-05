import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          // The exact warm off-white from the PDF pages
          paper: "#F5F3EC", 
          // The deep signature red from the portrait arch and peacock page
          burgundy: "#5A1217", 
          // For high-contrast typography and the bird collection background
          charcoal: "#111111", 
          // The metallic accent used across the sketches
          gold: "#C5A059",
          // The secondary gold/beige from the retro cards page
          sand: "#E5D8C1",
          // The subtle jewel tone from the emerald pieces
          emerald: "#0E3A2F"
        },
        background: "#F5F3EC", 
        foreground: "#111111", 
      },
      fontFamily: {
        serif: ['var(--font-editorial)', 'serif'],
        sans: ['var(--font-modern)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;