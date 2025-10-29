/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'brand-bg': '#22222c',
        'brand-text': '#eeebe3',
        'brand-orange': '#e27240',
        'brand-blue': '#428ce6',
        'brand-cyan': '#a3eadc',
        'brand-ui-secondary': '#31313e',
        'brand-border': '#4a4a5a',
      },

      fontFamily: {
        'titulo': ['Gasoek One', 'sans-serif'],
        'sans': ['Zalando Sans', 'sans-serif'],
      },
      
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'translateY(-3px) rotate(-2deg)' },
          '50%': { transform: 'translateY(3px) rotate(2deg)' },
        },
      },

      animation: {
        wiggle: 'wiggle 5s ease-in-out infinite',
      },

      boxShadow: {
        'glow-cyan': '0 0 15px 5px rgba(163, 234, 220, 0.5)',
      },
    },
  },
  plugins: [],
}
