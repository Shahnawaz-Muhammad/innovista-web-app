/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        white: "#fff",
        black: "#000",
        yellowDark: "#D68910",
        yellow: "#F39C12",
        lightGray: "#d4d2d2",
        textGray: "#85929E",
        bgGray: "#f2f3f7",
        darkGray: "#1B2631"
      },
      fontFamily: {
        'raleway': ['Raleway', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif']
      },
      backgroundImage: {
        offerBg1: "url('/src/assets/images/offerBg1.jpg')",
        offerBg3: "url('/src/assets/images/offerBg3.jpg')",
        offerBg2: "url('/src/assets/images/offerBg2.jpg')",
      }
    },
  },
  plugins: [],
};
