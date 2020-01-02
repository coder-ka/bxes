const color = require("color")
const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      colors: {
        "primary-900": color("hsl(194, 87%, 21%)").hex(),
        "primary-800": color("hsl(194, 87%, 27%)").hex(),
        "primary-700": color("hsl(194, 87%, 32%)").hex(),
        "primary-600": color("hsl(194, 87%, 37%)").hex(),
        "primary-500": color("hsl(194, 87%, 42%)").hex(),
        "primary-400": color("hsl(194, 87%, 56%)").hex(),
        "primary-300": color("hsl(194, 87%, 70%)").hex(),
        "primary-200": color("hsl(194, 87%, 84%)").hex(),
        "primary-100": color("hsl(194, 87%, 97%)").hex(),

        "accent-900": color("hsl(335, 82%, 25%)").hex(),
        "accent-800": color("hsl(335, 82%, 31%)").hex(),
        "accent-700": color("hsl(335, 82%, 36%)").hex(),
        "accent-600": color("hsl(335, 82%, 42%)").hex(),
        "accent-500": color("hsl(335, 82%, 47%)").hex(),
        "accent-400": color("hsl(335, 82%, 58%)").hex(),
        "accent-300": color("hsl(335, 82%, 70%)").hex(),
        "accent-200": color("hsl(335, 82%, 81%)").hex(),
        "accent-100": color("hsl(335, 82%, 93%)").hex(),

        "disabled-900": defaultTheme.colors.gray["900"],
        "disabled-800": defaultTheme.colors.gray["800"],
        "disabled-700": defaultTheme.colors.gray["700"],
        "disabled-600": defaultTheme.colors.gray["600"],
        "disabled-500": defaultTheme.colors.gray["500"],
        "disabled-400": defaultTheme.colors.gray["400"],
        "disabled-300": defaultTheme.colors.gray["300"],
        "disabled-200": defaultTheme.colors.gray["200"],
        "disabled-100": defaultTheme.colors.gray["100"],

        "transparent-900": "rgba(255, 255, 255, .9)",
        "transparent-800": "rgba(255, 255, 255, .8)",
        "transparent-700": "rgba(255, 255, 255, .7)",
        "transparent-600": "rgba(255, 255, 255, .6)",
        "transparent-500": "rgba(255, 255, 255, .5)",
        "transparent-400": "rgba(255, 255, 255, .4)",
        "transparent-300": "rgba(255, 255, 255, .3)",
        "transparent-200": "rgba(255, 255, 255, .2)",
        "transparent-100": "rgba(255, 255, 255, .1)",
      },
      fontFamily: {
        sans: [
          "Roboto",
          defaultTheme.fontFamily.sans.filter(x => x !== "Roboto"),
        ],
      },
    },
  },
  variants: {},
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        ".text-shadow": {
          textShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
        },
        ".text-shadow-md": {
          textShadow: "0px 4px 3px rgba(0, 0, 0, 0.25)",
        },
        ".text-shadow-lg": {
          textShadow: "0px 5px 4px darkgrey",
        },
        ".text-shadow-xl": {
          textShadow: "0px 7px 5px darkgrey",
        },
        ".text-shadow-2xl": {
          textShadow: "0px 10px 6px darkgrey",
        },
        ".text-shadow-none": {
          textShadow: "none",
        },

        // overflow-scroll
        ".overflow-scroll-touch": {
          "--webkit-overflow-scrolling": "touch",
        },
      }

      addUtilities(newUtilities)
    },
  ],
}
