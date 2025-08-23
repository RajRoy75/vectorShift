
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'comic-primary': '#ff3d3d',
        'comic-secondary': '#3d3dff',
        'comic-text': '#000000',
        'comic-accent': '#ffef00',
        'comic-panel': '#ffffff',
        'comic-shadow-color': 'rgba(0, 0, 0, 0.75)',
      },
      keyframes: {
        burst: {
          '0%': { transform: 'scale(0.95)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        'action-lines': {
          '0%': { opacity: '0', transform: 'scale(0.7)' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'scale(1.2)' },
        },
      },
      animation: {
        burst: 'burst 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'action-lines': 'action-lines 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
}
