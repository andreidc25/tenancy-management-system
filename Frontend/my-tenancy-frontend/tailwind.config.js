/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ include JSX here
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        // ✅ vivid, modern tones
        'dashboard-blue': '#2563eb',    // Bright blue
        'dashboard-green': '#059669',   // Emerald green
        'dashboard-orange': '#ea580c',  // Warm orange
        'dashboard-cyan': '#0891b2',    // Teal blue
      },
    },
  },
  plugins: [],
};
