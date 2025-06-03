/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  safelist: [
    // Add the classes you want to always include here
    'bg-gradient-to-r',
    'from-green-300',
    'to-blue-500',
    'bg-white/50',
    'opacity-70',
    'opacity-100',
    'hover:scale-105',
    'transition',
    'duration-300',
    // Add any other classes you want to ensure are included
  ],
  theme: {
    extend: {
      colors: {
        primary: '#32CD32',
        navy: '#0A2540',
        light: '#F5F7FA',
        aqua: '#4FD1C5',
        dark: '#333333',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
