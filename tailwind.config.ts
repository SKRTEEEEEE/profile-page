import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        success: {
          DEFAULT: '#7eea0b',
        },
        caution: {
          DEFAULT: '#eeee11',
        },
        danger: {
          DEFAULT: '#ef3f4e',
        },
        info: {
          DEFAULT: '#3585d4',
        },
        "primary": {
          DEFAULT: '#75f4f4',
          50: "#f6fefe",
          100: "#e7fdfd",
          200: "#d0fbfb",
          300: "#aaf8f8",
          400: "#55f1f1",
          500: "#12d9d9",
          600: "#0d9c9c",
          700: "#097171",
          800: "#054242",
          900: "#032121",
          950: "#021313"
        },
        "secondary": {
          DEFAULT: '#af2bbf',
          50: "#fcf7fd",
          100: "#f9eafa",
          200: "#f2d5f6",
          300: "#e8b4ee",
          400: "#d169dd",
          500: "#b02bbf",
          600: "#7f1f89",
          700: "#5c1764",
          800: "#360d3a",
          900: "#1b071d",
          950: "#0f0411"
        },
        "neutral": {
          DEFAULT: '#131424',
          50: "#f8f9fb",
          100: "#eeeff6",
          200: "#dedfed",
          300: "#c3c5df",
          400: "#878bc0",
          500: "#51569a",
          600: "#3a3e6e",
          700: "#2a2d50",
          800: "#191a2f",
          900: "#0c0d17",
          950: "#07070d"
        },
       
      },
      backgroundImage: {
        "gradient-cover":
          "linear-gradient(90.21deg, rgba(170, 54, 124, 0.5) -5.91%, rgba(74, 47, 189, 0.5) 111.58%)",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;