/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: 'rgb(var(--canvas) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        body: 'rgb(var(--body-text) / <alpha-value>)',
        muted: 'rgb(var(--muted-text) / <alpha-value>)',
        faint: 'rgb(var(--faint-text) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        background: 'rgb(var(--canvas) / <alpha-value>)',
        surface: {
          DEFAULT: 'rgb(var(--surface) / <alpha-value>)',
          raised: 'rgb(var(--surface-raised) / <alpha-value>)',
          deep: 'rgb(var(--surface-deep) / <alpha-value>)',
          hover: 'rgb(var(--surface-raised) / <alpha-value>)',
          border: 'rgb(var(--line) / <alpha-value>)',
          'border-focus': 'rgb(var(--accent) / 0.4)',
        },
        emerald: {
          200: 'rgb(var(--success) / <alpha-value>)',
          300: 'rgb(var(--success) / <alpha-value>)',
          400: 'rgb(var(--success) / <alpha-value>)',
          500: 'rgb(var(--success) / <alpha-value>)',
          accent: 'rgb(var(--success) / <alpha-value>)',
          glow: 'rgb(var(--success) / 0.15)',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        editorial: ['"Newsreader"', 'Georgia', 'serif'],
        mono: ['"Geist Mono"', '"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-accent': '0 0 25px -5px rgb(var(--accent) / 0.25)',
        'glow-emerald': '0 0 20px -5px rgb(var(--success) / 0.25)',
        'subtle-card': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
