/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        black: "#0F0F0F",
        red: "#FF483D",
        blue: "#29C9F9",
        purple: "#A77EFF",
        pink: "#FF2A6A",
        main: "#EFFF04",
        white: "#FFFFFF",
        gray: {
          100: "#EEEEEE",
          200: "#DDDDDD",
          300: "#A4A4A4",
          400: "#5A5A5A",
          500: "#161616",
        },
      },
      fontFamily: {
        baskinRobbins: ["var(--font-baskinRobbins)"],
        notoSans: ["var(--font-notoSans)"],
      },
      screens: {
        sm: "744px", // tablet breakpoint
        md: "1200px", // laptop breakpoint
      },
    },
  },
  plugins: [],
};
