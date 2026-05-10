/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#020B06",
        surface: "#0A1F0F",
        elevated: "#0F2A15",
        primary: "#00FF87",
        secondary: "#BFFF00",
        gold: "#F5C842",
        "text-primary": "#F0FFF4",
        "text-muted": "#6EE7B7",
        danger: "#EF4444",
        warning: "#F59E0B",
        info: "#38BDF8",
      },
      fontFamily: {
        display: ["Syne", "sans-serif"],
        body: ["Space Grotesk", "sans-serif"],
        kannada: ["Noto Sans Kannada", "sans-serif"],
      },
    },
  },
  plugins: [],
}
