/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4f46e5",   // indigo-600
        secondary: "#0f172a", // slate-900
        muted: "#64748b",     // slate-500
        light: "#f8fafc",     // slate-50
      },
    },
  },
  plugins: [],
};
