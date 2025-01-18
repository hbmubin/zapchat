/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        deepPink: "#210b33",
        mediumPink: "#6d28d9",
        lightPink: "#ede9fe ",
      },
    },
  },
  plugins: [],
};

