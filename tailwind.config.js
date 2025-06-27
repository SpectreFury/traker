/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        'opensans': ['OpenSans-Regular'],
        'opensans-bold': ['OpenSans-Bold'],
        'opensans-bold-italic': ['OpenSans-BoldItalic'],
        'opensans-extrabold': ['OpenSans-ExtraBold'],
        'opensans-extrabold-italic': ['OpenSans-ExtraBoldItalic'],
        'opensans-italic': ['OpenSans-Italic'],
        'opensans-light': ['OpenSans-Light'],
        'opensans-light-italic': ['OpenSans-LightItalic'],
        'opensans-medium': ['OpenSans-Medium'],
        'opensans-medium-italic': ['OpenSans-MediumItalic'],
        'opensans-semibold': ['OpenSans-SemiBold'],
        'opensans-semibold-italic': ['OpenSans-SemiBoldItalic'],
      },
    },
  },
  plugins: [],
};
