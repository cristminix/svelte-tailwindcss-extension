import { defineConfig } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import { resolve } from "path"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    emptyOutDir: false,
    outDir: resolve(__dirname, "dist"),
    lib: {
      formats: ["iife"],
      entry: resolve(__dirname, "./src/background.ts"),
      name: "Vite/Svelte/TailwindCSS Plugin",
    },
    rollupOptions: {
      output: {
        entryFileNames: "background.global.js",
        extend: true,
      },
    },
  },
})
