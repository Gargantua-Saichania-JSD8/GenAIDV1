import daisyui from 'daisyui';

export default {
  plugins: [
    daisyui,
  ],
  daisyui: { themes: ["light"] },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: { sans: ['Noto Sans Thai'] },
      colors: {
        'ga-primary': '#00A4B6',
        'ga-secondary': '#FE6B57',
        'ga-bg': '#F6F6F6',
      },
    },
  },
};
