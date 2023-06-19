/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      screens: {
        xss: '220px',
        xs: '480px',
        sm: '500px',
        md: '768px',
        lg: '1028px',
        xl: '1440px',
      },
      colors: {

      },
    },
  },
  plugins: [],

  variants: {}
}
