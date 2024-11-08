import { sigilPreset } from "@omnidev/sigil";
import { defineConfig } from "@pandacss/dev";

const pandaConfig = defineConfig({
  preflight: true,
  jsxFramework: "react",
  presets: ["@pandacss/preset-base", sigilPreset],
  include: ["src/**/*.{ts,tsx}"],
  outdir: "src/generated/panda",
  theme: {
    extend: {
      slotRecipes: {
        // TODO bake into Sigil panda.config
        switchRecipe: {
          jsx: ["Switch"],
        },
      },
      tokens: {
        zIndex: {
          header: { value: 7000 },
          stickyHeader: { value: 999 },
        },
      },
    },
  },
});

export default pandaConfig;
