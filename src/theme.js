// src/theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    cutePurple: {
      50: "#f7ecff",
      100: "#e8caff",
      200: "#d8a7ff",
      300: "#c985ff",
      400: "#b962ff",
      500: "#a93fff",  // color principal
      600: "#8a32cc",
      700: "#6a2699",
      800: "#4b1966",
      900: "#2b0d33",
    },
    cutePink: {
      100: "#ffe4f3",
      200: "#ffc7e8",
      300: "#ffabd9",
      400: "#ff8fc8",
      500: "#ff72b8",
    },
  },

  radii: {
    cute: "18px",
    superCute: "30px",
  },

  shadows: {
    cute: "0px 4px 10px rgba(200, 150, 255, 0.25)",
  },
});

export default theme;