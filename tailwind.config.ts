/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Ocean Breeze Primary Colors
        primary: {
          50: '#f0f9ff',
          500: '#1768ac',   // Base blue from your palette
          600: '#2541b2',   // Deeper blue 
          700: '#1d4ed8',   // Darkest blue for active states
        },
        
        // Success - Ocean Green (harmonizes with blue)
        success: {
          50: '#f0fdf9',
          500: '#10b981',   // Ocean green
          600: '#059669',
          700: '#047857',
        },
        
        // Warning - Coral Orange (complementary to blue)
        warning: {
          50: '#fff8f1',
          500: '#f97316',   // Coral orange
          600: '#ea580c',
          700: '#c2410c',
        },
        
        // Danger - Coral Red (matches the ocean theme)
        danger: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',   // Coral red
          600: '#dc2626',
          700: '#b91c1c',
        },
        
        // Secondary/Neutral - Ocean Grays
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',   // Medium gray
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      }
    },
  },
  plugins: [],
}
