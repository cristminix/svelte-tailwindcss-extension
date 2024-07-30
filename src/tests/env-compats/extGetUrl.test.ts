// src/extGetUrl.test.ts
import { extGetUrl } from "@/global/fn/extGetUrl"
import { isBrowser } from "@/global/fn/isBrowser"
import { describe, it, expect, vi } from "vitest"
// import { extGetUrl } from "./extGetUrl"

// Mock environment variable
const originalEnv = { ...process.env }

describe("extGetUrl", () => {
  console.log(`import.meta.env=${import.meta.env.MODE}`)
  const IS_BROWSER = isBrowser()
  console.info({ IS_BROWSER })
  beforeEach(() => {
    // Reset environment variables before each test
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    // Restore original environment variables
    process.env = originalEnv
  })

  it('should use browser.runtime.getURL when VITE_EXT_TARGET_BROWSER is not "chrome"', () => {
    process.env.VITE_EXT_TARGET_BROWSER = "firefox" // Mock environment variable

    const url = "path/to/resource"
    const result = extGetUrl(url)

    expect(result).toBe(`/db/${url}`)
  })

  it('should use chrome.runtime.getURL when VITE_EXT_TARGET_BROWSER is "chrome"', () => {
    process.env.VITE_EXT_TARGET_BROWSER = "chrome" // Mock environment variable

    // Mock chrome.runtime.getURL

    const url = "path/to/resource"
    const result = extGetUrl(url)

    expect(result).toBe(`/db/${url}`)
  })
})
