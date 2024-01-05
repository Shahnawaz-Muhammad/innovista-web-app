/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        white: "#fff",
        black: "#000",
        orange: "#F15823",
        orangeDark: "#C0461C",
        lightGray: "#d4d2d2",
        textGray: "#85929E",
        bgGray: "#f2f3f7",
        darkGray: "#1B2631",
        primary: {"50":"#eff6ff","100":"#dbeafe","200":"#bfdbfe","300":"#93c5fd","400":"#60a5fa","500":"#3b82f6","600":"#2563eb","700":"#1d4ed8","800":"#1e40af","900":"#1e3a8a","950":"#172554"},
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

        coverImage:"url('/src/assets/images/cover-image.jpg')",

        "sidebar-image-mobile":
          "url('../public/assets/images/bg-sidebar-mobile.svg')",
        "sidebar-image-desktop":
          "url('../public/assets/images/bg-sidebar-desktop.svg')",
      },
    },
  },
  plugins: [],
};
