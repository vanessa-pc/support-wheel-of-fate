/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      tablet: "640px",
      laptop: "1024px",
      desktop: "1280px",
    },
    colors: {
      lightGreen: "#1cd481",
      lightPurple: "#a129a3",
      lightBlue: "#4881db",
      black: "#130d14",
      orange: "#de5414",
      yellow: "#f2c035",
      lightYellow: "#ffefc2",
      gray: "#5e5c57",
      lightGray: "#2e2e2d",
      white: "#ffffff",
      red: "#c2022c",
      lightRed: "#ab3e55",
      pink: "#ba4a63",
      green: "#03945c",
      purple: "#b361ed",
      pinkish: "#e1dded",
      lightPink: "#fa82a6",
    },
    extend: {},
  },
  plugins: [],
};
