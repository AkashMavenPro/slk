/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#003F88', // Navy Blue (Engineering & Precision Palette)
          light: '#1b5fad',
          dark: '#00264f',
        },
        accent: {
          DEFAULT: '#00A2E3', // Electric Blue
          hover: '#0089c2',
          light: '#dff4fc',
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
