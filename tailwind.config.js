/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: {
        '2xl': '1240px',
      },
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0B0B0F',
          800: '#141319',
          700: '#1E1C24',
          600: '#2B2833',
        },
        cream: {
          DEFAULT: '#F5F0E6',
          100: '#FBF8F1',
          200: '#EDE6D8',
          300: '#E1D6C2',
          400: '#CDBEA2',
        },
        gold: {
          DEFAULT: '#C9A84C',
          200: '#EBDCAC',
          300: '#DFC789',
          400: '#D4B665',
          600: '#A98A34',
          700: '#8A6F26',
          800: '#75600F',
        },
        sage: {
          DEFAULT: '#6F7F63',
          100: '#E6EADF',
          200: '#CBD4C0',
          600: '#5A6A50',
        },
      },
      fontFamily: {
        display: ['Inter', '"Noto Sans TC"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Manrope', '"Noto Sans TC"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem',
      },
      boxShadow: {
        soft: '0 20px 50px -30px rgba(11, 11, 15, 0.45)',
        card: '0 1px 0 rgba(11, 11, 15, 0.04), 0 30px 70px -50px rgba(11, 11, 15, 0.55)',
        gold: '0 18px 40px -20px rgba(201, 168, 76, 0.75)',
        inset: 'inset 0 1px 0 rgba(255, 255, 255, 0.35)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.55', transform: 'scale(0.85)' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        'float-slow': 'float 11s ease-in-out infinite',
        'fade-up': 'fade-up 0.7s ease-out both',
        'pulse-soft': 'pulseSoft 2.6s ease-in-out infinite',
        'spin-slow': 'spin 28s linear infinite',
      },
    },
  },
  plugins: [],
}
