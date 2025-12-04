/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'tradicia-black': '#000000',
        'tradicia-dark': '#1A1A1A',
        'tradicia-blue': '#005ee4',
        'tradicia-white': '#FFFFFF',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px #005ee4' },
          '100%': { boxShadow: '0 0 40px #005ee4, 0 0 60px #005ee4' },
        }
      },
    },
  },
  plugins: [],
} 