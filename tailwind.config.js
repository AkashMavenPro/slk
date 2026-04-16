/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0a111f', // Deep Navy
          light: '#1e293b',
          dark: '#020617',
        },
        accent: {
          DEFAULT: '#f26522', // Burnt Orange
          hover: '#ea580c',
          light: '#feddce',
        },
        surface: {
          DEFAULT: '#f8fafc',
          muted: '#f1f5f9',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
