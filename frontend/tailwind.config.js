/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2ecc71",
        background: "#0a1f0e",
        surface: "#0f2a14",
        text: "#e8f5e9",
        accent: "#69f0ae",
        error: "#ef5350",
        warning: "#f59e0b",
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        kannada: ['Noto Sans Kannada', 'sans-serif'],
      },
      borderRadius: {
        'xl': '16px',
      }
    },
  },
  plugins: [],
}
