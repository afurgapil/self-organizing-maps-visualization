/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#3b82f6", // blue-500
          dark: "#1d4ed8", // blue-700
        },
        secondary: {
          light: "#ef4444", // red-500
          dark: "#b91c1c", // red-700
        },
        success: {
          light: "#10b981", // emerald-500
          dark: "#047857", // emerald-700
        },
        background: {
          light: "#ffffff",
          dark: "#1f2937", // gray-800
        },
        surface: {
          light: "#f3f4f6", // gray-100
          dark: "#374151", // gray-700
        },
        text: {
          light: "#1f2937", // gray-800
          dark: "#f3f4f6", // gray-100
        },
      },
    },
  },
  plugins: [],
};
