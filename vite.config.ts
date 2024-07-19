import { defineConfig } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    outDir: "dist",
    emptyOutDir: false,
    minify: false,
    sourcemap: true,
    rollupOptions: {
      input: {
        index: new URL("./popup.html", import.meta.url).pathname,
        background: new URL("./background.html", import.meta.url).pathname,
      },
    },
  },
})
