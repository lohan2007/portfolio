/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        studio: {
          950: '#060607',
          900: '#0a0a0c',
          850: '#111114',
          800: '#16161a',
          750: '#1d1d22',
          700: '#25252b',
          600: '#34343d',
          500: '#4f4f5a',
          400: '#7e7e8c',
          300: '#a8a8b5',
          200: '#d4d4dc',
          100: '#ededf2',
        },
        accent: {
          DEFAULT: '#FFE96B',
          hover: '#fff089',
          muted: 'rgba(255, 233, 107, 0.15)',
          border: 'rgba(255, 233, 107, 0.4)',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', '"Syne"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'marquee': 'marquee 35s linear infinite',
        'marquee-reverse': 'marquee-reverse 35s linear infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      boxShadow: {
        'glow-accent': '0 0 35px -5px rgba(255, 233, 107, 0.25)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'frame': '0 0 0 1px rgba(255, 255, 255, 0.12), 0 20px 60px -15px rgba(0, 0, 0, 0.9)',
      },
    },
  },
  plugins: [],
}

