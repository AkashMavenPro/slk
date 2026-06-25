/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0c4a8c', // Standard Blue
          light: '#1d6fc2',
          dark: '#073461',
        },
        accent: {
          DEFAULT: '#1d8fe1', // Sky Blue
          hover: '#1372ba',
          light: '#dbeefd',
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
