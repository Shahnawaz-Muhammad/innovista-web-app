/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        white: "#fff",
        black: "#000",
        yellow: "#D68910",
        yellowDark: "#F39C12",
        lightGray: "#d4d2d2",
        textGray: "#85929E",
        bgGray: "#f2f3f7",
        darkGray: "#1B2631"
      },
      fontFamily: {
        'raleway': ['Raleway', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif']
      },
    },
  },
  plugins: [],
};
