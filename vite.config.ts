import { devtools } from "@tanstack/devtools-vite";
import { nitroV2Plugin } from "@tanstack/nitro-v2-vite-plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import mkcert from "vite-plugin-mkcert";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      port: 3000,
      host: "0.0.0.0",
      // Seemingly needed as a workaround for `https`. See: https://github.com/TanStack/router/issues/4287#issuecomment-2954268842
      proxy: {},
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
