/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        success: '#22c55e',     
        warning: '#eab308',     
        info: '#3b82f6',        
        error: '#ef4444',       
        gray: '#6b7280',        
        grayLight: '#e5e7eb',   
      }
    },
  },
  plugins: [],
};