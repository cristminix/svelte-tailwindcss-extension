import browser from "webextension-polyfill"

export type InjectLinkLoadCallback = (elem: HTMLLinkElement) => void
export type InjectLinkErrorCallback = (error: any) => void
export type InjectScriptLoadCallback = (elem: HTMLScriptElement) => void
export type InjectScriptErrorCallback = (error: any) => void
export type SendMessageCallback = (data: any) => void
type MessageSender = chrome.runtime.MessageSender | browser.Runtime.MessageSender
export type OnMessageCallback = (data: any, sender: MessageSender) => void
