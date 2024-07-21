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
  build: {
    minify: false,
    sourcemap: true,
    rollupOptions: {
      input: {
        ["content-script-inject"]: path.resolve(__dirname, "src/content-inject.ts"),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    svelte(),
    webExtension({
      // disableAutoLaunch:true,
      manifest: generateManifest,
      browser: "firefox",
      watchFilePaths: ["package.json", "manifest.json"],
      webExtConfig: {
        startUrl: "https://www.linkedin.com/learning",
      },
    }),
  ],
})
