/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1d4ed8', // Hospital Blue
        secondary: '#9333ea', // Modern Purple
        accent: '#f59e0b', // Urgent Orange
      }
    },
  },
  plugins: [],
}