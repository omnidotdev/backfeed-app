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
          colSpan: ["*"],
        },
      },
    ],
  },
  globalCss: {
    extend: {
      html: {
        margin: 0,
        backgroundColor: "var(--colors-background-default)",
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
      recipes: {
        // Override button recipe to use primary (ruby) as default colorPalette
        button: {
          base: {
            colorPalette: "primary",
          },
        },
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "0.8" },
        },
      },
      semanticTokens: {
        colors: {
          "card-item": {
            value: {
              base: "{colors.background.subtle/70}",
              _dark: "{colors.background.subtle/20}",
            },
          },
          // Override brand.primary to use ruby (Backfeed's gemstone) - for subtle accents
          brand: {
            primary: {
              DEFAULT: {
                value: {
                  base: "{colors.omni.ruby.500}",
                  _dark: "{colors.omni.ruby.400}",
                },
              },
              50: { value: "{colors.omni.ruby.50}" },
              100: { value: "{colors.omni.ruby.100}" },
              200: { value: "{colors.omni.ruby.200}" },
              300: { value: "{colors.omni.ruby.300}" },
              400: { value: "{colors.omni.ruby.400}" },
              500: { value: "{colors.omni.ruby.500}" },
              600: { value: "{colors.omni.ruby.600}" },
              700: { value: "{colors.omni.ruby.700}" },
              800: { value: "{colors.omni.ruby.800}" },
              900: { value: "{colors.omni.ruby.900}" },
              950: { value: "{colors.omni.ruby.950}" },
            },
            // Secondary: amethyst (cosmic purple)
            secondary: {
              DEFAULT: {
                value: {
                  base: "{colors.omni.amethyst.500}",
                  _dark: "{colors.omni.amethyst.400}",
                },
              },
              50: { value: "{colors.omni.amethyst.50}" },
              100: { value: "{colors.omni.amethyst.100}" },
              200: { value: "{colors.omni.amethyst.200}" },
              300: { value: "{colors.omni.amethyst.300}" },
              400: { value: "{colors.omni.amethyst.400}" },
              500: { value: "{colors.omni.amethyst.500}" },
              600: { value: "{colors.omni.amethyst.600}" },
              700: { value: "{colors.omni.amethyst.700}" },
              800: { value: "{colors.omni.amethyst.800}" },
              900: { value: "{colors.omni.amethyst.900}" },
              950: { value: "{colors.omni.amethyst.950}" },
            },
          },
          // Map primary/accent semantic colors to ruby
          primary: {
            DEFAULT: {
              value: {
                base: "{colors.omni.ruby.500}",
                _dark: "{colors.omni.ruby.400}",
              },
            },
            default: {
              value: {
                base: "{colors.omni.ruby.500}",
                _dark: "{colors.omni.ruby.400}",
              },
            },
            emphasized: {
              value: {
                base: "{colors.omni.ruby.600}",
                _dark: "{colors.omni.ruby.300}",
              },
            },
            foreground: {
              value: {
                base: "{colors.white}",
                _dark: "{colors.white}",
              },
            },
            text: {
              value: {
                base: "{colors.omni.ruby.700}",
                _dark: "{colors.omni.ruby.300}",
              },
            },
          },
          // Accent colors - ruby for buttons
          accent: {
            default: {
              value: {
                base: "{colors.omni.ruby.500}",
                _dark: "{colors.omni.ruby.400}",
              },
            },
            emphasized: {
              value: {
                base: "{colors.omni.ruby.600}",
                _dark: "{colors.omni.ruby.300}",
              },
            },
            foreground: {
              value: {
                base: "{colors.white}",
                _dark: "{colors.white}",
              },
            },
          },
          // Ruby semantic tokens for direct use - softer in dark mode
          ruby: {
            50: { value: "{colors.omni.ruby.50}" },
            100: { value: "{colors.omni.ruby.100}" },
            200: { value: "{colors.omni.ruby.200}" },
            300: { value: "{colors.omni.ruby.300}" },
            400: { value: "{colors.omni.ruby.400}" },
            500: { value: "{colors.omni.ruby.500}" },
            600: { value: "{colors.omni.ruby.600}" },
            700: { value: "{colors.omni.ruby.700}" },
            800: { value: "{colors.omni.ruby.800}" },
            900: { value: "{colors.omni.ruby.900}" },
            950: { value: "{colors.omni.ruby.950}" },
            default: {
              value: {
                base: "{colors.omni.ruby.500}",
                _dark: "{colors.omni.ruby.400}",
              },
            },
            emphasized: {
              value: {
                base: "{colors.omni.ruby.600}",
                _dark: "{colors.omni.ruby.300}",
              },
            },
            foreground: {
              value: {
                base: "{colors.white}",
                _dark: "{colors.neutral.950}",
              },
            },
            text: {
              value: {
                base: "{colors.omni.ruby.700}",
                _dark: "{colors.omni.ruby.300}",
              },
            },
          },
          cosmic: {
            magenta: {
              value: {
                base: "{colors.omni.amethyst.500}",
                _dark: "{colors.omni.amethyst.400}",
              },
            },
            purple: {
              value: {
                base: "{colors.omni.amethyst.600}",
                _dark: "{colors.omni.amethyst.500}",
              },
            },
          },
          glow: {
            ruby: {
              value: {
                base: "oklch(0.650 0.220 6 / 0.4)",
                _dark: "oklch(0.750 0.185 8 / 0.5)",
              },
            },
            magenta: {
              value: {
                base: "oklch(0.667 0.251 323 / 0.3)",
                _dark: "oklch(0.740 0.203 323 / 0.4)",
              },
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
          "glow-ruby": {
            value: {
              base: "0 0 30px oklch(0.650 0.220 6 / 0.3)",
              _dark: "0 0 40px oklch(0.750 0.185 8 / 0.4)",
            },
          },
          "glow-card": {
            value: {
              base: "0 20px 40px -15px oklch(0.650 0.220 6 / 0.15)",
              _dark: "0 20px 40px -15px oklch(0.750 0.185 8 / 0.25)",
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
          ruby: {
            value:
              "linear-gradient(135deg, {colors.omni.ruby.600} 0%, {colors.omni.ruby.500} 50%, {colors.omni.amethyst.500} 100%)",
          },
          cosmic: {
            value:
              "radial-gradient(ellipse at top, {colors.neutral.900} 0%, {colors.neutral.950} 50%, {colors.black} 100%)",
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
        animations: {
          float: { value: "float 6s ease-in-out infinite" },
          "pulse-glow": { value: "pulse-glow 4s ease-in-out infinite" },
        },
        durations: {
          fast: { value: "150ms" },
          normal: { value: "300ms" },
          slow: { value: "500ms" },
        },
      },
    },
  },
});

export default pandaConfig;
