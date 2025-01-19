/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}" 
  ],
  theme: {
    screens: {
      'sm': '430px',

      'md': '710px',
      'md2': '850px',

      'lg': '1280px',
    },
    extend: {},
  },
  plugins: [],
}

