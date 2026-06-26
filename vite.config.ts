import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/ha-capwatcher-card.ts"),
      name: "HACAPWatcherCard",
      fileName: "ha-capwatcher-card",
      formats: ["es"],
    },
    outDir: "dist",
    minify: true,
    rollupOptions: {
      output: {
        // Single file — easier for HACS distribution and Lovelace resource registration
        inlineDynamicImports: true,
      },
    },
  },
});
