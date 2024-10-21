import { sigilPreset } from "@omnidev/sigil";
import { defineConfig } from "@pandacss/dev";

import type { Tokens } from "@pandacss/dev";

// colors based on https://coolors.co/f6c419-4372c4-05163c-838383-82102b
const brandColors: Tokens["colors"] = {
  saffron: {
    DEFAULT: { value: "{colors.brand.saffron.400}" },
    50: { value: "#fefbe8" },
    100: { value: "#fdf7c4" },
    200: { value: "#fceb8c" },
    300: { value: "#fada4a" },
    400: { value: "#f6c419" },
    500: { value: "#e6ab0c" },
    600: { value: "#c78407" },
    700: { value: "#9e5e0a" },
    800: { value: "#834a10" },
    900: { value: "#6f3d14" },
    950: { value: "#411f07" },
  },
  celticBlue: {
    DEFAULT: { value: "{colors.brand.celticBlue.600}" },
    50: { value: "#f2f7fc" },
    100: { value: "#e2ecf7" },
    200: { value: "#cbdef2" },
    300: { value: "#a7c9e9" },
    400: { value: "#7daddd" },
    500: { value: "#5e90d3" },
    600: { value: "#4372c4" },
    700: { value: "#4065b5" },
    800: { value: "#395394" },
    900: { value: "#324776" },
    950: { value: "#222d49" },
  },
  oxfordBlue: {
    DEFAULT: { value: "{colors.brand.oxfordBlue.950}" },
    50: { value: "#e7f7ff" },
    100: { value: "#d4f0ff" },
    200: { value: "#b1e2ff" },
    300: { value: "#82cbff" },
    400: { value: "#52a5ff" },
    500: { value: "#2a7fff" },
    600: { value: "#0753ff" },
    700: { value: "#004dff" },
    800: { value: "#0242d1" },
    900: { value: "#0d3fa2" },
    950: { value: "#05163c" },
  },
  gray: {
    DEFAULT: { value: "{colors.brand.gray.400}" },
    50: { value: "#f6f6f6" },
    100: { value: "#e7e7e7" },
    200: { value: "#d1d1d1" },
    300: { value: "#b0b0b0" },
    400: { value: "#838383" },
    500: { value: "#6d6d6d" },
    600: { value: "#5d5d5d" },
    700: { value: "#4f4f4f" },
    800: { value: "#454545" },
    900: { value: "#3d3d3d" },
    950: { value: "#262626" },
  },
  burgundy: {
    DEFAULT: { value: "{colors.brand.burgundy.900}" },
    50: { value: "#fff1f1" },
    100: { value: "#ffe4e4" },
    200: { value: "#ffccce" },
    300: { value: "#ffa2a7" },
    400: { value: "#fd6f79" },
    500: { value: "#f73c4f" },
    600: { value: "#e41a38" },
    700: { value: "#c10f2d" },
    800: { value: "#a1102e" },
    900: { value: "#82102b" },
    950: { value: "#4d0413" },
  },
};

const pandaConfig = defineConfig({
  preflight: true,
  jsxFramework: "react",
  presets: ["@pandacss/preset-base", sigilPreset],
  include: ["src/**/*.{ts,tsx}"],
  outdir: "src/generated/panda",
  globalCss: {
    extend: {
      "html,body": {
        color: "foreground.muted!",
      },
    },
  },
  staticCss: {
    css: [
      {
        properties: {
          color: ["*"],
          backgroundColor: ["*"],
        },
      },
    ],
  },
  theme: {
    extend: {
      slotRecipes: {
        // TODO bake into Sigil panda.config
        switchRecipe: {
          jsx: ["Switch"],
        },
      },
      tokens: {
        colors: {
          brand: {
            ...brandColors,
            primary: brandColors.celticBlue,
            secondary: brandColors.oxfordBlue,
            tertiary: brandColors.saffron,
            quaternary: brandColors.burgundy,
            quinary: brandColors.gray,
          },
        },
        zIndex: {
          header: { value: 7000 },
          stickyHeader: { value: 999 },
        },
      },
    },
  },
});

export default pandaConfig;
