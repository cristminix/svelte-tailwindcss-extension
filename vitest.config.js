import { defineConfig } from "vitest/config"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import { svelteTesting } from "@testing-library/svelte/vite"
import path from "node:path"
export default defineConfig({
  plugins: [svelte(), svelteTesting()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/tests/setupTests.ts"],
    exclude: ["node_modules"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
