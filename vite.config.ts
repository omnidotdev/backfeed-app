import { devtools } from "@tanstack/devtools-vite";
import { nitroV2Plugin } from "@tanstack/nitro-v2-vite-plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import mkcert from "vite-plugin-mkcert";
import tsConfigPaths from "vite-tsconfig-paths";

/**
 * Vite configuration.
 * @see https://vite.dev/config
 */
const viteConfig = defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      port: 3000,
      host: "0.0.0.0",
      cors: {
        origin: env.VITE_AUTH_BASE_URL,
        credentials: true,
      },
    },
    plugins: [
      devtools(),
      // NB: command is `serve` in development, `build` in production
      command === "serve" && mkcert(),
      tsConfigPaths({ projects: ["./tsconfig.json"] }),
      tanstackStart(),
      nitroV2Plugin({ preset: "node-server" }),
      react(),
    ],
  };
});

export default viteConfig;
