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
        darkGray: "#1B2631",

        "primary-marine-blue": "#02295a",
        "primary-purplish-blue": "#473dff",
        "primary-pastel-blue": "#adbeff",
        "primary-light-blue": "#bfe2fd",
        "primary-starberry-red": "#ed3548",
        "neutral-cool-gray": "#9699ab",
        "neutral-light-gray": "#d6d9e6",
        "neutral-magnolia": "#f0f6ff",
        "neutral-alabaster": "#fafbff",
      },
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      backgroundImage: {
        offerBg1: "url('/src/assets/images/offerBg1.jpg')",
        offerBg3: "url('/src/assets/images/offerBg3.jpg')",
        offerBg2: "url('/src/assets/images/offerBg2.jpg')",

        "sidebar-image-mobile":
          "url('../public/assets/images/bg-sidebar-mobile.svg')",
        "sidebar-image-desktop":
          "url('../public/assets/images/bg-sidebar-desktop.svg')",
      },
    },
  },
  plugins: [],
};
