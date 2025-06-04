/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx,js,jsx,mdx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './content/**/*.{mdx,md}'
  ],
  theme: {
    extend: {
      /* Custom colors can be defined here if needed */
    }
  },
  plugins: []
};
