/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1D3557",
        secondary: "#457B9D",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
