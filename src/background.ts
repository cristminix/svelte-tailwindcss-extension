import browser from "webextension-polyfill"

browser.runtime.onMessage.addListener((msg, sender, response) => {
  console.log("message received from content script: ", msg)
  return true
})

browser.runtime.onInstalled.addListener((details) => {
  console.log("Extension installed:", details)
})
