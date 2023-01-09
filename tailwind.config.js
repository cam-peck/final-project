const defaultTheme = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './client/**/*.{js,jsx}'
  ],
  theme: {
    screens: {
      tall: { raw: '(min-height: 670px)' },
      xxs: '400px',
      xs: '450px',
      x2s: '475px',
      ...defaultTheme.screens
    }
  },
  plugins: []
};
