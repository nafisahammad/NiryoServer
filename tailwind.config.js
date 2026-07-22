/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'niryo': {
          'blue': '#00A3E0',
          'dark': '#1A1A2E',
          'darker': '#0F0F1A',
          'accent': '#00D4AA',
          'orange': '#FF6B35',
          'gray': '#2A2A3E',
          'light': '#E8F4F8',
        }
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': 'linear-gradient(135deg, #0F0F1A 0%, #1A1A2E 50%, #00A3E0 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #00A3E0, 0 0 10px #00A3E0' },
          '100%': { boxShadow: '0 0 20px #00A3E0, 0 0 30px #00A3E0' },
        }
      }
    },
  },
  plugins: [],
}
