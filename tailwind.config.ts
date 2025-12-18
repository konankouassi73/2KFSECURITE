import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FFFFFF', // Fond blanc
          dark: '#323358',   // Secondaire 1 - Bleu foncé
          accent: '#c74449', // Secondaire 2 - Rouge
          gray: '#323358',   // Textes et éléments - Bleu foncé
          black: '#000000',  // Noir pur
        },
        neutral: {
          white: '#FFFFFF',
          light: '#fafafa',
        },
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'DM Sans', 'sans-serif'],
        heading: ['var(--font-space-grotesk)', 'Space Grotesk', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'Space Grotesk', 'sans-serif'],
        accent: ['var(--font-playfair)', 'Playfair Display', 'serif'],
      },
      fontSize: {
        // Échelle typographique premium
        'display-2xl': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-xl': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1', letterSpacing: '-0.025em' }],
        'display-lg': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
        'body-lg': ['1.25rem', { lineHeight: '1.7', letterSpacing: '0.005em' }],
        'body': ['1.125rem', { lineHeight: '1.75', letterSpacing: '0.01em' }],
        'label': ['0.75rem', { lineHeight: '1', letterSpacing: '0.1em' }],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #c74449, 0 0 10px #c74449' },
          '100%': { boxShadow: '0 0 20px #c74449, 0 0 30px #c74449' },
        },
      },
    },
  },
  plugins: [],
}
export default config

