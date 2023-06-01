import { extendTheme } from "@chakra-ui/react";

import fonts from "lib/theme/fonts";

import type { StyleFunctionProps } from "@chakra-ui/react";

/**
 * Base Chakra theme.
 */
const baseTheme = extendTheme({
  components: {
    Card: {
      baseStyle: (props: StyleFunctionProps) => ({
        container: {
          bgColor: props.colorMode === "light" ? "gray.100" : "gray.700",
        },
      }),
    },
  },
  fonts: {
    heading: `${fonts.primary.style.fontFamily}, sans-serif`,
    body: `${fonts.primary.style.fontFamily}, sans-serif`,
  },
  styles: {
    global: {
      "html, body": {
        margin: 0,
        padding: 0,
        width: "100%",
        height: "100%",
        // TODO only pick arrow
        // "[data-rk]": { svg: { display: "none" } },
      },
    },
  },
  colors: {
    brand: {
      primary: {
        50: "#b5e8e5",
        100: "#8edbd8",
        200: "#7bd5d1",
        300: "#67cfca",
        400: "#54c9c3",
        500: "#38b2ac",
        600: "#2c8b87",
        700: "#267874",
        800: "#206461",
        900: "#133e3c",
      },
    },
  },
});

export default baseTheme;
