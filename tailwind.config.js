/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--brand-primary)',
          soft: 'var(--brand-primary-soft)',
        },
        accent: {
          DEFAULT: 'var(--brand-accent)',
          soft: 'var(--brand-accent-soft)',
        },
        background: 'var(--brand-background)',
        surface: 'var(--brand-surface)',
        muted: 'var(--brand-muted)',
        border: 'var(--brand-border)',
      },
      boxShadow: {
        soft: '0 24px 80px rgb(15 23 42 / 0.08)',
      },
      fontFamily: {
        sans: [
          'Manrope',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'sans-serif',
        ],
        display: ['"Noto Serif"', 'Georgia', '"Times New Roman"', 'serif'],
      },
    },
  },
}
