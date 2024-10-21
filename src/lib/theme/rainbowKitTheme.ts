import { darkTheme as rainbowKitDarkTheme } from "@rainbow-me/rainbowkit";
import merge from "lodash.merge";

import { token } from "generated/panda/tokens";

import type { Theme as RKTheme } from "@rainbow-me/rainbowkit";

const rainbowKitTheme = merge(rainbowKitDarkTheme(), {
  colors: {
    accentColor: token("colors.brand.primary.500"),
    accentColorForeground: "black",
  },
} as RKTheme);

export default rainbowKitTheme;
