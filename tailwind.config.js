/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'black': '#000000',
      'white': '#FFFFFF',
      'nude': '#FEE2E2',
      'nude-dark': '#E3AFAF',
      'nude-darker': '#D89292',
      'gray-100': '#f7fafc',
      'gray-200': '#EDF2F7',
      'gray-500': '#464A51',
      'gold-50': '#CFC6A7',
      'gold-100': '#ADA68D',
      'error-500': '#f56565',
      'error-700': '#930900',
      'link': '#005cd0',
    },
    screens: {
      xs: '450px',
      sm: '680px',
      md: '992px',
      lg: '1366px',
    }
  },
  plugins: [],
}

