import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ebg: {
          black: "#0a0a0a",
          dark: {
            DEFAULT: "#111111",
            2: "#1a1a1a",
            3: "#222222",
            4: "#2a2a2a",
          },
          yellow: {
            DEFAULT: "#f4b400",
            dark: "#d9a200",
            light: "#ffc929",
          },
        },
      },
      fontFamily: {
        bebas: ["var(--font-bebas-neue)", "Impact", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      screens: {
        xs: "475px",
      },
    },
  },
  plugins: [],
};

export default config;
