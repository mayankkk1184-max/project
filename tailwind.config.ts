import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        script: ['var(--font-script)', 'cursive'],
        display: ['var(--font-display)', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        midnight: {
          DEFAULT: '#0D071E',
          deep: '#150B2D',
        },
        neon: {
          magenta: '#E024A3',
          violet: '#A855F7',
        },
        cream: '#FFFBEB',
        gold: {
          DEFAULT: '#DFB960',
          bright: '#FCD34D',
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'float-up': {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0.9' },
          '100%': { transform: 'translateY(-120px) scale(0.3)', opacity: '0' },
        },
        'flame-flicker': {
          '0%, 100%': { transform: 'scaleY(1) rotate(-1deg)', opacity: '1' },
          '25%': { transform: 'scaleY(1.15) rotate(2deg)', opacity: '0.9' },
          '50%': { transform: 'scaleY(0.95) rotate(-2deg)', opacity: '1' },
          '75%': { transform: 'scaleY(1.08) rotate(1deg)', opacity: '0.95' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(224,36,163,0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(224,36,163,0.7)' },
        },
        'bokeh-drift': {
          '0%': { transform: 'translate(0,0)' },
          '50%': { transform: 'translate(30px,-20px)' },
          '100%': { transform: 'translate(0,0)' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-8px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(8px)' },
        },
        'petal-fall': {
          '0%': { transform: 'translateY(-10%) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(110vh) rotate(360deg)', opacity: '0' },
        },
        'rise-smoke': {
          '0%': { transform: 'translateY(0) scale(0.6)', opacity: '0.7' },
          '100%': { transform: 'translateY(-60px) scale(1.6)', opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'float-up': 'float-up 1.4s ease-out forwards',
        'flame-flicker': 'flame-flicker 0.4s ease-in-out infinite',
        'spin-slow': 'spin-slow 3s linear infinite',
        'pulse-glow': 'pulse-glow 2.4s ease-in-out infinite',
        'bokeh-drift': 'bokeh-drift 12s ease-in-out infinite',
        'shake': 'shake 0.5s ease-in-out',
        'petal-fall': 'petal-fall linear forwards',
        'rise-smoke': 'rise-smoke 1.2s ease-out forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
