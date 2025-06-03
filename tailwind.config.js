/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B5CF6',
          light: '#A78BFA',
          dark: '#7C3AED'
        },
        secondary: {
          DEFAULT: '#9333EA',
          light: '#A855F7',
          dark: '#7E22CE'
        },
        accent: '#7C3AED',
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a'
        },
nova: {
          purple: '#8B5CF6',
          violet: '#9333EA',
          gray: '#F7F9FC',
          text: '#333333'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Inter', 'ui-sans-serif', 'system-ui']
      },
boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'nova': '0 8px 32px rgba(139, 92, 246, 0.12)',
        'nova-hover': '0 12px 40px rgba(139, 92, 246, 0.18)',
        'neu-light': '5px 5px 15px #d1d9e6, -5px -5px 15px #ffffff',
        'neu-dark': '5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.05)'
      },
      scale: {
        '102': '1.02'
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem'
      },
backgroundImage: {
        'nova-gradient': 'linear-gradient(135deg, #8B5CF6 0%, #9333EA 100%)',
        'nova-subtle': 'linear-gradient(135deg, #F7F9FC 0%, #EEF2F7 100%)'
      }
    }
  },
  plugins: [],
  darkMode: 'class',
}