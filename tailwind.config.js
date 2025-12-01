/** @type {import('tailwindcss').Config} */
export default {
  // Use the "class" strategy for dark mode so toggling the `.dark` class
  // on the <html> element will switch Tailwind's dark: utilities.
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
