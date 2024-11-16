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
  globalCss: {
    html: {
      margin: 0,
      backgroundColor: "var(--colors-background-default)",
    },
  },
  conditions: {
    extend: {
      groupHover: "[role=group]:where(:hover, [data-hover]) &",
    },
  },
});

export default pandaConfig;
