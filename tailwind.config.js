/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ios: {
          blue: '#007AFF',
          blueDark: '#0051D5',
          gray: '#8E8E93',
          grayLight: '#C7C7CC',
          lightGray: '#F2F2F7',
          darkGray: '#1C1C1E',
          systemGray: '#8E8E93',
          systemGray2: '#AEAEB2',
          systemGray3: '#C7C7CC',
          systemGray4: '#D1D1D6',
          systemGray5: '#E5E5EA',
          systemGray6: '#F2F2F7',
        },
        // Performance/Energy inspired colors
        perf: {
          primary: '#2563EB', // Vibrant blue
          secondary: '#10B981', // Energetic green
          accent: '#F59E0B', // Energetic orange
          dark: '#0F172A', // Deep dark
          darkSurface: '#1E293B', // Dark surface
          darkCard: '#334155', // Dark card
          light: '#F8FAFC', // Light background
          lightSurface: '#FFFFFF',
        }
      },
      screens: {
        'xs': '475px',
      },
      borderRadius: {
        'ios': '12px',
        'ios-lg': '16px',
        'ios-xl': '20px',
      },
      boxShadow: {
        'ios': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'ios-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'ios-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'ios-card': '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)',
      },
      backdropBlur: {
        'ios': '20px',
      }
    },
  },
  plugins: [],
}

