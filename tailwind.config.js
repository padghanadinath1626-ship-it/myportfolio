/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0f1419',
          800: '#1a1f2e',
          700: '#282e3f',
        },
        accent: '#00d9ff',
        accentAlt: '#ff006e',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      animation: {
        typewriter: 'typewriter 3.5s steps(40,end)',
        blink: 'blink 0.7s infinite',
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite',
        scroll: 'scroll 2s ease-in-out infinite',
      },
      keyframes: {
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        blink: {
          '0%,100%': { borderColor: 'transparent' },
          '50%': { borderColor: 'white' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        scroll: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(10px)' },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
