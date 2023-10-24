// vite.config.js
import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "./src/main.ts"),
      name: "Sellsuki Core Components",
      // the proper extensions will be added
      fileName: "sellsuki-components",
      // formats: ["es"],
    },
    rollupOptions: {
      // If we want to publish standalone components we don't externalize lit,
      // if you are going to use lit in your own project, you can make it a dep instead.
      external: /^lit/, // <-- comment this line
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          lit: "lit",
        },
      },
    },
  },
  plugins: [dts({ rollupTypes: true })],
});
