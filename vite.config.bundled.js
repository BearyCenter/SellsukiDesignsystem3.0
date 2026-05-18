// Second build target: bundled JS for direct CDN consumption.
// Bundles lit + @lit/context + lit/directives inline so a vanilla
// <script type="module" src="...bundled.js"> works without an importmap.
// Primary build (vite.config.js) still externalises lit for ESM consumers
// who already have lit in their dep graph.
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, "./src/main.ts"),
      name: "SellsukiComponents",
      fileName: "sellsuki-components.bundled",
      formats: ["es"],
    },
    rollupOptions: {
      external: [],
      resolve: {
        conditions: ["production"],
      },
    },
  },
});
