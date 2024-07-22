import { defineConfig } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import webExtension, { readJsonFile } from "vite-plugin-web-extension"
import path from "node:path"
function generateManifest() {
  const manifest = readJsonFile("src/manifest.json")
  const pkg = readJsonFile("package.json")
  return {
    name: pkg.name,
    description: pkg.description,
    version: pkg.version,
    ...manifest,
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  plugins: [svelte()],
  define: {
    "process.env": {},
  },
  build: {
    emptyOutDir: false,
    outDir: path.resolve(__dirname, "dist"),
    lib: {
      formats: ["iife"],
      entry: path.resolve(__dirname, "src/content-scripts/content-inject.ts"),
      name: "LLFetcher",
    },
    rollupOptions: {
      output: {
        entryFileNames: "content-script-inject.js",
        extend: true,
      },
    },
    minify: false,
    sourcemap: true,
  },
})
