/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      'light',
      {
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          'base-100': '#0e1116',
          'base-300': '#2d3137',
        },
      },
    ],
  },
};
