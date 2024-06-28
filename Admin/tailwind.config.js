/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  /* ==== add this === */
  important: '#root',
  /* ==== ======== === */
  theme: {
    extend: {
      colors:
      {
        safekaroDarkBlue: '#027aae',
        safekaroBlue: '#57a5c7',
        safekarolightBlue: '#c1dce7',
        safekarolighterBlue: '#95c5d9',
        safekaroDarkOrange: '#e59411',
        safekaroOrange: ' #edb65c',
        safekarolightOrange: '#e9b35b',
        safekarolighterOrange: '#f4d096',
        addButton:'#027AAE',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [],
}

