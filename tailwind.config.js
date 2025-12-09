/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",  ],
  theme: {
    extend: {
      colors: {
        holo: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd', // Soft Cyan
          300: '#7dd3fc', // Bright Cyan
          400: '#38bdf8', // Electric Blue
          500: '#0ea5e9',
          pink: '#f0abfc', // Neon Magenta
          purple: '#c084fc', // Electric Violet
          lime: '#bef264', // Neon Lime
        }
      },
      boxShadow: {
        'neon-cyan': '0 0 10px rgba(56, 189, 248, 0.5), 0 0 20px rgba(56, 189, 248, 0.3)',
        'neon-pink': '0 0 10px rgba(232, 121, 249, 0.5), 0 0 20px rgba(232, 121, 249, 0.3)',
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
}

