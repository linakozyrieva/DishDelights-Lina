import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/DishDelights-Lina/", // 👈 YOUR REPO NAME
  build: {
    outDir: "dist",
    assetsDir: "assets",
    emptyOutDir: true, // Clears `dist/` before building
    manifest: true, // Ensures assets are generated
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },
});
