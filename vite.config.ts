import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";

// import { nitroV2Plugin } from "@tanstack/nitro-v2-vite-plugin";

import { devtools } from "@tanstack/devtools-vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // nitroV2Plugin(),
    tanstackRouter({ autoCodeSplitting: true }),
    viteReact(),
    tailwindcss(),
    devtools({
      removeDevtoolsOnBuild: false,
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
