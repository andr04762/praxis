/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx,js,jsx,mdx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './content/**/*.{mdx,md}'
  ],
  theme: {
    extend: {
      colors: {
        accent: '#133f0f'
      }
    }
  },
  plugins: []
};
