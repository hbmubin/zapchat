/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        deepPink: "#210b33",
        lightPink: "#ede9fe ",
        mediumPink: "#a78bfa",
      },
    },
  },
  plugins: [],
};

