/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        chola: '#FF6B35',
        malandra: '#2EC4B6',
        fresa: '#E71D36',
        hybrida: '#9D4EDD',
        void: '#0F0F1A'
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'quantum': '0 0 40px rgba(157, 78, 221, 0.1)'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
