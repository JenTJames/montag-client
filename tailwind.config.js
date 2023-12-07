/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5bf7",
          600: "#7c39ee",
          700: "#7635dc",
          800: "#5b20b7",
          900: "#4c1d95",
          950: "#2e1065",
        },
        secondary: {
          50: "#f6f7f9",
          100: "#eceff2",
          200: "#d4dbe3",
          300: "#aebccb",
          400: "#8297ae",
          500: "#637b94",
          600: "#4e637b",
          700: "#405064",
          800: "#384454",
          900: "#323c48",
          950: "#222831",
        },
        secondaryContrast: "#EEF1F6",
        subtle: "#6C737F",
      },
    },
  },
  plugins: [],
};
