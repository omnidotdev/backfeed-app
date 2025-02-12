import { sigilPreset } from "@omnidev/sigil";
import { defineConfig } from "@pandacss/dev";

const pandaConfig = defineConfig({
  preflight: true,
  jsxFramework: "react",
  presets: ["@pandacss/preset-base", sigilPreset],
  include: ["src/**/*.{ts,tsx}"],
  outdir: "src/generated/panda",
  staticCss: {
    recipes: {
      toast: ["*"],
    },
    css: [
      {
        properties: {
          color: ["*"],
          backgroundColor: ["*"],
          // NB: added to render dynamic border colors in `Response` component. Without this, the border color is static (pulled from recipe) unless i.e. `borderColor="blue"` is explciitly used elsewhere in the app.
          borderColor: ["*"],
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
  theme: {
    extend: {
      tokens: {
        colors: {
          destructive: {
            hover: {
              value: "#dc2626",
              description: "Destructive hover color.",
            },
            active: {
              value: "#b91c1c",
              description: "Destructive active color.",
            },
            focus: {
              value: "#b91c1c",
              description: "Destructive focus color.",
            },
          },
        },
      },
    },
  },
});

export default pandaConfig;
