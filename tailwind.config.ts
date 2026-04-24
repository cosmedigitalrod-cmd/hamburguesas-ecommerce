import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#E5A827', // Mostaza
          50: '#FDF8E8',
          100: '#FAF0C4',
          200: '#F5E099',
          300: '#EFCE68',
          400: '#E8BC3D',
          500: '#E5A827',
          600: '#B8861F',
          700: '#8A6417',
          800: '#5C430F',
          900: '#2E2108',
        },
        secondary: {
          DEFAULT: '#C0392B', // Rojo ketchup
          50: '#FCE8E6',
          100: '#F8C8C3',
          200: '#F19A94',
          300: '#E96B65',
          400: '#E04D3D',
          500: '#C0392B',
          600: '#9A2D22',
          700: '#732219',
          800: '#4D1610',
          900: '#260B07',
        },
        accent: {
          DEFAULT: '#E67E22', // Naranja parrilla
          50: '#FEF3E6',
          100: '#FDE2C0',
          200: '#FBC986',
          300: '#F9AF4C',
          400: '#F79518',
          500: '#E67E22',
          600: '#B8651A',
          700: '#8A4C13',
          800: '#5C330D',
          900: '#2E1906',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      fontFamily: {
        display: ['Inter', 'Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        pulse: 'pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
