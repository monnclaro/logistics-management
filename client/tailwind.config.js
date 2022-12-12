/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    fontFamily: {
      Inter: ["Inter", "sans-serif"],
    },

    extend: {
      backgroundImage: {
        "span-gradient":
          "linear-gradient(89.86deg, #83b0d8 36.97%, #d6c4ff 62.97%)",
        "span-gradient-2":
          "linear-gradient(89.86deg, #d6c4ff 36.97%, #83b0d8 62.97%)",
      },
    },
  },
  plugins: [],
};
