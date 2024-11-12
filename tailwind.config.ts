import type { Config } from "tailwindcss"
import {fontFamily} from "tailwindcss/defaultTheme"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        //here start ceo parts
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
        "primary-ceo": {
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
        "secondary-ceo": {
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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans]
      },
      backgroundImage: {
        "gradient-cover":
          "linear-gradient(90.21deg, rgba(170, 54, 124, 0.5) -5.91%, rgba(74, 47, 189, 0.5) 111.58%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config

export default config