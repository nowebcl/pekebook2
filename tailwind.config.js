/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          DEFAULT: '#ff5eb5',
          hot: '#ee2b91',
          light: '#ffd6eb',
        },
        aqua: {
          DEFAULT: '#7ee6dc',
          light: '#dffaf6',
        },
        blue: {
          DEFAULT: '#7cd7f4',
          light: '#bcebf8',
        },
        yellow: {
          DEFAULT: '#ffd966',
          light: '#ffe88c',
        },
        lilac: {
          DEFAULT: '#dcb9ff',
          light: '#dfcaff',
        },
        peach: {
          DEFAULT: '#ffc9b7',
          light: '#ffd6c8',
        },
        mint: {
          DEFAULT: '#c7f2e3',
        },
        ink: '#25213a',
        muted: '#6f687c',
        paper: '#fffdfd',
        soft: '#f8f5f8',
        line: '#ece6ef',
      },
      fontFamily: {
        heading: ['"Baloo 2"', 'cursive', 'sans-serif'],
        sans: ['Nunito', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        redesign: '0 16px 45px rgba(74,43,85,.13)',
      }
    },
  },
  plugins: [],
}
