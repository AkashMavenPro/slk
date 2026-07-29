/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#006EA9', // Primary Blue — navbar, buttons, key branding
          light: '#53AFD8',   // Light Blue
          dark: '#005B91',    // Dark Blue — footer, hover states, dark sections
        },
        accent: {
          DEFAULT: '#0876AF', // Medium Blue — links, icons, secondary buttons
          hover: '#0A5D8C',   // Deep Blue — gradients and section accents
          light: '#eaf6fb',
        },
        secondary: {
          DEFAULT: '#53AFD8', // Light Blue — highlights, backgrounds, decorative shapes
        },
        surface: {
          DEFAULT: '#F5FAFC',
          muted: '#EAF4F9',   // Light Background — alternate section backgrounds
        },
        neutral: {
          DEFAULT: '#546E7A', // Neutral Gray — paragraph text and secondary elements
          dark: '#101D1D',    // Dark Neutral — primary text and headings
          light: '#DCE5E7',   // Light Gray — borders, cards, dividers
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
