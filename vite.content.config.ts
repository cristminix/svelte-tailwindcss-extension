import { defineConfig } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import { resolve } from "path"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  define: {
    "process.env": {},
  },
  build: {
    emptyOutDir: true,
    outDir: resolve(__dirname, "dist"),
    lib: {
      formats: ["iife"],
      entry: resolve(__dirname, "./src/content-scripts/content.ts"),
      name: "Vite/Svelte/TailwindCSS Plugin",
    },
    rollupOptions: {
      output: {
        entryFileNames: "index.global.js",
        extend: true,
      },
    },
    minify: false,
    sourcemap: true,
  },
})
