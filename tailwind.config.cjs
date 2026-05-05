/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-foreground': 'var(--color-primary-foreground)',
        secondary: 'var(--color-secondary)',
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        card: 'var(--color-card)',
        muted: 'var(--color-muted)',
        accent: 'var(--color-accent)',
        destructive: 'var(--color-destructive)',
        sidebar: 'var(--color-sidebar)'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        display: ['Playfair Display', 'Georgia', 'serif']
      },
      fontSize: {
        'display-1': ['clamp(2rem, 4.5vw, 5.5rem)', { lineHeight: '1.02' }],
        'display-2': ['clamp(1.75rem, 3.5vw, 4rem)', { lineHeight: '1.08' }],
        'xl-heading': ['clamp(1.25rem, 2.5vw, 2.5rem)', { lineHeight: '1.1' }]
      },
      letterSpacing: {
        tightest: '-0.04em',
        widest: '0.3em'
      },
      spacing: {
        '9': '2.25rem'
      }
    }
  },
  plugins: []
}
