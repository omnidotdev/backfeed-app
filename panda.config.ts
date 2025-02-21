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
          borderColor: ["*"],
        },
      },
    ],
  },
  globalCss: {
    extend: {
      html: {
        margin: 0,
        backgroundColor: "var(--colors-background-default)",
        // NB: prevents overscroll bouncing. Helps `sticky` elements not to bounce unexpectedly, and provides a more uniform UX across browsers.
        // On `html` for Firefox and Safari, on `body` for Chrome
        overscrollBehaviorY: "none",
      },
      body: {
        overscrollBehaviorY: "none",
      },
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
        sizes: {
          18: { value: "4.5rem" },
          header: { value: "5rem" },
        },
        spacing: {
          header: { value: "{sizes.header}" },
        },
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
