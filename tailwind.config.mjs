/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#070A0F',
        surface: {
          DEFAULT: '#0D121D',
          hover: '#131B2A',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-focus': 'rgba(56, 189, 248, 0.4)',
        },
        cyan: {
          accent: '#38BDF8',
          glow: 'rgba(56, 189, 248, 0.15)',
        },
        emerald: {
          accent: '#10B981',
          glow: 'rgba(16, 185, 129, 0.15)',
        },
        steel: {
          accent: '#60A5FA',
          muted: '#94A3B8',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"Geist Mono"', '"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(56, 189, 248, 0.25)',
        'glow-emerald': '0 0 20px -5px rgba(16, 185, 129, 0.25)',
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
