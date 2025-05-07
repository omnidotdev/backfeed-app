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
          top: ["*"],
          bottom: ["*"],
          right: ["*"],
          left: ["*"],
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
        fontSynthesisWeight: "none",
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
      semanticTokens: {
        colors: {
          "card-item": {
            value: {
              base: "{colors.background.subtle/70}",
              _dark: "{colors.background.subtle/20}",
            },
          },
        },
        shadows: {
          card: {
            value: {
              base: "0px 2px 4px {colors.neutral.400a}, 0px 0px 1px {colors.neutral.800a}",
              _dark:
                "0px 2px 4px {colors.black.800a}, 0px 0px 2px inset {colors.neutral.500a}",
            },
          },
        },
      },
      tokens: {
        gradients: {
          mask: {
            value:
              "linear-gradient(to bottom, transparent 5%, {colors.background.default})",
          },
        },
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
