import tailwindcss from "@tailwindcss/vite";
import { nitroV2Plugin } from "@tanstack/nitro-v2-vite-plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import tsConfigPaths from "vite-tsconfig-paths";

/**
 * Vite configuration.
 * @see https://vite.dev/config
 */
const viteConfig = defineConfig(({ command }) => ({
  server: {
    port: Number(process.env.PORT) || 3000,
    strictPort: true,
    host: "0.0.0.0",
  },
  plugins: [
    // NB: command is `serve` in development, `build` in production
    command === "serve" && mkcert(),
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart(),
    nitroV2Plugin({
      preset: "node-server",
      externals: {
        inline: ["srvx", "react-dom", "better-auth", "@better-auth"],
        // Trace externalized dependencies with the `node` export condition so the
        // files Nitro copies into the server bundle match what the deployed
        // plain-Node runtime actually resolves. Nitro otherwise prepends
        // `production`, and Lexical's `exports` lists `production` before `node`,
        // so the trace copied LexicalHtml.prod.mjs while Node resolved the `node`
        // condition (LexicalHtml.node.mjs) at runtime, which was never copied,
        // 500ing every SSR render of the rich-text editor. Node never sets the
        // `production` condition, so tracing with `node` mirrors runtime exactly
        traceOptions: {
          conditions: ["node"],
        },
      },
      routeRules: {
        "/**": {
          headers: {
            "Permissions-Policy": "geolocation=(), camera=(), microphone=()",
            "Cache-Control": "public, max-age=0, must-revalidate",
          },
        },
      },
    }),
  ],
}));

export default viteConfig;
