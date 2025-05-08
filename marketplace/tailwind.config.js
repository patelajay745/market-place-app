/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#1c1c1f",
        deActive: "#DCE4F2",
        secondaryText: "#999999",
      },
    },
  },
  plugins: [],
};
