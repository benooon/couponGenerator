import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: '#487526', // dark_green
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#BCDCDA', // light_blue
          foreground: '#404040', // dark_gray
        },
        muted: {
          DEFAULT: '#C9C9C9', // light_gray_disabled
          foreground: '#7B7B7B', // gray_disabled
        },
        accent: {
          DEFAULT: '#BCDCDA', // light_blue
          foreground: '#487526', // dark_green
        },
        destructive: {
          DEFAULT: '#F40B0B', // red
          foreground: '#ffffff',
        },
        border: '#7B7B7B', // gray_disabled
        input: '#C9C9C9', // light_gray_disabled
        ring: '#487526', // dark_green
        chart: {
          '1': '#FF6347', // example chart color
          '2': '#32CD32', // example chart color
          '3': '#4682B4', // example chart color
          '4': '#FFD700', // example chart color
          '5': '#FF69B4', // example chart color
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
