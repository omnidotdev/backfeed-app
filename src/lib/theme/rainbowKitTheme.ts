import { darkTheme as rainbowKitDarkTheme } from "@rainbow-me/rainbowkit";
import merge from "lodash.merge";

import baseTheme from "lib/theme/baseTheme";

import type { Theme as RKTheme } from "@rainbow-me/rainbowkit";

const rainbowKitTheme = merge(rainbowKitDarkTheme(), {
  radii: {
    actionButton: baseTheme.radii.md,
    connectButton: baseTheme.radii.md,
    menuButton: baseTheme.radii.md,
    modal: baseTheme.radii.md,
    modalMobile: baseTheme.radii.md,
  },
  shadows: {
    connectButton: baseTheme.shadows.md,
    dialog: baseTheme.shadows.lg,
    profileDetailsAction: baseTheme.shadows.md,
    selectedOption: baseTheme.shadows.md,
    selectedWallet: baseTheme.shadows.md,
    walletLogo: baseTheme.shadows.md,
  },
  colors: {
    accentColor: baseTheme.colors.brand.primary[500],
    accentColorForeground: "white",
  },
} as RKTheme);

export default rainbowKitTheme;
