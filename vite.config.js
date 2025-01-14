// vite.config.js
import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "./src/main.ts"),
      name: "Sellsuki Components",
      fileName: "sellsuki-components",
    },
    rollupOptions: {
      external: /^lit/,
      output: {
        globals: {
          lit: "lit",
        },
      },
    },
  },
  resolve: {
    conditions: ["default", "module"],
  },
  plugins: [dts({ rollupTypes: true })],
});
