import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./pages/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        lavender: "#5E3B8A", // your wedding app accent
        softSilver: "#B8B5C9",
        ivory: "#F9F9F6",
      },
      fontFamily: {
        serif: ["EB Garamond", "serif"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}

export default config
