/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./App.tsx",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        'opensans': ['OpenSans-Regular'],
        'opensans-bold': ['OpenSans-Bold'],
        'opensans-light': ['OpenSans-Light'],
        'opensans-medium': ['OpenSans-Medium'],
        'opensans-semibold': ['OpenSans-SemiBold'],
        'opensans-extrabold': ['OpenSans-ExtraBold'],
        'opensans-italic': ['OpenSans-Italic'],
        'opensans-bold-italic': ['OpenSans-BoldItalic'],
        'opensans-light-italic': ['OpenSans-LightItalic'],
        'opensans-medium-italic': ['OpenSans-MediumItalic'],
        'opensans-semibold-italic': ['OpenSans-SemiBoldItalic'],
        'opensans-extrabold-italic': ['OpenSans-ExtraBoldItalic'],
      }
    },
  },
  plugins: [],
};
