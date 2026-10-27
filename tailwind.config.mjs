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
        surface: {
          DEFAULT: 'rgb(var(--surface) / <alpha-value>)',
          raised: 'rgb(var(--surface-raised) / <alpha-value>)',
          deep: 'rgb(var(--surface-deep) / <alpha-value>)',
        },
        emerald: {
          200: 'rgb(var(--success) / <alpha-value>)',
          300: 'rgb(var(--success) / <alpha-value>)',
          400: 'rgb(var(--success) / <alpha-value>)',
          500: 'rgb(var(--success) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['"Newsreader"', 'Georgia', 'serif'],
        editorial: ['"Newsreader"', 'Georgia', 'serif'],
        mono: ['"Geist Mono"', '"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
