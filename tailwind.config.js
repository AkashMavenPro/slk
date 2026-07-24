/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0D3846', // Primary Dark Teal — navbar, hero overlay, footer, headings
          light: '#1a5a6b',
          dark: '#081f27',
        },
        accent: {
          DEFAULT: '#00838F', // Primary Accent Teal — CTA buttons, links, hover states
          hover: '#006064',
          light: '#E6F2F2',   // Light Background
        },
        secondary: {
          DEFAULT: '#80CBC4', // Secondary Teal — icons, highlights, subtle accents
        },
        surface: {
          DEFAULT: '#F4F9F9',
          muted: '#E6F2F2',   // Light Background — alternate section backgrounds
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
