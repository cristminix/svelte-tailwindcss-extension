// src/setupTests.ts

import { vi } from "vitest"
import { initSqlJs } from "./initSqlJs"
import { commitDatabase } from "./commitDatabase"
import { crc32Id } from "@/global/fn/crc32Id"
// Mock the webextension-polyfill module
vi.mock("webextension-polyfill", () => {
  return {
    default: {
      runtime: {
        getURL: (url: string) => `/db/${url}`,
      },
    },
  }
})
// Mock the chrome object
globalThis.chrome = {
  runtime: {
    getURL: (url: string) => `/db/${url}`,
    // Mock other chrome.runtime methods if needed
  },
  // Add other properties and methods if needed
} as unknown as typeof globalThis.chrome

// Example setup and teardown
beforeEach(async () => {
  // Code to run before each test
  await initSqlJs()
  //   console.log("Before each test")
})

afterEach(async () => {
  // Code to run after each test
  //   console.log("After each test")
  const hash = "backed-up-020824" //crc32Id(new Date().getTime().toString())
  await commitDatabase(`backup-${hash}.db`)
})
