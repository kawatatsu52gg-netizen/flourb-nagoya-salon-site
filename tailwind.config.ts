import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#fbf8f6',
        foreground: '#2a2220',
        rose: {
          100: '#f6ecea',
          300: '#d7b5ad',
          500: '#b5847a',
          700: '#8f5e54'
        },
        gold: {
          300: '#d9c39a',
          500: '#bfa270',
          700: '#9b7d4a'
        }
      },
      fontFamily: {
        sans: ['var(--font-noto-sans-jp)'],
        serif: ['var(--font-noto-serif-jp)'],
        display: ['var(--font-playfair)']
      },
      boxShadow: {
        luxury: '0 24px 60px -26px rgba(72, 40, 34, 0.35)'
      }
    }
  },
  plugins: []
};

export default config;
