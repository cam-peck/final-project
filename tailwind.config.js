const defaultTheme = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './client/**/*.{js,jsx}'
  ],
  theme: {
    screens: {
      xxs: '375px',
      xs: '450px',
      ...defaultTheme.screens
    }
  },
  plugins: []
};
