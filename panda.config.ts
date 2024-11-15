import { sigilPreset } from "@omnidev/sigil";
import { defineConfig } from "@pandacss/dev";

const pandaConfig = defineConfig({
  preflight: true,
  jsxFramework: "react",
  presets: ["@pandacss/preset-base", sigilPreset],
  include: ["src/**/*.{ts,tsx}"],
  outdir: "src/generated/panda",
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
});

export default pandaConfig;
