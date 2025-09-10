/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class", '[data-mantine-color-scheme="dark"]'],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#0A0F13",
        night: {
          500: "#141a20",
          600: "#0e141b",
          700: "#0A0F13",
        },
      },
      fontFamily: {
        title: ["Yeseva One", "serif"],
      },
      backgroundImage: {
        "white-logo": "url('/images/white-logo.svg')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
