/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        'pastel-green': 'var(--pastel-green)',
        'pastel-green-dark': 'var(--pastel-green-dark)',
        'pastel-green-light': 'var(--pastel-green-light)',
        cream: 'var(--cream)',
        'cream-dark': 'var(--cream-dark)',
        'soft-pink': 'var(--soft-pink)',
        'soft-pink-dark': 'var(--soft-pink-dark)',
        gold: 'var(--gold)',
        'gold-dark': 'var(--gold-dark)',
        teal: 'var(--teal)',
        'purple-soft': 'var(--purple-soft)',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        xl: 'calc(var(--radius) + 0.25rem)',
        '2xl': 'calc(var(--radius) + 0.5rem)',
        '3xl': 'calc(var(--radius) + 1rem)',
        full: '9999px',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        quicksand: ['var(--font-sans)', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 20px rgba(168, 213, 186, 0.25), 0 1px 4px rgba(0,0,0,0.06)',
        'soft-pink': '0 4px 20px rgba(255, 209, 220, 0.4)',
        'soft-green': '0 4px 20px rgba(168, 213, 186, 0.4)',
        'soft-gold': '0 4px 20px rgba(244, 197, 66, 0.4)',
      },
      animation: {
        'float': 'floatUpDown 3s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
        'bounce-in': 'bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'slide-up': 'slideUp 0.4s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'star-pop': 'starPop 0.5s ease-out forwards',
        'timer-pulse': 'timerPulse 1s ease-in-out infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};