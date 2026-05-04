/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#10b981", // Emerald 500
        secondary: "#34d399", // Emerald 400
        background: "#020617", // Slate 950 (Darker Obsidian)
        surface: "#0f172a", // Slate 900
        accent: "#06f28d", // Vibrant Mint
        text: "#f1f5f9", // Slate 100
        muted: "#94a3b8", // Slate 400
        error: "#f43f5e", // Rose 500
        warning: "#f59e0b", // Amber 500
        success: "#10b981", // Emerald 500
      },
      fontFamily: {
        sans: ['Inter', 'DM Sans', 'sans-serif'],
        kannada: ['Noto Sans Kannada', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1.5rem',
        '3xl': '2rem',
      }
    },
  },
  plugins: [],
}
