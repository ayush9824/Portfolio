/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0B0C0E',
          900: '#121417',
          800: '#1A1D22',
          700: '#262A32',
          600: '#383D47',
        },
        bone: {
          50: '#FDFBF7',
          100: '#F4EFEB',
          200: '#E5DFD7',
          300: '#BFB7AA',
          400: '#8E877D',
          500: '#645E56',
        },
        ember: {
          300: '#FDE68A',
          400: '#F59E0B',
          500: '#D97706',
          600: '#B45309',
          700: '#92400E',
        },
      },
      boxShadow: {
        glow: '0 0 24px 0 rgba(245, 158, 11, 0.28)',
        'glow-sm': '0 0 14px 0 rgba(245, 158, 11, 0.20)',
        'glow-lg': '0 8px 40px -10px rgba(245, 158, 11, 0.40)',
      },
      fontFamily: {
        sans: ['"Inter"', ...defaultTheme.fontFamily.sans],
        display: ['"Sora"', '"Inter"', ...defaultTheme.fontFamily.sans],
        mono: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
      },
      letterSpacing: {
        tighter: '-0.04em',
        widest: '0.25em',
      },
      maxWidth: {
        prose: '65ch',
        readable: '75ch',
      },
    },
  },
  plugins: [],
}
